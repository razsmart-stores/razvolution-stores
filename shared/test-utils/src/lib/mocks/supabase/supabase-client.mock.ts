// RUTA: shared/test-utils/src/lib/mocks/supabase/supabase-client.mock.ts
/**
 * @file supabase-client.mock.ts
 * @description Orquestador soberano que ensambla los aparatos atómicos para
 *              construir un mock completo y estable del `SupabaseClient`.
 * @version 6.0.0 (Sovereign & Definitive Linter-Compliant)
 * @author IA Asistente de Calidad
 */
import { jest } from '@jest/globals';
import type { PostgrestSingleResponse } from '@supabase/postgrest-js';
import type { RealtimeChannel } from '@supabase/supabase-js';

import { createMockQueryBuilder } from './query-builder.mock';
import { createMockAuthClient } from './auth-client.mock';

// --- [INICIO DE REFACTORIZACIÓN SOBERANA v6.0.0] ---

/**
 * @function createMockSupabaseClient
 * @description Fabrica un mock completo y funcional del `SupabaseClient`.
 * @returns {jest.Mocked<any>} Un Doble de Prueba que simula el cliente de Supabase.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMockSupabaseClient = (): jest.Mocked<any> => {
  return {
    // --- Módulos Principales ---
    auth: createMockAuthClient(),
    from: jest.fn().mockReturnValue(createMockQueryBuilder()),

    // --- Métodos con Tipos Explícitos para Resolver Errores ---

    // Se completa el objeto de respuesta para que cumpla con el contrato
    // `PostgrestSingleResponse`, añadiendo `status` y `statusText`.
    // Esto resuelve el error TS2345 de forma definitiva.
    rpc: jest
      .fn<() => Promise<PostgrestSingleResponse<unknown>>>()
      .mockResolvedValue({
        data: null,
        error: null,
        count: 0,
        status: 200,
        statusText: 'OK',
      }),

    getChannels: jest.fn<() => RealtimeChannel[]>().mockReturnValue([]),

    // --- Métodos Simples y Propiedades ---
    channel: jest.fn(),
    removeChannel: jest.fn(),
    removeAllChannels: jest.fn(),
    storage: {},
    realtime: {},
    functions: {},
    get schema() {
      return 'public';
    },
  };
};

// --- [FIN DE REFACTORIZACIÓN SOBERANA v6.0.0] ---
