// RUTA: shared/test-utils/src/lib/mocks/supabase/query-builder.mock.ts
/**
 * @file query-builder.mock.ts
 * @description Aparato atómico de la Granja de Mocks. Su única responsabilidad es
 *              fabricar un mock de alta fidelidad para el `PostgrestQueryBuilder`.
 * @version 3.0.0 (Sovereign & Type-Safe)
 * @author IA Asistente de Calidad
 */
import { jest } from '@jest/globals';
import type { PostgrestQueryBuilder } from '@supabase/postgrest-js';

export const createMockQueryBuilder = (): jest.Mocked<
  PostgrestQueryBuilder<any, any, any>
> => {
  const builder = {
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: {}, error: null }),
  };
  return builder as any;
};
