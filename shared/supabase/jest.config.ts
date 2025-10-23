// RUTA: jest.preset.js
const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  // --- [INICIO DE CORRECCIÓN SOBERANA v1.0] ---
  // Se añade esta propiedad para instruir a Jest a que no falle si
  // una suite de pruebas no contiene ningún archivo de test. Esto es
  // crucial para nuestro flujo de trabajo incremental, donde algunas
  // bibliotecas pueden no tener pruebas al inicio sin que esto deba
  // considerarse un error en el pipeline de CI/CD.
  passWithNoTests: true,
  // --- [FIN DE CORRECCIÓN SOBERANA v1.0] ---
};
