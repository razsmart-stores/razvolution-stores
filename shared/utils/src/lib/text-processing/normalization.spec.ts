// RUTA: shared/utils/src/lib/text-processing/normalization.spec.ts
/**
 * @file normalization.spec.ts
 * @description Arnés de pruebas soberano y de máxima cobertura para el motor de normalización de texto.
 *              Valida el contrato de `normalizeStringForId` contra un conjunto exhaustivo de
 *              casos límite, con un enfoque crítico en el soporte completo de caracteres
 *              internacionales (Unicode) para garantizar el cumplimiento del pilar de i18n.
 * @version 3.0.0
 * @author IA Arquitecto de Calidad
 */
import { normalizeStringForId } from './normalization';

describe('Motor de Normalización Unicode `normalizeStringForId`', () => {
  // --- Casos de Prueba Base ---

  it('debe convertir espacios a guiones y poner el texto en minúsculas', () => {
    const input = 'Hola Mundo';
    const expected = 'hola-mundo';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe reemplazar cualquier secuencia de caracteres no alfanuméricos con un solo guion', () => {
    const input = 'Producto-estrella!! (SKU_123)';
    const expected = 'producto-estrella-sku-123';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe colapsar múltiples guiones consecutivos en uno solo', () => {
    const input = 'Un--Slug---Con----MuchosGuiones';
    const expected = 'un-slug-con-muchosguiones';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe eliminar guiones o espacios sobrantes al principio y al final', () => {
    const input = '  --Mi Producto--  ';
    const expected = 'mi-producto';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe preservar los números en la cadena', () => {
    const input = 'Modelo X-100 v2.0';
    const expected = 'modelo-x-100-v2-0';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  // --- Casos de Prueba de Resiliencia ---

  it('debe devolver una cadena vacía para entradas nulas, indefinidas o vacías', () => {
    expect(normalizeStringForId(null)).toBe('');
    expect(normalizeStringForId(undefined)).toBe('');
    expect(normalizeStringForId('')).toBe('');
    expect(normalizeStringForId('   ')).toBe('');
  });

  it('debe devolver una cadena vacía si la normalización solo produce caracteres no permitidos', () => {
    const input = '!!!###$$$ %%%';
    const expected = '';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  // --- [PRUEBA CRÍTICA DE MÁXIMA COBERTURA] Casos de Prueba de Internacionalización (Unicode) ---

  it('debe normalizar correctamente caracteres con acentos y diacríticos (español)', () => {
    const input = 'Producto de Edición Especial con Ñandú y Pingüino';
    const expected = 'producto-de-edicion-especial-con-nandu-y-pinguino';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe normalizar correctamente caracteres con diacríticos (francés/portugués)', () => {
    const input = 'Crème brûlée à la française & Pão de Açúcar';
    const expected = 'creme-brulee-a-la-francaise-pao-de-acucar';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe normalizar correctamente caracteres con diacríticos (alemán)', () => {
    const input = 'Äpfel, Öl und süße Grüße';
    const expected = 'apfel-ol-und-susse-grusse';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe manejar correctamente el Eszett alemán (ß), convirtiéndolo a "ss"', () => {
    const input = 'Fußball ist eine Straße';
    const expected = 'fussball-ist-eine-strasse';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe normalizar caracteres de otros alfabetos europeos (ej. polaco, checo)', () => {
    const input = 'Żółć, Čtenář, Łódź';
    const expected = 'zolc-ctenar-lodz';
    expect(normalizeStringForId(input)).toBe(expected);
  });

  it('debe manejar una mezcla compleja de idiomas y símbolos', () => {
    const input = '¡¡¡Súper-Promoción!!! Noël 🎄 2025 à Zürich';
    const expected = 'super-promocion-noel-2025-a-zurich';
    expect(normalizeStringForId(input)).toBe(expected);
  });
});
