// RUTA: shared/logging/src/lib/logger.spec.ts
/**
 * @file logger.spec.ts
 * @description Arnés de pruebas soberano para Heimdall, refactorizado para
 *              validar correctamente la lógica de encolado del modo producción
 *              y el aislamiento de entornos.
 * @version 64.0.0 (Correct Test Logic & Environment Isolation)
 * @author IA Arquitecto de Calidad
 */
import type { HeimdallEvent } from './heimdall.contracts';
import type {
  Logger,
  setGlobalHeimdallContext as SetGlobalContextType,
} from './logger';

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
describe('Arnés de Pruebas v64.0: Heimdall Logger & Emitter', () => {
  const MOCK_WORKSPACE_ID = 'ws-mock-id-from-test';

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  // --- Suite para el Modo de Desarrollo ---
  describe('En Modo de Desarrollo (NODE_ENV=test)', () => {
    let logger: Logger;

    beforeEach(() => {
      process.env['NODE_ENV'] = 'test';
      jest.resetModules();
      const loggerModule = require('./logger');
      logger = loggerModule.logger;
    });

    it('NO debe encolar eventos en localStorage y SÍ debe usar la consola', () => {
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
    let logger: Logger;
    let setGlobalHeimdallContext: typeof SetGlobalContextType;
    let flushTelemetryQueue: () => Promise<void>;

    beforeEach(() => {
      process.env['NODE_ENV'] = 'production';
      jest.resetModules();
      const loggerModule = require('./logger');
      logger = loggerModule.logger;
      setGlobalHeimdallContext = loggerModule.setGlobalHeimdallContext;
      flushTelemetryQueue = loggerModule.flushTelemetryQueue;
    });

    it('debe encolar un evento que contenga el contexto global inyectado', () => {
      setGlobalHeimdallContext({ workspaceId: MOCK_WORKSPACE_ID });

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
      expect(queue[0].context['workspaceId']).toBe(MOCK_WORKSPACE_ID);
    });

    it('debe enviar el workspaceId inyectado en las cabeceras del lote de eventos', async () => {
      setGlobalHeimdallContext({ workspaceId: MOCK_WORKSPACE_ID });

      // --- [INICIO DE CORRECCIÓN SOBERANA v64.0.0] ---
      // Se utiliza `startTask` en lugar de `info`, porque `startTask` es una de las
      // funciones que SÍ encola eventos en modo producción, que es lo que
      // esta prueba necesita validar.
      logger.startTask(
        { domain: 'PROD_TEST', entity: 'FLUSH', action: 'TRIGGER' },
        'Trigger Flush'
      );
      // --- [FIN DE CORRECCIÓN SOBERANA v64.0.0] ---

      await flushTelemetryQueue();

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/telemetry/ingest',
        expect.objectContaining({
          headers: expect.objectContaining({
            'x-workspace-id': MOCK_WORKSPACE_ID,
          }),
        })
      );
    });
  });
});
