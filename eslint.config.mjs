// RUTA: eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Configuración de ESLint soberana y raíz para el ecosistema razvolution.
 *              v3.0.0 (Sovereign Ignores): Se implementa una directiva 'ignores' global
 *              para prevenir que el linter analice artefactos de build, cachés y dependencias.
 * @version 3.0.0
 * @author IA Arquitecto
 */
import nx from '@nx/eslint-plugin';

export default [
  // --- [INICIO DE LA CORRECCIÓN SOBERANA v3.0.0] ---
  {
    // Esta es la SSoT para los directorios ignorados en todo el monorepo.
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/tmp',
      '**/.next',
      '**/.vercel',
      '**/.verdaccio',
      '**/coverage',
      '**/*.log',
    ],
  },
  // --- [FIN DE LA CORRECCIÓN SOBERANA v3.0.0] ---
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
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [], // Eliminamos la excepción anterior, ya no es necesaria
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
