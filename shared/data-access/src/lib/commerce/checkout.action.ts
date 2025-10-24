// RUTA: shared/data-access/src/lib/commerce/checkout.action.ts
/**
 * @file checkout.action.ts
 * @description Server Action soberana que orquesta el proceso de checkout.
 * @version 4.1.0 (Cart ID Contract Compliance)
 * @author IA Arquitecto
 */
"use server";

// --- [INICIO DE CORRECCIÓN SOBERANA v4.1.0] ---
// Se importa la función 'cookies' para acceder al cartId.
import { cookies } from "next/headers";
// --- [FIN DE CORRECCIÓN SOBERANA v4.1.0] ---
import { logger } from "@razvolution/shared-logging";
import { createPaymentIntent } from "@razvolution/shared-payments";
import { getCart } from "@razvolution/shared-shopify";
import type { ActionResult } from "@razvolution/shared-utils";

export interface CheckoutSessionPayload {
  clientSecret: string | null;
}

export async function createCheckoutSessionAction(): Promise<
  ActionResult<CheckoutSessionPayload>
> {
  const traceId = logger.startTrace("createCheckoutSessionAction_v4.1");
  logger.info("[Checkout Action] Iniciando sesión de checkout...", {
    traceId,
  });

  // --- [INICIO DE CORRECCIÓN SOBERANA v4.1.0] ---
  // Se obtiene el cartId de las cookies del usuario.
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    logger.warn("[Checkout Action] Intento de checkout sin cartId en las cookies.", {
      traceId,
    });
    return { success: false, error: "cart.errors.noCartId" };
  }

  // Se pasa el cartId a la función getCart, cumpliendo con el contrato.
  const cart = await getCart(cartId);
  // --- [FIN DE CORRECCIÓN SOBERANA v4.1.0] ---

  if (!cart || cart.lines.length === 0) {
    logger.warn("[Checkout Action] Intento de checkout con carrito vacío.", {
      traceId,
      cartId,
    });
    return { success: false, error: "cart.errors.emptyCart" };
  }

  const amountInCents = Math.round(
    parseFloat(cart.cost.totalAmount.amount) * 100
  );
  const currency = cart.cost.totalAmount.currencyCode;

  logger.traceEvent(traceId, "Datos del carrito validados y procesados.", {
    cartId: cart.id,
    itemCount: cart.lines.length,
    amount: amountInCents,
    currency,
  });

  try {
    const metadata = { cartId: cart.id };
    logger.traceEvent(
      traceId,
      "Inyectando metadatos en PaymentIntent.",
      metadata
    );

    const paymentIntent = await createPaymentIntent(
      amountInCents,
      currency,
      metadata
    );

    logger.success("[Checkout Action] PaymentIntent creado con metadatos.", {
      paymentIntentId: paymentIntent.id,
      traceId,
    });
    return {
      success: true,
      data: { clientSecret: paymentIntent.client_secret },
    };
  } catch (error) {
    logger.error("[Checkout Action] Fallo al crear PaymentIntent.", {
      error,
      traceId,
    });
    return { success: false, error: "cart.errors.checkoutFailed" };
  } finally {
    logger.endTrace(traceId);
  }
}
