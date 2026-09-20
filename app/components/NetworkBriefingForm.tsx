'use client';

import { FormEvent, useState } from 'react';

type Locale = 'en' | 'zh';

export default function NetworkBriefingForm({ locale = 'en' }: { locale?: Locale }) {
  const isZh = locale === 'zh';
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    try {
      const saved = JSON.parse(localStorage.getItem('agicounsel_subscribers') || '[]');
      saved.push({ email: email.trim().toLowerCase(), locale, ts: new Date().toISOString() });
      localStorage.setItem('agicounsel_subscribers', JSON.stringify(saved));
    } catch {
      // ignore storage errors
    }
    setSubmitted(true);
  };

  return (
    <div
      style={{
        borderTop: '1px solid #71808b',
        borderBottom: '1px solid #71808b',
        background: '#fbf9f3',
        padding: '32px',
        marginTop: '48px',
      }}
    >
      <p
        style={{
          margin: '0 0 8px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#ba9360',
        }}
      >
        {isZh ? '社群笔记订阅' : 'Community Notes'}
      </p>
      <h3
        style={{
          margin: '0 0 10px',
          fontSize: '22px',
          fontWeight: 400,
          color: '#071a2b',
          letterSpacing: '-0.02em',
        }}
      >
        {isZh ? '接收后续社群笔记与研讨摘要' : 'Receive future AGI Counsel Notes'}
      </h3>
      <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#71808b', lineHeight: 1.65 }}>
        {isZh
          ? '留下您的邮箱，在新一期闭门研讨笔记发布时收到通知，或直接发信至 hello@agicounsel.org 参与问题讨论。'
          : 'Enter your email to be notified when new notes from Network conversations are published, or write to hello@agicounsel.org.'}
      </p>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'stretch',
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isZh ? '您的邮箱地址' : 'Your email address'}
            aria-label={isZh ? '邮箱地址' : 'Email address'}
            style={{
              flex: '1 1 240px',
              padding: '12px 14px',
              border: '1px solid #71808b',
              background: '#faf9f5',
              color: '#071a2b',
              fontSize: '16px',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              background: '#071a2b',
              color: '#faf9f5',
              border: '1px solid #071a2b',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {isZh ? '订阅 ↗' : 'Subscribe ↗'}
          </button>
        </form>
      ) : (
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#071a2b' }}>
          {isZh ? '✓ 已记录您的邮箱，感谢关注。' : '✓ Thank you—your email has been recorded.'}
        </p>
      )}
    </div>
  );
}
