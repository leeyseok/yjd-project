
import Image from 'next/image';
import initTranslations from '../i18n'
import TranslationProvider from '@/components/TranslationsProvider'

const i18nNameSpaces =['home']
export default async function Home({params: {locale}}) {
  const { t, resources }  = await initTranslations(locale, i18nNameSpaces)
  return (
    <TranslationProvider resources={resources} locale={locale} namespaces={i18nNameSpaces}>
    <div className="relative h-[calc(100vh-50px)] w-full">
      <Image
        src="/asd.jpg"
        alt="logo"
        fill
        fetchPriority='high'
        className='relative'
      />
      <div className='absolute top-0 left-0 w-full h-full bg-black/50'>
        <div className="flex justify-center items-center h-full gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-bold">
            일정 만들기
          </button>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-bold">
            날짜부터 고르기
          </button>
        </div>
      </div>
    </div>
    </TranslationProvider>
  );
}
