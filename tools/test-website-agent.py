"""Run on the Linux runner: python3 tools/test-website-agent.py."""
import copy
import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch
import io
import json
import urllib.error
import os
import tempfile
from datetime import timedelta

spec = importlib.util.spec_from_file_location('worker', Path(__file__).with_name('website-agent.py'))
worker = importlib.util.module_from_spec(spec); spec.loader.exec_module(worker)

class ContentBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.article = {'summary': '舊版本有待確認的說明', 'source': {'repo': 'owner/repo'}, 'updatedAt': '2026-01-01'}
        self.source = 'The software requires a separately configured cloud API key.'
        self.proposal = {'changes': [{'pointer': '/summary', 'before': self.article['summary'],
            'after': '這項工具需要另外設定雲端服務金鑰。', 'quote': self.source, 'reason': '說明使用條件'}]}

    def test_valid_change_does_not_mutate_input(self):
        result = worker.validate(self.article, self.proposal, self.source)
        self.assertNotEqual(result['summary'], self.article['summary'])
        self.assertEqual(result['source'], self.article['source'])

    def test_protected_source_cannot_change(self):
        self.proposal['changes'][0]['pointer'] = '/source/repo'
        with self.assertRaises(ValueError): worker.validate(self.article, self.proposal, self.source)

    def test_stale_proposal_rejected(self):
        self.article['summary'] = '已由別人修改'
        with self.assertRaises(ValueError): worker.validate(self.article, self.proposal, self.source)

    def test_missing_evidence_rejected(self):
        with self.assertRaises(ValueError): worker.validate(self.article, self.proposal, 'Unrelated evidence')

    def test_html_payload_rejected(self):
        self.proposal['changes'][0]['after'] = '<script>alert(1)</script>'
        with self.assertRaises(ValueError): worker.validate(self.article, self.proposal, self.source)

    def test_duplicate_fields_rejected(self):
        self.proposal['changes'].append(copy.deepcopy(self.proposal['changes'][0]))
        with self.assertRaises(ValueError): worker.validate(self.article, self.proposal, self.source)

class SourceFailureTests(unittest.TestCase):
    def failure(self, detail):
        return urllib.error.HTTPError(worker.FIRECRAWL, 502, 'Gateway', {},
                                      io.BytesIO(json.dumps(detail).encode()))

    def test_explicit_missing_source_is_quarantined(self):
        error = self.failure({'code': 'SOURCE_HTTP_ERROR', 'sourceStatusCode': 404, 'retryable': False})
        with patch.object(worker, 'budget'), patch.object(worker, 'request', side_effect=error):
            with self.assertRaises(worker.SourceUnavailable): worker.scrape('https://example.com/missing')

    def test_transient_gateway_failure_remains_failure(self):
        error = self.failure({'code': 'SOURCE_HTTP_ERROR', 'sourceStatusCode': 503, 'retryable': True})
        with patch.object(worker, 'budget'), patch.object(worker, 'request', side_effect=error):
            with self.assertRaises(urllib.error.HTTPError): worker.scrape('https://example.com/unavailable')

