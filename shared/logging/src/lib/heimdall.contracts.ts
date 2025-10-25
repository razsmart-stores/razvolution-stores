// RUTA: shared/logging/src/lib/heimdall.contracts.ts
/**
 * @file heimdall.contracts.ts
 * @description SSoT para los contratos de datos del Protocolo Heimdall.
 * @version 60.1.0 (Batch Payload Contract Restoration)
 * @author IA Arquitecto
 */
import { z } from 'zod';
import type { Tables } from '@razvolution/shared-db-types';

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;

export type Json = Literal | { [key: string]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const EventStatusSchema = z.enum(['SUCCESS', 'FAILURE', 'IN_PROGRESS']);
export type EventStatus = z.infer<typeof EventStatusSchema>;

export const EventIdentifierSchema = z.object({
  domain: z.string(),
  entity: z.string(),
  action: z.string(),
});
export type EventIdentifier = z.infer<typeof EventIdentifierSchema>;

export const HeimdallEventSchema = z.object({
  eventId: z.string().cuid2(),
  traceId: z.string(),
  taskId: z.string().optional(),
  event: EventIdentifierSchema,
  title: z.string(),
  status: EventStatusSchema,
  stepName: z.string().optional(),
  timestamp: z.string().datetime(),
  duration: z.number().optional(),
  payload: jsonSchema.optional(),
  context: z
    .object({
      runtime: z.enum(['browser', 'server', 'edge']),
      user: z.string().optional(),
      path: z.string().optional(),
    })
    .passthrough(),
});
export type HeimdallEvent = z.infer<typeof HeimdallEventSchema>;

// --- [INICIO DE CORRECCIÓN SOBERANA v60.1.0] ---
// Se añade el esquema y tipo para el payload de lotes, que era requerido por el logger
// y no estaba definido, causando el error de compilación TS2305.
export const HeimdallBatchPayloadSchema = z.object({
  batchId: z.string(),
  batchSequence: z.number(),
  eventCount: z.number(),
  events: z.array(HeimdallEventSchema),
});
export type HeimdallBatchPayload = z.infer<typeof HeimdallBatchPayloadSchema>;
// --- [FIN DE CORRECCIÓN SOBERANA v60.1.0] ---

export const HeimdallIngestPayloadSchema = z.object({
  events: z.array(HeimdallEventSchema),
});

export type HeimdallEventRow = Tables<'heimdall_events'>;
