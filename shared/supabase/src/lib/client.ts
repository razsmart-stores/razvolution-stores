// RUTA: shared/supabase/src/lib/client.ts
/**
 * @file client.ts
 * @description SSoT para la creación del cliente de Supabase del lado del navegador.
 * @version 6.0.0 (Holistic Type Safety): Se mueve la validación de las variables
 *              de entorno dentro de la función para garantizar la seguridad de
 *              tipos absoluta en el punto de uso, resolviendo el error TS2769.
 * @author IA Arquitecto
 */
import { createBrowserClient } from '@supabase/ssr';
import { logger } from '@razvolution/shared-logging';

// Se declara la variable del singleton a nivel de módulo.
let supabaseSingleton: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  // Patrón Singleton para evitar crear múltiples instancias en el navegador.
  if (supabaseSingleton) {
    return supabaseSingleton;
  }

  logger.info(
    '[Supabase Client] Creando instancia Singleton del cliente de navegador (v6.0 Holistic Type Safety).'
  );

  // --- [INICIO DE CORRECCIÓN DE SEGURIDAD DE TIPOS v6.0.0] ---
  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'CRÍTICO: Las variables de entorno de Supabase del cliente no están definidas.'
    );
  }
  // --- [FIN DE CORRECCIÓN DE SEGURIDAD DE TIPOS v6.0.0] ---

  supabaseSingleton = createBrowserClient(
    supabaseUrl, // TypeScript ahora sabe que esto es un 'string'.
    supabaseAnonKey // TypeScript ahora sabe que esto es un 'string'.
  );

  return supabaseSingleton;
}
