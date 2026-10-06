"""Run on the Linux runner: python3 tools/test-website-agent.py."""
import copy
import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch
import io
import json
import urllib.error

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

if __name__ == '__main__': unittest.main()
