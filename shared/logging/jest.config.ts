// RUTA: shared/logging/jest.config.ts
export default {
  displayName: 'logging',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleNameMapper: {
    '^@razvolution/shared-utils$': '<rootDir>/../utils/src/index.ts',
    '^@razvolution/shared-db-types$': '<rootDir>/../db-types/src/index.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/shared/logging',
};
