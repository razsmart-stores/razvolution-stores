// RUTA: apps/store/get-dictionary.ts
/**
 * @file get-dictionary.ts
 * @description Aparato soberano 'server-only' para la carga de diccionarios.
 *              Nivelado para importar el tipo 'Locale' desde la SSoT en 'shared/utils'.
 * @version 2.0.0 (Sovereign Alignment)
 * @author IA Arquitecto
 */
import 'server-only';
// --- [INICIO DE ALINEACIÓN SOBERANA] ---
import type { Locale } from '@razvolution/shared-utils';
// --- [FIN DE ALINEACIÓN SOBERANA] ---

const dictionaries = {
  'en-US': () => import('./dictionaries/en-US.json').then((module) => module.default),
  'es-ES': () => import('./dictionaries/es-ES.json').then((module) => module.default),
  'it-IT': () => import('./dictionaries/en-US.json').then((module) => module.default),
  'pt-BR': () => import('./dictionaries/en-US.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    const loader = dictionaries[locale] || dictionaries['en-US'];
    return loader();
};
