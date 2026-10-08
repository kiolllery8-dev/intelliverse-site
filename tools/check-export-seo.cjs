/** Verify the actual exported pages before deploying; no network or extra packages. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../out');
const origin = 'https://show.intelliverse.tw';
const failures = [];
const pages = new Map();
const assert = (condition, message) => { if (!condition) failures.push(message); };
const decode = (s = '') => s.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, (v) => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
  if (named[v]) return named[v];
  return String.fromCodePoint(v[2].toLowerCase() === 'x' ? parseInt(v.slice(3, -1), 16) : parseInt(v.slice(2, -1), 10));
});
const text = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((m) => [m[1], decode(m[2] ?? m[3])]));
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (entry.name === 'index.html') {
      const html = fs.readFileSync(file, 'utf8');
      const route = '/' + path.relative(root, path.dirname(file)).replaceAll('\\', '/') + '/';
      const url = origin + route.replace('//', '/');
      if (html.includes('name="robots" content="noindex')) continue;
      pages.set(url, { file, html, ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => decode(m[1]))) });
    }
  }
}
scan(root);
assert(pages.size > 0, 'No exported pages found; run npm run build first.');
const titles = new Map(), descriptions = new Map(), linkedPages = new Set();
for (const [url, page] of pages) {
  const { html, ids } = page;
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0]));
  const meta = (name) => metas.filter((m) => m.name === name || m.property === name).map((m) => m.content);
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0])).filter((a) => a.rel === 'canonical');
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');
  const description = meta('description')[0] || '';
  assert(title.length > 0, `${url}: missing title`);
  assert(!titles.has(title), `${url}: duplicate title with ${titles.get(title)}`);
  assert(description.length > 0 && description.length <= 160, `${url}: description length ${description.length}`);
  assert(meta('description').length === 1, `${url}: duplicated descriptions`);
  assert(!descriptions.has(description), `${url}: duplicate description with ${descriptions.get(description)}`);
  titles.set(title, url); descriptions.set(description, url);
  assert(canonicals.length === 1 && canonicals[0].href === url, `${url}: canonical mismatch`);
  assert([...html.matchAll(/<h1\b/g)].length === 1, `${url}: expected exactly one H1`);
  assert(ids.has('main-content'), `${url}: skip link target missing`);
  assert(meta('og:url')[0] === url, `${url}: OG URL mismatch`);
  for (const name of ['og:title', 'og:description', 'og:type', 'og:image', 'twitter:image']) assert(!!meta(name)[0], `${url}: missing ${name}`);
  assert(meta('twitter:card')[0] === 'summary_large_image', `${url}: Twitter card mismatch`);
  assert(meta('og:image')[0] === meta('twitter:image')[0], `${url}: social images disagree`);
  for (const match of html.matchAll(/<(?:a|img|script|link)\b[^>]*>/g)) {
    const a = attrs(match[0]);
    if (match[0].startsWith('<img')) assert(typeof a.alt === 'string', `${url}: image lacks alt`);
    const raw = a.href || a.src;
    if (!raw || /^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const target = new URL(raw, url);
    if (target.origin !== origin || target.pathname.startsWith('/chat/')) continue;
    const local = path.join(root, decodeURIComponent(target.pathname));
    const targetPage = pages.get(target.origin + target.pathname);
    assert(fs.existsSync(local), `${url}: broken local link/asset ${raw}`);
    if (targetPage) {
      if (target.origin + target.pathname !== url) linkedPages.add(target.origin + target.pathname);
      if (target.hash) assert(targetPage.ids.has(decodeURIComponent(target.hash.slice(1))), `${url}: missing anchor ${raw}`);
    }
  }
  const visible = text(html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<head\b[\s\S]*?<\/head>/g, ''));
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const schema = JSON.parse(match[1]);
      if (schema['@type'] === 'TechArticle' && url.includes('/skills/')) {
        assert(typeof schema.citation === 'string' && schema.citation === schema.isBasedOn?.url, `${url}: article source references disagree`);
        const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attrs(m[0]));
        assert(anchors.some((a) => a.href === schema.citation), `${url}: article citation is not linked visibly`);
        assert(visible.includes('以下為示意對話，不是實測紀錄或成效保證'), `${url}: example disclosure missing`);
        const summaryPosition = html.indexOf('class="skill-summary"');
        const figurePosition = html.indexOf('class="skill-figure"');
        assert(summaryPosition >= 0 && (figurePosition < 0 || summaryPosition < figurePosition), `${url}: summary must precede illustration`);
      }
      if (schema['@type'] === 'FAQPage') for (const question of schema.mainEntity) {
        assert(visible.includes(text(question.name)), `${url}: FAQ question absent from HTML`);
        assert(visible.includes(text(question.acceptedAnswer.text)), `${url}: FAQ answer absent from HTML`);
      }
    } catch (error) { failures.push(`${url}: invalid JSON-LD: ${error.message}`); }
  }
}
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1])));
for (const url of pages.keys()) {
  assert(sitemapUrls.has(url), `${url}: absent from sitemap`);
  if (url !== origin + '/') assert(linkedPages.has(url), `${url}: no internal inbound link`);
}
for (const url of sitemapUrls) assert(pages.has(url), `${url}: sitemap points at a non-page`);
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), 'robots.txt: incorrect sitemap URL');
if (failures.length) {
  console.error(failures.join('\n'));
  console.error(`SEO export check failed: ${failures.length} issues across ${pages.size} pages.`);
  process.exit(1);
}
console.log(`SEO export check passed: ${pages.size} pages; metadata, sitemap, internal links/assets, social images and visible FAQs verified.`);
