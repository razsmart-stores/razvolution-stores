// RUTA: shared/test-utils/src/lib/mocks/supabase/auth-client.mock.ts
/**
 * @file auth-client.mock.ts
 * @description Aparato atómico de la Granja de Mocks. Su única responsabilidad es
 *              fabricar un mock de alta fidelidad para el `SupabaseAuthClient`.
 * @version 3.0.0 (Sovereign & Structurally Sound)
 * @author IA Asistente de Calidad
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { jest } from '@jest/globals';

export const createMockAuthClient = (): jest.Mocked<SupabaseClient['auth']> => {
  const auth = {
    signInWithPassword: jest.fn().mockResolvedValue({ data: { session: null, user: null }, error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
    signUp: jest.fn().mockResolvedValue({ data: { session: null, user: null }, error: null }),
    getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: {
        subscription: { id: 'mock-sub', unsubscribe: jest.fn(), callback: jest.fn() },
      },
    }),
  };
  return auth as any;
};
