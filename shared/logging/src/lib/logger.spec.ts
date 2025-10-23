// RUTA: shared/logging/src/lib/logger.spec.ts
/**
 * @file logger.spec.ts
 * @description Arnés de pruebas soberano para el logger y emisor de Heimdall.
 *              v17.3 (Linting Compliance): Se alinea el arnés de pruebas con las reglas
 *              de calidad de código de ESLint, justificando las excepciones para funciones
 *              vacías utilizadas en la supresión de salida de consola.
 * @version 17.3.0
 * @author IA Arquitecto de Calidad
 */
import { jest } from '@jest/globals';
import type { HeimdallEvent } from './heimdall.contracts';
import { useWorkspaceStore } from '@razvolution/shared-utils';
type WorkspaceState = ReturnType<typeof useWorkspaceStore.getState>;

// --- [INICIO DE ARNÉS DE MOCKS SOBERANO v17.2.0] ---

const createLocalStorageMock = (): Storage => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string): string | null => store[key] || null),
    setItem: jest.fn((key: string, value: string): void => { store[key] = value.toString(); }),
    removeItem: jest.fn((key: string): void => { delete store[key]; }),
    clear: jest.fn((): void => { store = {}; }),
    key: jest.fn((index: number): string | null => Object.keys(store)[index] || null),
    get length(): number { return Object.keys(store).length; },
  };
};
const localStorageMock = createLocalStorageMock();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

Object.defineProperty(global, 'window', {
  value: {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    location: {
      pathname: '/mock-path',
    },
  },
  writable: true,
});
Object.defineProperty(global, 'navigator', { value: { sendBeacon: jest.fn(() => true) }, writable: true });

jest.mock('@razvolution/shared-utils', () => ({
  useWorkspaceStore: { getState: jest.fn(), setState: jest.fn(), subscribe: jest.fn(() => jest.fn()), destroy: jest.fn() },
}));
const mockGetState = (useWorkspaceStore as jest.Mocked<typeof useWorkspaceStore>).getState;
jest.mock('@paralleldrive/cuid2', () => ({ createId: jest.fn(() => 'mock-cuid-id-67890') }));
const mockFetch = jest.fn<typeof global.fetch>();
global.fetch = mockFetch;

jest.useFakeTimers();
// --- [FIN DE ARNÉS DE MOCKS SOBERANO v17.2.0] ---

import { logger, flushTelemetryQueue } from './logger';

describe('Arnés de Pruebas: Heimdall Logger & Emitter', () => {
  const baseWorkspaceState: WorkspaceState = {
    activeWorkspaceId: 'default-mock-ws-id', availableWorkspaces: [], setActiveWorkspace: jest.fn(), setAvailableWorkspaces: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    mockGetState.mockReturnValue(baseWorkspaceState);
    mockFetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true }) } as Response);
    localStorageMock.clear();
  });

  describe('Encolado de Eventos', () => {
    it('debe encolar un evento de telemetría en localStorage', () => {
      logger.startTask({ domain: 'TEST', entity: 'TASK', action: 'EXECUTE' }, 'Test Task');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('heimdall_queue_v1', expect.any(String));
      const callArg = (localStorageMock.setItem as jest.Mock).mock.calls[0][1] as string;
      const parsedArg: unknown = JSON.parse(callArg);
      expect(Array.isArray(parsedArg)).toBe(true);
      const savedQueue = parsedArg as HeimdallEvent[];
      expect(savedQueue).toHaveLength(1);
      expect(savedQueue[0].title).toBe('Test Task');
      expect(savedQueue[0].context.path).toBe('/mock-path');
    });
  });

  describe('flushTelemetryQueue', () => {
    it('debe enviar eventos y limpiar la cola en un caso exitoso', async () => {
      const mockWorkspaceId = 'ws-test-12345';
      mockGetState.mockReturnValue({ ...baseWorkspaceState, activeWorkspaceId: mockWorkspaceId });
      const mockEvents: Partial<HeimdallEvent>[] = [{ eventId: '1', title: 'event1' }];
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(mockEvents));
      await flushTelemetryQueue(false);
      expect(mockFetch).toHaveBeenCalledWith('/api/telemetry/ingest', expect.objectContaining({
        headers: { 'Content-Type': 'application/json', 'x-workspace-id': mockWorkspaceId },
      }));
      expect(localStorageMock.setItem).toHaveBeenCalledWith('heimdall_queue_v1', '[]');
    });

    it('debe re-encolar los eventos si la llamada fetch falla', async () => {
      mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));
      const mockEvents: Partial<HeimdallEvent>[] = [{ eventId: '1', title: 'event1' }];
      (localStorageMock.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify(mockEvents)).mockReturnValueOnce('[]');
      // --- [INICIO DE CORRECCIÓN DE LINTING v17.3.0] ---
      // Se justifica la excepción a la regla, ya que el propósito es suprimir
      // el ruido de la consola durante la ejecución de esta prueba específica.
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      // --- [FIN DE CORRECCIÓN DE LINTING v17.3.0] ---
      await flushTelemetryQueue(false);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(localStorageMock.setItem).toHaveBeenLastCalledWith('heimdall_queue_v1', JSON.stringify(mockEvents));
      consoleWarnSpy.mockRestore();
    });

    it('debe manejar una cola corrupta y removerla', async () => {
      // --- [INICIO DE CORRECCIÓN DE LINTING v17.3.0] ---
      // Se justifica la excepción a la regla, ya que el propósito es suprimir
      // el ruido de la consola durante la ejecución de esta prueba específica.
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // --- [FIN DE CORRECCIÓN DE LINTING v17.3.0] ---
      (localStorageMock.getItem as jest.Mock).mockReturnValue('not-a-valid-json');
      await flushTelemetryQueue(false);
      expect(mockFetch).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Cola de telemetría corrupta'), expect.any(Error));
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('heimdall_queue_v1');
      consoleErrorSpy.mockRestore();
    });
  });
});
