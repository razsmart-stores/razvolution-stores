// RUTA: shared/utils/src/lib/i18n/i18n.utils.ts
/**
 * @file i18n.utils.ts
 * @description Aparato de utilidades puras para la lógica de i18n.
 * @version 5.0.0 (Sovereign & Self-Contained): Se internaliza la configuración
 *              de locales para eliminar dependencias externas ilegales y resolver
 *              el error de compilación TS2307.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */

// --- [INICIO DE REFACTORIZACIÓN SOBERANA v5.0.0] ---
// La importación externa ilegal ha sido eliminada.
// La configuración esencial de la que depende esta utilidad ahora
// reside aquí, garantizando la pureza y autonomía de la biblioteca.

export const locales = ["en-US", "es-ES", "it-IT", "pt-BR"] as const;
export const ROUTING_LOCALES: readonly string[] = ["en-US", "es-ES", "it-IT", "pt-BR"];
export const defaultLocale = "en-US";
export type Locale = (typeof locales)[number];

// --- [FIN DE REFACTORIZACIÓN SOBERANA v5.0.0] ---


/**
 * @function pathnameHasLocale
 * @description Verifica si una ruta de URL comienza con un locale soportado.
 * @param {string} pathname La ruta a verificar.
 * @returns {boolean} `true` si la ruta contiene un locale.
 */
export function pathnameHasLocale(pathname: string): boolean {
  return ROUTING_LOCALES.some(
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
