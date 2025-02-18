'use client';
import { useRouter } from "next/navigation";
import i18nConfig from "@/i18nConfig";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

export default function LanguageChanger() {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e.target.value;
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};${expires};path=/`;
    if (currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale  + currentPathname)
    }else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }
  };

  return (
    <select value={currentLocale} onChange={handleChange}>
      <option value="kr">한국어</option>
      <option value="ja">日本語</option>
    </select>
  );
}
