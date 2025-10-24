// RUTA: tools/src/generators/generate-icons/generator.ts
/**
 * @file generator.ts
 * @description Generador de Nx soberano para crear el manifiesto de iconos de Lucide.
 *              v10.0.0 (Module Interop Correction): Corregida la lógica de introspección
 *              para manejar correctamente la interoperabilidad entre CommonJS (entorno de Nx)
 *              y los módulos ES (lucide-react), accediendo a la exportación 'default'
 *              para obtener la lista completa de iconos.
 * @version 10.0.0
 * @author IA Arquitecto
 */
import { formatFiles, logger, Tree } from '@nx/devkit';
import { createRequire } from 'module';

// Helper puro para la conversión de nombres.
const kebabToPascal = (str: string): string => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

export async function generateIconsGenerator(tree: Tree) {
  logger.info('🚀 Iniciando Generador de Manifiesto de Iconos v10.0...');

  try {
    const customRequire = createRequire(__dirname);

    logger.info('1. Introspeccionando el módulo `lucide-react`...');
    const dynamicIconImportsModule = customRequire('lucide-react/dynamicIconImports');

    if (!dynamicIconImportsModule || typeof dynamicIconImportsModule !== 'object') {
      throw new Error("No se pudo requerir o analizar el módulo 'lucide-react/dynamicIconImports'.");
    }

    // --- [INICIO DE CORRECCIÓN SOBERANA DE INTROSPECCIÓN v10.0.0] ---
    // Se accede a la propiedad 'default' para obtener el objeto real de los iconos,
    // resolviendo el problema de interoperabilidad CJS/ESM.
    const dynamicIconImports = dynamicIconImportsModule.default || dynamicIconImportsModule;
    const iconKeys = Object.keys(dynamicIconImports);
    // --- [FIN DE CORRECCIÓN SOBERANA DE INTROSPECCIÓN v10.0.0] ---

    logger.info(`   ✅ Módulo analizado. ${iconKeys.length} iconos encontrados.`);

    if (iconKeys.length < 100) { // Un chequeo de sanidad, lucide tiene cientos de iconos.
      throw new Error(`Se encontraron muy pocos iconos (${iconKeys.length}). La estructura del módulo 'lucide-react' puede haber cambiado drásticamente.`);
    }

    logger.info('2. Normalizando nombres de iconos a PascalCase...');
    const pascalCaseIconNames = iconKeys.map(kebabToPascal).sort();
    logger.info(`   ✅ ${pascalCaseIconNames.length} nombres normalizados y ordenados.`);

    logger.info('3. Construyendo el archivo de contrato...');
    const fileContent = `// RUTA: shared/utils/src/lib/contracts/lucide-icon-names.contracts.ts
/**
 * @file lucide-icon-names.contracts.ts
 * @description Manifiesto y Contrato Soberano para los Nombres de Iconos de Lucide.
 *
 *              ADVERTENCIA: ESTE ARCHIVO ES AUTO-GENERADO.
 *              NO MODIFICAR MANUALMENTE.
 *
 *              Para actualizar, ejecute el comando soberano: 'pnpm gen:icons'
 * @author Generador de Nx (@razvolution/tools)
 * @version ${new Date().toISOString()}
 */
import { z } from 'zod';

export const lucideIconNames = ${JSON.stringify(
      pascalCaseIconNames,
      null,
      2
    )} as const;

export const LucideIconNameSchema = z.enum(lucideIconNames);

export type LucideIconName = z.infer<typeof LucideIconNameSchema>;
`;
    logger.info('   ✅ Contrato generado.');

    const outputPath = 'shared/utils/src/lib/contracts/lucide-icon-names.contracts.ts';
    logger.info(`4. Escribiendo contrato en: ${outputPath}`);
    tree.write(outputPath, fileContent);
    logger.info('   ✅ Archivo escrito en el workspace virtual.');

    logger.info('5. Formateando archivos...');
    await formatFiles(tree);
    logger.info('   ✅ Archivos formateados.');

    logger.info('🎉 Manifiesto de Iconos generado con éxito.');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`🔥 Error catastrófico durante la generación del manifiesto:`);
    logger.error(errorMessage);
    throw error;
  }
}

export default generateIconsGenerator;
