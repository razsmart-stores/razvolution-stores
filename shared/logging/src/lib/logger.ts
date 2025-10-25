// RUTA: shared/logging/src/lib/logger.ts
/**
 * @file logger.ts
 * @description SSoT para el Logger Soberano del Protocolo Heimdall.
 *              Esta versión implementa Inversión de Control (IoC) y cumple con
 *              la regla de estrictez 'noPropertyAccessFromIndexSignature'.
 * @version 61.1.0 (Strict Compliance)
 * @author IA Arquitecto
 */
import { createId } from '@paralleldrive/cuid2';
import type {
  HeimdallEvent,
  EventStatus,
  EventIdentifier,
  Json,
  HeimdallBatchPayload,
} from './heimdall.contracts';

// --- Almacén de Contexto Global y API de Inyección ---
let globalHeimdallContext: Record<string, Json | undefined> = {};

/**
 * @function setGlobalHeimdallContext
 * @description API pública y soberana para que la capa de aplicación inyecte o
 *              actualice el contexto global que se adjuntará a todos los eventos
 *              de telemetría de Heimdall.
 * @param {Record<string, Json | undefined>} newContext - El objeto de contexto a fusionar.
 */
export function setGlobalHeimdallContext(
  newContext: Record<string, Json | undefined>
) {
  globalHeimdallContext = { ...globalHeimdallContext, ...newContext };
}

// --- Constantes y Configuración Soberana ---
const IS_PRODUCTION = process.env['NODE_ENV'] === 'production';
const IS_BROWSER = typeof window !== 'undefined';

const MAX_BATCH_SIZE = 50;
const TELEMETRY_QUEUE_KEY = 'heimdall_queue_v1';
const BATCH_SEQUENCE_KEY = 'heimdall_batch_sequence_v1';

const tasks = new Map<
  string,
  { name: string; startTime: number; event: EventIdentifier }
>();

// --- Lógica Pura y de Utilidad ---
const getCurrentPath = (): string | undefined =>
  IS_BROWSER ? window.location.pathname : undefined;

const getSampleRate = (): number => {
  const rateStr =
    typeof process !== 'undefined'
      ? process.env['NEXT_PUBLIC_HEIMDALL_SAMPLE_RATE']
      : undefined;
  if (typeof rateStr === 'string') {
    const rate = parseFloat(rateStr);
    return Math.max(0, Math.min(1, rate));
  }
  return 1.0;
};
const SAMPLE_RATE = getSampleRate();
const shouldSample = (isSampleable: boolean): boolean => {
  if (!isSampleable || SAMPLE_RATE === 1.0) return false;
  return Math.random() > SAMPLE_RATE;
};

// --- Motor de Encolado y Envío (Flush) ---
export async function flushTelemetryQueue(isUnloading = false): Promise<void> {
  if (!IS_BROWSER) return;

  let eventsToFlush: HeimdallEvent[] = [];
  try {
    const queueJson = localStorage.getItem(TELEMETRY_QUEUE_KEY);
    if (!queueJson) return;
    const parsedQueue = JSON.parse(queueJson);
    if (!Array.isArray(parsedQueue) || parsedQueue.length === 0) return;
    eventsToFlush = parsedQueue;
  } catch (error) {
    console.error('[Heimdall] Cola de telemetría corrupta. Purgando.', error);
    localStorage.removeItem(TELEMETRY_QUEUE_KEY);
    return;
  }

  if (eventsToFlush.length === 0) return;

  localStorage.setItem(TELEMETRY_QUEUE_KEY, JSON.stringify([]));

  const currentSequence = parseInt(
    localStorage.getItem(BATCH_SEQUENCE_KEY) || '0',
    10
  );
  const nextSequence = currentSequence + 1;

  const payload: HeimdallBatchPayload = {
    batchId: createId(),
    batchSequence: currentSequence,
    eventCount: eventsToFlush.length,
    events: eventsToFlush,
  };

  try {
    // --- [INICIO DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v61.1.0] ---
    // Se utiliza la notación de corchetes para cumplir con la regla 'noPropertyAccessFromIndexSignature'.
    const headers = {
      'Content-Type': 'application/json',
      'x-workspace-id': String(globalHeimdallContext['workspaceId'] || ''),
    };
    // --- [FIN DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v61.1.0] ---

    if (isUnloading && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], {
        type: 'application/json',
      });
      navigator.sendBeacon('/api/telemetry/ingest', blob);
    } else {
      const response = await fetch('/api/telemetry/ingest', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (!response.ok)
        throw new Error(`El servidor respondió con estado ${response.status}`);
    }
    localStorage.setItem(BATCH_SEQUENCE_KEY, nextSequence.toString());
  } catch (error) {
    console.warn('[Heimdall] Fallo al enviar lote. Re-encolando eventos.', {
      error,
    });
    const currentQueueJson = localStorage.getItem(TELEMETRY_QUEUE_KEY);
    const currentQueue: HeimdallEvent[] = currentQueueJson
      ? JSON.parse(currentQueueJson)
      : [];
    const newQueue = [...eventsToFlush, ...currentQueue];
    localStorage.setItem(TELEMETRY_QUEUE_KEY, JSON.stringify(newQueue));
  }
}

