// RUTA: eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Configuración de ESLint soberana y raíz para el ecosistema razvolution.
 *              v2.0.0 (Architectural Enforcement): Se implementan restricciones de
 *              dependencia estrictas para hacer cumplir la arquitectura de capas
 *              (app > feature > shared) a nivel de linter, resolviendo violaciones
 *              de fronteras de módulos.
 * @version 2.0.0
 * @author IA Arquitecto
 */
import nx from '@nx/eslint-plugin';

export default [
  {
    files: ['**/*.json'],
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/node_modules', '**/dist', '**/tmp'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: ['scope:feature', 'scope:shared'],
            },
            {
              sourceTag: 'scope:feature',
              onlyDependOnLibsWithTags: ['scope:feature', 'scope:shared'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {},
  },
];
