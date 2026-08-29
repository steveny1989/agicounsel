'use client';

import { useEffect, useState } from 'react';
import SectionCarousel from './components/SectionCarousel';

const layers = [
  ['Energy', 'Powering intelligence'],
  ['Chips', 'Computing at scale'],
  ['Infrastructure', 'Building the rails'],
  ['Models', 'Advancing capability'],
  ['Applications', 'Changing how we work'],
];

const discussions = [
  'Building an AI-Native Legal Department',
  'AI Agents & Legal Responsibility',
  'The Future of AI Counsel',
];

const principles = [
  'Trust',
  'Practical exchange',
  'No solicitation',
  'Personal capacity',
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
      <nav aria-label="Primary navigation"><a href="#about">About</a><a href="#community">Community</a><a href="/notes/">Notes</a><a className="language-switch" href="/zh/">中文</a><a className="nav-join" href="#contribute">Contribute</a></nav>
    </header>

    <SectionCarousel id="top" title="" labels={['Vision', 'Why we exist']}>
      <section className="hero carousel-slide-hero">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="eyebrow"><span /> Independent peer community</div>
        <h1>Intelligence expands possibility.<br />Judgment shapes what comes next.</h1>
        <p className="hero-copy">A peer network for legal professionals across the AI ecosystem.</p>
        <div className="hero-actions"><a className="button button-light" href="#contribute">Contribute <span>↗</span></a></div>
      </section>
      <section className="hero carousel-slide-hero">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="eyebrow"><span /> Why we exist</div>
        <h1>Compare notes. Sharpen judgment.<br />Build what's next.</h1>
        <p className="hero-copy">AI is changing our work.</p>
        <div className="hero-actions"><a className="button button-light" href="#about">Explore <span>↓</span></a></div>
      </section>
    </SectionCarousel>

    <SectionCarousel id="about" title="Foundation" labels={['Across the AI stack', 'How we work', 'Community principles']}>
      <section className="foundation-panel foundation-stack"><div className="foundation-intro"><p className="kicker">Who we bring together</p><h2>Across the<br />AI Stack</h2><p>Legal professionals from every layer of the intelligence economy.</p></div><div className="layer-cake" aria-label="The five layers of the AI ecosystem">{layers.map(([name, note]) => <div className="layer" key={name}><strong>{name}</strong><small>{note}</small></div>)}</div></section>
      <section className="foundation-panel foundation-work"><div className="foundation-intro"><p className="kicker">How we work</p><h2>Questions become conversations. Conversations become shared insight.</h2></div><div className="foundation-actions"><article><span>01</span><h3>Compare practice</h3></article><article><span>02</span><h3>Test assumptions</h3></article><article><span>03</span><h3>Sharpen judgment</h3></article></div></section>
      <section className="principles foundation-panel" id="principles"><div className="foundation-intro"><p className="kicker kicker-gold">What guides us</p><h2>Community<br />Principles</h2></div><div className="principles-simple">{principles.map((title) => <div className="principle-keyword" key={title}>{title}</div>)}</div></section>
    </SectionCarousel>

    <SectionCarousel id="community" title="Community" labels={["Current questions", 'Featured note', 'From the community']}>
      <section className="section discussions carousel-simple"><div className="discussion-content"><h2>Current Questions</h2><div className="discussion-grid compact">{discussions.map((title) => <article key={title}><h3>{title}</h3></article>)}</div></div></section>
      <section className="featured-note"><div className="section featured-note-inner carousel-simple"><div className="featured-note-content"><p className="kicker kicker-gold">AGI Counsel Note #01</p><h2>What Would an AI-Native Legal Department Look Like?</h2><a className="note-link" href="/notes/ai-native-legal-department/">Read Note <span>→</span></a></div></div></section>
      <section className="section community-voices carousel-simple"><div className="voices-content"><div className="quote-grid single"><blockquote><p>"What does human judgment mean when legal analysis becomes abundant?"</p><cite>From the Network</cite></blockquote></div></div></section>
    </SectionCarousel>

    <section className="contribute section fade-in" id="contribute"><div className="contribute-card"><div><h2>What's your question?</h2><p>Suggest a topic or join the conversation.</p><a className="join-email" href="mailto:hello@agicounsel.org?subject=A%20question%20for%20AGI%20Counsel%20Network&body=What%20question%20should%20the%20Network%20discuss%3F%0A%0AWhy%20does%20it%20matter%20now%3F%0A%0AWould%20you%20be%20interested%20in%20joining%20the%20conversation%3F%0A%0AName%20(optional)%3A">Email us <span>↗</span></a></div><aside><span>Invitation-based membership</span><a href="mailto:hello@agicounsel.org?subject=AGI%20Counsel%20Network%20—%20Membership%20interest">hello@agicounsel.org</a></aside></div></section>

    <footer><a className="brand" href="#top"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>Independent peer community for legal professionals across the AI ecosystem.</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>

    {showBackToTop && (
      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Back to top">
        ↑
      </button>
    )}
  </main>;
}
