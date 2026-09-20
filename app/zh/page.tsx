'use client';

import { useEffect, useState } from 'react';
import SectionCarousel from '../components/SectionCarousel';
import NetworkBriefingForm from '../components/NetworkBriefingForm';

const layers = [
  [
    'L5 · 智能体与应用',
    'Agentic 工作流与多智能体编排',
    '多 Agent 集群调度 · MCP 与工具调用边界 · HITL 人工接管遥测 · 下游责任归属与追责机制',
  ],
  [
    'L4 · 前沿大模型',
    '模型权重、预训练语料与对齐',
    '预训练数据溯源与合规 · RLHF/DPO 安全评估基准 · 合成数据蒸馏许可 · 开源权重与 API 免责条款',
  ],
  [
    'L3 · 云与知识底座',
    '推理运行时、RAG 与核心记录系统',
    '向量与知识图谱混合检索 · 零数据留存（ZDR）推理协议 · 主权云路由 · 法务记录系统（SoR）沉淀',
  ],
  [
    'L2 · 算力芯片',
    'GPU/TPU 集群与半导体供应链',
    '大规模算力集群采购 · 先进制程与 HBM 供应链合规 · BIS/EAR 出口管制合规 · 跨境主权算力托管',
  ],
  [
    'L1 · 能源与物理底座',
    '吉瓦级电力与超大规模数据中心',
    '超大规模数据中心长期购电协议（PPA） · 表后核能/SMR 供电架构 · 电网并网审批与环境合规',
  ],
];

const discussions = [
  {
    code: 'TRACK 01 · 系统架构与核心记录系统 (SoR)',
    title: '构建 AI 原生法务部门（AI-Native Legal Department）',
    summary:
      '超越 Layer 1 的通用 Copilot 套壳插件，深入 Layer 2 端到端业务工作流重构、Layer 3 动态专有知识网络（混合 RAG + 机构判例飞轮）与 Layer 4 核心记录系统（System of Record）高壁垒底座。',
    tags: ['Legal AI 五层价值栈', 'System of Record', '自学习知识飞轮', '法务工程指标'],
    href: '/zh/notes/ai-native-legal-department/',
  },
  {
    code: 'TRACK 02 · 多智能体治理与法律归责',
    title: '多 Agent 集群调度、确定性护栏与法律责任边界',
    summary:
      '定义人机协同（Human-in-the-Loop）的决策授权阈值、工具调用（Tool-Use）可审计链路、红队评测集（Eval Harness），以及自主智能体执行商业合同与合规审批时的责任分配机制。',
    tags: ['Chief of Staff 模式', 'HITL 治理锚点', 'Agent 审计追踪', '算法责任划分'],
    href: '/zh/notes/ai-native-legal-department/',
  },
  {
    code: 'TRACK 03 · 全栈算力与前沿模型合规',
    title: '跨栈法务架构：从前沿模型权重到吉瓦级算力集群',
    summary:
      '贯通预训练语料版权、模型蒸馏与权重开源许可、跨境数据主权路由、BIS 先进芯片出口管制合规，以及超大规模 AI 数据中心电力采购（PPA）的全链路法律工程。',
    tags: ['大模型知识产权', 'ZDR 零数据留存', 'BIS/EAR 算力合规', '吉瓦级数据中心'],
    href: '/zh/notes/',
  },
];

const principles = [
  ['信任与查塔姆守则', '遵循 Chatham House Rule，支持去商业化包装的真实架构与教训交流'],
  ['生产级工程实证', '聚焦真实落地的 RAG 架构、评测基准、幻觉拦截护栏与投入产出比'],
  ['L1–L5 全栈视角', '打通能源、算力芯片、云底座、前沿大模型实验室与企业应用法务'],
  ['个人专业身份', '以独立法律架构师与实践者身份参与，沉淀高信噪比集体判断'],
];

