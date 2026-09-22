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
          <div className="notes-context" id="conversation-02">
            <p className="kicker">第二场闭门对话 · 参会嘉宾与议题召集</p>
            <h2>文娱与内容企业的 AI 内容战略：IP 资产、商业授权与创作重构</h2>
            <p>
              第二期闭门同行研讨将聚焦<strong>内容与娱乐产业</strong>（涵盖影视与流媒体、互动游戏、音乐与出版、短视频平台及全球泛娱乐 IP 机构）。我们诚挚邀请文娱内容产业的法务负责人、IP 战略官与业务决策者共同探讨 AI 时代的内容战略演进。
            </p>
            <p style={{ marginTop: '14px' }}>
              核心探讨议题包括：内容企业如何构建进可攻、退可守的 AI 语料授权与联合开发机制？生成式工作流全面介入影视与游戏制作后，核心 IP 护城河、创作者与艺人权益边界如何重塑？法务团队又该如何从“合规守门人”升级为驱动公司内容战略与新型商业化交易的共同架构师？
            </p>
            <a
              className="note-link"
              href="mailto:hello@agicounsel.org?subject=%E7%AC%AC%E4%BA%8C%E6%9C%9F%E9%97%AD%E9%97%A8%E5%AF%B9%E8%AF%9D%E2%80%94%E2%80%94%E6%96%87%E5%A8%B1%E4%B8%8E%E5%86%85%E5%AE%B9%E6%88%98%E7%95%A5%E6%8A%A5%E5%90%8D&body=%E6%89%80%E5%9C%A8%E6%9C%BA%E6%9E%84%20%2F%20%E7%BB%86%E5%88%86%E9%A2%86%E5%9F%9F%EF%BC%88%E5%A6%82%E5%BD%B1%E8%A7%86%E3%80%81%E6%B5%81%E5%AA%92%E4%BD%93%E3%80%81%E6%B8%B8%E6%88%8F%E3%80%81%E9%9F%B3%E4%B9%90%E3%80%81%E5%87%BA%E7%89%88%E3%80%81%E5%86%85%E5%AE%B9%E5%B9%B3%E5%8F%B0%EF%BC%89%EF%BC%9A%0A%0A%E8%81%8C%E5%8A%A1%EF%BC%9A%0A%0A%E6%82%A8%E6%9C%80%E5%B8%8C%E6%9C%9B%E5%9C%A8%E7%AC%AC%E4%BA%8C%E6%9C%9F%E9%97%AD%E9%97%A8%E4%BC%9A%E4%B8%AD%E4%B8%8E%E5%90%8C%E8%A1%8C%E6%8E%A2%E8%AE%A8%E7%9A%84%E3%80%8CAI%20%E5%86%85%E5%AE%B9%E6%88%98%E7%95%A5%E3%80%8D%E9%97%AE%E9%A2%98%EF%BC%9A%0A"
            >
              申请参与第二场闭门对话或推荐文娱同行 <span>↗</span>
            </a>
          </div>
          <div id="subscribe-notes-zh" style={{ marginTop: '48px' }}>
            <NetworkBriefingForm locale="zh" />
          </div>
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
