// RUTA: shared/data-access/src/lib/commerce/checkout.action.ts
/**
 * @file checkout.action.ts
 * @description Server Action soberana que orquesta el proceso de checkout.
 * @version 4.2.0 (Type-Safe Error Handling)
 * @author IA Arquitecto
 */
'use server';

import { cookies } from 'next/headers';
import { logger } from '@razvolution/shared-logging';
import { createPaymentIntent } from '@razvolution/shared-payments';
import { getCart } from '@razvolution/shared-shopify';
import type { ActionResult } from '@razvolution/shared-utils';

export interface CheckoutSessionPayload {
  clientSecret: string | null;
}

export async function createCheckoutSessionAction(): Promise<
  ActionResult<CheckoutSessionPayload>
> {
  const traceId = logger.startTrace('createCheckoutSessionAction_v4.2');
  logger.info('[Checkout Action] Iniciando sesión de checkout...', {
    traceId,
  });

  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    logger.warn(
      '[Checkout Action] Intento de checkout sin cartId en las cookies.',
      {
        traceId,
      }
    );
    return { success: false, error: 'cart.errors.noCartId' };
  }

  const cart = await getCart(cartId);

  if (!cart || cart.lines.length === 0) {
    logger.warn('[Checkout Action] Intento de checkout con carrito vacío.', {
      traceId,
      cartId,
    });
    return { success: false, error: 'cart.errors.emptyCart' };
  }

  const amountInCents = Math.round(
    parseFloat(cart.cost.totalAmount.amount) * 100
  );
  const currency = cart.cost.totalAmount.currencyCode;

  logger.traceEvent(traceId, 'Datos del carrito validados y procesados.', {
    cartId: cart.id,
    itemCount: cart.lines.length,
    amount: amountInCents,
    currency,
  });

  try {
    const metadata = { cartId: cart.id };
    logger.traceEvent(
      traceId,
      'Inyectando metadatos en PaymentIntent.',
      metadata
    );

    const paymentIntent = await createPaymentIntent(
      amountInCents,
      currency,
      metadata
    );

    logger.success('[Checkout Action] PaymentIntent creado con metadatos.', {
      paymentIntentId: paymentIntent.id,
      traceId,
    });
    return {
      success: true,
      data: { clientSecret: paymentIntent.client_secret },
    };
  } catch (error) {
    // --- [INICIO DE CORRECCIÓN SOBERANA v4.2.0] ---
    // Se procesa el error de tipo 'unknown' de forma segura para crear un
    // mensaje de error legible por humanos, cumpliendo así con el contrato
    // del logger (TS2345).
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Error desconocido durante el checkout.';
    logger.error('[Checkout Action] Fallo al crear PaymentIntent.', {
      error: errorMessage,
      traceId,
    });
    // --- [FIN DE CORRECCIÓN SOBERANA v4.2.0] ---
    return { success: false, error: 'cart.errors.checkoutFailed' };
  } finally {
    logger.endTrace(traceId);
  }
}
