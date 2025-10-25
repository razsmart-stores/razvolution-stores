/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para la Capa de Abstracción de Pagos (PAL).
 *              v2.0.0 (Type-Safe Contract): Se elimina el tipo 'any' y se introduce
 *              un contrato de datos explícito para el resultado de la intención de pago,
 *              restaurando la seguridad de tipos absoluta.
 * @version 2.0.0
 * @author IA Arquitecto
 */
/**
 * @interface PaymentIntentResult
 * @description Contrato de datos soberano para el resultado de la creación de
 *              una intención de pago. Define la forma de los datos que la PAL
 *              devuelve a la capa de negocio.
 */
export interface PaymentIntentResult {
  id: string;
  client_secret: string | null;
}
/**
 * @function createPaymentIntent
 * @description Placeholder soberano para crear una intención de pago.
 * @returns {Promise<PaymentIntentResult>} Una promesa que resuelve al objeto de la intención de pago.
 * @warning Esta es una implementación de marcador de posición.
 */
export declare const createPaymentIntent: (
  amount: number,
  currency: string,
  metadata: object
) => Promise<PaymentIntentResult>;
//# sourceMappingURL=index.d.ts.map
