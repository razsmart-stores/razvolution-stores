// RUTA: apps/store/next.config.js
/**
 * @file next.config.js
 * @description Archivo de configuración soberano para la aplicación Next.js 'store'.
 *              Utiliza el plugin 'with-nx' para una integración correcta con el
 *              ecosistema Nx.
 * @version 1.0.0 (Sovereign Creation)
 * @author IA Arquitecto
 */
const { withNx } = require('@nx/next/plugins/with-nx');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  nx: {
    // Esta opción permite a Nx cachear la salida de la compilación de Next.js.
    svgr: false,
  },
  compiler: {
    // Habilita la eliminación de props de test 'data-testid' en producción.
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withNx(nextConfig);
