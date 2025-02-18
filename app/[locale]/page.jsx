
import initTranslations from '../i18n'
import TranslationProvider from '@/components/TranslationsProvider'
import LanguageChanger from '@/components/LanguageChanger'

const i18nNameSpaces =['home']
export default async function Home({params: {locale}}) {
  const { t, resources }  = await initTranslations(locale, i18nNameSpaces)
  return (
    <TranslationProvider resources={resources} locale={locale} namespaces={i18nNameSpaces}>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{t('header')}</h1>
      <LanguageChanger />
    </div>
    </TranslationProvider>
  );
}
