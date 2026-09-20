import type { Metadata } from 'next';
import RoomNotesCarousel from '../components/RoomNotesCarousel';
import NetworkBriefingForm from '../components/NetworkBriefingForm';

const roomNotes = [
  'AI transformation is also organizational transformation.',
  'The business must be part of the co-creation process.',
  'AI is a business problem first, and a technology problem second. Build for real value—not technical spectacle.',
  'A truly valuable system must be able to learn.',
  'The lawyer of the future will be a Chief of Staff orchestrating fleets of agents.',
];

export const metadata: Metadata = {
  title: 'Community Notes & Studies | AGI Counsel Network',
  description:
    'Distillations of collective thinking, workflow architecture, and governance studies from AGI Counsel Network conversations.',
  keywords: [
    'AGI Counsel Notes',
    'AI-Native Legal Department Study',
    'Legal Judgment vs Legal Production',
    'Multi-Agent Legal Orchestration',
    'Human-in-the-Loop Legal Governance',
    'Compounding Institutional Memory',
  ],
  alternates: { canonical: '/notes/', languages: { en: '/notes/', 'zh-CN': '/zh/notes/', 'x-default': '/notes/' } },
};

const notesCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://agicounsel.org/notes/#collection',
      url: 'https://agicounsel.org/notes/',
      name: 'Community Notes & Studies | AGI Counsel Network',
      description:
        'Distillations of collective thinking, workflow architecture, and governance studies from AGI Counsel Network conversations.',
      isPartOf: { '@id': 'https://agicounsel.org/#website' },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            url: 'https://agicounsel.org/notes/ai-native-legal-department/',
            name: 'What Would an AI-Native Legal Department Look Like? (AGI Counsel Note #01)',
          },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agicounsel.org/' },
        { '@type': 'ListItem', position: 2, name: 'Notes', item: 'https://agicounsel.org/notes/' },
      ],
    },
  ],
};

export default function NotesArchive() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(notesCollectionJsonLd) }}
      />
      <header className="site-header site-header-scrolled">
        <a className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#community">Community</a>
          <a className="language-switch" href="/zh/notes/?lang=zh">
            中文
          </a>
          <a className="nav-join" href="#subscribe-notes">
            Subscribe
          </a>
        </nav>
      </header>
      <section className="notes-hero">
        <div className="eyebrow">
          <span /> Collective thinking
        </div>
        <h1>Community Notes</h1>
        <p>Short distillations of questions, frameworks, and insights emerging from Network conversations.</p>
      </section>
      <RoomNotesCarousel notes={roomNotes} locale="en" />
      <section className="notes-list section">
        <div className="section-label">Published notes</div>
        <div>
          <a className="note-index-card" href="/notes/ai-native-legal-department/">
            <span>Note #01 · September 2026 · Audio Briefing &amp; Bilingual Study</span>
            <h2>What Would an AI-Native Legal Department Look Like?</h2>
            <p>
              Beyond Copilot plug-ins: Systems-level observations on the three structural shifts from legal production to legal judgment, multi-agent orchestration, and human-in-the-loop governance.
            </p>
            <strong>Read the note &amp; listen to the Deep Dive →</strong>
          </a>
          <div className="notes-context">
            <p className="kicker">What comes next</p>
            <h2>Notes begin with a question worth discussing.</h2>
            <p>
              Current conversations include AI agents and legal responsibility, and the capabilities that will define the future of AI counsel.
            </p>
          </div>
          <div id="subscribe-notes" style={{ marginTop: '48px' }}>
            <NetworkBriefingForm locale="en" />
          </div>
          <p className="notes-disclaimer">
            Distilled under the Chatham House Rule from recent peer discussions. Perspectives are personal.
          </p>
        </div>
      </section>
      <footer>
        <a className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <p>Independent peer community for legal professionals across the AI ecosystem.</p>
        <div>
          <a href="/podcast.xml">Podcast RSS</a>
          <a href="/feed.xml">Notes RSS</a>
          <a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a>
          <span>© 2026 AGI Counsel Network</span>
        </div>
      </footer>
    </main>
  );
}
