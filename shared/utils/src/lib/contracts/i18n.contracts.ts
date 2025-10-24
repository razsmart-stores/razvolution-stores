/**
 * @file i18n.contracts.ts
 * @description Contrato Soberano y Única Fuente de Verdad (SSoT) para la
 *              configuración de Internacionalización (i18n).
 * @version 2.0.0 (Sovereign & Unified)
 * @author IA Arquitecto
 */
import { z } from 'zod';

/**
 * @const locales
 * @description La lista inmutable de todos los locales soportados en el ecosistema.
 */
export const locales = ['en-US', 'es-ES', 'it-IT', 'pt-BR'] as const;

/**
 * @const defaultLocale
 * @description El locale por defecto que se usará como fallback en todo el sistema.
 */
export const defaultLocale = 'en-US' as const;

/**
 * @const LocaleSchema
 * @description El esquema de Zod para validar que un string es un locale soportado.
 */
export const LocaleSchema = z.enum(locales);

/**
 * @type Locale
 * @description El tipo que representa un locale soportado.
 */
export type Locale = z.infer<typeof LocaleSchema>;
