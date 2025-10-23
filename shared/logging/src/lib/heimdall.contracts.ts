// RUTA: shared/logging/src/lib/heimdall.contracts.ts
/**
 * @file heimdall.contracts.ts
 * @description SSoT para los contratos de datos del Protocolo Heimdall.
 *              v7.0.0 (Circular Dependency Severed): Se rompe la dependencia circular
 *              importando los tipos de la base de datos desde la nueva biblioteca
 *              soberana @razvolution/shared-db-types.
 * @version 7.0.0
 * @author IA Arquitecto
 */
import { z } from "zod";

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se importa desde la nueva biblioteca base, rompiendo el ciclo con 'supabase'.
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@razvolution/shared-db-types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---


// --- Contratos de Aplicación (Zod) ---

export const EventStatusSchema = z.enum(["SUCCESS", "FAILURE", "IN_PROGRESS"]);
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
  payload: z.record(z.unknown()).optional(),
  context: z.object({
    runtime: z.enum(["browser", "server", "edge"]),
    user: z.string().optional(),
    path: z.string().optional(),
  }),
});
export type HeimdallEvent = z.infer<typeof HeimdallEventSchema>;

export const HeimdallIngestPayloadSchema = z.object({
  events: z.array(HeimdallEventSchema),
});

// --- Contratos de Base de Datos (SSoT para Supabase) ---

export type HeimdallEventRow = Tables<"heimdall_events">;
export type HeimdallEventInsert = TablesInsert<"heimdall_events">;
export type HeimdallEventUpdate = TablesUpdate<"heimdall_events">;
export const HeimdallEventRowSchema = z.object({
  event_id: z.string(),
  trace_id: z.string(),
  task_id: z.string().nullable(),
  step_name: z.string().nullable(),
  event_name: z.string(),
  status: z.string(),
  timestamp: z.string().datetime(),
  duration_ms: z.number().nullable(),
  payload: z.any().nullable(),
  context: z.any().nullable(),
  created_at: z.string().datetime(),
});

export type TaskHealthSummaryRow = Tables<"task_health_summary">;
export type TaskHealthSummaryInsert = TablesInsert<"task_health_summary">;
export type TaskHealthSummaryUpdate = TablesUpdate<"task_health_summary">;
export const TaskHealthSummaryRowSchema = z.object({
  task_id: z.string(),
  task_name: z.string(),
  status: z.enum(["SUCCESS", "FAILURE"]),
  duration_ms: z.number().int().nullable(),
  timestamp: z.string().datetime(),
  user_id: z.string().uuid().nullable(),
  workspace_id: z.string().uuid().nullable(),
  context: z.any().nullable(),
  created_at: z.string().datetime(),
});
