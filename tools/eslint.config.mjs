// RUTA: tools/eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Configuración de ESLint soberana para el plugin de herramientas.
 *              Nivelado para eliminar importaciones no utilizadas y mejorar la higiene del código.
 * @version 2.1.0 (Code Hygiene)
 * @author IA Arquitecto
 */
import baseConfig from '../eslint.config.mjs';
// --- [INICIO DE REFACTORIZACIÓN DE HIGIENE DE CÓDIGO v2.1.0] ---
// Se elimina la importación no utilizada de 'nx' para cumplir con la regla
// '@typescript-eslint/no-unused-vars' y mantener la limpieza del código.
// import nx from '@nx/eslint-plugin';
// --- [FIN DE REFACTORIZACIÓN DE HIGIENE DE CÓDIGO v2.1.0] ---

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': 'off',
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  {
    ignores: ['**/out-tsc'],
  },
  {
    files: ['**/package.json'],
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
