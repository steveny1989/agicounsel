'use client';

import { useEffect, useRef, useState } from 'react';

type Locale = 'en' | 'zh';

interface DialogueTurn {
  speaker: string;
  role: string;
  textEn: string;
  textZh: string;
}

interface QAItem {
  qEn: string;
  qZh: string;
  aEn: string;
  aZh: string;
}

interface BilingualBlock {
  id: string;
  tagEn: string;
  tagZh: string;
  titleEn: string;
  titleZh: string;
  paragraphs: Array<{
    en: string;
    zh: string;
    quoteEn?: string;
    quoteZh?: string;
  }>;
}

const DIALOGUE_TURNS: DialogueTurn[] = [
  {
    speaker: 'Sarah / 林薇',
    role: 'Host · Ecosystem Strategist',
    textEn:
      'Welcome to the AGI Counsel Deep Dive. Today we are unpacking Note #01: What would a genuinely AI-native legal department look like—and why did 80% of first-wave Legal Copilot pilots hit a wall?',
    textZh:
      '欢迎收听 AGI Counsel 播客深读。今天我们拆解 Note #01 核心报告：真正的“AI 原生法务部门”究竟长什么样？为什么过去两年绝大多数外挂式 Copilot 试点最终陷入了生产力悖论？',
  },
  {
    speaker: 'Yao Di / 姚迪',
    role: 'Systems Counsel',
    textEn:
      'The core finding from our 100-day simulation and closed-door roundtable is simple: bolting a Layer-1 chat assistant onto a legacy linear approval chain speeds up typing by 20%, but floods senior counsel with unverified, context-blind drafts.',
    textZh:
      '基于 100 天 AI 原生组织模拟和闭门同行研讨，结论非常明确：在传统串联审批流上硬塞一个 Layer 1 对话插件，虽然打字快了 20%，却制造了海量缺乏上下文的半成品草稿，反而加重了资深法务的复核风险。',
  },
  {
    speaker: 'Sarah / 林薇',
    role: 'Host · Ecosystem Strategist',
    textEn:
      'And that leads directly to the Five-Layer Legal AI Value Stack. Where does durable enterprise value actually sit?',
    textZh:
      '这就引出了报告最核心的“Legal AI 五层价值阶梯”。真正的企业级壁垒究竟在哪一层？',
  },
  {
    speaker: 'Yao Di / 姚迪',
    role: 'Systems Counsel',
    textEn:
      'Layer 1—raw model APIs—is rapidly commoditizing with zero moat. Real leverage starts at Layer 2, re-engineering end-to-end intake and multi-agent triage; Layer 3, building a self-learning knowledge flywheel from senior counsel edits; and Layer 4, owning the durable System of Record.',
    textZh:
      'Layer 1 的通用模型 API 正在快速商品化，毫无防御壁垒。真正的护城河始于 Layer 2 的端到端工作流与多 Agent 拆解、Layer 3 从资深律师修订痕迹中自学习的专有知识架构，以及 Layer 4 占领高转换壁垒的核心记录系统（System of Record）。',
  },
  {
    speaker: 'Sarah / 林薇',
    role: 'Host · Ecosystem Strategist',
    textEn:
      'And at Layer 5, the human lawyer becomes a Chief of Staff orchestrating fleets of specialized agents—guarded by prompt-injection defense, zero-training data isolation, and granular MNPI access controls.',
    textZh:
      '而在最高层 Layer 5，人类律师蜕变为统筹垂直 Agent 集群的参谋长（Chief of Staff）——在底层刚性部署防指令注入、零训练泄漏物理隔离与细粒度 MNPI 权限管控，牢牢守住不可委派的终极签字权。',
  },
];

