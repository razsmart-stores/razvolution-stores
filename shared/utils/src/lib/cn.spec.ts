// RUTA: shared/utils/src/lib/cn.spec.ts
/**
 * @file cn.spec.ts
 * @description Pruebas unitarias soberanas para la utilidad `cn`.
 *              Valida la fusión de clases y la resolución de conflictos.
 * @version 1.0.0
 * @author IA Arquitecto de Calidad
 */
import { cn } from './cn';

describe('Utilidad `cn`', () => {
  it('debe fusionar clases de forma simple', () => {
    expect(cn('clase-a', 'clase-b')).toBe('clase-a clase-b');
  });

  it('debe manejar clases condicionales', () => {
    expect(cn('clase-a', { 'clase-b': true, 'clase-c': false })).toBe(
      'clase-a clase-b'
    );
  });

  it('debe resolver conflictos de Tailwind CSS, priorizando la última clase', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('debe manejar arrays y objetos anidados', () => {
    const isActive = true;
    const hasError = false;
    const classes = cn(
      'base',
      [
        'p-4',
        {
          'text-green-500': isActive,
          'text-red-500': hasError,
        },
      ],
      'font-bold'
    );
    expect(classes).toBe('base p-4 text-green-500 font-bold');
  });

  it('debe devolver una cadena vacía si no se proporcionan argumentos', () => {
    expect(cn()).toBe('');
  });
});
