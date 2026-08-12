// frontend/src/i18n/I18nProvider.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dict } from './dict';

/**
 * Lightweight i18n. Three locales — English (default), Kinyarwanda, French.
 * Choice persists in localStorage so it survives reloads.
 *
 * Usage:
 *   const { t, lang, setLang } = useI18n();
 *   <h1>{t('hero.headline')}</h1>
 *
 * Missing keys fall back to English so a half-translated locale never
 * breaks the page.
 */

const STORAGE_KEY = 'sangwa.lang';

const I18nContext = createContext({
  t: (key) => key,
  lang: 'en',
  setLang: () => {},
});

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && dict[stored]) return stored;
    return 'en';
  });

  // Keep <html lang> in sync so screen readers + browser translation
  // tools (Chrome's "Translate this page") can pick it up.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    if (!dict[next]) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage might be disabled (private mode, sandbox) —
      // language just won't persist, but the app still works.
    }
  };

  const value = useMemo(() => {
    const t = (key) => {
      const fromActive = dict[lang]?.[key];
      if (fromActive) return fromActive;
      return dict.en[key] ?? key;
    };
    return { t, lang, setLang };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
