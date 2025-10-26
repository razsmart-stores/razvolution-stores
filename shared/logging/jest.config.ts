// RUTA: shared/logging/jest.config.ts
export default {
  displayName: 'logging',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom', // Asegura la simulación del navegador
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/shared/logging',
};
