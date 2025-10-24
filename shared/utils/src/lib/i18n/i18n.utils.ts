// RUTA: shared/utils/src/lib/i18n/i18n.utils.ts
/**
 * @file i18n.utils.ts
 * @description Aparato de utilidades puras para la lógica de i18n.
 * @version 6.1.0 (Bundler-Compliant Module Resolution)
 * @author IA Arquitecto
 */
// --- [INICIO DE CORRECCIÓN DE RESOLUCIÓN DE MÓDULO v6.1.0] ---
// Se elimina la extensión '.js' para que el empaquetador (Webpack/Turbopack)
// pueda resolver correctamente el módulo TypeScript (.ts) de origen.
import { locales, defaultLocale, type Locale } from '../contracts/i18n.contracts';
// --- [FIN DE CORRECCIÓN DE RESOLUCIÓN DE MÓDULO v6.1.0] ---

/**
 * @function pathnameHasLocale
 * @description Verifica si una ruta de URL comienza con un locale soportado.
 * @param {string} pathname La ruta a verificar.
 * @returns {boolean} `true` si la ruta contiene un locale.
 */
export function pathnameHasLocale(pathname: string): boolean {
  // Se utiliza 'locales' directamente desde el contrato importado.
  return locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
 * @function getCurrentLocaleFromPathname
 * @description Extrae el locale de una ruta de URL.
 * @param {string} pathname La ruta a analizar.
 * @returns {Locale} El locale encontrado o el locale por defecto como fallback.
 */
export function getCurrentLocaleFromPathname(pathname: string): Locale {
  if (!pathname || pathname === "/") {
    return defaultLocale;
  }

  const segments = pathname.split("/").filter(Boolean);
  const potentialLocale = segments[0] as Locale;

  if (locales.includes(potentialLocale)) {
    return potentialLocale;
  }

  return defaultLocale;
}
