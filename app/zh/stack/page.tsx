import type { Metadata } from 'next';
import NetworkBriefingForm from '../../components/NetworkBriefingForm';

export const metadata: Metadata = {
  title: '五层 AI 技术栈全景与法务工程术语词典｜AGI Counsel Network',
  description:
    '人工智能五层生态（L5 智能体应用、L4 前沿基础大模型、L3 云与混合 RAG 及核心记录系统、L2 算力芯片集群与出口管制、L1 吉瓦级能源基础设施）的技术原语、商业壁垒与法律工程标准词典。',
  keywords: [
    '五层 AI 技术栈',
    'Legal AI 工程词典',
    'System of Record 法务核心记录系统',
    'Multi-Agent 多智能体编排',
    'ZDR 零数据留存推理',
    'BIS 半导体算力出口合规',
    '大模型知识产权与蒸馏许可',
    '吉瓦级数据中心 PPA',
  ],
  alternates: {
    canonical: '/zh/stack/',
    languages: { en: '/stack/', 'zh-CN': '/zh/stack/', 'x-default': '/stack/' },
  },
  openGraph: {
    title: '五层 AI 技术栈全景与法务工程术语词典｜AGI Counsel Network',
    description:
      '纵贯智能体应用（L5）、前沿大模型（L4）、混合 RAG 与核心记录系统（L3）、算力芯片（L2）与吉瓦级能源（L1）的法律工程参考架构。',
    url: 'https://agicounsel.org/zh/stack/',
    siteName: 'AGI Counsel Network',
    locale: 'zh_CN',
    type: 'website',
    images: [{ url: '/og-stack.png', width: 1200, height: 630, alt: 'AGI Counsel Network — 五层 AI 技术栈与工程词典' }],
  },
};

const stackDomainsZh = [
  {
    layer: 'LAYER 05 · 智能体与应用层',
    title: 'Agentic 工作流、工具调用（MCP）与自主业务闭环',
    engineeringFocus: '多智能体拓扑调度（规划/检索/校验 Agent）、MCP 工具调用权限边界、确定性护栏与人机协同（HITL）异常接管遥测。',
    legalFocus: '自主智能体商业行为的法律归责、跨主体赔偿责任分配、最终人工签字权边界与全链路可解释审计日志。',
  },
  {
    layer: 'LAYER 04 · 前沿大模型层',
    title: '基础模型权重、预训练语料溯源与后训练对齐',
    engineeringFocus: '预训练语料清洗、RLHF/DPO 安全评估基准、对抗红队测试（Red-Teaming）、合成数据蒸馏与开源权重部署。',
    legalFocus: '预训练语料版权合理使用边界、模型蒸馏竞争限制条款、企业级生成物侵权豁免上限与高危模型权重安全合规。',
  },
  {
    layer: 'LAYER 03 · 云运行时与知识架构层',
    title: '混合 RAG、零数据留存（ZDR）与法务核心记录系统（SoR）',
    engineeringFocus: '向量检索 + 知识图谱混合 RAG、零数据留存（ZDR）推理协议、细粒度 RBAC 动态上下文隔离与资深律师修订痕迹自学习飞轮。',
    legalFocus: '跨境数据主权路由、未公开重大信息（MNPI）物理与逻辑隔离、System of Record 极高转换壁垒与零训练泄漏 SLA。',
  },
  {
    layer: 'LAYER 02 · 算力芯片与集群层',
    title: 'GPU/TPU 算力集群、先进封装供应链与算力托管',
    engineeringFocus: '超大规模算力集群高速互联、HBM 与先进封装（CoWoS）产能分配、裸金属主权算力集群交付。',
    legalFocus: 'BIS/EAR 先进芯片与算力阈值出口管制合规、跨境算力租赁 KYC 审查、晶圆厂长期保供协议（Take-or-Pay）与供应链韧性。',
  },
  {
    layer: 'LAYER 01 · 能源与物理电网层',
    title: '吉瓦级电力供给、表后核能（SMR）与超大规模数据中心',
    engineeringFocus: '吉瓦级（GW）高密度液冷数据中心园区、表后核能/小型模块化反应堆（SMR）直供架构与电网并网队列。',
    legalFocus: '长期购电协议（PPA）结构设计、电网并网监管审批、核能与碳排环境合规，以及主权土地与水资源许可。',
  },
];

