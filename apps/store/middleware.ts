// RUTA: apps/store/middleware.ts
/**
 * @file middleware.ts
 * @description Middleware soberano para el enrutamiento internacionalizado.
 * @version 2.2.0 (Sovereign Export Consumption)
 * @author IA Arquitecto
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// --- [INICIO DE CORRECCIÓN DE CONSUMO DE EXPORTACIÓN v2.2.0] ---
// Se importa 'locales' y 'defaultLocale' directamente, ya que la biblioteca
// 'shared-utils' los exporta de forma individual y no bajo un objeto 'i18n'.
import { locales, defaultLocale } from '@razvolution/shared-utils';
// --- [FIN DE CORRECCIÓN DE CONSUMO DE EXPORTACIÓN v2.2.0] ---
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as any
  );
  return matchLocale(languages, locales as any, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
