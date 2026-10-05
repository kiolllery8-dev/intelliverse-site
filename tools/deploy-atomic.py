#!/usr/bin/env python3
"""Atomic, origin-verified publication for this site's static export only."""
import argparse
import ctypes
import fcntl
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import time
import uuid

ROOT = Path('/opt/auslife/nginx-static')

def switch(live, target):
    temporary = live.parent / ('.show-switch-' + uuid.uuid4().hex)
    temporary.symlink_to(os.path.relpath(target, live.parent))
    if live.is_dir() and not live.is_symlink():
        # Exchange the original directory and the new symlink in one Linux operation.
        libc = ctypes.CDLL(None, use_errno=True)
        if libc.renameat2(-100, os.fsencode(temporary), -100, os.fsencode(live), 2):
            temporary.unlink()
            raise OSError(ctypes.get_errno(), 'atomic directory exchange failed')
        temporary.rename(target.parent / ('legacy-' + uuid.uuid4().hex))
    else:
        os.replace(temporary, live)

def publish(root, source, revision, verify):
    releases = root / 'show-releases'
    releases.mkdir(exist_ok=True)
    live = root / 'show'
    if not live.exists():
        raise RuntimeError('Existing site missing; refusing initial deployment')
    previous = live.resolve()
    if not live.is_symlink():
        previous = releases / ('bootstrap-' + uuid.uuid4().hex)
        shutil.copytree(live, previous)
    destination = releases / (revision[:12] + '-' + uuid.uuid4().hex[:8])
    shutil.copytree(source, destination, ignore=shutil.ignore_patterns('*.map'))
    switch(live, destination)
    try:
        verify()
    except Exception:
        if live.resolve() == destination:
            switch(live, previous)
        raise
    # Retain at least three successful/current releases; never remove a live target.
    keep = {live.resolve(), previous}
    entries = sorted(releases.iterdir(), key=lambda p: p.stat().st_mtime, reverse=True)
    keep.update(entries[:3])
    for old in entries:
        if old not in keep and old.is_dir() and not old.is_symlink() and old.parent == releases:
            try:
                shutil.rmtree(old)
            except OSError as error:
                print('Release cleanup deferred:', old.name, type(error).__name__)
    return destination

def verify_origin():
    for route in ['/', '/services/web-design/', '/services/seo-management/', '/services/ai-automation/']:
        result = subprocess.run(['curl', '--fail', '--silent', '--show-error', '--max-time', '30',
            '--resolve', 'show.intelliverse.tw:443:127.0.0.1', 'https://show.intelliverse.tw' + route],
            check=True, capture_output=True)
        body = result.stdout.decode('utf8')
        if '<h1' not in body or 'https://show.intelliverse.tw' + route not in body:
            raise RuntimeError('Origin content check failed: ' + route)

def self_test():
    with tempfile.TemporaryDirectory(prefix='show-deploy-test-') as directory:
        root = Path(directory)
        (root / 'show').mkdir()
        (root / 'show/index.html').write_text('old')
        source = root / 'export'; source.mkdir()
        (source / 'index.html').write_text('new')
        publish(root, source, 'success', lambda: None)
        assert (root / 'show/index.html').read_text() == 'new'
        before = (root / 'show').resolve()
        (source / 'index.html').write_text('bad')
        def fail():
            raise RuntimeError('simulated origin failure')
        try:
            publish(root, source, 'failure', fail)
        except RuntimeError:
            pass
        assert (root / 'show').resolve() == before
        assert (root / 'show/index.html').read_text() == 'new'
        print('PASS: atomic directory migration, release switch and failed-release rollback')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', default='out')
    parser.add_argument('--revision', default='manual')
    parser.add_argument('--self-test', action='store_true')
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        source = Path(args.source).resolve()
        if not (source / 'index.html').is_file() or not (source / 'sitemap.xml').is_file():
            raise RuntimeError('Not a verified static export')
        with open(ROOT / '.show-deploy.lock', 'a') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX)
            print(publish(ROOT, source, args.revision, verify_origin))
