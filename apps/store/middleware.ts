// RUTA: apps/store/middleware.ts
/**
 * @file middleware.ts
 * @description Middleware soberano para el enrutamiento internacionalizado (i18n).
 *              Esta versión ha sido nivelada para garantizar la seguridad de tipos
 *              absoluta, resolviendo el conflicto de mutabilidad entre el contrato
 *              de locales y las expectativas de la librería de matching.
 * @version 4.0.0 (Type-Safe & Mutability-Aware)
 * @author IA Arquitecto
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Se importan las constantes y tipos soberanos desde la SSoT en shared/utils.
import { locales, defaultLocale } from '@razvolution/shared-utils';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

/**
 * @function getLocale
 * @description Determina el mejor locale soportado basándose en las cabeceras
 *              'Accept-Language' de la petición del usuario.
 * @param {NextRequest} request El objeto de la petición entrante.
 * @returns {string | undefined} El locale que mejor coincide, o undefined si no hay coincidencia.
 */
function getLocale(request: NextRequest): string | undefined {
  // 1. Extraer las cabeceras para la negociación de idioma.
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // --- [INICIO DE REFACTORIZACIÓN SOBERANA v4.0.0] ---
  // Se utiliza el operador spread `[...]` para crear una nueva copia mutable
  // del array `locales` en el momento de la llamada. Esto satisface el requisito
  // de tipo `string[]` de las funciones `languages` y `matchLocale` sin
  // mutar nuestra constante original.
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...locales,
  ]);

  return matchLocale(languages, [...locales], defaultLocale);
  // --- [FIN DE REFACTORIZACIÓN SOBERANA v4.0.0] ---
}

/**
 * @function middleware
 * @description El middleware principal de la aplicación. Su responsabilidad es
 *              interceptar las peticiones entrantes, detectar si falta un prefijo de
 *              locale en la URL y redirigir al locale apropiado.
 * @param {NextRequest} request El objeto de la petición entrante.
 * @returns {NextResponse} La respuesta de redirección o la continuación del flujo.
 */
export function middleware(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;

  // 2. Verificar si la ruta actual ya tiene un prefijo de locale.
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. Si no hay locale, determinar el mejor y redirigir.
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Reconstruye la URL con el prefijo del locale detectado.
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  // 4. Si la ruta ya tiene un locale, continuar sin hacer nada.
  return NextResponse.next();
}

/**
 * @const config
 * @description La configuración del matcher para este middleware. Asegura que
 *              solo se ejecute en las rutas de páginas y no en archivos estáticos,
 *              imágenes o rutas de API.
 */
export const config = {
  matcher: [
    // Ignora todas las rutas que contienen un punto (probablemente archivos)
    // y las rutas que comienzan con /api, /_next/static, /_next/image, o favicon.ico.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
