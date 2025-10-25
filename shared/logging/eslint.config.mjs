// RUTA: shared/logging/eslint.config.mjs
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  // --- [INICIO DE CORRECCIÓN SOBERANA] ---
  // Se añade la configuración de React para que ESLint pueda analizar
  // correctamente los archivos .tsx y los hooks, lo que permite a
  // @nx/dependency-checks detectar el uso de 'react' y 'web-vitals'.
  ...nx.configs['flat/react'],
  // --- [FIN DE CORRECCIÓN SOBERANA] ---
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
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
];
