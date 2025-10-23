// RUTA: shared/test-utils/src/lib/mocks/supabase/supabase-client.mock.ts
/**
 * @file supabase-client.mock.ts
 * @description Orquestador soberano que ensambla los aparatos atómicos para
 *              construir un mock completo y estable del `SupabaseClient`.
 * @version 3.0.0 (Sovereign & Structurally Sound)
 * @author IA Asistente de Calidad
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { jest } from '@jest/globals';
import { createMockQueryBuilder } from './query-builder.mock';
import { createMockAuthClient } from './auth-client.mock';

export const createMockSupabaseClient = (): jest.Mocked<SupabaseClient> => {
  return {
    auth: createMockAuthClient(),
    from: jest.fn().mockReturnValue(createMockQueryBuilder()),
    rpc: jest.fn().mockResolvedValue({ data: null, error: null, count: 0 }),
    channel: jest.fn() as any,
    getChannels: jest.fn().mockReturnValue([]),
    removeChannel: jest.fn() as any,
    removeAllChannels: jest.fn() as any,
    storage: {} as any,
    realtime: {} as any,
    functions: {} as any,
    get schema() {
      return 'public' as any;
    },
  };
};
