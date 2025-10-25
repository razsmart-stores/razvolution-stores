// RUTA: shared/data-access/src/lib/auth/getUserProfile.action.ts
/**
 * @file getUserProfile.action.ts
 * @description Server Action soberana y SSoT para obtener el perfil de un usuario autenticado.
 *              v1.3.0: Se refactoriza el manejo de la finalización de tareas de Heimdall
 *              para eliminar la dependencia de estado interno del logger y seguir un
 *              flujo de control explícito, resolviendo una violación de encapsulación.
 * @version 1.3.0 (Encapsulation Integrity & Explicit Control Flow)
 * @author IA Arquitecto
 */
'use server';

import { logger } from '@razvolution/shared-logging';
import { createServerClient } from '@razvolution/shared-supabase/server';
import type { Tables } from '@razvolution/shared-db-types';
import type { ActionResult } from '@razvolution/shared-utils';

export async function getUserProfileAction(): Promise<
  ActionResult<Tables<'profiles'> | null>
> {
  const taskId = logger.startTask(
    { domain: 'DATA_ACCESS', entity: 'USER_PROFILE', action: 'FETCH' },
    'Fetching authenticated user profile'
  );

  try {
    const supabase = createServerClient();

    logger.taskStep(taskId, 'GET_SESSION', 'IN_PROGRESS');
    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.getUser();

    if (sessionError) {
      logger.taskStep(taskId, 'GET_SESSION', 'FAILURE', {
        error: sessionError.message,
      });
      throw sessionError;
    }

    if (!user) {
      logger.taskStep(taskId, 'GET_SESSION', 'SUCCESS', {
        status: 'No active session',
      });
      // Finalización explícita de la tarea en un camino de éxito.
      logger.endTask(taskId, 'SUCCESS');
      return { success: true, data: null };
    }
    logger.taskStep(taskId, 'GET_SESSION', 'SUCCESS', { userId: user.id });

    logger.taskStep(taskId, 'FETCH_PROFILE', 'IN_PROGRESS');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(
        'id, created_at, updated_at, full_name, avatar_url, last_sign_in_at, last_sign_in_ip, last_sign_in_location, provider_name, provider_avatar_url'
      )
      .eq('id', user.id)
      .single();

    if (profileError) {
      logger.taskStep(taskId, 'FETCH_PROFILE', 'FAILURE', {
        error: profileError.message,
      });
      throw profileError;
    }
    logger.taskStep(taskId, 'FETCH_PROFILE', 'SUCCESS');

    // Finalización explícita de la tarea en el camino de éxito principal.
    logger.endTask(taskId, 'SUCCESS');
    return { success: true, data: profile };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido.';
    logger.error(
      '[getUserProfileAction] Fallo catastrófico al obtener el perfil.',
      {
        error: errorMessage,
        taskId,
      }
    );
    // Finalización explícita de la tarea en el camino de fallo.
    logger.endTask(taskId, 'FAILURE');
    return {
      success: false,
      error: 'No se pudo recuperar el perfil del usuario.',
    };
  }
}