class SourceRevisionTests(unittest.TestCase):
    def setUp(self):
        ContentBoundaryTests.setUp(self)
        self.temp = tempfile.TemporaryDirectory(); self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.state = self.root / 'state'
        self.repo = self.root / 'repository'
        self.article.update(slug='clipify', source={'repo': 'owner/repo', 'path': 'skills/clipify'})
        self.article_path = self.repo / 'data/skills/clipify.json'
        worker.write(self.article_path, self.article)
        self.clock = worker.now()
        quiet = patch('sys.stdout', new_callable=io.StringIO)
        quiet.start(); self.addCleanup(quiet.stop)
        self.revision = 'a' * 40
        self.output = self.root / 'output'
        self.output.write_text('')
        for context in (patch.object(worker, 'STATE', self.state), patch.object(worker, 'REPO', self.repo),
                        patch.object(worker, 'now', return_value=self.clock),
                        patch.object(worker, 'run', return_value='site-base'),
                        patch.dict(os.environ, GITHUB_OUTPUT=str(self.output))):
            context.start(); self.addCleanup(context.stop)
        previous = Path.cwd(); os.chdir(self.repo); self.addCleanup(os.chdir, previous)
        worker.write(self.state / 'config.json', {'startedAt': (self.clock - timedelta(days=10)).isoformat(),
                     'releaseRehearsalPassed': True})
        worker.write(self.state / 'health.json', {'at': self.clock.isoformat(), 'ok': True, 'successfulChecks': 8})

    def research_proposal(self):
        with patch.object(worker, 'source_revision', return_value=self.revision), \
             patch.object(worker, 'scrape', return_value=self.source) as scrape, \
             patch.object(worker, 'model', side_effect=[self.proposal, {'approved': True, 'reason': 'verified'}]) as model:
            worker.research()
        report = worker.read(self.state / 'latest-research.json', {})
        self.assertEqual(report['sourceRevision'], self.revision)
        scrape.assert_called_once_with('https://raw.githubusercontent.com/owner/repo/' + self.revision + '/skills/clipify/SKILL.md')
        self.assertEqual(model.call_count, 2)
        return report, self.state / 'proposals' / (report['id'] + '.json')

    def assert_no_publication(self):
        self.assertEqual(worker.read(self.article_path, {}), self.article)
        self.assertEqual(self.output.read_text(), '')
        self.assertFalse((self.state / 'pending-publication.json').exists())

    def test_upstream_changed_after_research_rejected(self):
        report, file = self.research_proposal()
        with patch.object(worker, 'source_revision', return_value='b' * 40): worker.prepare()
        self.assert_no_publication()
        self.assertFalse(worker.read(file, {})['approved'])
        self.assertEqual(worker.read(file, {})['status'], 'source-stale')
        self.assertNotIn('clipify', worker.read(self.state / 'examined.json', {}))
        # A later return to the old HEAD cannot revive the invalidated proposal.
        with patch.object(worker, 'source_revision', return_value=self.revision) as check:
            worker.prepare(); check.assert_not_called()
        self.assert_no_publication()

    def test_unchanged_revision_prepares(self):
        report, _ = self.research_proposal()
        with patch.object(worker, 'source_revision', return_value=self.revision) as check: worker.prepare()
        check.assert_called_once_with('owner/repo')
        self.assertIn('ready=true', self.output.read_text())
        self.assertEqual(worker.read(self.state / 'pending-publication.json', {})['sourceRevision'], self.revision)

    def test_legacy_proposal_requires_research(self):
        report, file = self.research_proposal()
        del report['sourceRevision']; worker.write(file, report)
        with patch.object(worker, 'source_revision') as check:
            worker.prepare(); check.assert_not_called()
        self.assert_no_publication()
        self.assertFalse(worker.read(file, {})['approved'])

    def test_revision_lookup_failure_stops_publication(self):
        self.research_proposal()
        with patch.object(worker, 'source_revision', side_effect=TimeoutError('upstream unavailable')):
            with self.assertRaises(TimeoutError): worker.prepare()
        self.assert_no_publication()

    def test_revision_response_is_validated(self):
        with patch.object(worker, 'request', return_value=(json.dumps({'sha': self.revision}), 200)) as request:
            self.assertEqual(worker.source_revision('owner/repo'), self.revision)
        request.assert_called_once_with('https://api.github.com/repos/owner/repo/commits/HEAD', timeout=25)
        with patch.object(worker, 'request', return_value=('{"sha":"main"}', 200)):
            with self.assertRaises(ValueError): worker.source_revision('owner/repo')

class IntakeBudgetTests(unittest.TestCase):
    def test_disabled_intake_does_not_reserve(self):
        self.assertEqual(worker.intake_reserve({}, '2026-10-08'), 0)

    def test_previous_day_completion_still_reserves(self):
        record = {'otherSchedulerConfirmedAbsent': True, 'status': 'enabled-subject-to-observation-review-and-shared-budget',
                  'dailyRun': {'date': '2026-10-07', 'status': 'published'}}
        self.assertEqual(worker.intake_reserve(record, '2026-10-08'), 3)

    def test_current_day_completion_releases_reserve(self):
        record = {'otherSchedulerConfirmedAbsent': True, 'status': 'enabled-subject-to-observation-review-and-shared-budget',
                  'dailyRun': {'date': '2026-10-08', 'status': 'no-qualified-candidates'}}
        self.assertEqual(worker.intake_reserve(record, '2026-10-08'), 0)

if __name__ == '__main__': unittest.main()
