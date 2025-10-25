// RUTA: shared/utils/src/lib/constants.ts
/**
 * @file constants.ts
 * @description SSoT para las constantes globales del ecosistema.
 * @version 4.0.0 (Dependency Purge)
 * @author RaZ Podestá - MetaShark Tech
 */
'use server-only';

// El logger ha sido eliminado para cumplir con la jerarquía arquitectónica.

export const TAGS = {
  products: 'products',
  cart: 'cart',
} as const;
