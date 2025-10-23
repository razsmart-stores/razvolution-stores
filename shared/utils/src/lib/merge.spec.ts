// RUTA: shared/utils/src/lib/merge.spec.ts
/**
 * @file merge.spec.ts
 * @description Pruebas unitarias para la utilidad de fusión profunda `deepMerge`.
 *              Valida la correcta fusión de objetos anidados y la inmutabilidad.
 * @version 1.0.0
 * @author IA Asistente de Calidad
 */
import { deepMerge } from './merge';

describe('Utilidad `deepMerge`', () => {
  // Prueba 1: Fusión de objetos planos (sin anidación).
  it('debe fusionar correctamente dos objetos planos', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  // Prueba 2: Fusión de objetos anidados.
  it('debe fusionar objetos anidados de forma recursiva', () => {
    const target = { a: { x: 1, y: 2 }, b: 5 };
    const source = { a: { y: 3, z: 4 }, c: 6 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 5, c: 6 });
  });

  // Prueba 3: La fusión no debe modificar los objetos originales (inmutabilidad).
  it('debe devolver un nuevo objeto sin mutar los objetos de origen', () => {
    const target = { a: { x: 1 } };
    const source = { a: { y: 2 } };

    // Hacemos copias para comparar después de la fusión.
    const targetOriginal = JSON.parse(JSON.stringify(target));
    const sourceOriginal = JSON.parse(JSON.stringify(source));

    deepMerge(target, source);

    // Verificamos que los objetos originales no han cambiado.
    expect(target).toEqual(targetOriginal);
    expect(source).toEqual(sourceOriginal);
  });

  // Prueba 4: Sobrescribir tipos de datos diferentes.
  it('debe permitir que el origen sobrescriba una propiedad con un tipo diferente', () => {
    const target = { a: { x: 1 }, b: 'hola' };
    const source = { a: 'adiós', b: { y: 2 } };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: 'adiós', b: { y: 2 } });
  });
});
