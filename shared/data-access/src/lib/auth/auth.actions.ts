// RUTA: shared/data-access/src/lib/auth/auth.actions.ts
/**
 * @file auth.actions.ts
 * @description SSoT para las Server Actions de autenticación, con instrumentación de Heimdall.
 * @version 18.0.0 (Sovereign Server Entrypoint Consumption)
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import {
  type ForgotPasswordFormData,
  ForgotPasswordSchema,
  type LoginFormData,
  LoginSchema,
  type SignUpFormData,
  SignUpSchema,
} from "@razvolution/shared-auth-contracts";
import { logger } from "@razvolution/shared-logging";
// --- [INICIO DE CORRECCIÓN SOBERANA DE PUNTO DE ENTRADA v18.0.0] ---
// Se consume la función 'createServerClient' desde el punto de entrada de servidor
// explícito y soberano, respetando las fronteras de módulos.
import { createServerClient } from "@razvolution/shared-supabase/server";
// --- [FIN DE CORRECCIÓN SOBERANA DE PUNTO DE ENTRADA v18.0.0] ---
import type { ActionResult } from "@razvolution/shared-utils";

export async function loginWithPasswordAction(
  data: LoginFormData
): Promise<ActionResult<null>> {
  const taskId = logger.startTask(
    { domain: "AUTH", entity: "USER_SESSION", action: "LOGIN_PASSWORD" },
    `Login attempt for ${data.email}`
  );
  let finalStatus: "SUCCESS" | "FAILURE" = "SUCCESS";

  try {
    logger.taskStep(taskId, "VALIDATE_PAYLOAD", "IN_PROGRESS");
    const validation = LoginSchema.safeParse(data);
    if (!validation.success) {
      const firstError = validation.error.errors[0].message;
      logger.taskStep(taskId, "VALIDATE_PAYLOAD", "FAILURE", { error: firstError });
      throw new Error(firstError);
    }
    logger.taskStep(taskId, "VALIDATE_PAYLOAD", "SUCCESS");
    const { email, password } = validation.data;

    logger.taskStep(taskId, "AUTHENTICATE_USER", "IN_PROGRESS");
    const supabase = createServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      logger.taskStep(taskId, "AUTHENTICATE_USER", "FAILURE", { error: error.message });
      throw error;
    }
    logger.taskStep(taskId, "AUTHENTICATE_USER", "SUCCESS");

    logger.taskStep(taskId, "REVALIDATE_PATH", "IN_PROGRESS");
    revalidatePath("/", "layout");
    logger.taskStep(taskId, "REVALIDATE_PATH", "SUCCESS");

    return { success: true, data: null };
  } catch (error) {
    finalStatus = "FAILURE";
    const errorMessage = error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[loginWithPasswordAction] Fallo en el flujo de login.", { error: errorMessage, taskId });
    return { success: false, error: "Credenciales inválidas. Por favor, verifica tu email y contraseña." };
  } finally {
    logger.endTask(taskId, finalStatus);
  }
}

export async function signUpAction(
  data: SignUpFormData
): Promise<ActionResult<{ success: true }>> {
  const taskId = logger.startTask(
    { domain: "AUTH", entity: "USER_ACCOUNT", action: "CREATE" },
    `Sign-up attempt for ${data.email}`
  );
  let finalStatus: "SUCCESS" | "FAILURE" = "SUCCESS";

  try {
    logger.taskStep(taskId, "VALIDATE_PAYLOAD", "IN_PROGRESS");
    const validation = SignUpSchema.safeParse(data);
    if (!validation.success) {
      const firstError = validation.error.errors[0].message;
      logger.taskStep(taskId, "VALIDATE_PAYLOAD", "FAILURE", { error: firstError });
      throw new Error(firstError);
    }
    logger.taskStep(taskId, "VALIDATE_PAYLOAD", "SUCCESS");

    const { email, password, fullName } = validation.data;
    const supabase = createServerClient();
    const origin = headers().get("origin");

    logger.taskStep(taskId, "CREATE_USER", "IN_PROGRESS");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      logger.taskStep(taskId, "CREATE_USER", "FAILURE", { error: error.message });
      throw error;
    }
    logger.taskStep(taskId, "CREATE_USER", "SUCCESS");

    revalidatePath("/", "layout");
    return { success: true, data: { success: true } };
  } catch (error) {
    finalStatus = "FAILURE";
    const errorMessage = error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[signUpAction] Fallo en el flujo de registro.", { error: errorMessage, taskId });
    return { success: false, error: "No se pudo registrar el usuario." };
  } finally {
    logger.endTask(taskId, finalStatus);
  }
}

export async function sendPasswordResetAction(
  data: ForgotPasswordFormData
): Promise<ActionResult<null>> {
  const taskId = logger.startTask(
    { domain: "AUTH", entity: "USER_ACCOUNT", action: "PASSWORD_RESET_REQUEST" },
    `Password reset request for ${data.email}`
  );
  let finalStatus: "SUCCESS" | "FAILURE" = "SUCCESS";

  try {
    logger.taskStep(taskId, "VALIDATE_PAYLOAD", "IN_PROGRESS");
    const validation = ForgotPasswordSchema.safeParse(data);
    if (!validation.success) {
      const firstError = validation.error.errors[0].message;
      logger.taskStep(taskId, "VALIDATE_PAYLOAD", "FAILURE", { error: firstError });
      throw new Error(firstError);
    }
    logger.taskStep(taskId, "VALIDATE_PAYLOAD", "SUCCESS");

    const { email } = validation.data;
    const supabase = createServerClient();
    const origin = headers().get("origin");

    logger.taskStep(taskId, "SEND_RESET_EMAIL", "IN_PROGRESS");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/account/update-password`,
    });
    if (error) {
      logger.taskStep(taskId, "SEND_RESET_EMAIL", "FAILURE", { error: error.message });
      throw error;
    }
    logger.taskStep(taskId, "SEND_RESET_EMAIL", "SUCCESS");

    return { success: true, data: null };
  } catch (error) {
    finalStatus = "FAILURE";
    const errorMessage = error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[sendPasswordResetAction] Fallo en el flujo de reseteo.", { error: errorMessage, taskId });
    return { success: false, error: "No se pudo enviar el email de recuperación." };
  } finally {
    logger.endTask(taskId, finalStatus);
  }
}
