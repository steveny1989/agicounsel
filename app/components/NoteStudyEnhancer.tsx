'use client';

import { useEffect, useRef, useState } from 'react';
import QuoteCardModal from './QuoteCardModal';

type Locale = 'en' | 'zh';

interface DialogueTurn {
  speakerEn: string;
  speakerZh: string;
  textEn: string;
  textZh: string;
  startEn: number;
  endEn: number;
  startZh: number;
  endZh: number;
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
    speakerEn: 'Moderator',
    speakerZh: '主持',
    textEn:
      'Welcome to the AGI Counsel audio briefing for Note #01: What would a genuinely AI-native legal department look like—and why did first-wave chat plug-ins hit a productivity paradox?',
    textZh:
      '欢迎收听 AGI Counsel 第一期研究笔记音频导读：真正的 AI 原生法务部门会是什么样？为什么早期的单点对话插件往往陷入生产力悖论？',
    startEn: 0,
    endEn: 11.77,
    startZh: 0,
    endZh: 11.01,
  },
  {
    speakerEn: 'Network Counsel',
    speakerZh: '与会法务代表',
    textEn:
      'The core finding from our roundtable is straightforward: bolting a chat assistant onto a legacy linear approval chain speeds up first-draft typing by 20%, but floods senior counsel with unverified, context-blind drafts.',
    textZh:
      '闭门研讨的核心共识非常明确：在传统串联审批链上生硬外挂一个对话插件，虽然局部提升了 20% 的初稿打字速度，却制造了大量缺乏业务上下文的半成品草稿，反而加重了资深法务的复核负担。',
    startEn: 12.12,
    endEn: 26.69,
    startZh: 11.36,
    endZh: 29.97,
  },
  {
    speakerEn: 'Moderator',
    speakerZh: '主持',
    textEn:
      'Instead of procuring more point tools, Note #01 outlines three structural shifts from legal production to legal judgment.',
    textZh:
      '因此，报告提出必须超越单纯的工具采购，完成从“法律生产”向“法律判断”的三重结构性跃迁。',
    startEn: 27.04,
    endEn: 35.25,
    startZh: 30.32,
    endZh: 39.53,
  },
  {
    speakerEn: 'Network Counsel',
    speakerZh: '与会法务代表',
    textEn:
      'First is Workflow Architecture—redesigning intake, triage, and business delivery end-to-end. Second is Institutional Memory—passively capturing senior counsel redlines into a self-learning knowledge flywheel.',
    textZh:
      '第一重跃迁是端到端工作流重构，围绕智能体重新定义业务发起与初审分流；第二重跃迁是组织记忆资产，在日常审批中无感捕获资深律师的修订底线，沉淀为自学习知识飞轮。',
    startEn: 35.6,
    endEn: 49.37,
    startZh: 39.88,
    endZh: 55.01,
  },
  {
    speakerEn: 'Moderator',
    speakerZh: '主持',
    textEn:
      'And the third shift is Human Governance: positioning the lawyer as a Chief of Staff orchestrating specialized agent fleets while holding non-delegable judgment and accountability.',
    textZh:
      '第三重跃迁则是人机治理契约：未来的律师更像统筹众多垂直智能体的参谋长，在底层安全护栏之上，牢牢守住不可委派的人类判断力与最终责任。',
    startEn: 49.72,
    endEn: 60.61,
    startZh: 55.36,
    endZh: 69.13,
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

export default function NoteStudyEnhancer({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTurn, setActiveTurn] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [bilingualMode, setBilingualMode] = useState(false);
  const [quoteModal, setQuoteModal] = useState<{ isOpen: boolean; quote: string; index: number }>({
    isOpen: false,
    quote: '',
    index: 0,
  });

  // Make every quote box (.article-quote-block) open the QuoteCardModal popup cleanly on click (without adding any extra text to the box!)
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
    const idx = DIALOGUE_TURNS.findIndex((turn) => {
      const start = isZh ? turn.startZh : turn.startEn;
      const end = isZh ? turn.endZh : turn.endEn;
      return t >= start && t <= end + 0.3;
    });
    if (idx !== -1 && idx !== activeTurn) {
      setActiveTurn(idx);
    }
  };

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const playTurnAt = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const turn = DIALOGUE_TURNS[index];
    audio.currentTime = isZh ? turn.startZh : turn.startEn;
    setActiveTurn(index);
    audio.play().catch(() => {});
    setIsPlaying(true);
  };

  const currentTurn = DIALOGUE_TURNS[activeTurn] || DIALOGUE_TURNS[0];

  return (
    <div style={{ maxWidth: bilingualMode ? '1080px' : '880px', margin: '52px auto 0', padding: '0 24px', transition: 'max-width 0.25s ease' }}>
      <audio
        ref={audioRef}
        src={isZh ? '/audio/note-01-zh.mp3' : '/audio/note-01-en.mp3'}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          setActiveTurn(0);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Clean, Minimalist Editorial Bar (Studio Neural Audio Briefing + EN/ZH Parallel Toggle) */}
      <div
        style={{
          borderTop: '1px solid #71808b',
          borderBottom: '1px solid #71808b',
          background: '#fbf9f3',
          padding: '20px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '22px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: '1 1 280px', minWidth: 0 }}>
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause audio briefing' : 'Play audio briefing'}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1px solid #071a2b',
              background: isPlaying ? '#ba9360' : '#071a2b',
              color: '#faf9f5',
              fontSize: '14px',
              cursor: 'pointer',
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
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
                {isZh ? '音频导读 · 1 分钟对谈' : 'Audio Briefing · 1 min Dialogue'}
              </span>
              <button
                type="button"
                onClick={() => setShowTranscript((prev) => !prev)}
                style={{
                  background: 'transparent',
                  border: 0,
                  padding: 0,
                  fontSize: '13.5px',
                  color: '#5a6b78',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {showTranscript
                  ? isZh
                    ? '收起文稿 ▴'
                    : 'Hide transcript ▴'
                  : isZh
                  ? '展开文稿 ▾'
                  : 'Read transcript ▾'}
              </button>
            </div>

            <p
              style={{
                margin: '5px 0 0',
                fontSize: '15.5px',
                color: '#071a2b',
                lineHeight: 1.55,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {isPlaying
                ? `${isZh ? currentTurn.speakerZh : currentTurn.speakerEn}: ${
                    isZh ? currentTurn.textZh : currentTurn.textEn
                  }`
                : isZh
                ? '收听本期闭门研讨核心摘要（工作流重构、知识飞轮与人机治理）'
                : 'Listen to a concise synthesis of the roundtable findings'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setBilingualMode((prev) => !prev)}
          style={{
            background: bilingualMode ? '#071a2b' : 'transparent',
            color: bilingualMode ? '#faf9f5' : '#071a2b',
            border: '1px solid #071a2b',
            padding: '10px 18px',
            fontSize: '12.5px',
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

      {/* Collapsible Transcript */}
      {showTranscript && (
        <div
          style={{
            borderBottom: '1px solid #71808b',
            background: '#faf9f5',
            padding: '24px 26px',
            display: 'grid',
            gap: '14px',
          }}
        >
          {DIALOGUE_TURNS.map((turn, idx) => (
            <div
              key={idx}
              onClick={() => playTurnAt(idx)}
              style={{
                padding: '12px 16px',
                borderLeft: activeTurn === idx && isPlaying ? '3px solid #ba9360' : '2px solid rgba(113,128,139,0.3)',
                background: activeTurn === idx && isPlaying ? '#fbf7f0' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#ba9360',
                  marginBottom: '6px',
                }}
              >
                {isZh ? turn.speakerZh : turn.speakerEn}
              </strong>
              <p style={{ margin: 0, fontSize: '16px', color: '#182b3c', lineHeight: 1.75 }}>
                {isZh ? turn.textZh : turn.textEn}
              </p>
            </div>
          ))}
        </div>
      )}

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
