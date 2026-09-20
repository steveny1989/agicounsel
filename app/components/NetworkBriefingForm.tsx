'use client';

import { FormEvent, useState } from 'react';

type Locale = 'en' | 'zh';

const BLUEPRINT_MARKDOWN = `# AGI Counsel Network — Note #01 Executive Architecture Blueprint
## What Would an AI-Native Legal Department Look Like? (2026 Reference Edition)

### 1. The Five-Layer Legal AI Value Stack
- **Layer 5 · Human-in-the-Loop (HITL) Governance**: Lawyer as Chief of Staff to specialized agent fleets; non-delegable fiduciary judgment and final signature authority.
- **Layer 4 · System of Record (SoR)**: Durable enterprise matter lifecycle state machine, contract repository, and immutable compliance audit trails (highest switching-cost moat).
- **Layer 3 · Proprietary Context & Memory**: Hybrid vector + knowledge-graph RAG with passive SOP extraction from senior counsel redlines (self-learning knowledge flywheel).
- **Layer 2 · Workflow & Agentic Orchestration**: Automated intake triage and multi-step task decomposition (Planner -> Retriever -> Verifier agents).
- **Layer 1 · Commoditized Model APIs**: Generic LLM token generation; zero defensive moat without Layers 2-5.

### 2. Three Non-Negotiable Security Guardrails
1. **Adversarial Prompt Injection Defense**: Sanitizing counterparty documents against hidden instructions.
2. **Cryptographic Data Boundary Isolation**: Zero training leakage to multi-tenant foundation models.
3. **Granular Role-Based Context Access (RBAC)**: Strict dynamic partitioning for Material Non-Public Information (MNPI).

### 3. Four Iron Laws of Enterprise Deployment
1. **Ruthless Elimination of Spectacle**: Terminate any AI feature that does not measurably compress cycle time or reduce verifiable risk.
2. **Deep Business Co-Creation**: Pair legal counsel directly with R&D, supply chain, and sales operators to define edge-case acceptance criteria.
3. **Mandatory Unified Intake Gateway**: Eliminate "dark knowledge" in fragmented chat apps; cross the 30% adoption threshold to ignite the self-learning flywheel.
4. **Graduated Autonomy**: Full agent autonomy on routine low-risk certificates; 100% human counsel accountability on high-stakes transactions.

---
Canonical URL: https://agicounsel.org/notes/ai-native-legal-department/
Contact: hello@agicounsel.org
`;

