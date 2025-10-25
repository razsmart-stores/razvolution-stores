// RUTA: shared/commerce-contracts/src/lib/product.contract.ts
/**
 * @file product.contract.ts
 * @description SSoT para el contrato de datos de la entidad Product.
 * @version 1.0.0 (Sovereign Creation)
 * @author IA Arquitecto
 */
import { z } from 'zod';

export const ProductSchema = z.object({
  slug: z.string().min(1, 'El slug del producto es requerido.'),
  isBestseller: z.boolean().optional(),
  imageUrl: z.string().url('La URL de la imagen debe ser válida.'),
  name: z
    .string()
    .min(3, 'El nombre del producto debe tener al menos 3 caracteres.'),
  categorization: z.object({
    primary: z.string().min(1, 'La categoría principal es requerida.'),
  }),
  rating: z.number().min(0).max(5).optional(),
  currency: z
    .string()
    .length(3, 'El código de moneda debe tener 3 caracteres.'),
  price: z.number().positive('El precio debe ser un número positivo.'),
});

export type Product = z.infer<typeof ProductSchema>;

export const StorePageContentSchema = z.object({
  bestsellerLabel: z.string(),
  addToCartButton: z.string(),
});

export type StorePageContent = z.infer<typeof StorePageContentSchema>;
