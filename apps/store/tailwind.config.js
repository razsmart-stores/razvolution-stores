// RUTA: apps/store/tailwind.config.js
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // --- [INICIO DE CONFIGURACIÓN SOBERANA DE CONTENIDO] ---
    // 1. Archivos de la propia aplicación 'store'.
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx,mdx}'),

    // 2. Archivos de las bibliotecas compartidas.
    //    Esto es CRÍTICO para que Tailwind detecte las clases usadas
    //    en nuestros componentes de @razvolution/shared-ui.
    join(__dirname, '../../shared/ui/src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../features/auth/src/**/*.{js,ts,jsx,tsx}'),
    // --- [FIN DE CONFIGURACIÓN SOBERANA DE CONTENIDO] ---
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