// --- Interfaz del Logger y sus Implementaciones ---

type LogPayload = { [key: string]: Json };
type LogContext = LogPayload & { traceId?: string };

type UnstampedHeimdallEvent = Omit<
  HeimdallEvent,
  'eventId' | 'timestamp' | 'context'
> & {
  context?: Omit<HeimdallEvent['context'], 'runtime' | 'path'> &
    Partial<Pick<HeimdallEvent['context'], 'runtime' | 'path'>>;
};

function _createAndQueueEvent(
  event: UnstampedHeimdallEvent,
  isSampleable = false
): void {
  if (IS_PRODUCTION && shouldSample(isSampleable)) return;

  const { context: providedContext, ...restOfEvent } = event;

  const fullEvent: HeimdallEvent = {
    ...restOfEvent,
    eventId: createId(),
    timestamp: new Date().toISOString(),
    context: {
      ...globalHeimdallContext,
      ...providedContext,
      runtime: IS_BROWSER ? 'browser' : 'server',
      path: getCurrentPath(),
    },
  };

  if (IS_BROWSER) {
    try {
      const queue: HeimdallEvent[] = JSON.parse(
        localStorage.getItem(TELEMETRY_QUEUE_KEY) || '[]'
      );
      queue.push(fullEvent);
      localStorage.setItem(TELEMETRY_QUEUE_KEY, JSON.stringify(queue));
      if (queue.length >= MAX_BATCH_SIZE) flushTelemetryQueue(false);
    } catch (error) {
      console.warn('[Heimdall] Fallo al escribir en la cola de localStorage.', {
        error,
      });
    }
  }
}

interface Logger {
  track: (
    eventName: string,
    data: {
      status: EventStatus;
      payload?: Json;
      duration?: number;
      traceId: string;
    }
  ) => void;
  startTask: (
    event: EventIdentifier,
    title: string,
    context?: LogPayload
  ) => string;
  taskStep: (
    taskId: string,
    stepName: string,
    status: EventStatus,
    payload?: Json | null
  ) => void;
  endTask: (taskId: string, finalStatus: 'SUCCESS' | 'FAILURE') => void;
  success: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, context?: LogContext) => void;
  trace: (message: string, context?: LogContext) => void;
  startTrace: (traceName: string, context?: LogPayload) => string;
  traceEvent: (traceId: string, eventName: string, payload?: Json) => void;
  endTrace: (
    traceId: string,
    context?: LogContext & { error?: boolean }
  ) => void;
}

