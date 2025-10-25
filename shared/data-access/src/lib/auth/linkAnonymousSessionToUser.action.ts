// RUTA: shared/data-access/src/lib/auth/linkAnonymousSessionToUser.action.ts
/**
 * @file linkAnonymousSessionToUser.action.ts
 * @description Server Action que orquesta el "Traspaso de Identidad", con
 *              instrumentación de Heimdall y consumo de punto de entrada soberano.
 * @version 5.0.0 (Sovereign Server Entrypoint Consumption)
 * @author RaZ Podestá - MetaShark Tech
 */
'use server';

import { z } from 'zod';

// --- [INICIO DE CORRECCIÓN SOBERANA DE PUNTO DE ENTRADA v5.0.0] ---
// Se corrige la importación para consumir desde el punto de entrada de servidor
// explícito, respetando las fronteras de módulos del monorepo.
import { createServerClient } from '@razvolution/shared-supabase/server';
// --- [FIN DE CORRECCIÓN SOBERANA DE PUNTO DE ENTRADA v5.0.0] ---
import { logger } from '@razvolution/shared-logging';
import type { ActionResult } from '@razvolution/shared-utils';

const LinkSessionInputSchema = z.object({
  fingerprintId: z
    .string()
    .min(1, 'El fingerprintId del visitante es requerido.'),
});

type LinkSessionInput = z.infer<typeof LinkSessionInputSchema>;

export async function linkAnonymousSessionToUserAction(
  input: LinkSessionInput
): Promise<ActionResult<null>> {
  const taskId = logger.startTask(
    { domain: 'AUTH', entity: 'USER_SESSION', action: 'LINK_ANONYMOUS' },
    `Linking anonymous session`
  );
  let finalStatus: 'SUCCESS' | 'FAILURE' = 'SUCCESS';

  try {
    const supabase = createServerClient();

    logger.taskStep(taskId, 'AUTHORIZE_SESSION', 'IN_PROGRESS');
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      logger.taskStep(taskId, 'AUTHORIZE_SESSION', 'FAILURE', {
        reason: 'No active session',
      });
      throw new Error('auth_required');
    }
    logger.taskStep(taskId, 'AUTHORIZE_SESSION', 'SUCCESS', {
      userId: user.id,
    });

    logger.taskStep(taskId, 'VALIDATE_PAYLOAD', 'IN_PROGRESS');
    const validation = LinkSessionInputSchema.safeParse(input);
    if (!validation.success) {
      const firstError =
        validation.error.errors[0]?.message || 'Payload inválido.';
      logger.taskStep(taskId, 'VALIDATE_PAYLOAD', 'FAILURE', {
        error: firstError,
      });
      throw new Error(firstError);
    }
    const { fingerprintId } = validation.data;
    logger.taskStep(taskId, 'VALIDATE_PAYLOAD', 'SUCCESS', { fingerprintId });

    logger.taskStep(taskId, 'PERSIST_LINK', 'IN_PROGRESS');
    const { error: rpcError } = await supabase.rpc('link_fingerprint_to_user', {
      p_fingerprint_id: fingerprintId,
      p_user_id: user.id,
    });

    if (rpcError) {
      logger.taskStep(taskId, 'PERSIST_LINK', 'FAILURE', {
        error: rpcError.message,
      });
      throw new Error(
        `Fallo en la RPC 'link_fingerprint_to_user': ${rpcError.message}`
      );
    }
    logger.taskStep(taskId, 'PERSIST_LINK', 'SUCCESS');

    return { success: true, data: null };
  } catch (error) {
    finalStatus = 'FAILURE';
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido.';
    logger.error(
      '[linkAnonymousSessionToUserAction] Fallo crítico durante la vinculación de la sesión.',
      { error: errorMessage, taskId }
    );
    return {
      success: false,
      error: 'No se pudo vincular el historial de la sesión.',
    };
  } finally {
    logger.endTask(taskId, finalStatus);
  }
}
