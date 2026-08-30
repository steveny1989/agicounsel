import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '社群笔记｜AGI Counsel Network',
  description: '将 AGI Counsel Network 对话中的集体思考，沉淀为简短、匿名的社群笔记。',
  alternates: { canonical: '/zh/notes/', languages: { en: '/notes/', 'zh-CN': '/zh/notes/' } },
};

export default function ChineseNotesArchive() {
  return <main lang="zh-CN">
    <header className="site-header site-header-scrolled"><a className="brand" href="/zh/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><nav aria-label="主导航"><a href="/zh/">首页</a><a href="/zh/#discussing">对话</a><a href="/zh/#principles">社群原则</a><a className="language-switch" href="/notes/?lang=en">EN</a><a className="nav-join" href="/zh/#contribute">参与</a></nav></header>
    <section className="notes-hero"><div className="eyebrow"><span /> 集体思考</div><h1>社群笔记</h1><p>将 Network 对话中出现的问题与洞见，沉淀为简短、匿名的共同记录。</p></section>
    <section className="notes-list section"><div className="section-label">已发布笔记</div><div>
      <a className="note-index-card" href="/zh/notes/ai-native-legal-department/"><span>Note #01 · 2026 年 8 月</span><h2>AI 原生法务部门会是什么样？</h2><p>关于工作流、知识架构，以及人类判断力价值变化的三点初步观察。</p><strong>阅读笔记 →</strong></a>
      <div className="notes-context"><p className="kicker">接下来</p><h2>每一篇笔记，都始于一个值得讨论的问题。</h2><p>当前议题包括 AI 智能体与法律责任，以及未来 AI 法律人需要具备的关键能力。</p><a className="note-link" href="/zh/#contribute">贡献一个问题 <span>→</span></a></div>
    </div></section>
    <footer><a className="brand" href="/zh/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>连接人工智能生态各环节法律专业人士的独立同行社群。</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>
  </main>;
}
