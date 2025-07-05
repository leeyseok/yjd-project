"use client";

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslation from '@/app/i18n';

interface TranslationProviderProps {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: any;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationProviderProps) {
  const i18n = createInstance();

  initTranslation(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
