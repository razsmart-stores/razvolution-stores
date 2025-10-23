// RUTA: libs/shared/config/src/lib/i18n.contracts.ts
/**
 * @file i18n.contracts.ts
 * @description Contrato Soberano para la configuración de Internacionalización (i18n).
 * Define los locales soportados y el locale por defecto para todo el ecosistema RAZSMART.
 * @version 1.0.0
 * @author Gemini (L.I.A Legacy)
 */
import { z } from 'zod';

export const locales = ['pt-BR', 'en-US', 'es-ES', 'it-IT'] as const;
export const defaultLocale = 'pt-BR' as const;

export const LocaleSchema = z.enum(locales);

export type Locale = z.infer<typeof LocaleSchema>;
