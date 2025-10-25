// RUTA: shared/test-utils/src/lib/mocks/supabase/query-builder.mock.ts
/**
 * @file query-builder.mock.ts
 * @description Aparatos atómicos de la Granja de Mocks que fabrican Dobles Digitales
 *              para el `PostgrestQueryBuilder` y `PostgrestFilterBuilder`.
 * @version 15.0.0 (Sovereign & Linter-Compliant Mock Farm)
 * @author IA Arquitecto de Calidad
 */
import { jest } from '@jest/globals';
import type { PostgrestSingleResponse } from '@supabase/postgrest-js';

// --- Contrato de Datos Soberano para el Mock ---
type MockRow = { id: number; name: string };

const mockSingleResponse: PostgrestSingleResponse<MockRow> = {
  data: { id: 1, name: 'Mock Data' },
  error: null,
  status: 200,
  statusText: 'OK',
  count: 1,
};

// --- [INICIO DE REFACTORIZACIÓN SOBERANA v15.0.0: Cumplimiento de Linter] ---

/**
 * @function createMockFilterBuilder
 * @description APARATO ATÓMICO: Fabrica un mock para el `PostgrestFilterBuilder`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMockFilterBuilder = (): jest.Mocked<any> => {
  const mock = {
    eq: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    gt: jest.fn().mockReturnThis(),
    lt: jest.fn().mockReturnThis(),
    single: jest
      .fn<() => Promise<PostgrestSingleResponse<MockRow>>>()
      .mockResolvedValue(mockSingleResponse),
    maybeSingle: jest
      .fn<() => Promise<PostgrestSingleResponse<MockRow>>>()
      .mockResolvedValue(mockSingleResponse),
    then: jest.fn(
      (
        resolve: (value: PostgrestSingleResponse<MockRow>) => void
      ): Promise<void> => Promise.resolve(resolve(mockSingleResponse))
    ),
  };
  return mock;
};

/**
 * @function createMockQueryBuilder
 * @description APARATO ATÓMICO: Fabrica un mock para el `PostgrestQueryBuilder`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMockQueryBuilder = (): jest.Mocked<any> => {
  const filterBuilderInstance = createMockFilterBuilder();
  const mock = {
    select: jest.fn().mockReturnValue(filterBuilderInstance),
    insert: jest.fn().mockReturnValue(filterBuilderInstance),
    update: jest.fn().mockReturnValue(filterBuilderInstance),
    delete: jest.fn().mockReturnValue(filterBuilderInstance),
    rpc: jest.fn().mockReturnValue(filterBuilderInstance),
    upsert: jest.fn().mockReturnValue(filterBuilderInstance),
  };
  return mock;
};

// --- [FIN DE REFACTORIZACIÓN SOBERANA v15.0.0] ---
