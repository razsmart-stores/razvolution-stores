// RUTA: jest.preset.js
const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  verbose: true,
  // Se añade el reporter que acabas de instalar.
  reporters: ['default', 'jest-spec-reporter'],
  notify: true,
  notifyMode: 'failure-change',
  passWithNoTests: true,
};
