// RUTA: shared/logging/src/lib/logger.spec.ts
/**
 * @file logger.spec.ts
 * @description Arnés de pruebas soberano para Heimdall. Esta versión cumple
 *              con la regla de estrictez 'noPropertyAccessFromIndexSignature'
 *              para una seguridad de tipos absoluta en el acceso a propiedades.
 * @version 61.2.0 (Strict Compliance Fix)
 * @author IA Arquitecto de Calidad
 */
import { setGlobalHeimdallContext } from './logger';
import type { HeimdallEvent } from './heimdall.contracts';

// --- MOCKS SOBERANOS (Globales a todas las pruebas) ---
const createLocalStorageMock = (): Storage => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string): string | null => store[key] || null),
    setItem: jest.fn((key: string, value: string): void => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string): void => {
      delete store[key];
    }),
    clear: jest.fn((): void => {
      store = {};
    }),
    key: jest.fn(
      (index: number): string | null => Object.keys(store)[index] || null
    ),
    get length(): number {
      return Object.keys(store).length;
    },
  };
};

const localStorageMock = createLocalStorageMock();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });
Object.defineProperty(global, 'window', {
  value: {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    location: { pathname: '/mock-path' },
  },
  writable: true,
});
Object.defineProperty(global, 'navigator', {
  value: { sendBeacon: jest.fn(() => true) },
  writable: true,
});
Object.defineProperty(global, 'performance', {
  value: { now: jest.fn().mockReturnValue(1000) },
  writable: true,
});

global.fetch = jest.fn(() =>
  Promise.resolve(new Response(null, { status: 200 }))
) as jest.Mock;

jest.mock('@paralleldrive/cuid2', () => ({
  createId: jest.fn(() => 'mock-cuid-id-12345'),
}));

// --- Arnés de Pruebas Principal ---
describe('Arnés de Pruebas v61.2: Heimdall Logger & Emitter (Strict Compliance)', () => {
  let originalEnv: NodeJS.ProcessEnv;
  const MOCK_WORKSPACE_ID = 'ws-mock-id-from-test';

  beforeEach(() => {
    jest.resetModules();
    originalEnv = { ...process.env };
    jest.clearAllMocks();
    localStorageMock.clear();
    setGlobalHeimdallContext({ workspaceId: MOCK_WORKSPACE_ID });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  // --- Suite para el Modo de Desarrollo ---
  describe('En Modo de Desarrollo (NODE_ENV=test)', () => {
    it('NO debe encolar eventos en localStorage y SÍ debe usar la consola', () => {
      process.env['NODE_ENV'] = 'test';
      const { logger } = require('./logger');

      const consoleGroupSpy = jest
        .spyOn(console, 'groupCollapsed')
        .mockImplementation();
      logger.startTask(
        { domain: 'TEST', entity: 'TASK', action: 'EXECUTE' },
        'Test Task'
      );
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(consoleGroupSpy).toHaveBeenCalled();
      consoleGroupSpy.mockRestore();
    });
  });

  // --- Suite para el Modo de Producción ---
  describe('En Modo de Producción (NODE_ENV=production)', () => {
    it('debe encolar un evento que contenga el contexto global inyectado', () => {
      process.env['NODE_ENV'] = 'production';
      const { logger } = require('./logger');

      logger.startTask(
        { domain: 'PROD_TEST', entity: 'QUEUE', action: 'ENQUEUE' },
        'Enqueue Task'
      );

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'heimdall_queue_v1',
        expect.any(String)
      );
      const queue: HeimdallEvent[] = JSON.parse(
        (localStorageMock.setItem as jest.Mock).mock.calls[0][1]
      );
      expect(queue).toHaveLength(1);
      expect(queue[0].event.domain).toBe('PROD_TEST');

      // --- [INICIO DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v61.2.0] ---
      // Se utiliza la notación de corchetes para un acceso a propiedades de máxima seguridad de tipos.
      expect(queue[0].context['workspaceId']).toBe(MOCK_WORKSPACE_ID);
      // --- [FIN DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v61.2.0] ---
    });

    describe('Motor de Encolado y Envío (Emitter)', () => {
      it('debe enviar el workspaceId inyectado en las cabeceras del lote de eventos', async () => {
        process.env['NODE_ENV'] = 'production';
        const { logger, flushTelemetryQueue } = require('./logger');

        logger.info('Event 1', { traceId: 'trace-1' });

        await flushTelemetryQueue();

        expect(global.fetch).toHaveBeenCalledWith(
          '/api/telemetry/ingest',
          expect.any(Object)
        );
        const fetchCall = (global.fetch as jest.Mock).mock.calls[0];

        expect(fetchCall[1].headers['x-workspace-id']).toBe(MOCK_WORKSPACE_ID);
      });
    });
  });
});
