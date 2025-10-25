// RUTA: features/auth/src/lib/hooks/use-auth.ts
/**
 * @file use-auth.ts
 * @description Hook de cliente de élite para la gestión del estado de autenticación.
 *              v6.2.0 (Sovereign Alias Alignment): Se corrige la importación de supabase.
 * @version 6.2.0
 * @author IA Arquitecto
 */
'use client';

import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { logger } from '@razvolution/shared-logging';
import type { Tables } from '@razvolution/shared-db-types';

// --- [INICIO DE REFACTORIZACIÓN SOBERANA v6.2.0] ---
import { createClient } from '@razvolution/shared-supabase';
// --- [FIN DE REFACTORIZACIÓN SOBERANA v6.2.0] ---

type ProfilesRow = Tables<'profiles'>;

interface AuthState {
  user: User | null;
  profile: ProfilesRow | null;
  isLoading: boolean;
}

export function useAuth(): AuthState {
  const traceId = useMemo(
    () => logger.startTrace('useAuth_Lifecycle_v6.2'),
    []
  );
  const supabase = useMemo(() => createClient(), []);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
  });

  const fetchUserProfile = useCallback(
    async (user: User) => {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        logger.warn('[useAuth] No se pudo obtener el perfil de usuario.', {
          error: error.message,
          traceId,
        });
        return null;
      }
      return profile;
    },
    [supabase, traceId]
  );

  useEffect(() => {
    logger.info('[useAuth] Hook montado. Suscribiéndose a cambios de estado.', {
      traceId,
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        logger.trace(`[useAuth] Evento de autenticación recibido: ${event}`);
        const user = session?.user ?? null;
        if (user) {
          const profile = await fetchUserProfile(user);
          setAuthState({ user, profile, isLoading: false });
        } else {
          setAuthState({ user: null, profile: null, isLoading: false });
        }
      }
    );

    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      if (user) {
        const profile = await fetchUserProfile(user);
        setAuthState({ user, profile, isLoading: false });
      } else {
        setAuthState({ user: null, profile: null, isLoading: false });
      }
    };

    getInitialSession();

    return () => {
      logger.info('[useAuth] Hook desmontado. Cancelando suscripción.', {
        traceId,
      });
      subscription.unsubscribe();
      logger.endTrace(traceId);
    };
  }, [supabase, fetchUserProfile, traceId]);

  return authState;
}
