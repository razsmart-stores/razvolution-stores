// RUTA: shared/utils/src/lib/types/actions.types.ts
/**
 * @file actions.types.ts
 * @description SSoT para los contratos de tipos de las Server Actions.
 * @version 1.0.0
 * @author IA Asistente de Calidad
 */

/**
 * @type ActionResult
 * @description Un tipo genérico que representa el resultado de una Server Action.
 *              Puede ser un éxito (`success: true`) con datos, o un fallo
 *              (`success: false`) con un mensaje de error.
 * @template T El tipo de los datos devueltos en caso de éxito.
 */
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
