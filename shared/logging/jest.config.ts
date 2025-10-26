// RUTA: shared/logging/jest.config.ts
export default {
  displayName: 'logging',
  preset: '../../jest.preset.js',
  // --- [INICIO DE CORRECCIÓN SOBERANA DE ENTORNO] ---
  // Se especifica 'jsdom' para simular un entorno de navegador (con 'window', 'localStorage', etc.),
  // lo cual es crítico para probar la lógica del lado del cliente del logger.
  testEnvironment: 'jsdom',
  // --- [FIN DE CORRECCIÓN SOBERANA DE ENTORNO] ---
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/shared/logging',
};
