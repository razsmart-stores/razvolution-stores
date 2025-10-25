// RUTA: shared/utils/jest.config.ts
export default {
  displayName: 'utils',
  // preset: Es la clave del "Reloj Suizo". Hereda la configuración centralizada de Nx,
  // que incluye el 'moduleNameMapper' generado automáticamente a partir de los 'paths'
  // de tsconfig.base.json. Esto resuelve los alias de forma soberana.
  preset: '../../jest.preset.js',
  testEnvironment: 'node', // Lógica pura, no necesita DOM.
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/shared/utils',
};
