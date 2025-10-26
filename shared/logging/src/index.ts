// RUTA: shared/logging/src/index.ts
/**
 * @file index.ts
 * @description Fachada pública del Protocolo Heimdall.
 *              v7.3.0 (Sovereign Type Exposure): Se expone la interfaz 'Logger'
 *              para permitir un tipado estricto en los consumidores.
 * @version 7.3.0
 * @author IA Arquitecto
 */
export { logger, flushTelemetryQueue, setGlobalHeimdallContext } from './lib/logger';
export type { Logger } from './lib/logger';
export * from './lib/heimdall.contracts';
export * from './lib/vitals.contracts';
export { HeimdallProvider } from './lib/HeimdallProvider';
export { useHeimdall } from './lib/use-heimdall.hook';
export { useHeimdallVitals } from './lib/use-heimdall-vitals.hook';
