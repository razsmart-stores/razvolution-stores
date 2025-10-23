// RUTA: apps/store/postcss.config.js
/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    // --- [INICIO DE CORRECCIÓN SOBERANA DE POSTCSS] ---
    // Se corrige la configuración para usar el paquete '@tailwindcss/postcss'
    // como el plugin de PostCSS, que es el requisito para la versión
    // actual de Tailwind CSS.
    '@tailwindcss/postcss': {},
    // --- [FIN DE CORRECCIÓN SOBERANA DE POSTCSS] ---
    autoprefixer: {},
  },
};
