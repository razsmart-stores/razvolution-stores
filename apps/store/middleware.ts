// RUTA: apps/store/middleware.ts
/**
 * @file middleware.ts
 * @description Middleware soberano para el enrutamiento internacionalizado.
 * @version 2.1.0 (Robust & Compliant)
 * @author IA Arquitecto
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@razvolution/shared-utils';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales as any;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  // --- [INICIO DE CORRECCIÓN SOBERANA v2.1.0] ---
  // Se añade el retorno explícito para cumplir con el contrato del middleware de Next.js,
  // permitiendo que la petición continúe si ya tiene un locale.
  return NextResponse.next();
  // --- [FIN DE CORRECCIÓN SOBERANA v2.1.0] ---
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
