// RUTA: shared/logging/src/lib/use-heimdall.hook.ts
/**
 * @file use-heimdall.hook.ts
 * @description Hook de efecto soberano para inicializar el pipeline de telemetría
 *              de Heimdall en el lado del cliente.
 * @version 1.0.2 - Adaptado para Monorepo
 * @author L.I.A. Legacy
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

// --- [ADAPTACIÓN DE MONOREPO] ---
// Se corrige la importación a una ruta relativa dentro de la misma biblioteca.
import { logger, flushTelemetryQueue } from "./logger";
// --- [FIN DE ADAPTACIÓN] ---

const BATCH_INTERVAL_MS = 15000;

/**
 * @function useHeimdall
 * @description Hook de efecto que activa y gestiona el ciclo de vida del
 *              emisor de telemetría de Heimdall en el navegador.
 */
export function useHeimdall(): string {
  const traceId = useMemo(() => logger.startTrace("useHeimdall_Lifecycle"), []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted || typeof window === "undefined") return;

    setIsMounted(true);
    const groupId = logger.startGroup("[Heimdall Emitter] Hook montado.", { traceId });

    const intervalId = setInterval(() => {
      flushTelemetryQueue(false);
    }, BATCH_INTERVAL_MS);

    const handleBeforeUnload = (): void => {
      flushTelemetryQueue(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(intervalId);
      logger.endGroup(groupId);
      logger.endTrace(traceId);
    };
  }, [isMounted, traceId]);

  return usePathname();
}
