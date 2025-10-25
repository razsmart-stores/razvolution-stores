// RUTA: shared/data-access/src/lib/commerce/cart.actions.ts
/**
 * @file cart.actions.ts
 * @description Server Actions soberanas para la gestión del carrito de compras.
 * @version 7.3.0 (Sovereign Dependency Correction)
 * @author IA Arquitecto
 */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// --- [INICIO DE CORRECCIÓN SOBERANA v7.3.0] ---
// Se ha corregido la ruta de importación para que apunte a la biblioteca soberana
// correcta (@razvolution/shared-logging), resolviendo el error TS2307. El error
// original sobre "./heimdall.contracts" indicaba una estructura de proyecto
// obsoleta que ha sido rectificada.
import { logger } from '@razvolution/shared-logging';
// --- [FIN DE CORRECCIÓN SOBERANA v7.3.0] ---
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from '@razvolution/shared-shopify';
import { TAGS } from '@razvolution/shared-utils';

export async function addItem(
  _prevState: unknown,
  formData: FormData
): Promise<string | undefined> {
  const traceId = logger.startTrace('addItemAction_v7.3');
  const selectedVariantId = formData.get('variantId') as string | undefined;

  if (!selectedVariantId) {
    logger.warn('[addItemAction] Intento de añadir sin variantId.', {
      traceId,
    });
    logger.endTrace(traceId);
    return 'cart.errors.addItemFailed';
  }

  try {
    let cartId = cookies().get('cartId')?.value;
    let cart = cartId ? await getCart(cartId) : undefined;

    if (!cart || !cartId) {
      logger.traceEvent(traceId, 'Carrito no encontrado, creando uno nuevo...');
      cart = await createCart();
      cartId = cart.id;
      if (cartId) {
        cookies().set('cartId', cartId);
      }
      logger.success('[addItemAction] Nuevo carrito creado con éxito.', {
        cartId,
        traceId,
      });
    }

    if (!cartId) {
      throw new Error('Fallo crítico al obtener o crear el cartId.');
    }

    logger.traceEvent(traceId, 'Añadiendo item a la API de Shopify...', {
      cartId,
    });
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);

    logger.success('[addItemAction] Item añadido al carrito con éxito.', {
      cartId,
      variantId: selectedVariantId,
      traceId,
    });
    return undefined;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    logger.error('[addItemAction] Fallo inesperado al añadir item.', {
      error: errorMessage,
      traceId,
    });
    return 'cart.errors.addItemFailed';
  } finally {
    logger.endTrace(traceId);
  }
}

export async function removeItem(
  _prevState: unknown,
  lineId: string
): Promise<string | undefined> {
  const traceId = logger.startTrace('removeItemAction');
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    logger.warn('[removeItemAction] Intento de eliminar item sin cartId.', {
      traceId,
    });
    logger.endTrace(traceId);
    return 'cart.errors.removeItemFailed';
  }

  try {
    logger.traceEvent(traceId, 'Eliminando línea de item del carrito...', {
      cartId,
      lineId,
    });
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
    logger.success('[removeItemAction] Item eliminado con éxito.', { traceId });
    return undefined;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    logger.error('[removeItemAction] Fallo al eliminar item.', {
      error: errorMessage,
      cartId,
      traceId,
    });
    return 'cart.errors.removeItemFailed';
  } finally {
    logger.endTrace(traceId);
  }
}

export async function updateItemQuantity(
  _prevState: unknown,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
): Promise<string | undefined> {
  const traceId = logger.startTrace('updateItemQuantityAction');
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    logger.warn(
      '[updateItemQuantity] Intento de actualizar cantidad sin cartId.',
      { traceId }
    );
    logger.endTrace(traceId);
    return 'cart.errors.updateItemFailed';
  }

  try {
    if (payload.quantity === 0) {
      logger.traceEvent(traceId, 'Cantidad es 0, eliminando línea de item...', {
        cartId,
        lineId: payload.lineId,
      });
      await removeFromCart(cartId, [payload.lineId]);
    } else {
      logger.traceEvent(traceId, 'Actualizando cantidad de línea de item...', {
        cartId,
        ...payload,
      });
      await updateCart(cartId, [
        {
          id: payload.lineId,
          merchandiseId: payload.variantId,
          quantity: payload.quantity,
        },
      ]);
    }
    revalidateTag(TAGS.cart);
    logger.success('[updateItemQuantity] Cantidad actualizada con éxito.', {
      traceId,
    });
    return undefined;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    logger.error('[updateItemQuantity] Fallo al actualizar la cantidad.', {
      error: errorMessage,
      cartId,
      traceId,
    });
    return 'cart.errors.updateItemFailed';
  } finally {
    logger.endTrace(traceId);
  }
}