const PODCAST_QAS: QAItem[] = [
  {
    qEn: 'Why do thin Layer-1 Legal Copilot wrappers fail in production?',
    qZh: '为什么薄套壳的 Layer 1 法律 Copilot 插件在生产环境中容易失效？',
    aEn: 'Because complex legal review is a multi-hop state problem, not a single-turn text completion problem. Without Layer-2 task decomposition (Planner → Retriever → Verifier agents) and Layer-3 institutional precedent, single-prompt wrappers hallucinate subtle indemnification and regulatory edge cases.',
    aZh: '因为复杂的商业法务审查是多跳状态推演，而非单轮文本续写。如果缺乏 Layer 2 的多步子任务颗粒度拆解（规划 → 检索 → 校验 Agent）与 Layer 3 的企业历史判例库支撑，单轮套壳工具极易在赔偿上限、管辖权与数据出境等关键红线上产生隐性幻觉。',
  },
  {
    qEn: 'How did the multinational manufacturing case study achieve >95% accuracy in 4 months?',
    qZh: '案例中的跨国制造巨头是如何在 4 个月内实现高频场景 95% 以上准确率的？',
    aEn: 'By cleaning 40,000 core legal documents into a 3-tier knowledge architecture (Statutory Baseline → Corporate Policy → Clause Playbooks), mandating a single unified intake gateway to eliminate "dark knowledge" in chat apps, and co-creating acceptance criteria directly with frontline supply chain and R&D teams.',
    aZh: '核心在于三步工程实操：第一，将 4 万份核心法律文件清洗为“法规底座—公司制度—条款实操手册”三层知识架构；第二，强制设立统一智能法务入口，消灭散落在群聊中的“暗知识”；第三，法务与研发、供应链一线结对共创边界验收标准。',
  },
  {
    qEn: 'What is the "30% Adoption Threshold" and why does it matter?',
    qZh: '什么是“30% 组织渗透率生死线”？为什么它决定了转型成败？',
    aEn: 'Organizational telemetry shows that when fewer than 30% of matter workflows pass through the AI workspace, the knowledge flywheel starves of human feedback annotations. Once adoption crosses 30%, passive SOP extraction from senior counsel redlines compounds accuracy across the entire department.',
    aZh: '组织工程遥测表明：当智能工作台在日常涉法需求中的渗透率低于 30% 时，知识飞轮缺乏足够的人工修订反馈样本；一旦跨过 30% 临界点，从资深律师红线批注中自动蒸馏 SOP 的自学习闭环就会产生跨团队的准确率复利效应。',
  },
];

