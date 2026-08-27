import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Would an AI-Native Legal Department Look Like? | AGI Counsel Note #01',
  description: 'Three emerging ideas from an anonymized AGI Counsel Network conversation.',
  alternates: { canonical: '/notes/ai-native-legal-department/', languages: { en: '/notes/ai-native-legal-department/', 'zh-CN': '/zh/notes/ai-native-legal-department/' } },
  openGraph: { images: [] }, twitter: { images: [] },
};

export default function NoteOne() {
  return <main>
    <header className="site-header site-header-scrolled"><a className="brand" href="/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><nav aria-label="Primary navigation"><a href="/">Home</a><a href="/notes/">All notes</a><a className="language-switch" href="/zh/notes/ai-native-legal-department/">中文</a><a className="nav-join" href="/#contribute">Contribute</a></nav></header>
    <article className="note-article"><header><a href="/notes/">← Community Notes</a><p className="kicker">AGI Counsel Note #01 · August 2026</p><h1>What Would an AI-Native Legal Department Look Like?</h1><p className="article-deck">Three emerging ideas from a conversation among AGI Counsel Network members.</p></header>
      <div className="article-body"><p className="article-intro">An AI-native legal department is not defined by the number of tools it buys. It begins with a more fundamental question: if intelligence becomes part of the operating model, how should legal work itself be designed?</p>
        <h2>01 — AI-native is not the same as adding copilots</h2><p>Adding an AI assistant to an existing workflow may improve speed without changing the workflow’s underlying logic. An AI-native team starts earlier: it examines how matters enter the department, where knowledge is created, which decisions require judgment, and what should be redesigned rather than merely accelerated.</p>
        <h2>02 — Knowledge architecture may matter more than tool selection</h2><p>The quality of AI-enabled legal work depends on the quality, structure, provenance, and accessibility of the knowledge beneath it. Tool choices will change. A durable knowledge architecture—paired with clear ownership and governance—may become the more consequential investment.</p>
        <h2>03 — Human judgment becomes more valuable as production costs fall</h2><p>When drafting, research, and analysis become easier to produce, the scarce capability shifts. Framing the right question, understanding context, weighing competing risks, and taking responsibility for a decision become more—not less—important.</p>
        <div className="article-callout"><strong>A question to carry forward</strong><p>If you were building a legal department from zero today, which workflow would you redesign first—and why?</p></div>
        <p className="article-disclaimer">Based on an anonymized discussion among AGI Counsel Network members. Views are personal and do not represent participants’ employers.</p>
      </div>
    </article>
    <footer><a className="brand" href="/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>Independent peer community for legal professionals across the AI ecosystem.</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>
  </main>;
}
