// RUTA: shared/utils/src/lib/theming/theme-utils.ts
/**
 * @file theme-utils.ts
 * @description SSoT para las utilidades de theming.
 *              v4.0.0 (Sovereign & Self-Contained): Se internaliza la definición del tipo
 *              'AssembledTheme' para eliminar dependencias externas ilegales y resolver
 *              el error de compilación TS2307. Las bibliotecas deben ser autocontenidas.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

// --- [INICIO DE REFACTORIZACIÓN SOBERANA v4.0.0] ---
// La importación externa ilegal ha sido eliminada.
// El contrato (Schema) ahora reside aquí, en su único lugar de uso,
// haciendo a esta utilidad autocontenida y arquitectónicamente pura.

/**
 * @const AssembledThemeSchema
 * @description Define la estructura validada de un tema ensamblado, que contiene
 *              las paletas de colores, fuentes y geometría listas para ser
 *              convertidas en variables CSS.
 */
export const AssembledThemeSchema = z.object({
  colors: z.record(z.string()).optional(),
  fonts: z.record(z.string()).optional(),
  geometry: z.record(z.string()).optional(),
});

/**
 * @type AssembledTheme
 * @description Infiere el tipo TypeScript del esquema de un tema ensamblado.
 */
export type AssembledTheme = z.infer<typeof AssembledThemeSchema>;

// --- [FIN DE REFACTORIZACIÓN SOBERANA v4.0.0] ---


/**
 * @function generateCssVariablesFromTheme
 * @description Genera una cadena de variables CSS a partir de un objeto de tema ensamblado.
 * @param {AssembledTheme} theme - El objeto de tema validado.
 * @returns {string} Una cadena de texto con las reglas CSS.
 */
export function generateCssVariablesFromTheme(theme: AssembledTheme): string {
  let cssString = "";

  const processObject = (obj: Record<string, unknown>, prefix = "") => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        cssString += `${prefix}${key}: ${value};`;
      }
    }
  };

  if (theme.colors) {
    processObject(theme.colors, "--");
  }
  if (theme.fonts) {
    processObject(theme.fonts);
  }
  if (theme.geometry) {
    processObject(theme.geometry);
  }

  return cssString;
}

/**
 * @function parseThemeNetString
 * @description Parsea una cadena de Nomenclatura Estructurada de Trazos (NET).
 * @param {string} netString - La cadena de entrada (ej. "cp-vitality.ft-poppins-inter.rd-soft").
 * @returns {Record<string, string>} Un objeto que mapea prefijos a nombres.
 */
export function parseThemeNetString(netString: string): Record<string, string> {
  const parts = netString.split(".");
  const themePlan: Record<string, string> = {};
  parts.forEach((part) => {
    const [prefix, ...nameParts] = part.split("-");
    if (prefix && nameParts.length > 0) {
      themePlan[prefix] = nameParts.join("-");
    }
  });
  return themePlan;
}
