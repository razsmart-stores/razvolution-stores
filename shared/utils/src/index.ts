/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para las utilidades del proyecto.
 * @version 11.0.0 (Bundler-Compliant Module Resolution)
 * @author IA Arquitecto
 */

// Se eliminan las extensiones .js para cumplir con la resolución de módulos del empaquetador.
export * from './lib/cn';
export * from './lib/merge';
export * from './lib/constants';
export { pathnameHasLocale, getCurrentLocaleFromPathname } from './lib/i18n/i18n.utils';
export * from './lib/search/keyword-normalizer';
export * from './lib/text-processing/normalization';
export * from './lib/theming/theme-utils';
export * from './lib/types/actions.types';
export * from './lib/contracts/i18n.contracts';
export * from './lib/contracts/lucide-icon-names.contracts';
export * from './lib/stores/use-workspace.store';
