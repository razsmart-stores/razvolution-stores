// RUTA: shared/utils/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para las utilidades del proyecto.
 * @version 13.0.0 (Architectural Purity)
 * @author IA Arquitecto
 */

// Se elimina la exportación del store para restaurar la pureza del dominio.
// export * from './lib/stores/use-workspace.store'; // <-- ELIMINADO

export * from './lib/cn';
export * from './lib/merge';
export * from './lib/constants';
export {
  pathnameHasLocale,
  getCurrentLocaleFromPathname,
} from './lib/i18n/i18n.utils';
export * from './lib/search/keyword-normalizer';
export * from './lib/text-processing/normalization';
export * from './lib/theming/theme-utils';
export * from './lib/types/actions.types';
export * from './lib/contracts/i18n.contracts';
export * from './lib/contracts/lucide-icon-names.contracts';
