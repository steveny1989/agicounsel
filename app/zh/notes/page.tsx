import type { Metadata } from 'next';
import RoomNotesCarousel from '../../components/RoomNotesCarousel';
import NetworkBriefingForm from '../../components/NetworkBriefingForm';

const roomNotes = [
  'AI 转型，本质上也是组织转型。',
  '业务必须参与共创。',
  'AI 首先是业务问题，其次才是技术问题。要创造真实价值，不做技术炫技。',
  '真正有价值的系统，一定要能够自学习。',
  '未来的律师，更像统筹众多 Agent 的 Chief of Staff。',
];

export const metadata: Metadata = {
  title: '社群笔记与深度研究｜AGI Counsel Network',
  description: '将 AGI Counsel Network 闭门同行研讨中的集体思考、工作流重塑、自学习知识飞轮与多智能体治理沉淀为社群笔记。',
  keywords: [
    'AGI Counsel 笔记',
    'AI 原生法务部门研究报告',
    '法律判断与人机协同',
    '多智能体法务编排',
    'Human-in-the-Loop 法务治理',
    '自学习知识飞轮',
  ],
  alternates: { canonical: '/zh/notes/', languages: { en: '/notes/', 'zh-CN': '/zh/notes/', 'x-default': '/notes/' } },
};

const zhNotesCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://agicounsel.org/zh/notes/#collection',
      url: 'https://agicounsel.org/zh/notes/',
      name: '社群笔记与深度研究｜AGI Counsel Network',
      inLanguage: 'zh-CN',
      isPartOf: { '@id': 'https://agicounsel.org/#website' },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            url: 'https://agicounsel.org/zh/notes/ai-native-legal-department/',
            name: 'AI 原生法务部门会是什么样？ (AGI Counsel Note #01)',
          },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://agicounsel.org/zh/' },
        { '@type': 'ListItem', position: 2, name: '社群笔记', item: 'https://agicounsel.org/zh/notes/' },
      ],
    },
  ],
};

export default function ChineseNotesArchive() {
  return (
    <main lang="zh-CN">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zhNotesCollectionJsonLd) }}
      />
      <header className="site-header site-header-scrolled">
        <a className="brand" href="/zh/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <nav aria-label="主导航">
          <a href="/zh/">首页</a>
          <a href="/zh/#about">关于</a>
          <a href="/zh/#community">社群动态</a>
          <a className="language-switch" href="/notes/?lang=en">
            EN
          </a>
          <a className="nav-join" href="#subscribe-notes-zh">
            订阅
          </a>
        </nav>
      </header>
      <section className="notes-hero">
        <div className="eyebrow">
          <span /> 集体思考
        </div>
        <h1>社群笔记</h1>
        <p>将 Network 对话中出现的问题、演进范式与实践洞见，沉淀为简短的共同记录。</p>
      </section>
      <RoomNotesCarousel notes={roomNotes} locale="zh" />
      <section className="notes-list section">
        <div className="section-label">已发布笔记</div>
        <div>
          <a className="note-index-card" href="/zh/notes/ai-native-legal-department/">
            <span>Note #01 · 2026 年 9 月 · 含双人播客深读与中英对照</span>
            <h2>AI 原生法务部门会是什么样？</h2>
            <p>
              超越外挂插件思维：系统剖析从法律生产到法律判断的三重跃迁、律师作为多 Agent 参谋长（Chief of Staff）的治理机制与企业落地实战。
            </p>
            <strong>阅读深度笔记 &amp; 收听音频导读 →</strong>
          </a>
          <div className="notes-context">
            <p className="kicker">接下来</p>
            <h2>每一篇笔记，都始于一个值得讨论的问题。</h2>
            <p>当前议题包括 AI 智能体与法律责任，以及未来 AI 法律人需要具备的关键能力。</p>
          </div>
          <div id="subscribe-notes-zh" style={{ marginTop: '48px' }}>
            <NetworkBriefingForm locale="zh" />
          </div>
          <p className="notes-disclaimer">
            遵循查塔姆研究所规则（Chatham House Rule）整理，观点仅代表个人实践思考。
          </p>
        </div>
      </section>
      <footer>
        <a className="brand" href="/zh/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <p>连接人工智能生态各环节法律专业人士的独立同行社群。</p>
        <div>
          <a href="/zh/podcast.xml">播客 RSS</a>
          <a href="/zh/feed.xml">笔记 RSS</a>
          <a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a>
          <span>© 2026 AGI Counsel Network</span>
        </div>
      </footer>
    </main>
  );
}
