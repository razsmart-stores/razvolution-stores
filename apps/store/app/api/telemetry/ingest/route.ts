// RUTA: apps/store/app/api/telemetry/ingest/route.ts
/**
 * @file route.ts
 * @description Endpoint de API soberano para la ingesta de telemetría del Protocolo Heimdall.
 * @version 1.1.0 (Sovereign Type Construction)
 * @author IA Arquitecto
 */
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@razvolution/shared-supabase/server';
import { HeimdallIngestPayloadSchema, logger } from '@razvolution/shared-logging';
// --- [INICIO DE CORRECCIÓN SOBERANA v1.1.0] ---
// Se importa el constructor de tipos genérico 'TablesInsert' en lugar de un tipo concreto.
import type { TablesInsert } from '@razvolution/shared-db-types';
// --- [FIN DE CORRECCIÓN SOBERANA v1.1.0] ---

export async function POST(request: NextRequest) {
  const traceId = logger.startTrace('Heimdall_Ingest_API');

  try {
    // 1. Obtener y validar el payload de la petición.
    const body = await request.json();
    const validation = HeimdallIngestPayloadSchema.safeParse(body);

    if (!validation.success) {
      logger.warn('[API/Telemetry] Payload de ingesta inválido.', { error: validation.error.flatten(), traceId });
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { events } = validation.data;
    if (events.length === 0) {
      return NextResponse.json({ message: 'OK' }, { status: 200 });
    }

    logger.traceEvent(traceId, 'Payload validado', { eventCount: events.length });

    // 2. Mapear los eventos al contrato de la base de datos.
    // --- [INICIO DE CORRECCIÓN SOBERANA v1.1.0] ---
    // Se construye el tipo concreto utilizando el constructor genérico, pasándole
    // el nombre de la tabla como un literal de string.
    const eventsToInsert: TablesInsert<'heimdall_events'>[] = events.map(event => ({
    // --- [FIN DE CORRECCIÓN SOBERANA v1.1.0] ---
      event_id: event.eventId,
      trace_id: event.traceId,
      task_id: event.taskId || null,
      step_name: event.stepName || null,
      event_name: `${event.event.domain}:${event.event.entity}:${event.event.action}`,
      status: event.status,
      timestamp: event.timestamp,
      duration_ms: event.duration || null,
      payload: event.payload || null,
      context: event.context,
    }));

    // 3. Persistir en la base de datos.
    const supabase = createServerClient();
    const { error } = await supabase.from('heimdall_events').insert(eventsToInsert);

    if (error) {
      throw new Error(`Fallo en la inserción de Supabase: ${error.message}`);
    }

    logger.success(`[API/Telemetry] ${events.length} eventos de telemetría ingeridos con éxito.`, { traceId });
    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
    logger.error('[API/Telemetry] Fallo catastrófico en la ingesta.', { error: errorMessage, traceId });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    logger.endTrace(traceId);
  }
}