const createLogger = (isProduction: boolean): Logger => {
  if (!isProduction) {
    const logStyle = (color: string) => `color: ${color}; font-weight: bold;`;
    const timeStyle = 'color: gray; font-size: 0.8em;';

    return {
      track: (eventName, data) =>
        console.log(
          `%c[TRACK]%c ${eventName}`,
          logStyle('purple'),
          'color: inherit;',
          data
        ),
      startTask: (event, title, context) => {
        const taskId = `task-${createId()}`;
        const startTime = performance.now();
        tasks.set(taskId, { name: title, startTime, event });
        console.groupCollapsed(
          `%c▶ TASK-START%c: ${title}`,
          logStyle('blue'),
          'color: inherit;',
          { taskId, ...context }
        );
        console.log(
          `%c[${new Date().toISOString()}]%c`,
          timeStyle,
          'Detalles:',
          { event, context }
        );
        console.groupEnd();
        return taskId;
      },
      taskStep: (taskId, stepName, status, payload) => {
        const color =
          status === 'SUCCESS'
            ? 'green'
            : status === 'FAILURE'
            ? 'red'
            : 'orange';
        console.log(
          `%c  - STEP%c: ${stepName} [${status}]`,
          logStyle(color),
          'color: inherit;',
          { taskId, payload }
        );
      },
      endTask: (taskId, finalStatus) => {
        const task = tasks.get(taskId);
        if (!task) return;
        const duration = performance.now() - task.startTime;
        const color = finalStatus === 'SUCCESS' ? 'green' : 'red';
        console.log(
          `%c🏁 TASK-END%c: ${task.name} [${finalStatus}] - ${duration.toFixed(
            2
          )}ms`,
          logStyle(color),
          'color: inherit;',
          { taskId }
        );
        tasks.delete(taskId);
      },
      success: (message, context) =>
        console.log(
          `%c[SUCCESS]%c ${message}`,
          logStyle('green'),
          'color: inherit;',
          context || ''
        ),
      info: (message, context) =>
        console.info(
          `%c[INFO]%c ${message}`,
          logStyle('cyan'),
          'color: inherit;',
          context || ''
        ),
      warn: (message, context) =>
        console.warn(
          `%c[WARN]%c ${message}`,
          logStyle('orange'),
          'color: inherit;',
          context || ''
        ),
      error: (message, context) =>
        console.error(
          `%c[ERROR]%c ${message}`,
          logStyle('red'),
          'color: inherit;',
          context || ''
        ),
      trace: (message, context) =>
        console.log(
          `%c[TRACE]%c ${message}`,
          logStyle('gray'),
          'color: inherit;',
          context || ''
        ),
      startTrace: (traceName, context) => {
        console.groupCollapsed(
          `%c--- TRACE START: ${traceName} ---`,
          'color: gray; font-style: italic;'
        );
        return createLogger(false).startTask(
          { domain: 'TRACE', entity: traceName, action: 'EXECUTION' },
          traceName,
          context
        );
      },
      traceEvent: (traceId, eventName, payload) => {
        console.log(`%c  > Event: ${eventName}`, 'color: gray;', {
          traceId,
          payload,
        });
      },
      endTrace: (traceId, context) => {
        createLogger(false).endTask(
          traceId,
          context?.error ? 'FAILURE' : 'SUCCESS'
        );
        console.groupEnd();
      },
    };
  }

  const _logToServerConsole = (
    level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' | 'TRACE',
    message: string,
    context?: LogContext
  ) => {
    if (!IS_BROWSER) {
      const logObject = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...globalHeimdallContext,
        ...(context || {}),
      };
      switch (level) {
        case 'ERROR':
          console.error(JSON.stringify(logObject));
          break;
        case 'WARN':
          console.warn(JSON.stringify(logObject));
          break;
        default:
          console.log(JSON.stringify(logObject));
          break;
      }
    }
  };
  return {
    track: (eventName, data) =>
      _createAndQueueEvent(
        {
          event: {
            domain: 'LEGACY_TRACK',
            entity: eventName.toUpperCase().replace(/\s+/g, '_'),
            action: 'EVENT',
          },
          title: eventName,
          traceId: data.traceId,
          status: data.status,
          payload: data.payload,
          duration: data.duration,
          context: {},
        },
        true
      ),
    startTask: (event, title, context) => {
      const taskId = `task-${createId()}`;
      tasks.set(taskId, { name: title, startTime: Date.now(), event });
      _createAndQueueEvent({
        event,
        title,
        status: 'IN_PROGRESS',
        traceId: taskId,
        taskId,
        context,
      });
      _logToServerConsole('INFO', `▶ TASK-START: ${title}`, {
        ...context,
        taskId,
      });
      return taskId;
    },
    taskStep: (taskId, stepName, status, payload) => {
      const task = tasks.get(taskId);
      if (!task) return;
      _createAndQueueEvent({
        event: { ...task.event, action: `STEP:${stepName}` },
        title: stepName,
        status,
        traceId: taskId,
        taskId,
        stepName,
        payload: payload || undefined,
        context: {},
      });
    },
    endTask: (taskId, finalStatus) => {
      const task = tasks.get(taskId);
      if (!task) return;
      const duration = Date.now() - task.startTime;
      _createAndQueueEvent({
        event: task.event,
        title: task.name,
        status: finalStatus,
        traceId: taskId,
        taskId,
        duration,
        context: {},
      });
      _logToServerConsole(
        finalStatus === 'SUCCESS' ? 'INFO' : 'ERROR',
        `🏁 TASK-END: ${task.name} [${finalStatus}]`,
        { taskId, duration }
      );
      tasks.delete(taskId);
    },
    success: (message, context) =>
      _logToServerConsole('SUCCESS', message, context),
    info: (message, context) => _logToServerConsole('INFO', message, context),
    warn: (message, context) => _logToServerConsole('WARN', message, context),
    error: (message, context) => _logToServerConsole('ERROR', message, context),
    trace: (message, context) => _logToServerConsole('TRACE', message, context),
    startTrace: (traceName, context) =>
      createLogger(true).startTask(
        { domain: 'TRACE', entity: traceName, action: 'EXECUTION' },
        traceName,
        context
      ),
    traceEvent: (traceId, eventName, payload) =>
      createLogger(true).taskStep(traceId, eventName, 'IN_PROGRESS', payload),
    endTrace: (traceId, context) =>
      createLogger(true).endTask(
        traceId,
        context?.error ? 'FAILURE' : 'SUCCESS'
      ),
  };
};

export const logger = createLogger(IS_PRODUCTION);
