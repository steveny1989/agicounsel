'use client';

import { useEffect, useState } from 'react';
import SectionCarousel from './components/SectionCarousel';

const layers = [
  ['01', 'Energy', 'Powering intelligence'], ['02', 'Chips', 'Computing at scale'],
  ['03', 'Infrastructure', 'Building the rails'], ['04', 'Models', 'Advancing capability'],
  ['05', 'Applications', 'Changing how we work'],
];

const discussions = [
  ['01', 'Building an AI-Native Legal Department', 'How should legal teams rethink workflows, talent, knowledge and governance when AI becomes part of the operating model?'],
  ['02', 'AI Agents & Legal Responsibility', 'What changes when AI moves from answering questions to taking actions?'],
  ['03', 'The Future of AI Counsel', 'What capabilities will matter most for the next generation of legal professionals?'],
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
      <nav aria-label="Primary navigation"><a href="#about">About</a><a href="#community">Community</a><a href="/notes/">Notes</a><a className="language-switch" href="/zh/">中文</a><a className="nav-join" href="#contribute">Contribute</a></nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="eyebrow"><span /> Independent peer community</div>
      <h1>Legal judgment for<br />the age of intelligence.</h1>
      <p className="hero-copy">A trusted peer community for legal professionals across the AI ecosystem.</p>
      <div className="hero-actions"><a className="button button-light" href="#community">Enter the conversation <span>↗</span></a><a className="text-link" href="#about">Discover our purpose <span>↓</span></a></div>
      <div className="hero-footer"><span>Across disciplines</span><span>Across the AI stack</span><span>Built on trust</span></div>
    </section>

    <SectionCarousel id="about" eyebrow="The Network" title="What holds us together" labels={['Why we exist', 'Across the AI stack', 'Community principles']}>
      <section className="intro section"><div className="section-label">01 / Why we exist</div><div className="intro-content"><p className="kicker">The work is changing.</p><h2>AI is reshaping not only law and business, but the role of legal professionals themselves.</h2><div className="intro-columns"><p>Some of the most important questions do not arrive with established playbooks. They emerge across industries, technologies, jurisdictions, and institutions.</p><p>AGI Counsel Network brings together experienced legal professionals to compare notes, sharpen judgment, and navigate what comes next—together.</p></div></div></section>
      <section className="stack-section"><div className="section stack-heading"><div className="section-label">02 / Across the AI stack</div><div><p className="kicker">One ecosystem. Shared questions.</p><h2>Connecting counsel across every layer of AI.</h2></div></div><div className="layer-cake" aria-label="The five layers of the AI ecosystem">{layers.map(([number, name, note]) => <div className="layer" key={name}><span>{number}</span><strong>{name}</strong><small>{note}</small></div>)}</div></section>
      <section className="principles" id="principles"><div className="section principles-inner"><div className="section-label section-label-gold">06 / Community principles</div><div className="principles-content"><p className="kicker kicker-gold">How we show up.</p><h2>A serious community begins with a clear compact.</h2><div className="principles-list">{principles.map(([title, body], index) => <div className="principle" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div></div></div></section>
    </SectionCarousel>

    <SectionCarousel id="community" eyebrow="Community in motion" title="Questions become shared insight" labels={["What we’re discussing", 'Featured note', 'From the community']}>
      <section className="section discussions"><div className="section-label">03 / What we’re discussing</div><div className="discussion-content"><p className="kicker">Live questions, not finished answers.</p><h2>The questions moving through our community now.</h2><div className="discussion-grid">{discussions.map(([number, title, body]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="featured-note"><div className="section featured-note-inner"><div className="section-label section-label-gold">04 / Featured community note</div><div className="featured-note-content"><p className="kicker kicker-gold">AGI Counsel Note #01</p><h2>What Would an AI-Native Legal Department Look Like?</h2><p className="note-deck">Three emerging ideas from an anonymized conversation among Network members.</p><ul><li>AI-native is not the same as adding copilots to existing workflows.</li><li>Knowledge architecture may matter more than tool selection.</li><li>Human judgment becomes more valuable as production costs fall.</li></ul><a className="note-link" href="/notes/ai-native-legal-department/">Read the Community Note <span>→</span></a></div></div></section>
      <section className="section community-voices"><div className="section-label">05 / From the community</div><div className="voices-content"><p className="kicker">Collective thinking, made visible.</p><h2>Questions and observations from inside the Network.</h2><div className="quote-grid"><blockquote><p>“What does human judgment mean when legal analysis becomes abundant?”</p><cite>Question raised by a Network member</cite></blockquote><blockquote><p>“AI-native legal teams may need to redesign workflows, not simply add new tools.”</p><cite>From an AGI Counsel Conversation</cite></blockquote></div></div></section>
    </SectionCarousel>

    <section className="contribute section fade-in" id="contribute"><div className="contribute-card"><div><p className="kicker kicker-light">07 / Contribute or join</p><h2>What should we discuss next?</h2><p>Members are encouraged to suggest a question, practical issue, or topic for a future conversation. Tell us why it matters now—and whether you would like to take part.</p><a className="join-email" href="mailto:hello@agicounsel.org?subject=A%20question%20for%20AGI%20Counsel%20Network&body=What%20question%20should%20the%20Network%20discuss%3F%0A%0AWhy%20does%20it%20matter%20now%3F%0A%0AWould%20you%20be%20interested%20in%20joining%20the%20conversation%3F%0A%0AName%20(optional)%3A">Contribute a question <span>↗</span></a></div><aside><span>Membership</span><p>Membership is currently invitation-based. If our purpose resonates, introduce yourself at:</p><a href="mailto:hello@agicounsel.org?subject=AGI%20Counsel%20Network%20—%20Membership%20interest">hello@agicounsel.org</a></aside></div></section>

    <footer><a className="brand" href="#top"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>Independent peer community for legal professionals across the AI ecosystem.</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>

    {showBackToTop && (
      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Back to top">
        ↑
      </button>
    )}
  </main>;
}
