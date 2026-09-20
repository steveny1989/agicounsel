'use client';

import { FormEvent, useState } from 'react';

type Locale = 'en' | 'zh';

// Optional Google Apps Script Web App URL for appending rows directly into a Google Sheet.
// See scripts/google-sheets-subscriber-webhook.gs for the 14-line Google Sheet script.
const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL || '';

// FormSubmit AJAX endpoint delivers every subscriber silently in the background to hello@agicounsel.org
const FORMSUBMIT_AJAX_ENDPOINT = 'https://formsubmit.co/ajax/hello@agicounsel.org';

export default function NetworkBriefingForm({ locale = 'en' }: { locale?: Locale }) {
  const isZh = locale === 'zh';
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;

    setSubmitting(true);
    setErrorMsg('');

    const payload = {
      email: cleanEmail,
      locale,
      page: typeof window !== 'undefined' ? window.location.pathname : '/notes/',
      timestamp: new Date().toISOString(),
    };

    try {
      const saved = JSON.parse(localStorage.getItem('agicounsel_subscribers') || '[]');
      saved.push(payload);
      localStorage.setItem('agicounsel_subscribers', JSON.stringify(saved));
    } catch {
      // ignore localStorage errors
    }

    try {
      const requests: Promise<unknown>[] = [
        fetch(FORMSUBMIT_AJAX_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: cleanEmail,
            language: isZh ? 'Chinese (ZH)' : 'English (EN)',
            source_page: payload.page,
            subscribed_at: payload.timestamp,
            _subject: `New AGI Counsel Notes Subscriber: ${cleanEmail}`,
            _template: 'table',
            _captcha: 'false',
          }),
        }),
      ];

      if (GOOGLE_SHEET_WEBHOOK_URL) {
        requests.push(
          fetch(GOOGLE_SHEET_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
          })
        );
      }

      await Promise.allSettled(requests);
      setSubmitted(true);
      setEmail('');
    } catch {
      setErrorMsg(
        isZh
          ? '网络请求异常，请稍后重试或直接发信至 hello@agicounsel.org。'
          : 'Network error—please try again or write to hello@agicounsel.org.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        borderTop: '1px solid #71808b',
        borderBottom: '1px solid #71808b',
        background: '#fbf9f3',
        padding: '34px',
        marginTop: '48px',
      }}
    >
      <p
        style={{
          margin: '0 0 8px',
          fontSize: '12px',
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
          fontSize: '23px',
          fontWeight: 500,
          color: '#071a2b',
          letterSpacing: '-0.02em',
        }}
      >
        {isZh ? '接收后续社群笔记与研讨摘要' : 'Receive future AGI Counsel Notes'}
      </h3>
      <p style={{ margin: '0 0 22px', fontSize: '16px', color: '#243748', lineHeight: 1.7 }}>
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
            name="email"
            required
            disabled={submitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isZh ? '您的邮箱地址 (如 counsel@company.com)' : 'Your email address (e.g., counsel@company.com)'}
            aria-label={isZh ? '邮箱地址' : 'Email address'}
            style={{
              flex: '1 1 260px',
              padding: '13px 16px',
              border: '1px solid #71808b',
              background: '#faf9f5',
              color: '#071a2b',
              fontSize: '16px',
              fontFamily: 'inherit',
              opacity: submitting ? 0.7 : 1,
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '13px 26px',
              background: '#071a2b',
              color: '#faf9f5',
              border: '1px solid #071a2b',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: submitting ? 'wait' : 'pointer',
              whiteSpace: 'nowrap',
              opacity: submitting ? 0.75 : 1,
            }}
          >
            {submitting
              ? isZh
                ? '提交中...'
                : 'Subscribing...'
              : isZh
              ? '订阅 ↗'
              : 'Subscribe ↗'}
          </button>
          {errorMsg && (
            <p style={{ width: '100%', margin: '6px 0 0', fontSize: '14px', color: '#9e2a2b' }}>
              {errorMsg}
            </p>
          )}
        </form>
      ) : (
        <p style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#071a2b' }}>
          {isZh
            ? '✓ 订阅成功 — 新一期社群笔记发布时我们将第一时间通知您。'
            : '✓ Subscribed — you will be notified when new AGI Counsel Notes are published.'}
        </p>
      )}
    </div>
  );
}
