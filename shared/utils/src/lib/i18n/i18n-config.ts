// RUTA: apps/store/i18n-config.ts
/**
 * @file i18n-config.ts
 * @description SSoT para la configuración de locales de la aplicación.
 * @version 1.0.0 (Sovereign i18n Foundation)
 * @author IA Arquitecto (inspirado en Vercel)
 */
export const i18n = {
  defaultLocale: 'en-US',
  locales: ['en-US', 'es-ES', 'it-IT', 'pt-BR'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
