// RUTA: shared/logging/src/index.ts
/**
 * @file index.ts
 * @description Fachada pública del Protocolo Heimdall.
 *              v7.2.0: Restaura la exportación del hook 'useHeimdallVitals',
 *              reparando la API pública de la biblioteca y resolviendo el
 *              TypeError en los consumidores.
 * @version 7.2.0 (Public API Restoration)
 * @author IA Arquitecto
 */
export { logger, flushTelemetryQueue, setGlobalHeimdallContext } from './lib/logger';
export * from './lib/heimdall.contracts';
export * from './lib/vitals.contracts';
export { HeimdallProvider } from './lib/HeimdallProvider';
export { useHeimdall } from './lib/use-heimdall.hook';

// --- [INICIO DE CORRECCIÓN SOBERANA v7.2.0] ---
// Se añade la exportación que faltaba para el hook de Web Vitals.
// Esta línea resuelve el error 'useHeimdallVitals is not a function'.
export { useHeimdallVitals } from './lib/use-heimdall-vitals.hook';
// --- [FIN DE CORRECCIÓN SOBERANA v7.2.0] ---
