import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { SERVICE_GUIDES } from '../../service-guides';
import { SITE_NAME, SITE_URL } from '../../site-info';
import { WORKS } from '../../content';
import { getSkill } from '../../skills-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = SERVICE_GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  const title = `${slug === 'web-design' ? '台中品牌網站設計與開發' : guide.name}｜靈境智造`;
  const image = { url: '/og-image.png', width: 1200, height: 630, alt: `${SITE_NAME}：${guide.name}` };
  return {
    title: { absolute: title },
    description: guide.description,
    alternates: { canonical: `/services/${slug}/` },
    openGraph: { type: 'website', locale: 'zh_TW', siteName: SITE_NAME, url: `${SITE_URL}/services/${slug}/`, title, description: guide.description, images: [image] },
    twitter: { card: 'summary_large_image', title, description: guide.description, images: [image.url] },
  };
}

const SECTIONS = [
  ['fit', '適合的情境'], ['scope', '服務與交付'], ['process', '合作流程'],
  ['measures', '如何看成果'], ['pricing', '費用與準備'], ['questions', '常見問題'],
] as const;

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = SERVICE_GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();
  const url = `${SITE_URL}/services/${slug}/`;
  const examples = WORKS.filter((w) => guide.workSlugs.includes(w.slug));
  const skills = guide.skillSlugs.map(getSkill).filter((s) => s !== undefined);
  const mail = `mailto:linsonder6@gmail.com?subject=${encodeURIComponent(`${guide.name}需求詢問`)}`;
  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`,
      url, name: guide.title, description: guide.description, inLanguage: 'zh-Hant-TW', dateModified: guide.updatedAt,
      isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: { '@id': `${url}#service` },
    },
    {
      '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`,
      url, name: guide.name, serviceType: guide.name, description: guide.intro,
      provider: { '@id': `${SITE_URL}/#organization` }, areaServed: { '@type': 'Country', name: 'Taiwan' },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: guide.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${url}#questions`,
      mainEntity: guide.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <SiteNav base="/" />
      <main id="main-content">
        <header id="top" className="page-hero service-hero">
          <div className="shell">
            <nav className="crumbs" aria-label="麵包屑">
              <a href="/">首頁</a><span aria-hidden="true">/</span><span aria-current="page">{guide.name}</span>
            </nav>
            <p className="page-kicker"><span aria-hidden="true" />{guide.kicker}</p>
            <h1>{guide.title}</h1>
            <p className="page-lede">{guide.intro}</p>
            <div className="service-actions">
              <a className="btn-primary" href={mail}>告訴我們目前的需求</a>
              <a className="btn-ghost" href="#scope">先看服務與交付</a>
            </div>
            <p className="service-update">靈境智造團隊 · 內容更新 <time dateTime={guide.updatedAt}>{guide.updatedAt}</time> · 台中太平／可線上合作</p>
          </div>
        </header>
        <div className="shell service-layout">
          <nav className="service-toc" aria-label="本頁導覽">
            {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className="service-content">
            <section id="fit" className="service-block">
              <h2>哪些情境適合先找我們？</h2>
              <ul className="service-list">{guide.fit.map((s) => <li key={s}>{s}</li>)}</ul>
            </section>
            <section id="scope" className="service-block">
              <h2>服務內容與交付範圍</h2>
              <p>以下項目依需求組合，實際交付、數量與維護範圍會在提案中列明。</p>
              <div className="service-detail-grid">
                {guide.scope.map((s, i) => (
                  <article className="service-detail" key={s.title}>
                    <span className="service-detail-num" aria-hidden="true">0{i + 1}</span>
                    <h3>{s.title}</h3><p>{s.body}</p>
                    <p className="service-output"><strong>交付重點</strong>{s.output}</p>
                  </article>
                ))}
              </div>
            </section>
            <section id="process" className="service-block">
              <h2>從確認需求到正式使用</h2>
              <ol className="service-process">{guide.process.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol>
            </section>
            <section id="measures" className="service-block">
              <h2>成果要看哪些指標？</h2>
              <div className="service-measures">{guide.measures.map((s) => <article key={s.title}><h3>{s.title}</h3><p>{s.body}</p></article>)}</div>
            </section>
            <section id="pricing" className="service-block">
              <h2>費用怎麼評估？</h2><p>{guide.pricing}</p>
              <h3 className="service-subhead">第一次討論，可以先準備這些</h3>
              <ul className="service-list">{guide.preparation.map((s) => <li key={s}>{s}</li>)}</ul>
              <p>不必等資料齊全才聯絡。先說明現況，我們會一起找出還需要確認的部分。</p>
            </section>
            <section id="examples" className="service-block">
              <h2>{examples.length ? '可以參考的網站作品' : '從實際營運作業開始'}</h2>
              {examples.length ? (
                <ul className="service-examples">{examples.map((w) => <li key={w.slug}><a href={`/#${w.slug}`}><strong>{w.title}</strong><span>{w.labels.join(' · ')} →</span></a></li>)}</ul>
              ) : (
                <p>首頁介紹了蝦皮每日置頂協作與 MOMO 每週售更多排程的實作方向。若你的需求是報表、資料或其他平台，會先依現有系統確認可行性。</p>
              )}
              <a className="service-text-link" href={examples.length ? '/#works' : '/#automation'}>{examples.length ? '查看完整作品區' : '看蝦皮與 MOMO 自動化服務'} →</a>
            </section>
            <section id="questions" className="service-block">
              <h2>{guide.name}常見問題</h2>
              <div className="faq-list">{guide.faq.map((f, i) => <details key={f.q} className="faq-item"><summary><span className="faq-q-num">Q0{i + 1}</span><span className="faq-q-text">{f.q}</span><span className="faq-q-mark" aria-hidden="true">+</span></summary><div className="faq-a">{f.a}</div></details>)}</div>
            </section>
            <section className="service-block" aria-labelledby="service-reading">
              <h2 id="service-reading">想先了解相關 AI 技能？</h2>
              <p>技能教學是理解做法的起點；正式導入還需要搭配資料、權限、測試與維護。</p>
              <ul className="service-reading">{skills.map((s) => <li key={s.slug}><a href={`/skills/${s.slug}/`}>{s.nameZh} →</a></li>)}</ul>
            </section>
            <aside className="skills-cta">
              <div><h2>把你目前卡住的那一步，交給我們一起想。</h2><p>先說明現有網站、作業方式與目標，再評估適合的服務範圍。</p></div>
              <div className="skills-cta-actions"><a href={mail} className="btn-primary">寫信說明需求</a><a href="tel:+886926213896" className="btn-ghost">電話聊聊</a></div>
            </aside>
            <nav className="service-related" aria-label="其他服務">
              {SERVICE_GUIDES.filter((g) => g.slug !== slug).map((g) => <a key={g.slug} href={`/services/${g.slug}/`}>{g.name} →</a>)}
              <a href="/#services">回到首頁服務總覽 →</a>
            </nav>
          </div>
        </div>
      </main>
      <SiteFooter />
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, '\\u003c') }} />)}
    </>
  );
}