const PARALLEL_SECTIONS: BilingualBlock[] = [
  {
    id: 'section-01',
    tagEn: '01 · ARCHITECTURE',
    tagZh: '01 · 架构演进',
    titleEn: 'Beyond the Wrapper Trap: The Five-Layer Legal AI Stack',
    titleZh: '认知升维：打破套壳陷阱与 Legal AI 五层价值阶梯',
    paragraphs: [
      {
        en: 'An AI-native legal department is not defined by the volume of software licenses it procures nor the number of API endpoints it provisions. When legal intelligence shifts from a scarce, artisanal craft to an abundant computational utility, the underlying architecture and organizational paradigm of legal work must be fundamentally re-engineered.',
        zh: 'AI 原生法务部门，绝非由其采购了多少个 AI 软件或接入了多少个 API 接口来定义。当法律分析从“昂贵的手工技艺”转变为“丰裕的计算公用事业”，企业法律工作的底层架构与组织范式必须被彻底重构。',
        quoteEn: '“AI transformation is also organizational transformation.”',
        quoteZh: '“AI 转型，本质上也是组织转型。”',
      },
      {
        en: 'Retrofitting a generic LLM assistant onto a legacy, linear approval chain might accelerate drafting speed by 20%, but it frequently inundates senior counsel with unverified, semi-hallucinated drafts—compounding review friction. The Five-Layer Legal AI Value Stack progresses from Layer 1 (Commoditized Model API) → Layer 2 (Workflow Redesign) → Layer 3 (Proprietary Context & RAG) → Layer 4 (System of Record) → Layer 5 (Human-in-the-Loop Chief of Staff).',
        zh: '在传统串联审批链条上生硬外挂一个 Copilot 助手，虽然局部提升了 20% 打字速度，却往往制造了海量未经验证的“半成品”草稿，反而加重了资深法务的复核负担。Legal AI 五层价值模型自下而上依次为：Layer 1（通用算力 API）→ Layer 2（业务工作流重塑）→ Layer 3（专有知识网络与 RAG）→ Layer 4（核心记录系统 SoR）→ Layer 5（人机混合协同中枢）。',
      },
    ],
  },
  {
    id: 'section-02',
    tagEn: '02 · GOVERNANCE',
    tagZh: '02 · 人机分工',
    titleEn: 'Role Re-Engineering: The Lawyer as Chief of Staff to Multi-Agent Fleets',
    titleZh: '角色重塑：律师作为统筹众多 Agent 的 Chief of Staff',
    paragraphs: [
      {
        en: 'Modern corporate counsel does not interact with a single conversational prompt box. Rather, they orchestrate an interconnected fleet of specialized, autonomous agents—first-pass NDA triage agents, cross-border data transfer compliance monitors, M&A disclosure variance trackers, and discovery engines.',
        zh: '现代企业法务面临的不是一个通用的“聊天框”，而是一整支由垂直 Agent 组成的数字执行梯队——包括标准 NDA 初审 Agent、跨法域数据出境扫描 Agent、投融资条款偏离度预警 Agent 以及海量公文检索 Agent。',
        quoteEn: '“The lawyer of the future will be a Chief of Staff orchestrating fleets of agents.”',
        quoteZh: '“未来的律师，更像统筹众多 Agent 的 Chief of Staff。”',
      },
      {
        en: 'Delegating operational latitude to multi-agent fleets requires three non-negotiable technical guardrails: (1) Adversarial Prompt Injection Defense against hidden instructions in counterparty documents; (2) Cryptographic Data Boundary Isolation with zero training leakage; and (3) Granular Role-Based Context Access (RBAC) protecting Material Non-Public Information (MNPI).',
        zh: '赋予智能体集群自主权必须在底层部署三道刚性技术护栏：（1）防范相对方文档隐藏恶意指令的提示词注入防御（Prompt Injection Defense）；（2）确保商业秘密零训练泄漏的数据物理隔离；（3）针对未公开重大信息（MNPI）与涉密并购的细粒度权限隔离（Granular Context RBAC）。',
      },
    ],
  },
  {
    id: 'section-03',
    tagEn: '03 · DATA ENGINE',
    tagZh: '03 · 数据引擎',
    titleEn: 'Knowledge Architecture Over Tooling: The Self-Learning Imperative',
    titleZh: '知识架构胜于工具：系统自学习飞轮的构建',
    paragraphs: [
      {
        en: 'Static prompt templates depreciate rapidly as base frontier models iterate. A true self-learning flywheel passively captures the reasoning context whenever senior counsel amends or overrules an agent recommendation, distilling human edits into machine-executable Standard Operating Procedures (SOPs).',
        zh: '静态 Prompt 技巧会随模型迭代迅速贬值。真正的自学习闭环要求：当资深法务修改或驳回 Agent 初审意见时，系统无感捕获人工裁量的商业语境与推理逻辑，自动蒸馏为标准操作规程（SOP）并反哺至专有知识层。',
        quoteEn: '“A truly valuable system must be able to learn.”',
        quoteZh: '“真正有价值的系统，一定要能够自学习。”',
      },
    ],
  },
  {
    id: 'section-04',
    tagEn: '04 · PLAYBOOK',
    tagZh: '04 · 实战心法',
    titleEn: 'Frontline Playbook: Four Pragmatic Iron Laws of Enterprise Deployment',
    titleZh: '一线落地实战：跨国实体企业法务转型的四大铁律',
    paragraphs: [
      {
        en: 'From structuring 40,000 corporate legal documents into a three-tier knowledge hierarchy with >95% production accuracy emerged Four Iron Laws: (1) Ruthless elimination of technical spectacle in favor of measurable cycle-time ROI; (2) Deep frontline business co-creation; (3) A mandatory unified intake gateway to eliminate "dark knowledge"; and (4) Graduated autonomy with non-delegable human accountability on high-stakes matters.',
        zh: '从梳理 4 万份核心法律文件搭建三层知识库、实现高频场景 95% 以上准确率的实战中，沉淀出四大铁律：（1）坚决拒绝技术炫技，只算业务真实 ROI；（2）法务与研发、供应链、销售一线深度结对共创；（3）强制统一工作台入口，终结群聊“暗知识”流失；（4）场景渐进放权，重大交易与监管问询 100% 守住人类法务终审底线。',
        quoteEn: '“AI is a business problem first, and a technology problem second. Build for real value—not technical spectacle.”',
        quoteZh: '“AI 首先是业务问题，其次才是技术问题。要创造真实价值，不做技术炫技。”',
      },
    ],
  },
  {
    id: 'section-05',
    tagEn: '05 · HORIZONS',
    tagZh: '05 · 中长周期',
    titleEn: 'Ecosystem Bottlenecks & The 2027 Institutional Paradigm',
    titleZh: '行业瓶颈与 2027 年终局组织范式预判',
    paragraphs: [
      {
        en: 'Because legal workflows carry the highest semantic density and touch R&D, supply chain, revenue, and global compliance simultaneously, an AI-native legal department acts as the risk and governance cockpit for the entire enterprise. The first definitive benchmark paradigms will crystallize before the end of 2027.',
        zh: '法务工作天然具备最高语义密度，并贯穿研发、供应链、销售与全球合规全生命周期。率先实现 AI 原生化的法务部门将成为全公司的风险与治理驾驶舱，行业首批标杆性人机混合法务组织将在 2027 年底前正式定型。',
      },
    ],
  },
];

