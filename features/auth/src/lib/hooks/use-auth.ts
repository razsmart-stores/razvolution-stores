// RUTA: features/auth/src/lib/hooks/use-auth.ts
/**
 * @file use-auth.ts
 * @description Hook de cliente de élite, y ahora SSoT, para la gestión del estado de autenticación.
 *              Nivelado para una seguridad de tipos absoluta en los callbacks de Supabase.
 * @version 6.1.0 (Type-Safe Auth Callback)
 * @author IA Arquitecto
 */
"use client";

// --- [INICIO DE FORTALECIMIENTO DE TIPOS v6.1.0] ---
// Se importan los tipos específicos para el AuthChangeEvent y la Session
// directamente desde la biblioteca de Supabase.
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
// --- [FIN DE FORTALECIMIENTO DE TIPOS v6.1.0] ---
import { useState, useEffect, useMemo, useCallback } from 'react';

import { logger } from '@razvolution/shared-logging';
import type { Tables } from '@razvolution/shared-db-types';
import { createClient } from '@razvolution/shared-supabase';

type ProfilesRow = Tables<'profiles'>;

interface AuthState {
  user: User | null;
  profile: ProfilesRow | null;
  isLoading: boolean;
}

export function useAuth(): AuthState {
  const traceId = useMemo(() => logger.startTrace('useAuth_Lifecycle_v6.1'), []);
  const supabase = useMemo(() => createClient(), []);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
  });

  const fetchUserProfile = useCallback(async (user: User) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      logger.warn('[useAuth] No se pudo obtener el perfil de usuario.', { error: error.message, traceId });
      return null;
    }
    return profile;
  }, [supabase, traceId]);


  useEffect(() => {
    logger.info('[useAuth] Hook montado. Suscribiéndose a cambios de estado.', { traceId });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      // --- [INICIO DE FORTALECIMIENTO DE TIPOS v6.1.0] ---
      // Se añaden los tipos explícitos al callback, eliminando el 'any' implícito
      // y restaurando la seguridad de tipos.
      async (event: AuthChangeEvent, session: Session | null) => {
      // --- [FIN DE FORTALECIMIENTO DE TIPOS v6.1.0] ---
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

    // Carga inicial de la sesión
    const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
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
      logger.info('[useAuth] Hook desmontado. Cancelando suscripción.', { traceId });
      subscription.unsubscribe();
      logger.endTrace(traceId);
    };
  }, [supabase, fetchUserProfile, traceId]);

  return authState;
}
