'use client';

import { useEffect, useState } from 'react';

const layers = [
  ['01', 'Energy', 'Powering intelligence'], ['02', 'Chips', 'Computing at scale'],
  ['03', 'Infrastructure', 'Building the rails'], ['04', 'Models', 'Advancing capability'],
  ['05', 'Applications', 'Changing how we work'],
];

const work = [
  ['01', 'Conversations', 'Candid, off-the-record dialogue on the legal questions shaping the AI ecosystem.'],
  ['02', 'Benchmark & Practice Sharing', 'Practical exchange on emerging standards, operating models, and the craft of AI counsel.'],
  ['03', 'Small Gatherings', 'Thoughtful, invitation-led sessions designed for depth rather than scale.'],
  ['04', 'Future of AI Counsel', 'A shared inquiry into how AI is changing legal judgment, institutions, and our profession.'],
];

const principles = [
  ['Trust', 'We create the conditions for honest exchange among peers.'],
  ['Practical exchange', 'We favor lived experience and useful insight over abstraction.'],
  ['No commercial solicitation', 'The community is a place for learning, not lead generation.'],
  ['Personal participation', 'Members participate in their own capacity, without corporate endorsement.'],
];

export default function Home() {
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

  return <main>
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="AGI Counsel Network home"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a>
      <nav aria-label="Primary navigation"><a href="#about">About</a><a href="#work">What we do</a><a href="#principles">Principles</a><a className="language-switch" href="/zh/">中文</a><a className="nav-join" href="#join">Join the network</a></nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="eyebrow"><span /> Independent peer community</div>
      <h1>Legal judgment for<br />the age of intelligence.</h1>
      <p className="hero-copy">A trusted peer community for legal professionals across the AI ecosystem.</p>
      <div className="hero-actions"><a className="button button-light" href="#join">Join the network <span>↗</span></a><a className="text-link" href="#about">Discover our purpose <span>↓</span></a></div>
      <div className="hero-footer"><span>Across disciplines</span><span>Across the AI stack</span><span>Built on trust</span></div>
    </section>

    <section className="intro section fade-in" id="about">
      <div className="section-label">01 / Why we exist</div>
      <div className="intro-content"><p className="kicker">The work is changing.</p><h2>AI is reshaping not only law and business, but the role of legal professionals themselves.</h2>
        <div className="intro-columns"><p>Some of the most important questions do not arrive with established playbooks. They emerge across industries, technologies, jurisdictions, and institutions.</p><p>AGI Counsel Network brings together experienced legal professionals to compare notes, sharpen judgment, and navigate what comes next—together.</p></div>
      </div>
    </section>

    <section className="stack-section fade-in">
      <div className="section stack-heading"><div className="section-label">02 / Across the AI stack</div><div><p className="kicker">One ecosystem. Shared questions.</p><h2>Connecting counsel across every layer of AI.</h2></div></div>
      <div className="layer-cake" aria-label="The five layers of the AI ecosystem">{layers.map(([number, name, note]) => <div className="layer" key={name}><span>{number}</span><strong>{name}</strong><small>{note}</small></div>)}</div>
    </section>

    <section className="section work fade-in" id="work">
      <div className="section-label">03 / What we do</div>
      <div className="work-content"><p className="kicker">Depth over noise.</p><h2>Designed for the conversations that rarely fit on a conference stage.</h2>
        <div className="work-grid">{work.map(([number, title, body]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>

    <section className="principles fade-in" id="principles"><div className="section principles-inner">
      <div className="section-label section-label-gold">04 / Community principles</div>
      <div className="principles-content"><p className="kicker kicker-gold">How we show up.</p><h2>A serious community begins with a clear compact.</h2>
        <div className="principles-list">{principles.map(([title, body], index) => <div className="principle" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
      </div>
    </div></section>

    <section className="join section fade-in" id="join"><div className="join-card"><p className="kicker kicker-light">An intentionally small network.</p><h2>Bring your judgment.<br />Leave with better questions.</h2><p>Membership is currently invitation-based. If our purpose resonates, email us directly:</p><a className="join-email" href="mailto:hello@agicounsel.org?subject=AGI%20Counsel%20Network%20—%20Membership%20interest">hello@agicounsel.org <span>↗</span></a></div></section>

    <footer><a className="brand" href="#top"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>Independent peer community for legal professionals across the AI ecosystem.</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>

    {showBackToTop && (
      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Back to top">
        ↑
      </button>
    )}
  </main>;
}