// RUTA: shared/logging/src/lib/use-heimdall.hook.ts
/**
 * @file use-heimdall.hook.ts
 * @description Hook de efecto soberano para inicializar el pipeline de telemetría de Heimdall.
 *              v3.0.0 (Sovereign Export & Architectural Compliance): Se corrige la exportación
 *              a una nombrada y se elimina la violación de fronteras arquitectónicas.
 * @version 3.0.0
 * @author IA Arquitecto
 */
'use client';

import { useEffect, useState } from 'react';

// --- [INICIO DE CORRECCIÓN SOBERANA v3.0.0] ---
// Se corrige la importación para que sea relativa y local a la biblioteca,
// resolviendo la violación de fronteras de ESLint.
import { logger, flushTelemetryQueue } from './logger';
// --- [FIN DE CORRECCIÓN SOBERANA v3.0.0] ---

const BATCH_INTERVAL_MS = 15000;

// La exportación ahora es nombrada para cumplir con su contrato de importación.
export function useHeimdall(): void {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted || typeof window === 'undefined') return;
    setIsMounted(true);

    logger.info('[Heimdall] Protocolo de observabilidad del cliente activado.');

    const handleGlobalError = (event: ErrorEvent) => {
      logger.error('[Heimdall] Error de JavaScript no capturado.', {
        error: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    };
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logger.error('[Heimdall] Rechazo de promesa no manejado.', {
        error: {
          reason: event.reason?.message ?? 'Causa desconocida',
          stack: event.reason?.stack,
        },
      });
    };
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    const intervalId = setInterval(
      () => flushTelemetryQueue(false),
      BATCH_INTERVAL_MS
    );
    const handleBeforeUnload = () => flushTelemetryQueue(true);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection
      );
      clearInterval(intervalId);
      logger.info(
        '[Heimdall] Protocolo de observabilidad del cliente desactivado.'
      );
    };
  }, [isMounted]);
}