const technicalFaqs = [
  {
    q: '什么是 AGI Counsel Network？',
    a: 'AGI Counsel Network 是连接人工智能五层生态（L5 智能体应用、L4 前沿基础大模型、L3 云与 RAG 知识底座、L2 算力芯片集群、L1 吉瓦级能源基础设施）总法律顾问（GC）、前沿大模型实验室法务专家与法律系统工程实践者的独立同行社群。',
  },
  {
    q: '什么样的企业法务部才算真正的“AI 原生法务部门”？',
    a: '如《AGI Counsel Note #01》所系统阐述，AI 原生法务部门绝非采购若干个 Layer 1 聊天插件或通用 Copilot。它从底层重构业务发起与初审工作流（Layer 2），将内部合同审查先例沉淀为具备自学习飞轮的专有知识架构（Layer 3），占领高壁垒的核心记录系统 System of Record（Layer 4），并让人类律师作为统筹调度众多垂直 Agent 的参谋长（Chief of Staff），在 Layer 5 牢牢把握最终风险判断与签字权。',
  },
  {
    q: '为什么传统的“外挂式 Copilot 插件”在严肃企业法务场景中容易陷入生产力悖论？',
    a: '在未经改造的传统串联审批流上强行外挂一个缺乏企业上下文的对话助手，虽然能局部提高 20% 的初稿打字速度，却会制造大量包含隐性幻觉的“半成品草稿”，反而加重资深法务的复核负担与合规风险。真正的效能跃迁必须依赖任务颗粒度拆解（Multi-Agent 流水线）、确定性评测基准与人机协同治理。',
  },
  {
    q: '“律师作为多 Agent 集群的参谋长（Chief of Staff）”如何重新定义法务人才与工作模式？',
    a: '当基础法律检索与文本比对从“昂贵的手工技艺”变成“充裕的计算公用事业”，法务的核心价值不再是手工改合同，而是制定风险边界规则（Risk Rubric）、设计垂直 Agent 拆解拓扑、审计异常红线分流，并在高复杂度商业博弈中承担不可替代的人类受托责任。',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: technicalFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function ChineseHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main lang="zh-CN">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
        <a className="brand" href="#top">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <nav aria-label="主导航">
          <a href="#about">五层技术栈</a>
          <a href="#architecture">参考架构</a>
          <a href="#community">研究议题</a>
          <a href="/zh/notes/">社群笔记</a>
          <a className="language-switch" href="/?lang=en">
            EN
          </a>
          <a className="nav-join" href="#contribute">
            参与
          </a>
        </nav>
      </header>

      <SectionCarousel id="top" title="" labels={['愿景与技术全景', '系统工程命题']} locale="zh">
        <section className="hero carousel-slide-hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="eyebrow">
            <span /> 独立同行网络 · 纵贯 L1–L5 人工智能全栈生态
          </div>
          <h1>
            智能拓展可能。
            <br />
            判断塑造未来。
          </h1>
          <p className="hero-copy">
            连接人工智能全栈生态的总法律顾问、前沿大模型实验室法务专家与 Legal AI 系统架构师——从多智能体工作流（Multi-Agent）、基础大模型对齐、私有 RAG 与核心记录系统，延伸至算力芯片集群与吉瓦级能源基础设施。
          </p>
          <div className="hero-tech-pills" aria-label="核心技术与治理领域">
            <span>L5 · 多智能体编排与治理</span>
            <span>L4 · 前沿大模型合规与对齐</span>
            <span>L3 · 专有 RAG 与核心记录系统</span>
            <span>L2 · 算力集群与半导体出口合规</span>
            <span>L1 · 超大规模电力采购 (PPA)</span>
          </div>
          <div className="hero-actions">
            <a className="button button-light" href="/zh/notes/ai-native-legal-department/">
              阅读 Note #01 深度研究 <span>→</span>
            </a>
            <a className="text-link" href="#architecture">
              查看五层技术参考架构 <span>↓</span>
            </a>
          </div>
        </section>
        <section className="hero carousel-slide-hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="eyebrow">
            <span /> 核心命题 · 超越套壳插件
          </div>
          <h2 className="hero-title hero-long-title">
            对标真实架构，拆解复杂工作流。
            <br />
            共建 AI 原生法务底座。
          </h2>
          <p className="hero-copy">
            当法律分析从“昂贵的手工技艺”演变为“充裕的计算公用事业”，企业法务部门必须从传统人工审阅流水线，演进为掌握核心记录系统（System of Record）并统筹智能体集群的决策中枢。
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#about">
              浏览五层生态栈 <span>↓</span>
            </a>
          </div>
        </section>
      </SectionCarousel>

      <SectionCarousel
        id="about"
        title=""
        labels={['五层 AI 技术栈全景', '系统工程方法论', '社群运行准则']}
        locale="zh"
      >
        <section className="foundation-panel foundation-stack">
          <div className="foundation-intro">
            <p className="kicker">我们连接谁 · L5 至 L1 全栈覆盖</p>
            <h2>
              贯穿人工智能
              <br />
              五层技术与产业栈
            </h2>
            <p>
              汇聚智能经济每一层的法务负责人与法律工程架构师。点击或悬停任意层级，查看该层核心的技术与法律工程原语。
            </p>
          </div>
          <div className="layer-cake" role="list" aria-label="人工智能生态的五个层次">
            {layers.map(([name, subtitle, specs], idx) => (
              <div
                className={`layer ${activeLayer === idx ? 'layer-selected' : ''}`}
                role="listitem"
                tabIndex={0}
                key={name}
                onMouseEnter={() => setActiveLayer(idx)}
                onFocus={() => setActiveLayer(idx)}
                onClick={() => setActiveLayer(idx)}
              >
                <div className="layer-primary">
                  <strong>{name}</strong>
                  <span className="layer-sub">{subtitle}</span>
                </div>
                <small>{specs}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="foundation-panel foundation-work">
          <div className="foundation-intro">
            <p className="kicker">我们如何交流 · 工程实证主义</p>
            <h2>
              一线工程难题沉淀为同行基准。
              <br />
              同行基准演进为参考架构。
            </h2>
          </div>
          <div className="foundation-actions">
            <article>
              <span>01 · 架构对标</span>
              <h3>真实落地评测</h3>
              <p className="foundation-action-desc">
                横向对比企业级混合 RAG 架构、黄金评测集（Eval Harness）、幻觉拦截率与核心记录系统选型。
              </p>
            </article>
            <article>
              <span>02 · 压力测试</span>
              <h3>剖析失效边界</h3>
              <p className="foundation-action-desc">
                拆解通用 Copilot 插件为何在长链条审批中失效，以及如何通过 Multi-Agent 颗粒度拆解突破准确率瓶颈。
              </p>
            </article>
            <article>
              <span>03 · 治理契约</span>
              <h3>确立人机协同标准</h3>
              <p className="foundation-action-desc">
                构建 Human-in-the-Loop（HITL）可解释审计链路、红线升级协议与跨法域合规防线。
              </p>
            </article>
          </div>
        </section>

        <section className="principles foundation-panel" id="principles">
          <div className="principles-statement">
            <p className="kicker kicker-gold">我们共同遵循的准则</p>
            <h2>
              查塔姆研究所规则（Chatham House Rule）保障坦诚的技术复盘。
              <br />
              真实生产环境的数据与教训重于概念炫技。
              <br />
              以个人专业身份参与，自由贡献架构判断。
            </h2>
          </div>
          <div className="principles-strip">
            {principles.map(([title, desc], index) => (
              <div className="principle-item" key={title}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <small className="principle-desc">{desc}</small>
              </div>
            ))}
          </div>
        </section>
      </SectionCarousel>

      <section className="tech-architecture-section fade-in" id="architecture" aria-labelledby="arch-heading-zh">
        <div className="tech-arch-container">
          <div className="tech-arch-header">
            <div>
              <p className="kicker kicker-gold">参考架构 · AGI Counsel Note #01 核心模型</p>
              <h2 id="arch-heading-zh">Legal AI 五层工程价值架构栈</h2>
            </div>
            <p className="tech-arch-lead">
              企业法务 AI 转型的最大误区，是将 Layer 1 的通用大模型对话套壳误认为完整的操作系统。真正高壁垒的 AI 原生法务部门，始终围绕“工作流重构（Layer 2）”与“核心记录系统（Layer 4）”向上构建。
            </p>
          </div>

          <div className="arch-matrix" role="table" aria-label="Legal AI 五层价值架构矩阵">
            <div className="arch-row arch-row-head" role="row">
              <span role="columnheader">架构层级</span>
              <span role="columnheader">系统角色定位</span>
              <span role="columnheader">核心技术与工程原语</span>
              <span role="columnheader">竞争壁垒与防御性</span>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 05</span>
                <strong>人机协同治理中枢 (HITL)</strong>
              </div>
              <div className="arch-cell-role" role="cell">律师作为多 Agent 集群的 Chief of Staff</div>
              <div className="arch-cell-specs" role="cell">
                风险标尺定义、多智能体统筹调度、高危红线异常接管、最终法律签字背书与全链路可解释审计。
              </div>
              <div className="arch-cell-moat" role="cell">最高受托责任与治理锚点</div>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 04</span>
                <strong>核心记录系统 (System of Record)</strong>
              </div>
              <div className="arch-cell-role" role="cell">不可替代的企业法务工作底座</div>
              <div className="arch-cell-specs" role="cell">
                案件与合同全生命周期状态机、履约遥测数据、合规决策资产库与不可篡改的审计日志。
              </div>
              <div className="arch-cell-moat" role="cell">极高的数据沉淀与转换壁垒</div>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 03</span>
                <strong>专有知识与上下文架构</strong>
              </div>
              <div className="arch-cell-role" role="cell">自学习知识飞轮 (Proprietary Context)</div>
              <div className="arch-cell-specs" role="cell">
                向量检索 + 知识图谱混合 RAG、历史谈判底线库、从资深律师修订痕迹中自动提炼 SOP 的自学习闭环。
              </div>
              <div className="arch-cell-moat" role="cell">复利增长的机构私有智慧</div>
            </div>
            <div className="arch-row" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge">LAYER 02</span>
                <strong>端到端工作流与多智能体编排</strong>
              </div>
              <div className="arch-cell-role" role="cell">业务流程原生嵌入 (Workflow Redesign)</div>
              <div className="arch-cell-specs" role="cell">
                自动化需求分流（Triage）、多步子任务拆解（规划 → 检索 → 校验 Agent 流水线）、ERP/CRM/CLM 深度集成。
              </div>
              <div className="arch-cell-moat" role="cell">业务流转速度与组织渗透率</div>
            </div>
            <div className="arch-row arch-row-muted" role="row">
              <div className="arch-cell-layer" role="cell">
                <span className="arch-badge arch-badge-muted">LAYER 01</span>
                <strong>基础大模型与通用算力 API</strong>
              </div>
              <div className="arch-cell-role" role="cell">商品化推理供给 (Commoditized Compute)</div>
              <div className="arch-cell-specs" role="cell">
                通用文本摘要、翻译与单轮问答。若缺乏 L2–L5 架构支撑，极易产生隐性幻觉与上下文漂移。
              </div>
              <div className="arch-cell-moat" role="cell">零防御壁垒（算力快速商品化）</div>
            </div>
          </div>

          <div className="arch-cta-bar">
            <div>
              <strong>深度研讨报告全文：</strong>阅读基于 2026 年 9 月首场闭门同行研讨整理的 5 章完整架构报告。
            </div>
            <a className="button button-light" href="/zh/notes/ai-native-legal-department/">
              阅读 Note #01 完整报告 <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <SectionCarousel
        id="community"
        title=""
        labels={['核心技术议题', '精选研究 Note #01', '来自社群的声音']}
        locale="zh"
      >
        <section className="section discussions carousel-simple">
          <div className="discussion-content">
            <p className="kicker">当前工作组与技术追踪</p>
            <h2>正在推进的架构与治理议题</h2>
            <div className="discussion-grid">
              {discussions.map((item) => (
                <article className="tech-track-card" key={item.title}>
                  <div className="tech-track-meta">{item.code}</div>
                  <h3>
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <p>{item.summary}</p>
                  <div className="tech-tag-row">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-note">
          <div className="section featured-note-inner carousel-simple">
            <div className="featured-note-content">
              <p className="kicker kicker-gold">AGI Counsel Note #01 · 旗舰架构研究</p>
              <h2>AI 原生法务部门会是什么样？</h2>
              <p className="note-deck">
                基于 100 天 AI 原生组织模拟实验，以及与前沿大模型研发厂商、半导体先进制程巨头、跨国智能出行企业法务负责人的闭门研讨沉淀。
              </p>
              <ul>
                <li>
                  <strong>Legal AI 五层价值阶梯：</strong>为什么薄套壳工具毫无壁垒，以及如何占领 Layer 4 核心记录系统（System of Record）。
                </li>
                <li>
                  <strong>多 Agent 颗粒度拆解：</strong>如何将复杂的跨国监管调研与高风险合同拆解为可验证的智能体流水线。
                </li>
                <li>
                  <strong>30% 组织渗透率生死线：</strong>业务共创机制、指标量化体系与自学习知识飞轮的工程落地。
                </li>
              </ul>
              <a className="note-link" href="/zh/notes/ai-native-legal-department/">
                阅读深度笔记全文 <span>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section community-voices carousel-simple">
          <div className="voices-content">
            <div className="quote-grid single">
              <blockquote>
                <p>
                  “当法律分析变成充裕的计算公用事业，人类律师最稀缺的价值将转向系统架构设计、风险边界校准与可追责的终极判断。”
                </p>
                <cite>来自 AGI Counsel Network · 2026 闭门研讨</cite>
              </blockquote>
            </div>
          </div>
        </section>
      </SectionCarousel>

      <section className="faq-section section fade-in" id="faq" aria-labelledby="faq-heading-zh">
        <div className="section-label">核心知识索引</div>
        <div className="faq-content">
          <p className="kicker">常见架构与社群问答 (FAQ)</p>
          <h2 id="faq-heading-zh">AI 原生法务架构与同行网络问答</h2>
          <div className="faq-list">
            {technicalFaqs.map((item, idx) => (
              <details className="faq-item" key={item.q} open={idx === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contribute section fade-in" id="contribute">
        <div className="contribute-card">
          <div>
            <h2>带来你的架构问题或工程实践基准。</h2>
            <p>
              我们在查塔姆研究所规则（Chatham House Rule）下连接企业总法律顾问、前沿大模型实验室法务专家与法律系统架构师。欢迎订阅最新《AGI Counsel Note》、下载《Note #01 五层架构速查蓝图》，或提交下一场闭门研讨议题。
            </p>
            <div style={{ marginTop: '28px' }}>
              <NetworkBriefingForm locale="zh" />
            </div>
          </div>
          <aside>
            <span>会员邀请制同行网络</span>
            <a href="mailto:hello@agicounsel.org?subject=AGI%20Counsel%20Network%20—%20加入意向">
              hello@agicounsel.org
            </a>
            <a href="/zh/stack/" style={{ marginTop: '14px', fontSize: '12px' }}>
              浏览五层 AI 技术栈与工程词典 →
            </a>
          </aside>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark">A</span>
          <span>AGI Counsel Network</span>
        </a>
        <p>
          连接人工智能五层生态（智能体应用、基础大模型、云与 RAG 底座、算力芯片、能源基础设施）法律专业人士与系统架构师的独立同行社群。
        </p>
        <div>
          <a href="/zh/notes/ai-native-legal-department/">Note #01：AI 原生法务部门架构</a>
          <a href="/zh/stack/">五层 AI 技术栈与词典</a>
          <a href="/zh/podcast.xml">播客深读 RSS</a>
          <a href="/zh/feed.xml">笔记 RSS 订阅</a>
          <a href="/llms-full.txt">LLMs 完整索引</a>
          <a href="/sitemap.xml">站点地图 (Sitemap)</a>
          <a href="mailto:hello@agicounsel.org">hello@agicounsel.org</a>
          <span>© 2026 AGI Counsel Network</span>
        </div>
      </footer>

      {showBackToTop && (
        <button
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="返回顶部"
        >
          ↑
        </button>
      )}
    </main>
  );
}
