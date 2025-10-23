// RUTA: shared/supabase/src/lib/server.ts
/**
 * @file server.ts
 * @description SSoT para la creación del cliente de Supabase en el servidor.
 * @version 12.0.0 (Holistic Type Safety): Se mueve la validación de las variables
 *              de entorno dentro de la función para garantizar la seguridad de
 *              tipos absoluta en el punto de uso, resolviendo el error TS2769.
 * @author IA Arquitecto
 */
import 'server-only';
import {
  createServerClient as supabaseCreateServerClient,
  type CookieOptions,
} from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { logger } from '@razvolution/shared-logging';
import type { Database } from '@razvolution/shared-db-types';

export function createServerClient(): SupabaseClient<Database> {
  logger.trace(
    '[Supabase Client] Creando nueva instancia del cliente para el servidor (v12.0 Holistic Type Safety)...'
  );

  // --- [INICIO DE CORRECCIÓN DE SEGURIDAD DE TIPOS v12.0.0] ---
  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // Este error ahora ocurre dentro del contexto de la función, proveyendo
    // una garantía de tipos absoluta al compilador para el código que sigue.
    throw new Error('CRÍTICO: Las variables de entorno de Supabase del servidor no están definidas.');
  }
  // --- [FIN DE CORRECCIÓN DE SEGURIDAD DE TIPOS v12.0.0] ---

  const cookieStore = cookies();

  return supabaseCreateServerClient<Database>(
    supabaseUrl, // TypeScript ahora sabe que esto es un 'string'.
    supabaseServiceRoleKey, // TypeScript ahora sabe que esto es un 'string'.
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            logger.warn(
              '[Supabase Client] No se pudo establecer la cookie. El contexto puede ser de solo lectura.'
            );
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            logger.warn(
              '[Supabase Client] No se pudo eliminar la cookie. El contexto puede ser de solo lectura.'
            );
          }
        },
      },
    }
  );
}
