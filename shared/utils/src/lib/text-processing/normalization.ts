// RUTA: shared/utils/src/lib/text-processing/normalization.ts
/**
 * @file normalization.ts
 * @description SSoT y motor de utilidades puras para la normalización de texto.
 *              v8.0.0 (Robust & Multi-Stage Algorithm): Algoritmo completamente
 *              reconstruido que sigue una secuencia de saneamiento y normalización
 *              en múltiples etapas para manejar de forma robusta caracteres especiales,
 *              diacríticos y casos límite internacionales.
 * @version 8.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
export function normalizeStringForId(input: string | undefined | null): string {
  if (!input) {
    return "";
  }

  // --- [INICIO DE REFACTORIZACIÓN SOBERANA v8.0.0] ---

  const text = input.toString().toLowerCase();

  // Etapa 1: Manejo de caracteres especiales que tienen una transliteración común.
  let slug = text
    .replace(/ß/g, 'ss') // Eszett alemán
    .replace(/ł/g, 'l'); // L con stroke polaca

  // Etapa 2: Normalización de diacríticos.
  slug = slug
    .normalize('NFD') // Descompone: "é" -> "e" + "´"
    .replace(/[\u0300-\u036f]/g, ''); // Elimina los acentos combinados

  // Etapa 3: Saneamiento de caracteres.
  // Reemplaza cualquier caracter que NO sea una letra a-z, un número 0-9 o un espacio en blanco
  // por un espacio. Esto convierte guiones bajos, puntos, etc., en espacios.
  slug = slug.replace(/[^a-z0-9\s]/g, ' ');

  // Etapa 4: Slugificación final.
  slug = slug
    .trim() // Elimina espacios al inicio/final
    .replace(/\s+/g, '-') // Reemplaza uno o más espacios por un solo guion
    .replace(/-+/g, '-'); // Colapsa múltiples guiones por si acaso

  return slug;
}
