// RUTA: shared/commerce-contracts/src/lib/cart.contract.ts
/**
 * @file cart.contract.ts
 * @description SSoT para el contrato de datos de la entidad Cart (Carrito).
 * @version 1.0.0 (Sovereign Creation)
 * @author IA Arquitecto
 */
import { z } from 'zod';
// Contrato para una línea individual de producto en el carrito
export const CartLineSchema = z.object({
  id: z.string(),
  quantity: z.number().min(0),
  merchandise: z.object({
    id: z.string(),
    title: z.string(),
    price: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
});
// Contrato para el objeto principal del Carrito
export const CartSchema = z.object({
  id: z.string(),
  lines: z.array(CartLineSchema),
  cost: z.object({
    totalAmount: z.object({
      amount: z.string(),
      currencyCode: z.string(),
    }),
  }),
});
//# sourceMappingURL=cart.contract.js.map
