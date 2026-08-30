'use client';

import { useEffect } from 'react';

const LANGUAGE_KEY = 'agicounsel-language';

export default function LanguageRouter() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const requestedLanguage = url.searchParams.get('lang');

    if (requestedLanguage === 'en' || requestedLanguage === 'zh') {
      try { window.localStorage.setItem(LANGUAGE_KEY, requestedLanguage); } catch {}
      url.searchParams.delete('lang');
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
      return;
    }

    if (window.location.pathname !== '/') return;

    let preferredLanguage: string | null = null;
    try { preferredLanguage = window.localStorage.getItem(LANGUAGE_KEY); } catch {}

    if (preferredLanguage === 'zh') {
      window.location.replace('/zh/');
      return;
    }
    if (preferredLanguage === 'en') return;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2000);

    fetch('https://api.country.is/', { signal: controller.signal, referrerPolicy: 'no-referrer' })
      .then((response) => {
        if (!response.ok) throw new Error('Country lookup failed');
        return response.json() as Promise<{ country?: string }>;
      })
      .then(({ country }) => {
        const language = country === 'CN' ? 'zh' : 'en';
        try { window.localStorage.setItem(LANGUAGE_KEY, language); } catch {}
        if (language === 'zh') window.location.replace('/zh/');
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timeout));

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return null;
}
