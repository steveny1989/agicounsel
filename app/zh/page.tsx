'use client';

import { useEffect, useState } from 'react';
import SectionCarousel from '../components/SectionCarousel';

const layers = [
  ['能源', '为智能提供动力'],
  ['芯片', '支撑规模化算力'],
  ['基础设施', '建设智能时代底座'],
  ['模型', '推动能力边界'],
  ['应用', '改变工作与生活'],
];

const discussions = [
  '构建 AI 原生法务部门',
  'AI 智能体与法律责任',
  'AI 法律人的未来',
];

const principles = [
  '信任',
  '实践交流',
  '拒绝推销',
  '个人参与',
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

    <SectionCarousel id="top" title="" labels={['愿景', '我们为何存在']}>
      <section className="hero carousel-slide-hero">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="eyebrow"><span /> 独立同行社群</div>
        <h1>智能拓展可能。<br />判断塑造未来。</h1>
        <p className="hero-copy">连接 AI 生态法律专业人士的同行网络。</p>
        <div className="hero-actions"><a className="button button-light" href="#contribute">参与 <span>↗</span></a></div>
      </section>
      <section className="hero carousel-slide-hero">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="eyebrow"><span /> 我们为何存在</div>
        <h1>交流实践，磨砺判断。<br />共建未来。</h1>
        <p className="hero-copy">AI 正在改变我们的工作。</p>
        <div className="hero-actions"><a className="button button-light" href="#about">继续了解 <span>↓</span></a></div>
      </section>
    </SectionCarousel>

    <SectionCarousel id="about" title="共同基础" labels={['贯穿 AI 产业链', '我们如何交流', '社群原则']}>
      <section className="foundation-panel foundation-stack"><div className="foundation-intro"><p className="kicker">我们连接谁</p><h2>贯穿 AI<br />产业链</h2><p>连接智能经济每一层的法律专业人士。</p></div><div className="layer-cake" aria-label="人工智能生态的五个层次">{layers.map(([name, note]) => <div className="layer" key={name}><strong>{name}</strong><small>{note}</small></div>)}</div></section>
      <section className="foundation-panel foundation-work"><div className="foundation-intro"><p className="kicker">我们如何交流</p><h2>问题形成对话。<br />对话沉淀洞见。</h2></div><div className="foundation-actions"><article><span>01</span><h3>交流实践</h3></article><article><span>02</span><h3>检验假设</h3></article><article><span>03</span><h3>磨砺判断</h3></article></div></section>
      <section className="principles foundation-panel" id="principles"><div className="foundation-intro"><p className="kicker kicker-gold">我们共同遵循</p><h2>社群<br />原则</h2></div><div className="principles-simple">{principles.map((title) => <div className="principle-keyword" key={title}>{title}</div>)}</div></section>
    </SectionCarousel>

    <SectionCarousel id="community" title="社群" labels={['当前议题', '精选笔记', '来自社群']}>
      <section className="section discussions carousel-simple"><div className="discussion-content"><h2>当前议题</h2><div className="discussion-grid compact">{discussions.map((title) => <article key={title}><h3>{title}</h3></article>)}</div></div></section>
      <section className="featured-note"><div className="section featured-note-inner carousel-simple"><div className="featured-note-content"><p className="kicker kicker-gold">AGI Counsel Note #01</p><h2>AI 原生法务部门会是什么样？</h2><a className="note-link" href="/zh/notes/ai-native-legal-department/">阅读笔记 <span>→</span></a></div></div></section>
      <section className="section community-voices carousel-simple"><div className="voices-content"><div className="quote-grid single"><blockquote><p>“当法律分析变得充裕，人类判断意味着什么？”</p><cite>来自 Network</cite></blockquote></div></div></section>
    </SectionCarousel>

    <section className="contribute section fade-in" id="contribute"><div className="contribute-card"><div><h2>你的问题是什么？</h2><p>提出一个议题，或加入对话。</p><a className="join-email" href="mailto:hello@agicounsel.org?subject=给%20AGI%20Counsel%20Network%20的讨论问题&body=你希望%20Network%20讨论什么问题？%0A%0A为什么这个问题此刻重要？%0A%0A你是否愿意参与这场讨论？%0A%0A姓名（选填）：">写信给我们 <span>↗</span></a></div><aside><span>会员邀请制</span><a href="mailto:hello@agicounsel.org?subject=AGI%20Counsel%20Network%20—%20加入意向">hello@agicounsel.org</a></aside></div></section>

    <footer><a className="brand" href="#top"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>连接人工智能生态各环节法律专业人士的独立同行社群。</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>

    {showBackToTop && (
      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="返回顶部">
        ↑
      </button>
    )}
  </main>;
}
