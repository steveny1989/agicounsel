'use client';

import { useEffect, useRef, useState } from 'react';
import QuoteCardModal from './QuoteCardModal';

type Locale = 'en' | 'zh';

interface NarrationChapter {
  id: string;
  headingIndex: number; // -1 for intro, 0..4 for h2[0..4]
  shortZh: string;
  shortEn: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  startZh: number;
  endZh: number;
  startEn: number;
  endEn: number;
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

const NARRATION_CHAPTERS: NarrationChapter[] = [
  {
    id: 'intro',
    headingIndex: -1,
    shortZh: '00 · 导言',
    shortEn: '00 · Intro',
    titleZh: '导言：当法律分析成为丰裕的计算公用事业',
    titleEn: 'Intro: When Legal Intelligence Becomes an Abundant Utility',
    summaryZh: 'AGI Counsel Note #01 标题、核心导读与首场闭门行业交流会背景综述。',
    summaryEn: 'Full narration of the Note #01 title, executive deck, and inaugural roundtable premise.',
    startZh: 0,
    endZh: 82.97,
    startEn: 0,
    endEn: 83.81,
  },
  {
    id: 'sec-01',
    headingIndex: 0,
    shortZh: '01 · 三重跃迁',
    shortEn: '01 · Three Shifts',
    titleZh: '01 — 超越“外挂助手”悖论：从法律生产到法律判断的三重跃迁',
    titleEn: '01 — Beyond the Copilot Paradox: Three Shifts from Production to Judgment',
    summaryZh: '工作流架构重塑、组织记忆资产沉淀与人机治理契约的完整对比与解析。',
    summaryEn: 'Unabridged narration of Workflow Architecture, Institutional Memory, and Human Governance.',
    startZh: 83.57,
    endZh: 206.06,
    startEn: 84.41,
    endEn: 191.94,
  },
  {
    id: 'sec-02',
    headingIndex: 1,
    shortZh: '02 · Chief of Staff',
    shortEn: '02 · Chief of Staff',
    titleZh: '02 — 角色重塑：律师作为统筹众多 Agent 的 Chief of Staff',
    titleEn: '02 — Role Re-Engineering: The Lawyer as Chief of Staff to Multi-Agent Fleets',
    summaryZh: '多智能体分工矩阵、参谋长职责定位，以及指令注入防御、数据隔离与细粒度权限三道护栏。',
    summaryEn: 'Specialized agent fleets, Chief of Staff mandate, and the three non-negotiable technical guardrails.',
    startZh: 206.66,
    endZh: 344.43,
    startEn: 192.54,
    endEn: 319.75,
  },
  {
    id: 'sec-03',
    headingIndex: 2,
    shortZh: '03 · 自学习飞轮',
    shortEn: '03 · Self-Learning',
    titleZh: '03 — 知识架构胜于工具：系统自学习飞轮的构建',
    titleEn: '03 — Knowledge Architecture Over Tooling: The Self-Learning Imperative',
    summaryZh: '为什么静态提示词会迅速贬值，以及如何无感捕获资深法务修订逻辑构建自学习闭环。',
    summaryEn: 'Why static prompts depreciate and how senior counsel redlines compound into machine-executable SOPs.',
    startZh: 345.03,
    endZh: 421.32,
    startEn: 320.35,
    endEn: 392.76,
  },
  {
    id: 'sec-04',
    headingIndex: 3,
    shortZh: '04 · 四大铁律',
    shortEn: '04 · Four Iron Laws',
    titleZh: '04 — 一线落地实战：跨国实体企业法务转型的四大铁律',
    titleEn: '04 — Frontline Playbook: Four Pragmatic Iron Laws of Enterprise Deployment',
    summaryZh: '4万份法律文件三层知识库实战：拒绝炫技算真实 ROI、业务深度共创、强制统一入口与渐进放权。',
    summaryEn: 'The 40,000-document enterprise rollout and the Four Iron Laws of legal AI transformation.',
    startZh: 421.92,
    endZh: 583.57,
    startEn: 393.36,
    endEn: 536.21,
  },
  {
    id: 'sec-05',
    headingIndex: 4,
    shortZh: '05 · 2027 终局预判',
    shortEn: '05 · 2027 Paradigm',
    titleZh: '05 — 行业瓶颈与 2027 年终局组织范式预判',
    titleEn: '05 — Ecosystem Bottlenecks & The 2027 Institutional Paradigm',
    summaryZh: '三大行业客观瓶颈、2027 年底标杆组织预判，以及留给下一场对话的核心设问。',
    summaryEn: 'Industry bottlenecks, the 2027 institutional inflection point, and the closing strategic inquiry.',
    startZh: 584.17,
    endZh: 708.47,
    startEn: 536.81,
    endEn: 662.71,
  },
];

const PARALLEL_SECTIONS: BilingualBlock[] = [
  {
    id: 'section-01',
    tagEn: '01 · STRUCTURAL SHIFT',
    tagZh: '01 · 范式跃迁',
    titleEn: 'Beyond the Copilot Paradox: Three Shifts from Legal Production to Legal Judgment',
    titleZh: '超越“外挂助手”悖论：从法律生产到法律判断的三重跃迁',
    paragraphs: [
      {
        en: 'An AI-native legal department is not defined by the volume of software licenses it procures nor the number of API endpoints it provisions. When legal intelligence shifts from a scarce, artisanal craft to an abundant computational utility, the underlying architecture and organizational paradigm of legal work must be fundamentally re-engineered.',
        zh: 'AI 原生法务部门，绝非由其采购了多少个 AI 软件或接入了多少个 API 接口来定义。当法律分析从“昂贵的手工技艺”转变为“丰裕的计算公用事业”，企业法律工作的底层架构与组织范式必须被彻底重构。',
        quoteEn: '“AI transformation is also organizational transformation.”',
        quoteZh: '“AI 转型，本质上也是组织转型。”',
      },
      {
        en: 'Retrofitting a generic chat assistant onto a legacy, linear approval chain might accelerate first-draft speed by 20%, but it frequently inundates senior counsel with unverified, context-blind drafts. True transformation requires three shifts: (1) Workflow Architecture—from point plug-ins to end-to-end redesign; (2) Institutional Memory—from static prompt templates to compounding self-learning knowledge flywheels; and (3) Human Governance—from manual line-by-line review to accountable Chief-of-Staff orchestration.',
        zh: '在传统串联审批链条上生硬外挂一个对话助手，虽然局部提升了 20% 打字速度，却往往制造了海量未经验证的半成品草稿。真正的转型必须完成三重结构性跃迁：（1）工作流架构——从单点外挂到端到端流程重塑；（2）组织记忆资产——从静态提示词模板到持续进化的自学习知识飞轮；（3）人机治理契约——从人工逐行起草到统筹智能体梯队的参谋长模式。',
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

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function NoteStudyEnhancer({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(isZh ? 708.47 : 662.71);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [bilingualMode, setBilingualMode] = useState(false);
  const [quoteModal, setQuoteModal] = useState<{ isOpen: boolean; quote: string; index: number }>({
    isOpen: false,
    quote: '',
    index: 0,
  });

  // Make every quote box (.article-quote-block) open the QuoteCardModal popup cleanly on click
  useEffect(() => {
    const quoteBlocks = Array.from(document.querySelectorAll('.article-body .article-quote-block'));
    quoteBlocks.forEach((qb, idx) => {
      const box = qb as HTMLElement;
      const pEl = box.querySelector('p');
      if (!box.dataset.clickableBound && pEl) {
        box.dataset.clickableBound = 'true';
        box.classList.add('clickable-quote-box');
        box.onclick = () => {
          const rawQuote = (pEl.textContent || '').replace(/^[“"]|[”"]$/g, '').trim();
          setQuoteModal({ isOpen: true, quote: rawQuote, index: idx });
        };
      }
    });
  }, [isZh]);

  useEffect(() => {
    const bodyEl = document.querySelector('.article-body') as HTMLElement | null;
    if (!bodyEl) return;
    bodyEl.style.display = bilingualMode ? 'none' : '';
  }, [bilingualMode]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = audio.currentTime;
    setCurrentTime(t);
    if (audio.duration && Number.isFinite(audio.duration)) {
      setDuration(audio.duration);
    }

    const idx = NARRATION_CHAPTERS.findIndex((chap) => {
      const start = isZh ? chap.startZh : chap.startEn;
      const end = isZh ? chap.endZh : chap.endEn;
      return t >= start && t <= end + 0.6;
    });
    if (idx !== -1 && idx !== activeChapter) {
      setActiveChapter(idx);
    }
  };

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.playbackRate = playbackRate;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleCycleSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleSeek = (newTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const jumpToChapter = (index: number, scrollArticle = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    const chap = NARRATION_CHAPTERS[index];
    const targetTime = isZh ? chap.startZh : chap.startEn;
    audio.currentTime = targetTime;
    audio.playbackRate = playbackRate;
    setCurrentTime(targetTime);
    setActiveChapter(index);
    audio.play().catch(() => {});
    setIsPlaying(true);

    if (scrollArticle && !bilingualMode) {
      if (chap.headingIndex === -1) {
        const introEl = document.querySelector('.article-body .article-intro');
        introEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const headings = document.querySelectorAll('.article-body h2');
        const targetHeading = headings[chap.headingIndex];
        targetHeading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const currentChapter = NARRATION_CHAPTERS[activeChapter] || NARRATION_CHAPTERS[0];
  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div style={{ maxWidth: bilingualMode ? '1080px' : '880px', margin: '52px auto 0', padding: '0 24px', transition: 'max-width 0.25s ease' }}>
      <audio
        ref={audioRef}
        src={isZh ? '/audio/note-01-zh.mp3' : '/audio/note-01-en.mp3'}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (d && Number.isFinite(d)) setDuration(d);
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          setActiveChapter(0);
          setCurrentTime(0);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Full-Article Studio Audio Narrator Box */}
      <div
        style={{
          borderTop: '2px solid #071a2b',
          borderBottom: '1px solid #71808b',
          background: '#fbf9f3',
          padding: '22px 26px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Top Row: Play Button, Active Chapter Title, Speed & Bilingual Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 300px', minWidth: 0 }}>
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause full article narration' : 'Play full article narration'}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid #071a2b',
                background: isPlaying ? '#ba9360' : '#071a2b',
                color: '#faf9f5',
                fontSize: '15px',
                cursor: 'pointer',
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                transition: 'background 0.2s ease',
              }}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#ba9360',
                  }}
                >
                  {isZh
                    ? '全文有声朗读 · 完整收录全篇 5 大章节 (11:48)'
                    : 'Full-Article Audio Narration · Unabridged (11:03)'}
                </span>
                <span
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: '12.5px',
                    color: '#526372',
                  }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#071a2b',
                  lineHeight: 1.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {isZh ? currentChapter.titleZh : currentChapter.titleEn}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleCycleSpeed}
              title={isZh ? '切换朗读倍速' : 'Change playback speed'}
              style={{
                background: 'transparent',
                color: '#071a2b',
                border: '1px solid rgba(7, 26, 43, 0.45)',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                cursor: 'pointer',
              }}
            >
              {playbackRate}x
            </button>

            <button
              type="button"
              onClick={() => setBilingualMode((prev) => !prev)}
              style={{
                background: bilingualMode ? '#071a2b' : 'transparent',
                color: bilingualMode ? '#faf9f5' : '#071a2b',
                border: '1px solid #071a2b',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {isZh
                ? bilingualMode
                  ? '返回单语排版'
                  : 'EN ⇄ 中文 对照阅读'
                : bilingualMode
                ? 'Single Language'
                : 'EN ⇄ 中文 Parallel View'}
            </button>
          </div>
        </div>

        {/* Scrubbable Timeline Progress Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            aria-label={isZh ? '音频进度条' : 'Audio progress'}
            style={{
              width: '100%',
              accentColor: '#ba9360',
              cursor: 'pointer',
              height: '5px',
              background: `linear-gradient(to right, #ba9360 ${progressPct}%, rgba(113,128,139,0.28) ${progressPct}%)`,
            }}
          />
        </div>

        {/* Interactive Chapter Pills (Jump to any section's exact audio timestamp) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '4px',
          }}
        >
          {NARRATION_CHAPTERS.map((chap, idx) => {
            const isCurrent = activeChapter === idx;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => jumpToChapter(idx, true)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12.5px',
                  fontWeight: isCurrent ? 700 : 500,
                  background: isCurrent ? '#071a2b' : 'rgba(7, 26, 43, 0.04)',
                  color: isCurrent ? '#ba9360' : '#182b3c',
                  border: isCurrent ? '1px solid #071a2b' : '1px solid rgba(113, 128, 139, 0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                {isZh ? chap.shortZh : chap.shortEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side EN/ZH Parallel Reading View */}
      {bilingualMode && (
        <div className="bilingual-parallel-view">
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
                      <div
                        className="article-quote-block clickable-quote-box"
                        onClick={() =>
                          setQuoteModal({
                            isOpen: true,
                            quote: p.quoteEn!.replace(/^[“"]|[”"]$/g, ''),
                            index: pIdx,
                          })
                        }
                      >
                        <p>{p.quoteEn}</p>
                        <span>Roundtable Core Insight</span>
                      </div>
                    )}
                    <p>{p.en}</p>
                  </div>
                  <div className="bilingual-col" lang="zh-CN">
                    {p.quoteZh && (
                      <div
                        className="article-quote-block clickable-quote-box"
                        onClick={() =>
                          setQuoteModal({
                            isOpen: true,
                            quote: p.quoteZh!.replace(/^[“"]|[”"]$/g, ''),
                            index: pIdx,
                          })
                        }
                      >
                        <p>{p.quoteZh}</p>
                        <span>研讨核心共识</span>
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

      <QuoteCardModal
        isOpen={quoteModal.isOpen}
        onClose={() => setQuoteModal((prev) => ({ ...prev, isOpen: false }))}
        quote={quoteModal.quote}
        index={quoteModal.index}
        locale={locale}
      />
    </div>
  );
}
