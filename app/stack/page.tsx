import type { Metadata } from 'next';
import NetworkBriefingForm from '../components/NetworkBriefingForm';

export const metadata: Metadata = {
  title: 'Five-Layer AI Stack & Legal Engineering Glossary | AGI Counsel Network',
  description:
    'Technical reference taxonomy and defined legal-engineering primitives across the 5-layer AI stack: L5 Agentic Workflows, L4 Frontier Models, L3 Cloud/RAG & System of Record, L2 Silicon/Compute Export Controls, and L1 Gigawatt Energy.',
  keywords: [
    'Five-Layer AI Stack Legal',
    'Legal AI Engineering Glossary',
    'Legal System of Record SoR',
    'Multi-Agent Legal Orchestration',
    'Zero-Data-Retention Inference Legal',
    'BIS EAR Semiconductor Export Compliance',
    'Frontier Model Indemnification',
    'Hyperscale Data Center PPA Legal',
  ],
  alternates: {
    canonical: '/stack/',
    languages: { en: '/stack/', 'zh-CN': '/zh/stack/', 'x-default': '/stack/' },
  },
  openGraph: {
    title: 'Five-Layer AI Stack & Legal Engineering Glossary | AGI Counsel Network',
    description:
      'Complete technical taxonomy across Agentic Workflows (L5), Frontier Models (L4), Cloud/RAG & System of Record (L3), Silicon Clusters (L2), and Gigawatt Energy (L1).',
    url: 'https://agicounsel.org/stack/',
    siteName: 'AGI Counsel Network',
    type: 'website',
    images: [{ url: '/og-stack.png', width: 1200, height: 630, alt: 'AGI Counsel Network — Five-Layer AI Stack & Glossary' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Five-Layer AI Stack & Legal Engineering Glossary | AGI Counsel Network',
    description:
      'Technical reference taxonomy and defined legal-engineering primitives across the 5-layer AI stack.',
    images: ['/og-stack.png'],
  },
};

const stackDomains = [
  {
    layer: 'LAYER 05 · APPLICATIONS',
    title: 'Agentic Applications, Tool-Use & Autonomous Workflows',
    engineeringFocus: 'Multi-agent orchestration (Planner/Retriever/Verifier), MCP & tool-calling boundaries, deterministic output guardrails, and Human-in-the-Loop (HITL) escalation telemetry.',
    legalFocus: 'Downstream contractual liability allocation, autonomous transaction agency, fiduciary signature boundaries, and audit-log admissibility.',
  },
  {
    layer: 'LAYER 04 · MODELS',
    title: 'Frontier Foundation Models, Weights & Post-Training Alignment',
    engineeringFocus: 'Pre-training corpus curation, RLHF/DPO safety evaluations, red-teaming harnesses, synthetic data distillation, and open-weights vs. closed API serving.',
    legalFocus: 'Training data provenance & copyright fair use, synthetic distillation restrictions, enterprise IP indemnification caps, and model weight export/security controls.',
  },
  {
    layer: 'LAYER 03 · INFRASTRUCTURE',
    title: 'Cloud Runtime, Hybrid RAG & Legal System of Record (SoR)',
    engineeringFocus: 'Vector + knowledge-graph retrieval pipelines, Zero-Data-Retention (ZDR) inference endpoints, dynamic RBAC context partitioning, and self-learning SOP extraction.',
    legalFocus: 'Data residency & cross-border sovereignty, MNPI isolation walls, System-of-Record (SoR) vendor lock-in moats, and zero-training-leakage SLAs.',
  },
  {
    layer: 'LAYER 02 · CHIPS & COMPUTE',
    title: 'Silicon Accelerators, Foundry Supply Chains & GPU/TPU Clusters',
    engineeringFocus: 'Hyperscale GPU/TPU cluster interconnects, HBM & advanced CoWoS packaging allocation, and sovereign bare-metal cluster provisioning.',
    legalFocus: 'BIS/EAR semiconductor & compute export controls, cross-border cloud KYC/compute thresholds, foundry capacity take-or-pay agreements, and hardware supply-chain resilience.',
  },
  {
    layer: 'LAYER 01 · ENERGY & PHYSICAL GRID',
    title: 'Gigawatt Power, Hyperscale Data Centers & Grid Infrastructure',
    engineeringFocus: 'Gigawatt-scale data center campuses, liquid-cooling thermal density, Behind-the-Meter (BTM) nuclear/SMR co-location, and grid interconnection.',
    legalFocus: 'Long-term Power Purchase Agreements (PPAs), FERC/grid interconnection queue regulation, nuclear & environmental permitting, and sovereign land/water allocation.',
  },
];

const definedTerms = [
  {
    name: 'Legal System of Record (SoR)',
    code: 'L4-SOR',
    def: 'The authoritative enterprise platform capturing end-to-end matter state machines, structured contract repositories, negotiation deltas, and immutable compliance audit logs. Creates the highest enterprise switching-cost moat.',
  },
  {
    name: 'Chief of Staff Agentic Topology',
    code: 'L5-COS',
    def: 'An organizational architecture where human attorneys cease manual first-pass drafting and instead define risk rubrics, orchestrate specialized vertical agent fleets (NDA triage, M&A variance, regulatory scan), and retain non-delegable signature accountability.',
  },
  {
    name: 'Multi-Agent Task Decomposition',
    code: 'L2-MAD',
    def: 'Breaking complex legal analysis into verifiable sub-agent steps (Intake Router -> Fact Extractor -> Statutory/Playbook RAG -> Cross-Examination Verifier) to eliminate single-prompt hallucination.',
  },
  {
    name: 'Self-Learning Knowledge Flywheel',
    code: 'L3-SLF',
    def: 'An automated feedback loop that passively captures senior counsel redlines and rejections in production, distilling human legal reasoning into machine-executable SOPs and updated RAG playbooks.',
  },
  {
    name: 'Zero-Data-Retention (ZDR) Inference',
    code: 'L3-ZDR',
    def: 'Cryptographic and contractual runtime guarantees ensuring enterprise prompts, transaction documents, and model completions are never logged, cached to disk, or used to train foundation model weights.',
  },
  {
    name: 'Granular Context RBAC (MNPI Isolation)',
    code: 'SEC-RBAC',
    def: 'Dynamic role-based access control enforced at the vector-retrieval and prompt-assembly layer so Material Non-Public Information (MNPI) and M&A data rooms cannot be queried by unauthorized internal agents.',
  },
  {
    name: 'Adversarial Prompt Injection Defense',
    code: 'SEC-PID',
    def: 'Input sanitization and sandboxed dual-LLM verification preventing counterparty contracts or external filings from embedding hidden instructions that subvert internal review agents.',
  },
  {
    name: 'The 30% Enterprise Adoption Threshold',
    code: 'OPS-30P',
    def: 'The empirical organizational tipping point where at least 30% of departmental legal intake flows through a unified AI workspace, generating sufficient human-in-the-loop feedback annotations to sustain compounding accuracy.',
  },
];

const stackJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'DefinedTermSet',
      '@id': 'https://agicounsel.org/stack/#glossary',
      name: 'AGI Counsel Network — Legal AI & Full-Stack Intelligence Glossary',
      url: 'https://agicounsel.org/stack/',
      hasDefinedTerm: definedTerms.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.name,
        termCode: t.code,
        description: t.def,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agicounsel.org/' },
        { '@type': 'ListItem', position: 2, name: 'AI Stack & Glossary', item: 'https://agicounsel.org/stack/' },
      ],
    },
  ],
};

