import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { SKILLS, getSkill } from '../../skills-data';

const SITE_URL = 'https://show.intelliverse.tw';

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};

  const title = `${skill.nameZh}｜${skill.nameEn} AI 技能用法完整說明`;
  const description = `${skill.tagline}｜${skill.summary}`.slice(0, 155);

  return {
    title,
    description,
    keywords: skill.keywords,
    alternates: { canonical: `/skills/${skill.slug}/` },
    openGraph: {
      type: 'article',
      locale: 'zh_TW',
      url: `${SITE_URL}/skills/${skill.slug}/`,
      title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const idx = SKILLS.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? SKILLS[idx - 1] : null;
  const next = idx < SKILLS.length - 1 ? SKILLS[idx + 1] : null;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_URL}/skills/${skill.slug}/#article`,
    headline: `${skill.nameZh}｜${skill.nameEn} AI 技能用法完整說明`,
    description: skill.summary,
    inLanguage: 'zh-Hant-TW',
    keywords: skill.keywords.join(', '),
    articleSection: skill.category,
    url: `${SITE_URL}/skills/${skill.slug}/`,
    image: `${SITE_URL}/og-image.png`,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'SoftwareApplication',
      name: skill.nameEn,
      applicationCategory: 'DeveloperApplication',
      description: skill.summary,
      url: skill.sourceUrl,
    },
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/skills/${skill.slug}/#howto`,
    name: `${skill.nameZh}怎麼用`,
    description: skill.summary,
    inLanguage: 'zh-Hant-TW',
    step: skill.howToUse.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.step,
      text: s.detail,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI 技能圖書館', item: `${SITE_URL}/skills/` },
      { '@type': 'ListItem', position: 3, name: skill.nameZh, item: `${SITE_URL}/skills/${skill.slug}/` },
    ],
  };

  return (
    <>
      <SiteNav base="/" />

      <main>
        <article className="skill-article">
          <header id="top" className="page-hero skill-hero">
            <div className="shell">
              <nav className="crumbs" aria-label="麵包屑">
                <a href="/">首頁</a>
                <span aria-hidden="true">/</span>
                <a href="/skills/">AI 技能圖書館</a>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{skill.nameZh}</span>
              </nav>

              <p className="page-kicker">
                <span aria-hidden="true" /> {skill.category} · {skill.nameEn}
              </p>
              <h1>{skill.nameZh}</h1>
              <p className="skill-tagline">{skill.tagline}</p>

              <div className="skill-pain">
                <span className="skill-pain-label">解決什麼問題</span>
                <p>{skill.painPoint}</p>
              </div>
            </div>
          </header>

          <div className="shell skill-body">
            <section className="skill-block">
              <h2>這是什麼</h2>
              <p className="skill-summary">{skill.summary}</p>
              <ul className="skill-can-do">
                {skill.whatItDoes.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </section>

            <section className="skill-block">
              <h2>什麼時候用得上</h2>
              <div className="skill-scenarios">
                {skill.scenarios.map((s, i) => (
                  <div key={i} className="skill-scenario">
                    <div className="skill-scenario-num">{String(i + 1).padStart(2, '0')}</div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="skill-block">
              <h2>怎麼用</h2>
              <ol className="skill-steps">
                {skill.howToUse.map((s, i) => (
                  <li key={i}>
                    <div className="skill-step-num">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <h3>{s.step}</h3>
                      <p>{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="skill-block">
              <h2>實際對話長這樣</h2>
              <div className="skill-example">
                <div className="skill-example-row skill-example-you">
                  <span className="skill-example-who">你</span>
                  <p>{skill.examplePrompt}</p>
                </div>
                <div className="skill-example-row skill-example-ai">
                  <span className="skill-example-who">AI</span>
                  <p>{skill.exampleResult}</p>
                </div>
              </div>
            </section>

            <section className="skill-block">
              <h2>幾個實用技巧</h2>
              <ul className="skill-tips">
                {skill.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>

            <section className="skill-block skill-meta-block">
              <div className="skill-bestfor">
                <h3>適合誰</h3>
                <p>{skill.bestFor}</p>
              </div>
              <div className="skill-source">
                <h3>原始出處</h3>
                <a href={skill.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {skill.sourceRepo} <span aria-hidden="true">↗</span>
                </a>
                <p className="skill-source-note">
                  GitHub {skill.sourceStars} stars ·
                  本頁為靈境智造整理翻譯的繁體中文說明，非原作者官方文件。
                </p>
              </div>
            </section>

            <nav className="skill-nav" aria-label="其他技能">
              {prev ? (
                <a href={`/skills/${prev.slug}/`} className="skill-nav-prev">
                  <span>← 上一個</span>
                  <strong>{prev.nameZh}</strong>
                </a>
              ) : <span />}
              <a href="/skills/" className="skill-nav-all">全部技能</a>
              {next ? (
                <a href={`/skills/${next.slug}/`} className="skill-nav-next">
                  <span>下一個 →</span>
                  <strong>{next.nameZh}</strong>
                </a>
              ) : <span />}
            </nav>

            <aside className="skills-cta">
              <div>
                <h2>省去無意義的試錯時間！</h2>
                <p>看了再多 AI 趨勢與教學，依然無法真正落地應用？</p>
                <p>把專業交給專業，我們為你量身打造 AI 自動化解決方案。</p>
              </div>
              <div className="skills-cta-actions">
                <a href="/#automation" className="btn-primary">看 AI 自動化代管服務</a>
                <a
                  href={`mailto:linsonder6@gmail.com?subject=${encodeURIComponent(`想導入「${skill.nameZh}」的相關詢問`)}`}
                  className="btn-ghost"
                >
                  直接寫信聊聊
                </a>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