const definedTermsZh = [
  {
    name: '核心记录系统 (System of Record, SoR)',
    code: 'L4-SOR',
    def: '沉淀企业案件生命周期状态机、结构化合同资产库、历史谈判偏差值与不可篡改合规审计轨迹的底层工作底座，具备极高的转换壁垒。',
  },
  {
    name: '参谋长智能体拓扑 (Chief of Staff Topology)',
    code: 'L5-COS',
    def: '人类律师摆脱低价值条款码字，转为设定风控标尺、统筹垂直 Agent 梯队（NDA 初审、数据出境扫描、并购偏离预警）并把控最终签字权的组织范式。',
  },
  {
    name: '多智能体颗粒度拆解 (Multi-Agent Decomposition)',
    code: 'L2-MAD',
    def: '将复杂跨国法务审查拆解为“需求分流 → 事实抽取 → 法规/手册混合检索 → 交叉核验”多步流水线，彻底消除单轮套壳对话的隐性幻觉。',
  },
  {
    name: '自学习知识飞轮 (Self-Learning Flywheel)',
    code: 'L3-SLF',
    def: '在日常审批中无感捕获资深律师对 Agent 初审意见的修订与驳回逻辑，自动蒸馏为可执行标准操作规程（SOP）并实时反哺私有知识库的闭环机制。',
  },
  {
    name: '零数据留存推理 (Zero-Data-Retention, ZDR)',
    code: 'L3-ZDR',
    def: '通过底层加密与商业契约双重保障企业提示词、交易文档与模型输出绝不落盘缓存、绝不用于任何公共基础模型二次训练的推理安全标准。',
  },
  {
    name: '细粒度上下文权限隔离 (Granular Context RBAC)',
    code: 'SEC-RBAC',
    def: '在向量检索与上下文组装层强制执行的动态权限隔离，确保未公开重大信息（MNPI）与涉密并购数据室绝不被内部智能体越权调阅。',
  },
  {
    name: '对抗性提示词注入防御 (Prompt Injection Defense)',
    code: 'SEC-PID',
    def: '通过输入清洗与沙箱双模型校验，防范交易对手在合同或招标附件中隐藏恶意指令以诱导内部审查智能体越界放行的安全护栏。',
  },
  {
    name: '30% 组织渗透率生死线 (30% Adoption Threshold)',
    code: 'OPS-30P',
    def: '当企业日常涉法请求通过统一智能工作台流转的比例跨过 30% 临界点时，人工修订反馈样本足以驱动自学习飞轮产生跨团队准确率复利效应。',
  },
];

export default function ChineseStackHubPage() {
  return (
    <main lang="zh-CN">
      <header className="site-header site-header-scrolled">
        <a className="brand" href="/zh/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <nav aria-label="主导航">
          <a href="/zh/">首页</a>
          <a href="/zh/stack/">五层栈与术语词典</a>
          <a href="/zh/notes/">社群笔记</a>
          <a className="language-switch" href="/stack/?lang=en">EN</a>
          <a className="nav-join" href="#subscribe">订阅简报</a>
        </nav>
      </header>

      <section className="notes-hero">
        <div className="eyebrow">
          <span /> 全栈技术分类学 · L5 至 L1
        </div>
        <h1>五层 AI 技术栈全景与法务工程词典</h1>
        <p>
          系统梳理从吉瓦级电力、算力芯片、云与混合 RAG 底座，到前沿基础大模型与多智能体应用层的工程原语、护城河壁垒与合规边界。
        </p>
      </section>

      <section className="section" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="section-label">L5 → L1 全栈</div>
        <div>
          <p className="kicker">从物理算力到自主应用的全价值链</p>
          <h2>人工智能生态五层架构解析</h2>
          <div className="discussion-grid">
            {stackDomainsZh.map((d) => (
              <article key={d.layer} className="tech-track-card">
                <div className="tech-track-meta">{d.layer}</div>
                <h3>{d.title}</h3>
                <p>
                  <strong>系统与工程原语：</strong> {d.engineeringFocus}
                </p>
                <p>
                  <strong>法律、商业与治理核心：</strong> {d.legalFocus}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--gray)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="section-label">标准术语集</div>
        <div>
          <p className="kicker">Schema.org 标准术语索引 · 核心概念</p>
          <h2>Legal AI 核心工程与治理原语</h2>
          <div className="study-glossary-grid" style={{ marginTop: '32px' }}>
            {definedTermsZh.map((t) => (
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
        <div className="section-label">研究订阅</div>
        <div>
          <NetworkBriefingForm locale="zh" />
        </div>
      </section>

      <footer>
        <a className="brand" href="/zh/">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <p>连接人工智能五层生态各环节法律专业人士与系统架构师的独立同行社群。</p>
        <div>
          <a href="/zh/notes/ai-native-legal-department/">Note #01 深度研究</a>
          <a href="/zh/podcast.xml">播客 RSS</a>
          <a href="/llms-full.txt">LLMs 完整索引</a>
          <a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a>
          <span>© 2026 AGI Counsel Network</span>
        </div>
      </footer>
    </main>
  );
}