export default function NetworkBriefingForm({ locale = 'en' }: { locale?: Locale }) {
  const isZh = locale === 'zh';
  const [tab, setTab] = useState<'subscribe' | 'propose'>('subscribe');
  const [email, setEmail] = useState('');
  const [layer, setLayer] = useState('L5 · Agentic Applications & Enterprise Legal');
  const [question, setQuestion] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const triggerBlueprintDownload = () => {
    const blob = new Blob([BLUEPRINT_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AGI-Counsel-Note-01-Architecture-Blueprint.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    try {
      const saved = JSON.parse(localStorage.getItem('agicounsel_subscribers') || '[]');
      saved.push({ email: email.trim().toLowerCase(), layer, locale, ts: new Date().toISOString() });
      localStorage.setItem('agicounsel_subscribers', JSON.stringify(saved));
    } catch {
      // ignore storage errors
    }
    setSubmitted(true);
    triggerBlueprintDownload();
  };

  const handleCopyProposal = () => {
    const text = [
      `AGI Counsel Network — Peer Contribution / Membership Inquiry`,
      `Email: ${email || 'Not provided'}`,
      `Role / Organization: ${role || 'Personal capacity'}`,
      `AI Stack Layer: ${layer}`,
      `Architectural Question / Benchmark:`,
      question || '(Interested in peer roundtable participation)',
    ].join('\n');
    navigator.clipboard?.writeText(text);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const mailtoHref = `mailto:hello@agicounsel.org?subject=${encodeURIComponent(
    isZh ? `AGI Counsel 同行交流与架构议题 — ${layer}` : `AGI Counsel Peer Inquiry — ${layer}`
  )}&body=${encodeURIComponent(
    `Email: ${email}\nRole: ${role}\nStack Layer: ${layer}\n\nQuestion / Benchmark:\n${question}`
  )}`;

  return (
    <div className="network-console">
      <div className="network-console-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'subscribe'}
          onClick={() => {
            setTab('subscribe');
            setSubmitted(false);
          }}
          className={`network-console-tab ${tab === 'subscribe' ? 'is-active' : ''}`}
        >
          {isZh ? '01 · 订阅研究简报 & 下载架构蓝图' : '01 · Subscribe to Notes & Download Blueprint'}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'propose'}
          onClick={() => setTab('propose')}
          className={`network-console-tab ${tab === 'propose' ? 'is-active' : ''}`}
        >
          {isZh ? '02 · 提交研讨议题 / 申请加入社群' : '02 · Propose Roundtable Question / Request Invite'}
        </button>
      </div>

      {tab === 'subscribe' ? (
        <div className="network-console-body">
          {!submitted ? (
            <form onSubmit={handleSubscribe} className="network-form">
              <p className="network-form-lead">
                {isZh
                  ? '输入您的工作或个人邮箱，即可在新一期《AGI Counsel Note》及闭门研讨纪要发布时收到通知，并立即下载《Note #01：AI 原生法务五层架构速查蓝图》。'
                  : 'Enter your email to receive future AGI Counsel Notes and closed-door roundtable syntheses—and immediately download the Note #01 Executive Architecture Blueprint.'}
              </p>
              <div className="network-form-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isZh ? '您的邮箱地址 (如 counsel@company.com)' : 'Your email address (e.g., counsel@company.com)'}
                  className="network-input"
                  aria-label={isZh ? '邮箱地址' : 'Email address'}
                />
                <select
                  value={layer}
                  onChange={(e) => setLayer(e.target.value)}
                  className="network-select"
                  aria-label={isZh ? '所属 AI 技术栈层级' : 'Primary AI stack layer'}
                >
                  <option value="L5 · Agentic Applications & Enterprise Legal">
                    {isZh ? 'L5 · 智能体应用与企业总法务部' : 'L5 · Agentic Apps & Enterprise GC'}
                  </option>
                  <option value="L4 · Frontier Models & Alignment">
                    {isZh ? 'L4 · 前沿大模型研发与安全对齐' : 'L4 · Frontier Models & Alignment'}
                  </option>
                  <option value="L3 · Cloud, RAG & System of Record">
                    {isZh ? 'L3 · 云底座、RAG 与核心记录系统' : 'L3 · Cloud, RAG & System of Record'}
                  </option>
                  <option value="L2 · Silicon, Chips & Compute">
                    {isZh ? 'L2 · 算力芯片、先进制程与出口合规' : 'L2 · Silicon, Chips & Export Controls'}
                  </option>
                  <option value="L1 · Gigawatt Energy & Data Centers">
                    {isZh ? 'L1 · 吉瓦级能源与超大规模数据中心' : 'L1 · Gigawatt Power & Data Centers'}
                  </option>
                </select>
                <button type="submit" className="network-submit-btn">
                  {isZh ? '订阅并下载架构蓝图 ↓' : 'Subscribe & Get Blueprint ↓'}
                </button>
              </div>
              <div className="network-form-meta">
                <span>
                  {isZh
                    ? '✓ 零垃圾邮件 · 仅发送深度架构研究 · 支持一键退订'
                    : '✓ Zero spam · Peer architectural studies only · Instant blueprint download'}
                </span>
                <button type="button" onClick={triggerBlueprintDownload} className="network-text-btn">
                  {isZh ? '直接下载 Note #01 蓝图 (.md)' : 'Direct download Blueprint (.md)'}
                </button>
              </div>
            </form>
          ) : (
            <div className="network-success-box">
              <strong>
                {isZh
                  ? '✓ 已登记订阅，且《Note #01 架构蓝图》已开始下载！'
                  : '✓ Subscription registered & Note #01 Architecture Blueprint downloaded!'}
              </strong>
              <p>
                {isZh
                  ? `我们已记录您的关注层级（${layer}）。您也可以点击下方按钮直接向秘书处发送确认邮件以进入闭门邀请名单：`
                  : `Recorded for ${layer}. Click below to confirm your address directly with our peer coordinator for closed-door roundtable invitations:`}
              </p>
              <div className="network-success-actions">
                <a className="button button-light" href={mailtoHref}>
                  {isZh ? '发送同行确认邮件 (hello@agicounsel.org) ↗' : 'Confirm via Email (hello@agicounsel.org) ↗'}
                </a>
                <button type="button" onClick={triggerBlueprintDownload} className="study-ctrl-btn">
                  {isZh ? '重新下载架构蓝图' : 'Download Blueprint Again'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="network-console-body">
          <div className="network-form">
            <div className="network-form-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isZh ? '联系邮箱 (选填)' : 'Your email (optional)'}
                className="network-input"
              />
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={isZh ? '职务 / 所在技术栈领域 (如：某模型厂商法务负责人)' : 'Role / Domain (e.g., Head of AI Counsel, Semiconductor GC)'}
                className="network-input"
              />
            </div>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                isZh
                  ? '您希望在下一场闭门研讨中交流哪个具体的架构难题、Multi-Agent 治理边界或算力合规实践？'
                  : 'What architectural question, multi-agent governance boundary, or deployment benchmark would you like to discuss at the next roundtable?'
              }
              className="network-textarea"
            />
            <div className="network-form-actions">
              <a className="button button-light" href={mailtoHref}>
                {isZh ? '通过邮件客户端发送 ↗' : 'Send via Email Client ↗'}
              </a>
              <button type="button" onClick={handleCopyProposal} className="study-ctrl-btn">
                {copiedBrief
                  ? isZh
                    ? '✓ 已复制结构化申请，请粘贴发送至 hello@agicounsel.org'
                    : '✓ Copied Brief! Paste to hello@agicounsel.org'
                  : isZh
                  ? '一键复制结构化议题文本 (无需邮件客户端)'
                  : 'Copy Formatted Brief (No Mail App Needed)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
