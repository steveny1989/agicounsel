import type { Metadata } from 'next';
import RoomNotesCarousel from '../components/RoomNotesCarousel';

const roomNotes = [
  'AI transformation is also organizational transformation.',
  'The business must be part of the co-creation process.',
  'AI is a business problem first, and a technology problem second. Build for real value—not technical spectacle.',
  'A truly valuable system must be able to learn.',
  'The lawyer of the future will be a Chief of Staff orchestrating fleets of agents.',
];

export const metadata: Metadata = {
  title: 'Community Notes & Technical Studies | AGI Counsel Network',
  description:
    'Peer-reviewed architectural notes, deployment benchmarks, and multi-agent legal governance studies from the AGI Counsel Network.',
  keywords: [
    'AGI Counsel Notes',
    'AI-Native Legal Department Study',
    'Legal AI Five-Layer Value Stack',
    'Multi-Agent Legal Orchestration',
    'Human-in-the-Loop Legal Governance',
    'Legal System of Record',
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
      name: 'Community Notes & Technical Studies | AGI Counsel Network',
      description:
        'Peer-reviewed architectural notes, deployment benchmarks, and multi-agent legal governance studies from the AGI Counsel Network.',
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
  return <main>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(notesCollectionJsonLd) }}
    />
    <header className="site-header site-header-scrolled"><a className="brand" href="/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><nav aria-label="Primary navigation"><a href="/">Home</a><a href="/#architecture">Architecture</a><a href="/#community">Research</a><a className="language-switch" href="/zh/notes/?lang=zh">中文</a><a className="nav-join" href="/#contribute">Contribute</a></nav></header>
    <section className="notes-hero"><div className="eyebrow"><span /> Collective Systems Thinking</div><h1>Community Notes &amp; Studies</h1><p>Architectural blueprints, deployment benchmarks, and governance frameworks emerging from AGI Counsel Network roundtables.</p></section>
    <RoomNotesCarousel notes={roomNotes} locale="en" />
    <section className="notes-list section"><div className="section-label">Published notes</div><div>
      <a className="note-index-card" href="/notes/ai-native-legal-department/"><span>Note #01 · September 2026</span><h2>What Would an AI-Native Legal Department Look Like?</h2><p>Beyond Copilot plug-ins: Systems-level observations on value layers, multi-agent orchestration, and human-in-the-loop governance.</p><strong>Read the note →</strong></a>
      <div className="notes-context"><p className="kicker">What comes next</p><h2>Notes begin with a question worth discussing.</h2><p>Current conversations include AI agents and legal responsibility, and the capabilities that will define the future of AI counsel.</p><a className="note-link" href="/#contribute">Contribute a question <span>→</span></a></div>
      <p className="notes-disclaimer">Distilled under the Chatham House Rule from recent peer discussions. Perspectives are personal.</p>
    </div></section>
    <footer><a className="brand" href="/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>Independent peer community for legal professionals across the AI ecosystem.</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>
  </main>;
}