const GLOSSARY_TERMS = [
  {
    term: 'System of Record (SoR)',
    layer: 'Layer 4',
    en: 'The authoritative enterprise repository capturing end-to-end matter state, contract execution history, and audit trails—creating the deepest switching-cost moat.',
    zh: '沉淀案件生命周期、合同履约状态机与合规决策轨迹的权威底层系统，具备极高的转换壁垒。',
  },
  {
    term: 'Chief of Staff Topology',
    layer: 'Layer 5',
    en: 'Operating paradigm where human counsel stop drafting routine clauses manually and instead define risk rubrics, orchestrate specialized agent fleets, and adjudicate edge cases.',
    zh: '人类律师从手工改合同转向制定风控标尺、统筹垂直 Agent 梯队并裁决复杂商业博弈的组织范式。',
  },
  {
    term: 'Multi-Agent Decomposition',
    layer: 'Layer 2',
    en: 'Breaking monolithic legal tasks into deterministic pipelines (Intake Triage → Clause Extraction → Policy RAG → Verification Agent) to eliminate single-prompt hallucination.',
    zh: '将复杂法务审查拆解为“分流 → 抽取 → 法规比对 → 交叉校验”多智能体流水线，解决单轮对话幻觉。',
  },
  {
    term: 'Self-Learning Knowledge Flywheel',
    layer: 'Layer 3',
    en: 'Passively capturing senior counsel redlines and rejections to automatically distill machine-executable SOPs and update proprietary RAG context.',
    zh: '无感捕获资深律师对 Agent 初审意见的修订与驳回理由，自动蒸馏为可执行 SOP 反哺私有知识库。',
  },
  {
    term: 'Granular Context RBAC (MNPI)',
    layer: 'Security',
    en: 'Role-based dynamic context partitioning ensuring Material Non-Public Information (MNPI) and sensitive M&A data rooms are never exposed to unauthorized internal agents.',
    zh: '基于角色的动态上下文加载隔离，防止未公开重大信息（MNPI）或涉密并购数据被内部智能体越权调阅。',
  },
  {
    term: 'Adversarial Prompt Injection Defense',
    layer: 'Security',
    en: 'Input sanitization and sandboxed verification preventing counterparty contracts from embedding hidden instructions that manipulate internal review agents.',
    zh: '防范外部交易对手在合同或附件中嵌入不可见的对抗性提示词、诱导内部审查智能体越界的安全护栏。',
  },
];

