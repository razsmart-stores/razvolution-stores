// RUTA: shared/test-utils/src/lib/mocks/supabase/auth-client.mock.ts
/**
 * @file auth-client.mock.ts
 * @description Aparato de la Granja de Mocks que fabrica un "Doble Digital" con
 *              paridad contractual del `SupabaseAuthClient`.
 * @version 5.5.0 (Sovereign & Discriminated Union Parity)
 * @author IA Arquitecto de Calidad
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  AuthChangeEvent,
  AuthResponse,
  UserResponse,
  AuthError,
  Subscription,
  User,
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  UserAttributes,
  GoTrueClient,
  AuthTokenResponsePassword,
  OAuthResponse,
  Provider,
  SignInWithOAuthCredentials,
} from '@supabase/auth-js';
import { jest } from '@jest/globals';

const mockUser: User = {
  id: 'mock-user-id',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

const mockSession: Session = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: mockUser,
};

const mockOAuthResponseData: { provider: Provider; url: string } = {
  provider: 'google',
  url: 'http://localhost:4200/mock-oauth-url',
};

// --- Tipos de Retorno Soberanos para Paridad Contractual ---
type GetSessionSuccess = { data: { session: Session }; error: null };
type ResetPasswordSuccess = { data: Record<string, never>; error: null };
type ResetPasswordFailure = { data: null; error: AuthError };

export const createMockAuthClient = (): jest.Mocked<SupabaseClient['auth']> => {
  const auth: Partial<jest.Mocked<GoTrueClient>> = {
    signInWithPassword: jest
      .fn<(_: SignInWithPasswordCredentials) => Promise<AuthTokenResponsePassword>>()
      .mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      }),

    signUp: jest
      .fn<(_: SignUpWithPasswordCredentials) => Promise<AuthResponse>>()
      .mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      }),

    signOut: jest.fn<() => Promise<{ error: AuthError | null }>>().mockResolvedValue({
      error: null,
    }),

    getUser: jest.fn<() => Promise<UserResponse>>().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),

    // --- [INICIO DE CORRECCIÓN SOBERANA v5.5.0: Paridad de Unión Discriminada en `getSession`] ---
    getSession: jest
      .fn<() => Promise<GetSessionSuccess>>()
      .mockResolvedValue({
        data: { session: mockSession },
        error: null,
      }),
    // --- [FIN DE CORRECCIÓN SOBERANA] ---

    setSession: jest
      .fn<
        (_: {
          access_token: string;
          refresh_token: string;
        }) => Promise<AuthResponse>
      >()
      .mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      }),

    refreshSession: jest.fn<() => Promise<AuthResponse>>().mockResolvedValue({
      data: { session: mockSession, user: mockUser },
      error: null,
    }),

    onAuthStateChange: jest
      .fn<
        (
          callback: (event: AuthChangeEvent, session: Session | null) => void
        ) => { data: { subscription: Subscription } }
      >()
      .mockReturnValue({
        data: {
          subscription: {
            id: 'mock-sub',
            unsubscribe: jest.fn(),
            callback: jest.fn(),
          },
        },
      }),

    // --- [INICIO DE CORRECCIÓN SOBERANA v5.5.0: Paridad de Unión Discriminada en `resetPasswordForEmail`] ---
    resetPasswordForEmail: jest
      .fn<
        (
          email: string,
          options?: { redirectTo?: string; captchaToken?: string }
        ) => Promise<ResetPasswordSuccess | ResetPasswordFailure>
      >()
      .mockResolvedValue({ data: {}, error: null }),
    // --- [FIN DE CORRECCIÓN SOBERANA] ---

    updateUser: jest
      .fn<(_: UserAttributes) => Promise<UserResponse>>()
      .mockResolvedValue({ data: { user: mockUser }, error: null }),

    signInWithOAuth: jest
      .fn<(_: SignInWithOAuthCredentials) => Promise<OAuthResponse>>()
      .mockResolvedValue({
        data: mockOAuthResponseData,
        error: null,
      }),
  };

  return auth as jest.Mocked<SupabaseClient['auth']>;
};
