// RUTA: shared/utils/src/lib/i18n/get-dictionary.ts
/**
 * @file get-dictionary.ts
 * @description Aparato soberano para la carga de diccionarios de i18n.
 *              Es una utilidad 'server-only' que carga dinámicamente las
 *              traducciones bajo demanda, inspirado en las mejores prácticas
 *              de Next.js para el App Router.
 * @version 1.0.0 (Sovereign i18n Loader)
 * @author IA Arquitecto
 */
import 'server-only';
import type { Locale } from './i18n.utils';

// Se mapean los locales a funciones de importación dinámica.
// Esto permite que el bundler (Webpack/Turbopack) entienda las dependencias
// sin incluir todos los archivos en todos los builds.
const dictionaries = {
  'en-US': () => import('@razvolution/shared-i18n/src/locales/en-US/auth.json').then((module) => module.default),
  'es-ES': () => import('@razvolution/shared-i18n/src/locales/es-ES/auth.json').then((module) => module.default),
  // Añade aquí otros idiomas y dominios a medida que crezcan
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] || dictionaries['en-US'];
  return loader();
};
