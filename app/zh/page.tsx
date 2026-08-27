'use client';

import { useEffect, useState } from 'react';
import SectionCarousel from '../components/SectionCarousel';

const layers = [
  ['01', '能源', '为智能提供动力'], ['02', '芯片', '支撑规模化算力'],
  ['03', '基础设施', '建设智能时代底座'], ['04', '模型', '推动能力边界'],
  ['05', '应用', '改变工作与生活'],
];

const discussions = [
  ['01', '构建 AI 原生法务部门', '当人工智能成为运营模式的一部分，法务团队应如何重新思考工作流、人才、知识与治理？'],
  ['02', 'AI 智能体与法律责任', '当人工智能从回答问题走向采取行动，法律责任将如何变化？'],
  ['03', 'AI 法律人的未来', '下一代法律专业人士最重要的能力会是什么？'],
];

const principles = [
  ['信任', '为同行之间的坦诚交流创造安全环境。'],
  ['实践交流', '重视真实经验与可用洞见，而非空泛讨论。'],
  ['拒绝商业推销', '这里是学习与交流的空间，而非获客渠道。'],
  ['以个人身份参与', '成员以个人身份交流，不代表所在机构背书。'],
];

export default function ChineseHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <main lang="zh-CN">
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <a className="brand" href="#top"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a>
      <nav aria-label="主导航"><a href="#about">关于</a><a href="#community">社群动态</a><a href="/zh/notes/">社群笔记</a><a className="language-switch" href="/">EN</a><a className="nav-join" href="#contribute">参与</a></nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="eyebrow"><span /> 独立同行社群</div>
      <h1>智能时代的<br />法律判断力。</h1>
      <p className="hero-copy">连接人工智能生态各环节法律专业人士的可信同行网络。</p>
      <div className="hero-actions"><a className="button button-light" href="#community">进入对话 <span>↗</span></a><a className="text-link" href="#about">了解我们的使命 <span>↓</span></a></div>
      <div className="hero-footer"><span>跨越专业边界</span><span>贯穿 AI 全产业链</span><span>以信任为基础</span></div>
    </section>

    <SectionCarousel id="about" eyebrow="关于 Network" title="连接我们的共同基础" labels={['我们为何存在', '贯穿 AI 产业链', '社群原则']}>
      <section className="intro section"><div className="section-label">01 / 我们为何存在</div><div className="intro-content"><p className="kicker">法律工作正在改变。</p><h2>人工智能不仅在重塑法律与商业，也在重新定义法律专业人士的角色。</h2><div className="intro-columns"><p>许多最重要的问题并没有现成答案。它们跨越行业、技术、司法辖区与组织边界，不断涌现。</p><p>AGI Counsel Network 汇聚资深法律专业人士，交流实践、磨砺判断，并共同面对未来。</p></div></div></section>
      <section className="stack-section"><div className="section stack-heading"><div className="section-label">02 / 贯穿 AI 产业链</div><div><p className="kicker">同一生态，共同议题。</p><h2>连接人工智能每一层的法律专业人士。</h2></div></div><div className="layer-cake">{layers.map(([n, t, b]) => <div className="layer" key={t}><span>{n}</span><strong>{t}</strong><small>{b}</small></div>)}</div></section>
      <section className="principles" id="principles"><div className="section principles-inner"><div className="section-label section-label-gold">06 / 社群原则</div><div className="principles-content"><p className="kicker kicker-gold">我们如何参与。</p><h2>严肃的同行社群，始于清晰的共同约定。</h2><div className="principles-list">{principles.map(([t, b], i) => <div className="principle" key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{b}</p></div>)}</div></div></div></section>
    </SectionCarousel>

    <SectionCarousel id="community" eyebrow="社群动态" title="让问题沉淀为共同洞见" labels={['我们正在讨论', '精选社群笔记', '来自社群']}>
      <section className="section discussions"><div className="section-label">03 / 我们正在讨论</div><div className="discussion-content"><p className="kicker">真实问题，而非标准答案。</p><h2>此刻，正在社群中流动的问题。</h2><div className="discussion-grid">{discussions.map(([n, t, b]) => <article key={t}><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div></div></section>
      <section className="featured-note"><div className="section featured-note-inner"><div className="section-label section-label-gold">04 / 精选社群笔记</div><div className="featured-note-content"><p className="kicker kicker-gold">AGI Counsel Note #01</p><h2>AI 原生法务部门会是什么样？</h2><p className="note-deck">来自 Network 成员匿名讨论的三点初步观察。</p><ul><li>AI 原生，不等于在现有工作流上增加 Copilot。</li><li>知识架构可能比工具选择更重要。</li><li>当生产成本下降，人类判断力会变得更加珍贵。</li></ul><a className="note-link" href="/zh/notes/ai-native-legal-department/">阅读社群笔记 <span>→</span></a></div></div></section>
      <section className="section community-voices"><div className="section-label">05 / 来自社群</div><div className="voices-content"><p className="kicker">让集体思考被看见。</p><h2>来自 Network 内部的问题与观察。</h2><div className="quote-grid"><blockquote><p>“当法律分析变得极其充裕，人类判断究竟意味着什么？”</p><cite>一位 Network 成员提出的问题</cite></blockquote><blockquote><p>“AI 原生法务团队需要重新设计工作流，而不只是增加新工具。”</p><cite>来自一次 AGI Counsel 对话</cite></blockquote></div></div></section>
    </SectionCarousel>

    <section className="contribute section fade-in" id="contribute"><div className="contribute-card"><div><p className="kicker kicker-light">07 / 参与或加入</p><h2>我们下一步应该讨论什么？</h2><p>欢迎成员为未来的对话提出问题、实践难题或议题。请告诉我们它为什么在此刻重要，以及你是否愿意参与讨论。</p><a className="join-email" href="mailto:hello@agicounsel.org?subject=给%20AGI%20Counsel%20Network%20的讨论问题&body=你希望%20Network%20讨论什么问题？%0A%0A为什么这个问题此刻重要？%0A%0A你是否愿意参与这场讨论？%0A%0A姓名（选填）：">贡献一个问题 <span>↗</span></a></div><aside><span>会员加入</span><p>会员目前实行邀请制。如果你认同我们的使命，欢迎来信介绍自己：</p><a href="mailto:hello@agicounsel.org?subject=AGI%20Counsel%20Network%20—%20加入意向">hello@agicounsel.org</a></aside></div></section>

    <footer><a className="brand" href="#top"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>连接人工智能生态各环节法律专业人士的独立同行社群。</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>

    {showBackToTop && (
      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="返回顶部">
        ↑
      </button>
    )}
  </main>;
}
