// RUTA: tools/src/generators/generate-db-types/generator.ts
/**
 * @file generator.ts
 * @description Generador de Nx soberano para crear los tipos de la base de datos.
 *              Absorbe la lógica del script 'gen:types', integrándola en el ecosistema Nx.
 * @version 1.2.0 (Code Hygiene)
 * @author IA Arquitecto
 */
// --- [INICIO DE REFACTORIZACIÓN DE HIGIENE DE CÓDIGO v1.2.0] ---
// Se eliminan las importaciones y variables no utilizadas ('createRequire', 'customRequire')
// para cumplir con las reglas de linting y mantener la limpieza del código.
import { formatFiles, logger, Tree } from '@nx/devkit';
import { execSync } from 'child_process';
// --- [FIN DE REFACTORIZACIÓN DE HIGIENE DE CÓDIGO v1.2.0] ---

export async function generateDbTypesGenerator(tree: Tree) {
  logger.info('🚀 Iniciando Generador de Tipos de Base de Datos razvolution...');

  const outputPath = 'shared/db-types/src/lib/database.types.ts';
  const projectRef = 'lbdhtkfsnosfttorlblh';

  try {
    logger.info(`Invocando la CLI de Supabase para el proyecto: ${projectRef}`);

    const generatedTypes = execSync(
      `pnpm supabase gen types typescript --project-id ${projectRef}`,
      { encoding: 'utf-8' }
    );

    if (!generatedTypes || generatedTypes.length < 100) {
      throw new Error('La salida de la CLI de Supabase parece vacía o incompleta.');
    }

    tree.write(outputPath, generatedTypes);

    await formatFiles(tree);

    logger.info(`✅ Tipos de base de datos generados con éxito en: ${outputPath}`);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`🔥 Error catastrófico durante la generación de tipos de DB: ${errorMessage}`);

    if ('stderr' in (error as object)) {
      logger.error(`Salida de error de la CLI: ${(error as { stderr: string }).stderr}`);
    }

    throw error;
  }
}

export default generateDbTypesGenerator;
