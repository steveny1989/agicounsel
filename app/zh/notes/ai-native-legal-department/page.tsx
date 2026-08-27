import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 原生法务部门会是什么样？｜AGI Counsel Note #01',
  description: '来自 AGI Counsel Network 成员匿名对话的三点初步观察。',
  alternates: { canonical: '/zh/notes/ai-native-legal-department/', languages: { en: '/notes/ai-native-legal-department/', 'zh-CN': '/zh/notes/ai-native-legal-department/' } },
  openGraph: { images: [] }, twitter: { images: [] },
};

export default function ChineseNoteOne() {
  return <main lang="zh-CN">
    <header className="site-header site-header-scrolled"><a className="brand" href="/zh/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><nav aria-label="主导航"><a href="/zh/">首页</a><a href="/zh/notes/">全部笔记</a><a className="language-switch" href="/notes/ai-native-legal-department/">EN</a><a className="nav-join" href="/zh/#contribute">参与</a></nav></header>
    <article className="note-article"><header><a href="/zh/notes/">← 社群笔记</a><p className="kicker">AGI Counsel Note #01 · 2026 年 8 月</p><h1>AI 原生法务部门会是什么样？</h1><p className="article-deck">来自 AGI Counsel Network 成员对话的三点初步观察。</p></header>
      <div className="article-body"><p className="article-intro">AI 原生法务部门，不由采购了多少工具来定义。它始于一个更根本的问题：当智能成为运营模式的一部分，法律工作本身应该如何被重新设计？</p>
        <h2>01 — AI 原生，不等于增加 Copilot</h2><p>在现有工作流中增加 AI 助手，也许能够提高速度，却未必改变工作流的底层逻辑。AI 原生团队会更早开始思考：事项如何进入法务部门，知识在哪里产生，哪些决定必须依赖判断，以及哪些环节需要被重新设计，而不只是被加速。</p>
        <h2>02 — 知识架构可能比工具选择更重要</h2><p>AI 赋能的法律工作质量，取决于其底层知识的质量、结构、来源与可访问性。工具会不断变化，而一套持久的知识架构，配合明确的所有权与治理机制，可能才是更重要的长期投入。</p>
        <h2>03 — 当生产成本下降，人类判断力更加珍贵</h2><p>当起草、检索与分析变得更容易获得，真正稀缺的能力也随之转移。提出正确的问题、理解语境、权衡冲突风险，并为决定承担责任，会变得更重要，而不是更不重要。</p>
        <div className="article-callout"><strong>留给下一场对话的问题</strong><p>如果今天从零开始搭建一个法务部门，你会最先重新设计哪一个工作流？为什么？</p></div>
        <p className="article-disclaimer">本文基于 AGI Counsel Network 成员的匿名讨论。文中观点均为个人意见，不代表参与者所在机构。</p>
      </div>
    </article>
    <footer><a className="brand" href="/zh/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>连接人工智能生态各环节法律专业人士的独立同行社群。</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>
  </main>;
}