export default function StackHubPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stackJsonLd) }}
      />
      <header className="site-header site-header-scrolled">
        <a className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/stack/">AI Stack &amp; Glossary</a>
          <a href="/notes/">Notes</a>
          <a className="language-switch" href="/zh/stack/?lang=zh">中文</a>
          <a className="nav-join" href="#subscribe">Subscribe</a>
        </nav>
      </header>

      <section className="notes-hero">
        <div className="eyebrow">
          <span /> Full-Stack Technical Taxonomy · L5 to L1
        </div>
        <h1>The Five-Layer AI Stack &amp; Legal Engineering Glossary</h1>
        <p>
          A structured reference index of the engineering primitives, architectural moats, and regulatory boundaries across every layer of the intelligence economy.
        </p>
      </section>

      <section className="section" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="section-label">L5 → L1 Stack</div>
        <div>
          <p className="kicker">Compute-to-Application Value Chain</p>
          <h2>Five Layers of the Intelligence Ecosystem</h2>
          <div className="discussion-grid">
            {stackDomains.map((d) => (
              <article key={d.layer} className="tech-track-card">
                <div className="tech-track-meta">{d.layer}</div>
                <h3>{d.title}</h3>
                <p>
                  <strong>Systems &amp; Engineering Primitives:</strong> {d.engineeringFocus}
                </p>
                <p>
                  <strong>Legal, Commercial &amp; Governance Focus:</strong> {d.legalFocus}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--gray)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="section-label">Defined Terms</div>
        <div>
          <p className="kicker">Schema.org DefinedTermSet · Reference Vocabulary</p>
          <h2>Core Legal AI Engineering Primitives</h2>
          <div className="study-glossary-grid" style={{ marginTop: '32px' }}>
            {definedTerms.map((t) => (
              <div key={t.code} className="study-glossary-card">
                <div className="study-glossary-top">
                  <strong>{t.name}</strong>
                  <span className="arch-badge">{t.code}</span>
                </div>
                <p>{t.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contribute section" id="subscribe">
        <div className="section-label">Peer Briefings</div>
        <div>
          <NetworkBriefingForm locale="en" />
        </div>
      </section>

      <footer>
        <a className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <p>Independent peer community for General Counsel and legal systems architects across the five-layer AI ecosystem.</p>
        <div>
          <a href="/notes/ai-native-legal-department/">Note #01 Study</a>
          <a href="/podcast.xml">Podcast RSS</a>
          <a href="/llms-full.txt">LLMs Full Index</a>
          <a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a>
          <span>© 2026 AGI Counsel Network</span>
        </div>
      </footer>
    </main>
  );
}
