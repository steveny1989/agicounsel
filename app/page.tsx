'use client';

import { useEffect, useState } from 'react';
import SectionCarousel from './components/SectionCarousel';

const layers = [
  [
    'L5 · Applications',
    'Agentic Workflows & Orchestration',
    'Multi-agent fleets · MCP & tool-use boundaries · HITL escalation telemetry · Downstream liability allocation',
  ],
  [
    'L4 · Models',
    'Frontier Weights & Alignment',
    'Pre-training data provenance · RLHF/DPO safety evals · Synthetic distillation licensing · Open-weight vs. API indemnification',
  ],
  [
    'L3 · Infrastructure',
    'Cloud Runtime, RAG & Context',
    'Vector & knowledge-graph pipelines · Zero-data-retention (ZDR) inference · Sovereign cloud routing · System-of-Record (SoR) lock-in',
  ],
  [
    'L2 · Chips',
    'Silicon & Compute Clusters',
    'GPU/TPU cluster procurement · Advanced foundry & HBM supply chains · BIS/EAR semiconductor export controls · Sovereign colocation',
  ],
  [
    'L1 · Energy',
    'Gigawatt Power & Physical Grid',
    'Hyperscale data center PPAs · Behind-the-meter (BTM) nuclear & SMRs · Grid interconnection queues · Environmental permitting',
  ],
];

const discussions = [
  {
    code: 'TRACK 01 · SYSTEMS ARCHITECTURE & SoR',
    title: 'Architecting an AI-Native Legal Department',
    summary:
      'Moving beyond Layer-1 Copilot wrappers to Layer-2 workflow re-engineering, Layer-3 self-learning proprietary context (RAG + institutional precedent), and Layer-4 System-of-Record (SoR) durability.',
    tags: ['5-Layer Value Stack', 'System of Record', 'Knowledge Flywheel', 'Legal Ops Telemetry'],
    href: '/notes/ai-native-legal-department/',
  },
  {
    code: 'TRACK 02 · AGENTIC GOVERNANCE & ATTRIBUTION',
    title: 'Multi-Agent Fleets, Deterministic Guardrails & Legal Liability',
    summary:
      'Defining human-in-the-loop (HITL) authority boundaries, tool-calling audit trails, red-teaming evaluation harnesses, and contractual risk allocation when autonomous agents execute enterprise workflows.',
    tags: ['Chief of Staff Model', 'HITL Governance', 'Agentic Auditability', 'Liability Allocation'],
    href: '/notes/ai-native-legal-department/',
  },
  {
    code: 'TRACK 03 · FULL-STACK COMPUTE & MODEL LAW',
    title: 'Cross-Stack Counsel: From Frontier Model Weights to Gigawatt Compute',
    summary:
      'Structuring licensing, IP indemnification, cross-border data sovereignty, BIS semiconductor export compliance, and hyperscale power procurement across the physical-to-digital intelligence stack.',
    tags: ['Frontier Model IP', 'ZDR & Sovereignty', 'BIS/EAR Export Controls', 'Hyperscale Compute'],
    href: '/notes/',
  },
];

const principles = [
  ['Trust & Chatham House Rule', 'Candid technical and operational exchange without attribution'],
  ['Production-Grade Exchange', 'Real architectures, evaluation metrics, and deployment failure modes'],
  ['Full-Stack Perspective', 'Connecting silicon, energy, cloud runtime, model labs, and enterprise deployments'],
  ['Personal Capacity', 'Independent peer judgment decoupled from institutional PR'],
];

