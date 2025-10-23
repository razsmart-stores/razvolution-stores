// RUTA: shared/utils/src/lib/merge.ts
/**
 * @file merge.ts
 * @description Utilidad pura y atómica para la fusión profunda (deep merge) de objetos.
 * @version 3.0.0 (Dependency Purge)
 * @author RaZ Podestá - MetaShark Tech
 */

// El logger ha sido eliminado para cumplir con la jerarquía arquitectónica.

const isObject = (item: unknown): item is Record<string, unknown> => {
  return item !== null && typeof item === "object" && !Array.isArray(item);
};

export function deepMerge<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  const output = { ...target } as T & U;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const targetValue = (target as Record<string, unknown>)[key];
      const sourceValue = source[key as keyof U];

      if (isObject(targetValue) && isObject(sourceValue)) {
        (output as Record<string, unknown>)[key] = deepMerge(
          targetValue,
          sourceValue
        );
      } else {
        (output as Record<string, unknown>)[key] = sourceValue;
      }
    });
  }

  return output;
}
