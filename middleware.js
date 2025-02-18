import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';

export function middleware(request){
    return i18nRouter(request, i18nConfig)
}

// 앱 디랙토리만 적용
export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
  };