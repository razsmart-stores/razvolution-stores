// RUTA: shared/logging/src/lib/vitals.contracts.ts
/**
 * @file vitals.contracts.ts
 * @description SSoT para los contratos de datos de Core Web Vitals.
 * @version 2.0.0 (INP Alignment)
 * @author IA Arquitecto
 */
import { z } from 'zod';

export const VitalsMetricSchema = z.object({
  // Se añade 'INP' y se elimina 'FID' para alinearse con los estándares actuales.
  name: z.enum(['LCP', 'INP', 'CLS', 'FCP', 'TTFB']),
  value: z.number(),
  delta: z.number(),
  rating: z.enum(['good', 'needs-improvement', 'poor']),
});

export type VitalsMetric = z.infer<typeof VitalsMetricSchema>;
