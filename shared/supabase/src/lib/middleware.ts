// RUTA: shared/supabase/src/lib/middleware.ts
/**
 * @file middleware.ts
 * @description SSoT para la lógica de middleware de gestión de sesión de Supabase.
 * @version 12.0.0 (Holistic Type Safety): Se mueve la validación de las variables
 *              de entorno dentro de la función para garantizar la seguridad de
 *              tipos absoluta en el punto de uso, resolviendo el error TS2769.
 * @author IA Arquitecto
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { logger } from '@razvolution/shared-logging';

export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  const traceId = logger.startTrace('supabase.updateSession_v12.0');
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  try {
    // --- [INICIO DE CORRECCIÓN DE SEGURIDAD DE TIPOS v12.0.0] ---
    const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
    const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'CRÍTICO: Las variables de entorno de Supabase del middleware no están definidas.'
      );
    }
    // --- [FIN DE CORRECCIÓN DE SEGURIDAD DE TIPOS v12.0.0] ---

    const supabase = createServerClient(
      supabaseUrl, // TypeScript ahora sabe que esto es un 'string'.
      supabaseAnonKey, // TypeScript ahora sabe que esto es un 'string'.
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    await supabase.auth.getUser();

    logger.traceEvent(
      traceId,
      'Refresco de sesión de Supabase completado (si fue necesario).'
    );
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido.';
    logger.error('[Supabase Middleware] Fallo al actualizar la sesión.', {
      error: errorMessage,
      traceId,
    });
    return response;
  } finally {
    logger.endTrace(traceId);
  }
}