export default function NoteStudyEnhancer({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh';
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTurn, setActiveTurn] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<1 | 1.25 | 1.5>(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeQA, setActiveQA] = useState<number | null>(null);
  const [bilingualMode, setBilingualMode] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [copiedState, setCopiedState] = useState<'none' | 'link' | 'md'>('none');
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const synthCancelRef = useRef(false);

  const tocItems = isZh
    ? [
        '01 · Legal AI 五层价值阶梯',
        '02 · 律师作为 Agent 参谋长',
        '03 · 自学习知识飞轮构建',
        '04 · 企业落地实战四大铁律',
        '05 · 2027 终局组织范式预判',
      ]
    : [
        '01 · Five-Layer Legal AI Stack',
        '02 · Lawyer as Chief of Staff',
        '03 · Self-Learning Flywheel',
        '04 · Four Iron Laws of Rollout',
        '05 · 2027 Institutional Paradigm',
      ];

  // Assign stable IDs to the article's H2 headings and observe scroll position + add permalink copy buttons
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.article-body h2'));
    headings.forEach((h, i) => {
      const id = `section-0${i + 1}`;
      h.id = id;
      if (!h.querySelector('.heading-anchor-btn')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'heading-anchor-btn';
        btn.title = isZh ? '复制本节链接' : 'Copy section link';
        btn.textContent = '#';
        btn.onclick = () => {
          const url = `${window.location.origin}${window.location.pathname}#${id}`;
          navigator.clipboard?.writeText(url);
          btn.textContent = '✓';
          setTimeout(() => {
            btn.textContent = '#';
          }, 1500);
        };
        h.appendChild(btn);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = headings.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSectionIdx(idx);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0.1 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [isZh]);

  // Toggle visibility of original single-language .article-body when Side-by-Side Bilingual Mode is active
  useEffect(() => {
    const bodyEl = document.querySelector('.article-body') as HTMLElement | null;
    if (!bodyEl) return;
    bodyEl.style.display = bilingualMode ? 'none' : '';
  }, [bilingualMode]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text: string, onEndCallback?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isZh ? 'zh-CN' : 'en-US';
    utterance.rate = playbackRate;
    utterance.onend = () => {
      if (!synthCancelRef.current && onEndCallback) {
        onEndCallback();
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const playTurnAt = (index: number) => {
    if (index >= DIALOGUE_TURNS.length) {
      setIsPlaying(false);
      setActiveTurn(0);
      return;
    }
    synthCancelRef.current = false;
    setActiveQA(null);
    setActiveTurn(index);
    setIsPlaying(true);
    const turn = DIALOGUE_TURNS[index];
    speakText(isZh ? turn.textZh : turn.textEn, () => {
      playTurnAt(index + 1);
    });
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      synthCancelRef.current = true;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      playTurnAt(activeTurn);
    }
  };

  const handlePlayQA = (idx: number) => {
    synthCancelRef.current = false;
    setActiveQA(idx);
    setIsPlaying(true);
    const qa = PODCAST_QAS[idx];
    const fullText = isZh ? `${qa.qZh}。${qa.aZh}` : `${qa.qEn}. ${qa.aEn}`;
    speakText(fullText, () => {
      setIsPlaying(false);
    });
  };

  const handleCycleSpeed = () => {
    const nextSpeed = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextSpeed);
  };

  const handleCopyMarkdown = () => {
    const mdLines = [
      `# ${isZh ? 'AI 原生法务部门会是什么样？ (AGI Counsel Note #01)' : 'What Would an AI-Native Legal Department Look Like? (AGI Counsel Note #01)'}`,
      `Source: https://agicounsel.org${isZh ? '/zh' : ''}/notes/ai-native-legal-department/`,
      '',
      ...PARALLEL_SECTIONS.map((s) =>
        [
          `## ${isZh ? s.titleZh : s.titleEn}`,
          ...s.paragraphs.map((p) => (isZh ? p.zh : p.en)),
          '',
        ].join('\n\n')
      ),
    ].join('\n');
    navigator.clipboard?.writeText(mdLines);
    setCopiedState('md');
    setTimeout(() => setCopiedState('none'), 2200);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedState('link');
    setTimeout(() => setCopiedState('none'), 2200);
  };

  const jumpToSection = (idx: number) => {
    const targetId = `section-0${idx + 1}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionIdx(idx);
    }
  };

  return (
    <div className="note-study-enhancer-wrap">
      {/* 1. Executive Study Toolbar (Sticky TOC Jump + EN/ZH Parallel Toggle + Glossary + LLM Copy + PDF Print) */}
      <div className="study-utility-bar">
        <div className="study-utility-inner">
          <div className="study-toc-pills" role="navigation" aria-label={isZh ? '章节导航' : 'Section navigation'}>
            {tocItems.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => jumpToSection(idx)}
                className={`study-toc-pill ${activeSectionIdx === idx ? 'is-active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="study-action-controls">
            <button
              type="button"
              onClick={() => setBilingualMode((prev) => !prev)}
              className={`study-ctrl-btn ${bilingualMode ? 'is-active' : ''}`}
            >
              <span>⇄</span>
              {isZh
                ? bilingualMode
                  ? '退出中英对照'
                  : 'EN ⇄ 中文 双语对照'
                : bilingualMode
                ? 'Single Language'
                : 'EN ⇄ 中文 Parallel View'}
            </button>

            <button
              type="button"
              onClick={() => setGlossaryOpen((prev) => !prev)}
              className={`study-ctrl-btn ${glossaryOpen ? 'is-active' : ''}`}
            >
              <span>◈</span>
              {isZh ? '架构术语词典 (6)' : 'Tech Glossary (6)'}
            </button>

            <button type="button" onClick={handleCopyMarkdown} className="study-ctrl-btn">
              {copiedState === 'md'
                ? isZh
                  ? '✓ 已复制 Markdown'
                  : '✓ Copied Markdown'
                : isZh
                ? '复制全文 (供 LLM 分析)'
                : 'Copy Markdown for LLM'}
            </button>

            <button type="button" onClick={() => window.print()} className="study-ctrl-btn">
              {isZh ? '打印 / 导出 PDF' : 'Print / Save PDF'}
            </button>

            <button type="button" onClick={handleCopyLink} className="study-ctrl-btn">
              {copiedState === 'link' ? (isZh ? '✓ 链接已复制' : '✓ Link Copied') : isZh ? '分享链接' : 'Share'}
            </button>
          </div>
        </div>
      </div>

      <div className="note-enhancer-container">
        {/* 2. Deep Dive Podcast Audio Player (Ported from theyaodi.com NotebookLMPodcastPlayer) */}
        <div className="deep-dive-player">
          <div className="deep-dive-bar">
            <div className="deep-dive-left">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="deep-dive-play-btn"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <div className="deep-dive-meta">
                <div className="deep-dive-title-row">
                  <strong>
                    {activeQA !== null
                      ? isZh
                        ? `延伸问答 0${activeQA + 1}`
                        : `Q&A 0${activeQA + 1}`
                      : isZh
                      ? '播客深读'
                      : 'Deep Dive Podcast'}
                  </strong>
                  <span className="deep-dive-hosts">
                    · {isZh ? '林薇 × 姚迪 · 5 分钟音频导读' : 'Sarah × Yao Di · 5 min Executive Audio Briefing'}
                  </span>
                </div>
                <p className="deep-dive-subtitle">
                  {isPlaying
                    ? activeQA !== null
                      ? isZh
                        ? PODCAST_QAS[activeQA].qZh
                        : PODCAST_QAS[activeQA].qEn
                      : isZh
                      ? `${DIALOGUE_TURNS[activeTurn].speaker}：${DIALOGUE_TURNS[activeTurn].textZh}`
                      : `${DIALOGUE_TURNS[activeTurn].speaker}: ${DIALOGUE_TURNS[activeTurn].textEn}`
                    : isZh
                    ? '用几分钟双人对谈拆解本文五层架构与落地铁律 · 点击播放或展开问答'
                    : 'Conversational walkthrough of the 5-Layer Legal AI Stack & rollout playbook'}
                </p>
              </div>
            </div>

            <div className="deep-dive-right">
              <a
                href={isZh ? '/zh/podcast.xml' : '/podcast.xml'}
                target="_blank"
                rel="noopener noreferrer"
                className="deep-dive-pill-btn"
                title="Podcast RSS Feed"
              >
                RSS
              </a>
              <button type="button" onClick={handleCycleSpeed} className="deep-dive-pill-btn">
                {playbackRate}x
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen((prev) => !prev)}
                className={`deep-dive-drawer-btn ${drawerOpen ? 'is-open' : ''}`}
              >
                <span>{isZh ? '问答 & 文稿' : 'Q&A & Transcript'}</span>
                <span>{drawerOpen ? '▴' : '▾'}</span>
              </button>
            </div>
          </div>

          {drawerOpen && (
            <div className="deep-dive-drawer">
              <div className="deep-dive-qa-section">
                <p className="deep-dive-section-label">
                  {isZh ? '核心延伸追问（点击可直接语音播报）' : 'Executive Follow-Up Q&A (Click to Listen)'}
                </p>
                <div className="deep-dive-qa-grid">
                  {PODCAST_QAS.map((qa, idx) => (
                    <div
                      key={qa.qEn}
                      className={`deep-dive-qa-card ${activeQA === idx && isPlaying ? 'is-playing' : ''}`}
                    >
                      <div className="deep-dive-qa-head">
                        <strong>{isZh ? qa.qZh : qa.qEn}</strong>
                        <button type="button" onClick={() => handlePlayQA(idx)} className="deep-dive-mini-play">
                          {activeQA === idx && isPlaying ? (isZh ? '播报中...' : 'Playing...') : isZh ? '▶ 听解答' : '▶ Listen'}
                        </button>
                      </div>
                      <p>{isZh ? qa.aZh : qa.aEn}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="deep-dive-transcript-section">
                <p className="deep-dive-section-label">
                  {isZh ? '对谈实录（点击任意段落跳转播报）' : 'Synchronized Dialogue Transcript (Click any turn to play)'}
                </p>
                <div className="deep-dive-turns">
                  {DIALOGUE_TURNS.map((turn, idx) => (
                    <div
                      key={idx}
                      onClick={() => playTurnAt(idx)}
                      className={`deep-dive-turn ${activeTurn === idx && isPlaying && activeQA === null ? 'is-active' : ''}`}
                    >
                      <span className="deep-dive-speaker">{turn.speaker}</span>
                      <p>{isZh ? turn.textZh : turn.textEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Expandable Legal AI Engineering Glossary Drawer */}
        {glossaryOpen && (
          <div className="study-glossary-panel">
            <div className="study-glossary-header">
              <div>
                <span className="kicker">{isZh ? '核心工程原语词典' : 'Legal AI Systems Taxonomy'}</span>
                <h3>{isZh ? '本文核心架构术语对照 (EN / 中文)' : 'Core Architectural Primitives Defined'}</h3>
              </div>
              <button type="button" onClick={() => setGlossaryOpen(false)} className="study-glossary-close">
                ×
              </button>
            </div>
            <div className="study-glossary-grid">
              {GLOSSARY_TERMS.map((item) => (
                <div key={item.term} className="study-glossary-card">
                  <div className="study-glossary-top">
                    <strong>{item.term}</strong>
                    <span className="arch-badge">{item.layer}</span>
                  </div>
                  <p>{isZh ? item.zh : item.en}</p>
                  <small className="study-glossary-sub">{isZh ? item.en : item.zh}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Side-by-Side EN ⇄ ZH Parallel Reading View (when activated) */}
        {bilingualMode && (
          <div className="bilingual-parallel-view">
            <div className="bilingual-banner">
              <div>
                <strong>
                  {isZh
                    ? 'EN ⇄ 中文 双语平行对照模式已开启'
                    : 'EN ⇄ 中文 Side-by-Side Parallel Reading Mode Active'}
                </strong>
                <span>
                  {isZh
                    ? '跨法域团队可逐章对照中英文核心架构定义、五层价值阶梯与四大落地铁律。'
                    : 'Aligning English and Chinese architectural definitions, value layers, and enterprise rollout laws side-by-side.'}
                </span>
              </div>
              <button type="button" onClick={() => setBilingualMode(false)} className="study-ctrl-btn is-active">
                {isZh ? '返回单语排版' : 'Exit Parallel View'}
              </button>
            </div>

            {PARALLEL_SECTIONS.map((sec) => (
              <section key={sec.id} id={sec.id} className="bilingual-section-block">
                <div className="bilingual-row bilingual-row-head">
                  <div className="bilingual-col">
                    <span className="article-section-tag">{sec.tagEn}</span>
                    <h2>{sec.titleEn}</h2>
                  </div>
                  <div className="bilingual-col" lang="zh-CN">
                    <span className="article-section-tag">{sec.tagZh}</span>
                    <h2>{sec.titleZh}</h2>
                  </div>
                </div>

                {sec.paragraphs.map((p, pIdx) => (
                  <div key={pIdx} className="bilingual-row">
                    <div className="bilingual-col">
                      {p.quoteEn && (
                        <div className="article-quote-block">
                          <p>{p.quoteEn}</p>
                        </div>
                      )}
                      <p>{p.en}</p>
                    </div>
                    <div className="bilingual-col" lang="zh-CN">
                      {p.quoteZh && (
                        <div className="article-quote-block">
                          <p>{p.quoteZh}</p>
                        </div>
                      )}
                      <p>{p.zh}</p>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
