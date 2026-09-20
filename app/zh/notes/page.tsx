import type { Metadata } from 'next';
import SectionCarousel from '../../components/SectionCarousel';

const roomNotes = [
  'AI 转型，本质上也是组织转型。',
  '业务必须参与共创。',
  'AI 首先是业务问题，其次才是技术问题。要创造真实价值，不做技术炫技。',
  '真正有价值的系统，一定要能够自学习。',
  '未来的律师，更像统筹众多 Agent 的 Chief of Staff。',
];

export const metadata: Metadata = {
  title: '社群笔记｜AGI Counsel Network',
  description: '将 AGI Counsel Network 对话中的集体思考，沉淀为简短、匿名的社群笔记。',
  alternates: { canonical: '/zh/notes/', languages: { en: '/notes/', 'zh-CN': '/zh/notes/' } },
};

export default function ChineseNotesArchive() {
  return <main lang="zh-CN">
    <header className="site-header site-header-scrolled"><a className="brand" href="/zh/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><nav aria-label="主导航"><a href="/zh/">首页</a><a href="/zh/#discussing">对话</a><a href="/zh/#principles">社群原则</a><a className="language-switch" href="/notes/?lang=en">EN</a><a className="nav-join" href="/zh/#contribute">参与</a></nav></header>
    <section className="notes-hero"><div className="eyebrow"><span /> 集体思考</div><h1>社群笔记</h1><p>将 Network 对话中出现的问题与洞见，沉淀为简短、匿名的共同记录。</p></section>
    <SectionCarousel id="room-notes" title="" labels={roomNotes.map((_, index) => `法律 AI 观点 ${index + 1}`)} locale="zh">
      {roomNotes.map((note, index) => <section className={`note-quote-slide ${index === 2 ? 'is-long' : ''}`} key={note}><div className="note-quote-meta"><p>现场摘记 · 法律 AI 五则</p><span>0{index + 1} / 05</span></div><p className="note-quote-statement">{note}</p></section>)}
    </SectionCarousel>
    <section className="notes-list section"><div className="section-label">已发布笔记</div><div>
      <a className="note-index-card" href="/zh/notes/ai-native-legal-department/"><span>Note #01 · 2026 年 8 月</span><h2>AI 原生法务部门会是什么样？</h2><p>关于工作流、知识架构，以及人类判断力价值变化的三点初步观察。</p><strong>阅读笔记 →</strong></a>
      <div className="notes-context"><p className="kicker">接下来</p><h2>每一篇笔记，都始于一个值得讨论的问题。</h2><p>当前议题包括 AI 智能体与法律责任，以及未来 AI 法律人需要具备的关键能力。</p><a className="note-link" href="/zh/#contribute">贡献一个问题 <span>→</span></a></div>
      <p className="notes-disclaimer">遵循查塔姆研究所规则（Chatham House Rule）整理，观点仅代表个人实践思考。</p>
    </div></section>
    <footer><a className="brand" href="/zh/"><span className="brand-mark">A</span><span>AGI Counsel Network</span></a><p>连接人工智能生态各环节法律专业人士的独立同行社群。</p><div><a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a><span>© 2026 AGI Counsel Network</span></div></footer>
  </main>;
}
