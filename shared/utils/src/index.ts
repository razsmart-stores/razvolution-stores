// RUTA: shared/utils/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para la biblioteca de utilidades, ahora exportando
 *              los contratos soberanos de i18n.
 * @version 6.0.0 (I18n Contract Export)
 * @author IA Arquitecto
 */

export * from './lib/cn';
export * from './lib/merge';
export * from './lib/constants';
export * from './lib/types/actions.types';
export * from './lib/stores/use-workspace.store';
export * from './lib/i18n/i18n-config'; // <-- NUEVA EXPORTACIÓN
export * from './lib/search/keyword-normalizer';
export * from './lib/text-processing/normalization';
export * from './lib/theming/theme-utils';
export * from './lib/server-encryption';
