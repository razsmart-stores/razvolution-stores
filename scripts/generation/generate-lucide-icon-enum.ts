// RUTA: scripts/generation/generate-lucide-icon-enum.ts
/**
 * @file generate-lucide-icon-enum.ts
 * @description Script de automatización soberano. Inspecciona las dependencias instaladas y
 * genera un schema de Zod y un tipo TypeScript con todos los nombres de iconos de Lucide
 * disponibles, creando una SSoT para la iconografía del sistema.
 * @version 8.0.0 (RAZSMART Monorepo Adapted)
 * @author RaZ Podestá - MetaShark Tech & Gemini (L.I.A Legacy)
 */
import * as fs from 'fs/promises';
import { createRequire } from 'module';
import * as path from 'path';
import chalk from 'chalk';

const customRequire = createRequire(import.meta.url);

// RUTA SOBERANA DENTRO DEL MONOREPO RAZSMART
const OUTPUT_FILE = path.resolve(
  process.cwd(),
  'libs/shared/config/src/lib/lucide-icon-names.contracts.ts'
);

const kebabToPascal = (str: string): string => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

async function generateLucideManifest() {
  console.log(
    chalk.blue.bold(
      '🚀 Iniciando Protocolo de Generación de Manifiesto de Iconos RAZSMART...'
    )
  );

  try {
    const lucideManifestPath = customRequire.resolve(
      'lucide-react/dynamicIconImports'
    );
    console.log(
      chalk.gray(
        `   Identificado manifiesto de 'lucide-react' en: ${path.relative(
          process.cwd(),
          lucideManifestPath
        )}`
      )
    );

    const manifestContent = await fs.readFile(lucideManifestPath, 'utf-8');
    const iconKeysMatches = manifestContent.matchAll(/['"]([^'"]+)['"]:/g);
    const iconKeys = Array.from(iconKeysMatches, (m) => m[1]);

    if (iconKeys.length === 0) {
      throw new Error(
        'No se encontraron claves de iconos. El formato del manifiesto de lucide-react puede haber cambiado.'
      );
    }

    const pascalCaseIconNames = iconKeys.map(kebabToPascal);

    const fileContent = `// RUTA: libs/shared/config/src/lib/lucide-icon-names.contracts.ts
/**
 * @file lucide-icon-names.contracts.ts
 * @description Manifiesto y Contrato Soberano para los Nombres de Iconos de Lucide.
 *
 *              ADVERTENCIA: ESTE ARCHIVO ES AUTO-GENERADO.
 *              NO MODIFICAR MANUALMENTE.
 *
 *              Para actualizar, ejecute el comando soberano: 'pnpm gen:icons'
 * @author Script de Generación Automática (RAZSMART)
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

    const outputDir = path.dirname(OUTPUT_FILE);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(OUTPUT_FILE, fileContent, 'utf-8');

    console.log(
      chalk.green(
        `✅ Manifiesto de Iconos generado con éxito. ${chalk.yellow(
          pascalCaseIconNames.length
        )} iconos soberanos registrados.`
      )
    );
  } catch (error) {
    console.error(
      chalk.red.bold('🔥 Error catastrófico durante la generación del manifiesto:'),
      error
    );
    process.exit(1);
  }
}

generateLucideManifest();