const technicalFaqs = [
  {
    q: 'What is the AGI Counsel Network?',
    a: 'AGI Counsel Network is an independent peer community for General Counsel, frontier AI lab attorneys, and legal systems architects operating across all five layers of the AI ecosystem: Agentic Applications (L5), Frontier Foundation Models (L4), Cloud & RAG Infrastructure (L3), Silicon & Compute Clusters (L2), and Gigawatt Energy Infrastructure (L1).',
  },
  {
    q: 'What makes an enterprise legal department truly AI-native?',
    a: 'As codified in AGI Counsel Note #01, an AI-native legal department moves beyond Layer-1 LLM chat wrappers and generic Copilot plug-ins. It re-engineers end-to-end intake and triage workflows (Layer 2), structures institutional precedent into a self-learning proprietary knowledge architecture (Layer 3), anchors execution in a durable System of Record (Layer 4), and positions human lawyers as Chief of Staff orchestrating domain-specific agent fleets under strict Human-in-the-Loop governance (Layer 5).',
  },
  {
    q: 'Why do generic Legal Copilot plug-ins fail in complex enterprise workflows?',
    a: 'Retrofitting a generic conversational assistant onto a legacy linear approval chain creates a productivity paradox: while initial drafting speed may increase by 20%, unverified and context-blind outputs flood senior counsel with higher review friction and compliance risk. Sustainable legal AI requires deterministic evaluation harnesses, modular sub-task decomposition, and human-validated feedback loops.',
  },
  {
    q: 'How does the Chief of Staff model redefine the role of in-house counsel?',
    a: 'When legal analysis shifts from a scarce artisanal craft to an abundant computational utility, senior counsel transition from manual first-pass drafters to systems architects and Chiefs of Staff. Lawyers define risk rubrics, curate golden evaluation datasets, audit multi-agent execution traces, and retain ultimate signature authority over high-stakes commercial and regulatory judgment.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: technicalFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number>(0);

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

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="AGI Counsel Network home">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">AI Stack</a>
          <a href="#architecture">Architecture</a>
          <a href="#community">Research</a>
          <a href="/notes/">Notes</a>
          <a className="language-switch" href="/zh/?lang=zh">中文</a>
          <a className="nav-join" href="#contribute">Contribute</a>
        </nav>
      </header>

      <SectionCarousel id="top" title="" labels={['Vision & Scope', 'Systems Thesis']}>
        <section className="hero carousel-slide-hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="eyebrow">
            <span /> Independent Peer Network · L1–L5 AI Ecosystem
          </div>
          <h1>
            Intelligence expands possibility.
            <br />
            Judgment shapes what comes next.
          </h1>
          <p className="hero-copy">
            A peer network for General Counsel, frontier AI lab attorneys, and legal systems architects across the five layers of the intelligence stack—from agentic workflows and foundation models to cloud RAG infrastructure, silicon clusters, and gigawatt power.
          </p>
          <div className="hero-tech-pills" aria-label="Core technical domains">
            <span>L5 · Multi-Agent Governance</span>
            <span>L4 · Frontier Model Alignment</span>
            <span>L3 · Sovereign RAG &amp; SoR</span>
            <span>L2 · Compute &amp; BIS Export Controls</span>
            <span>L1 · Hyperscale Power PPAs</span>
          </div>
          <div className="hero-actions">
            <a className="button button-light" href="/notes/ai-native-legal-department/">
              Read Note #01 <span>→</span>
            </a>
            <a className="text-link" href="#architecture">
              Explore 5-Layer Architecture <span>↓</span>
            </a>
          </div>
        </section>
        <section className="hero carousel-slide-hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="eyebrow">
            <span /> Systems Thesis · Beyond Wrapper Tools
          </div>
          <h2 className="hero-title">
            Compare architecture. Benchmark workflows.
            <br />
            Engineer what&apos;s next.
          </h2>
          <p className="hero-copy">
            When legal reasoning shifts from scarce artisanal labor to abundant compute, legal departments must evolve from manual document reviewers into Systems-of-Record and Chiefs of Staff to autonomous agent fleets.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#about">
              Inspect the Stack <span>↓</span>
            </a>
          </div>
        </section>
      </SectionCarousel>

      <SectionCarousel
        id="about"
        title=""
        labels={['Full-Stack AI Taxonomy', 'Systems Protocol', 'Operating Principles']}
      >
        <section className="foundation-panel foundation-stack">
          <div className="foundation-intro">
            <p className="kicker">Who We Bring Together · L5 to L1</p>
            <h2>
              Across the Five-Layer
              <br />
              Intelligence Stack
            </h2>
            <p>
              Legal executives and technical counsel operating at every layer of the compute-to-application value chain. Select any layer to inspect its core legal-engineering primitives.
            </p>
          </div>
          <div className="layer-cake" role="list" aria-label="The five layers of the AI ecosystem">
            {layers.map(([name, subtitle, specs], idx) => (
              <div
                className={`layer ${activeLayer === idx ? 'layer-selected' : ''}`}
                role="listitem"
                tabIndex={0}
                key={name}
                onMouseEnter={() => setActiveLayer(idx)}
                onFocus={() => setActiveLayer(idx)}
                onClick={() => setActiveLayer(idx)}
              >
                <div className="layer-primary">
                  <strong>{name}</strong>
                  <span className="layer-sub">{subtitle}</span>
                </div>
                <small>{specs}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="foundation-panel foundation-work">
          <div className="foundation-intro">
            <p className="kicker">How We Operate · Engineering Method</p>
            <h2>
              Production problems become peer benchmarks. Benchmarks become reference architecture.
            </h2>
          </div>
          <div className="foundation-actions">
            <article>
              <span>01 · TELEMETRY</span>
              <h3>Benchmark Deployments</h3>
              <p className="foundation-action-desc">
                Compare real-world RAG architectures, evaluation harnesses, hallucination guardrails, and vendor switching costs.
              </p>
            </article>
            <article>
              <span>02 · STRESS-TEST</span>
              <h3>Audit Failure Modes</h3>
              <p className="foundation-action-desc">
                Examine where generic Copilot wrappers fail and how multi-agent workflow decomposition solves complex legal review.
              </p>
            </article>
            <article>
              <span>03 · GOVERNANCE</span>
              <h3>Codify HITL Standards</h3>
              <p className="foundation-action-desc">
                Establish human-in-the-loop accountability protocols, System-of-Record schemas, and cross-jurisdictional compliance.
              </p>
            </article>
          </div>
        </section>

        <section className="principles foundation-panel" id="principles">
          <div className="principles-statement">
            <p className="kicker kicker-gold">Operating Protocol</p>
            <h2>
              Chatham House Rule trust enables candid architectural exchange.
              <br />
              Production telemetry outweighs vendor hype.
              <br />
              Participation in an independent, personal capacity.
            </h2>
          </div>
          <div className="principles-strip">
            {principles.map(([title, desc], index) => (
              <div className="principle-item" key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <small className="principle-desc">{desc}</small>
              </div>
            ))}
          </div>
        </section>
      </SectionCarousel>

      <section className="tech-architecture-section fade-in" id="architecture" aria-labelledby="arch-heading">
        <div className="tech-arch-container">
          <div className="tech-arch-header">
            <div>
              <p className="kicker kicker-gold">Reference Architecture · AGI Counsel Note #01</p>
              <h2 id="arch-heading">The Five-Layer Legal AI Engineering Stack</h2>
            </div>
            <p className="tech-arch-lead">
              Enterprise legal transformation fails when organizations mistake Layer-1 LLM chat wrappers for an operating system. High-performing AI-native legal departments engineer their stack from the System of Record and workflow layer upward.
            </p>
          </div>

          <div className="arch-matrix" role="table" aria-label="Five-Layer Legal AI Value Stack">
            <div className="arch-row arch-row-head" role="row">
              <span role="columnheader">Stack Layer</span>
              <span role="columnheader">Architectural Role</span>
              <span role="columnheader">Technical &amp; Legal Primitives</span>
              <span role="columnheader">Defensive Moat</span>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 05</span>
                <strong>Human-in-the-Loop (HITL) Governance</strong>
              </div>
              <div className="arch-cell-role" role="cell">Lawyer as Chief of Staff to Agent Fleets</div>
              <div className="arch-cell-specs" role="cell">
                Risk-rubric definition, multi-agent orchestration, red-line exception handling, signature accountability, and audit trace verification.
              </div>
              <div className="arch-cell-moat" role="cell">Supreme Fiduciary &amp; Liability Anchor</div>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 04</span>
                <strong>System of Record (SoR)</strong>
              </div>
              <div className="arch-cell-role" role="cell">Durable Legal Operating Bedrock</div>
              <div className="arch-cell-specs" role="cell">
                End-to-end matter lifecycle state machine, structured contract repository, execution telemetry, and immutable compliance audit logs.
              </div>
              <div className="arch-cell-moat" role="cell">Highest Enterprise Switching Cost</div>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 03</span>
              <strong>Proprietary Context &amp; Memory</strong>
              </div>
              <div className="arch-cell-role" role="cell">Self-Learning Knowledge Flywheel</div>
              <div className="arch-cell-specs" role="cell">
                Hybrid vector + knowledge-graph RAG, historical negotiation playbooks, automated SOP extraction from senior counsel edits (RLHF/feedback loops).
              </div>
              <div className="arch-cell-moat" role="cell">Compounding Institutional Intelligence</div>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 02</span>
                <strong>Workflow &amp; Agentic Orchestration</strong>
              </div>
              <div className="arch-cell-role" role="cell">End-to-End Business Integration</div>
              <div className="arch-cell-specs" role="cell">
                Automated intake triage, multi-step task decomposition (Planner → Retriever →Verifier agents), ERP/CRM/CLM webhook integration.
              </div>
              <div className="arch-cell-moat" role="cell">Operational Velocity &amp; Adoption</div>
            </div>
            <div className="arch-row arch-row-muted" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge arch-badge-muted">LAYER 01</span>
                <strong>Commoditized Model APIs</strong>
              </div>
              <div className="arch-cell-role" role="cell">Raw Inference &amp; Token Generation</div>
              <div className="arch-cell-specs" role="cell">
                Zero-shot summarization, translation, and generic prompt wrappers. Vulnerable to hallucination and context drift without L2–L5 scaffolding.
              </div>
              <div className="arch-cell-moat" role="cell">Zero Moat (Rapidly Commoditized)</div>
            </div>
          </div>

          <div className="arch-cta-bar">
            <div>
              <strong>Deep-Dive Research Study:</strong> Read the complete 5-part architectural breakdown from our September 2026 closed-door roundtable.
            </div>
            <a className="button button-light" href="/notes/ai-native-legal-department/">
              Read Note #01 Study <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <SectionCarousel
        id="community"
        title=""
        labels={['Research Tracks', 'Featured Study #01', 'Peer Perspectives']}
      >
        <section className="section discussions carousel-simple">
          <div className="discussion-content">
            <p className="kicker">Active Working Groups &amp; Inquiries</p>
            <h2>Current Technical &amp; Governance Tracks</h2>
            <div className="discussion-grid">
              {discussions.map((item) => (
                <article className="tech-track-card" key={item.title}>
                  <div className="tech-track-meta">{item.code}</div>
                  <h3>
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <p>{item.summary}</p>
                  <div className="tech-tag-row">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-note">
          <div className="section featured-note-inner carousel-simple">
            <div className="featured-note-content">
              <p className="kicker kicker-gold">AGI Counsel Note #01 · Flagship Technical Study</p>
              <h2>What Would an AI-Native Legal Department Look Like?</h2>
              <p className="note-deck">
                Synthesizing a 100-day organizational simulation and closed-door roundtable with legal leaders from frontier model labs, semiconductor foundries, and global enterprises.
              </p>
              <ul>
                <li>
                  <strong>Five-Layer Legal AI Stack:</strong> Why thin Layer-1 LLM wrappers fail and how Layer-4 Systems of Record capture durable value.
                </li>
                <li>
                  <strong>Multi-Agent Decomposition:</strong> Breaking complex cross-border regulatory and contract analysis into verifiable agentic pipelines.
                </li>
                <li>
                  <strong>The 30% Adoption Threshold:</strong> Organizational engineering, telemetry benchmarks, and self-learning knowledge flywheels.
                </li>
              </ul>
              <a className="note-link" href="/notes/ai-native-legal-department/">
                Read Full Technical Note <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section community-voices carousel-simple">
          <div className="voices-content">
            <div className="quote-grid single">
              <blockquote>
                <p>
                  &ldquo;When legal analysis becomes an abundant computational utility, the lawyer&rsquo;s scarce value shifts to systems architecture, risk calibration, and accountable human judgment.&rdquo;
                </p>
                <cite>From the AGI Counsel Network · 2026 Roundtable</cite>
              </blockquote>
            </div>
          </div>
        </section>
      </SectionCarousel>

      <section className="faq-section section fade-in" id="faq" aria-labelledby="faq-heading">
        <div className="section-label">Knowledge Index</div>
        <div className="faq-content">
          <p className="kicker">Frequently Searched Questions</p>
          <h2 id="faq-heading">Legal AI Architecture &amp; Network FAQ</h2>
          <div className="faq-list">
            {technicalFaqs.map((item, idx) => (
              <details className="faq-item" key={item.q} open={idx === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contribute section fade-in" id="contribute">
        <div className="contribute-card">
          <div>
            <h2>Bring an architectural question or deployment benchmark.</h2>
            <p>
              We convene in-house counsel, frontier lab legal architects, and legal systems engineers under the Chatham House Rule. Share a technical question, an evaluation framework, or request an invitation.
            </p>
            <a
              className="join-email"
              href="mailto:hello@agicounsel.org?subject=Starting%20a%20conversation%20with%20AGI%20Counsel%20Network&body=What%20architectural%20question%2C%20deployment%20practice%2C%20or%20perspective%20would%20you%20like%20to%20share%3F%0A%0AWhich%20layer%20of%20the%20AI%20stack%20do%20you%20work%20in%3F%0A%0AName%20%26%20Role%20(optional)%3A"
            >
              Start a conversation <span>↗</span>
            </a>
          </div>
          <aside>
            <span>Invitation-Based Peer Network</span>
            <a href="mailto:hello@agicounsel.org?subject=AGI%20Counsel%20Network%20—%20Membership%20interest">
              hello@agicounsel.org
            </a>
          </aside>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <p>
          Independent peer network for General Counsel and legal systems architects across the five-layer AI ecosystem (Applications, Models, Cloud/RAG Infrastructure, Chips, Energy).
        </p>
        <div>
          <a href="/notes/ai-native-legal-department/">Note #01: AI-Native Legal Dept</a>
          <a href="/feed.xml">RSS Feed</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a>
          <span>© 2026 AGI Counsel Network</span>
        </div>
      </footer>

      {showBackToTop && (
        <button
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </main>
  );
}
