// RUTA: shared/logging/src/lib/use-heimdall-vitals.hook.ts
/**
 * @file use-heimdall-vitals.hook.ts
 * @description Hook de efecto soberano para la captura de métricas Core Web Vitals.
 *              Alineado con el estándar actual (INP en lugar de FID) y con las
 *              fronteras arquitectónicas del monorepo.
 * @version 2.0.0 (INP Alignment & Architectural Boundary Compliance)
 * @author IA Arquitecto
 */
'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

// --- [INICIO DE CORRECCIÓN SOBERANA DEFINITIVA v2.0.0] ---
// Esta importación relativa es la solución al error "@nx/enforce-module-boundaries".
// Resuelve la dependencia ilegal con la capa 'apps'.
import { logger } from './logger';
// --- [FIN DE CORRECCIÓN SOBERANA DEFINITIVA v2.0.0] ---
import { VitalsMetricSchema } from './vitals.contracts';

/**
 * @function useHeimdallVitals
 * @description Activa los listeners para todas las métricas de Core Web Vitals y las
 *              registra como eventos de traza dentro de un ciclo de vida de página.
 * @param {string} pageLifecycleTraceId - El ID de la traza que representa el ciclo de vida de la página actual.
 */
export function useHeimdallVitals(pageLifecycleTraceId: string): void {
  useEffect(() => {
    const reportMetric = (metric: Metric) => {
      // Guardia para asegurar que solo procesamos las métricas definidas en nuestro contrato
      if (metric.name !== 'FID') {
        const validation = VitalsMetricSchema.safeParse({
          name: metric.name,
          value: metric.value,
          delta: metric.delta,
          rating: metric.rating,
        });

        if (validation.success) {
          logger.traceEvent(
            pageLifecycleTraceId,
            `PERF_${metric.name}`,
            validation.data
          );
        } else {
          logger.warn(
            '[HeimdallVitals] Métrica de rendimiento inválida recibida.',
            {
              metricName: metric.name,
              error: validation.error.flatten(),
            }
          );
        }
      }
    };

    // Adjuntar listeners para todas las métricas, reemplazando onFID por onINP.
    onCLS(reportMetric);
    onFCP(reportMetric);
    onINP(reportMetric);
    onLCP(reportMetric);
    onTTFB(reportMetric);

    logger.traceEvent(
      pageLifecycleTraceId,
      'Listeners de Web Vitals (v2.0) adjuntados.'
    );
  }, [pageLifecycleTraceId]);
}
