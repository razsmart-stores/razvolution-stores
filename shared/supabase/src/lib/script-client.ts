// RUTA: shared/supabase/src/lib/script-client.ts
/**
 * @file script-client.ts
 * @description SSoT para la creación de un cliente de Supabase para scripts.
 * @version 9.0.0 (Holistic Type Safety): Se mueve la validación de las variables
 *              de entorno dentro de la función para garantizar la seguridad de
 *              tipos absoluta en el punto de uso, resolviendo el error TS2345.
 * @author IA Arquitecto
 */
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import chalk from 'chalk';

export function createScriptClient() {
  console.log(
    chalk.gray(
      '[Supabase] Creando instancia de cliente para SCRIPT (v9.0 - Holistic Type Safety)...'
    )
  );

  // --- [INICIO DE CORRECCIÓN DE SEGURIDAD DE TIPOS v9.0.0] ---
  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    const errorMsg =
      'CRÍTICO: Las variables de entorno de Supabase (URL y SERVICE_ROLE_KEY) no están definidas.';
    console.error(chalk.red.bold(`[Supabase Script Client] ${errorMsg}`));
    throw new Error(errorMsg);
  }
  // --- [FIN DE CORRECCIÓN DE SEGURIDAD DE TIPOS v9.0.0] ---

  return createSupabaseClient(
    supabaseUrl, // TypeScript ahora sabe que esto es un 'string'.
    supabaseServiceRoleKey // TypeScript ahora sabe que esto es un 'string'.
  );
}
