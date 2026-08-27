import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Notes | AGI Counsel Network',
  description: 'Short, anonymized distillations of collective thinking from AGI Counsel Network conversations.',
  alternates: { canonical: '/notes/', languages: { en: '/notes/', 'zh-CN': '/zh/notes/' } },
};

export default function NotesArchive() {
  return <main>
    <header className="site-header site-header-scrolled"><a className="brand" href="/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><nav aria-label="Primary navigation"><a href="/">Home</a><a href="/#discussing">Conversations</a><a href="/#principles">Principles</a><a className="language-switch" href="/zh/notes/">中文</a><a className="nav-join" href="/#contribute">Contribute</a></nav></header>
    <section className="notes-hero"><div className="eyebrow"><span /> Collective thinking</div><h1>Community Notes</h1><p>Short, anonymized distillations of questions and insights emerging from Network conversations.</p></section>
    <section className="notes-list section"><div className="section-label">Published notes</div><div>
      <a className="note-index-card" href="/notes/ai-native-legal-department/"><span>Note #01 · August 2026</span><h2>What Would an AI-Native Legal Department Look Like?</h2><p>Three emerging ideas about workflows, knowledge architecture, and the changing value of human judgment.</p><strong>Read the note →</strong></a>
      <div className="notes-context"><p className="kicker">What comes next</p><h2>Notes begin with a question worth discussing.</h2><p>Current conversations include AI agents and legal responsibility, and the capabilities that will define the future of AI counsel.</p><a className="note-link" href="/#contribute">Contribute a question <span>→</span></a></div>
    </div></section>
    <footer><a className="brand" href="/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>Independent peer community for legal professionals across the AI ecosystem.</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>
  </main>;
}
