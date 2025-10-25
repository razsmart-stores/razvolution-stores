// RUTA: features/workspace/jest.config.ts
/**
 * @file jest.config.ts
 * @description Configuración de Jest soberana para la biblioteca 'features/workspace'.
 *              Alineada con los presets del ecosistema Nx para habilitar
 *              la ejecución de pruebas unitarias y el cálculo de cobertura.
 * @version 1.0.0 (Sovereign Creation)
 * @author IA Arquitecto
 */
export default {
  displayName: 'features-workspace',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/features/workspace',
};
