// RUTA: features/product/src/lib/components/ProductCard.tsx
/**
 * @file ProductCard.tsx
 * @description Aparato de presentación soberano para una tarjeta de producto.
 *              Nivelado para cumplir con las convenciones canónicas de Tailwind CSS.
 * @version 2.2.0 (Tailwind Canonical Class Compliance)
 * @author IA Arquitecto
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useEffect } from "react";

// --- [IMPORTACIONES SOBERANAS DEL MONOREPO] ---
import { logger } from "@razvolution/shared-logging";
import { DynamicIcon, TiltCard } from "@razvolution/shared-ui";
import { cn, type Locale } from "@razvolution/shared-utils";

// --- [CONTRATOS DE DATOS LOCALES - Placeholder Arquitectónico] ---
/**
 * @typedef Product
 * @description Contrato de datos temporal para la entidad 'Product'.
 * @warning ESTE TIPO SERÁ REEMPLAZADO por una importación desde
 *          '@razvolution/shared-commerce-contracts'.
 */
type Product = {
  slug: string;
  isBestseller?: boolean;
  imageUrl: string;
  name: string;
  categorization: {
    primary: string;
  };
  rating?: number;
  currency: string;
  price: number;
};

/**
 * @typedef StorePageContent
 * @description Contrato de contenido i18n temporal.
 * @warning ESTE TIPO SERÁ REEMPLAZADO por una importación desde
 *          '@razvolution/shared-i18n-contracts'.
 */
type StorePageContent = {
  bestsellerLabel: string;
  addToCartButton: string;
};

// --- [SUB-APARATO ATÓMICO: StarRating] ---
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <DynamicIcon
        key={i}
        name="Star"
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating)
            ? "text-yellow-400"
            : "text-muted-foreground/30"
        )}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
      />
    ))}
  </div>
);

// --- [CONTRATO DE PROPS DEL APARATO PRINCIPAL] ---
interface ProductCardProps {
  product: Product;
  locale: Locale;
  content: StorePageContent;
}

// --- [APARATO SOBERANO: ProductCard] ---
export function ProductCard({ product, locale, content }: ProductCardProps) {
  const traceId = useMemo(
    () => logger.startTrace("ProductCard_Lifecycle"),
    []
  );
  useEffect(() => {
    logger.info(`[ProductCard] Componente montado para: ${product.name}`, {
      traceId,
      productId: product.slug,
    });
    return () => {
      logger.endTrace(traceId);
    };
  }, [traceId, product.name, product.slug]);

  return (
    <TiltCard className="h-full">
      <Link
        href={`/${locale}/product/${product.slug}`}
        className="group relative rounded-xl border border-border bg-card shadow-subtle h-full flex flex-col transition-all duration-300 hover:shadow-strong hover:-translate-y-1"
      >
        {product.isBestseller && (
          <div className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground text-xs font-bold uppercase px-2 py-1 rounded-full">
            {content.bestsellerLabel}
          </div>
        )}
        <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        {/* --- [INICIO DE REFACTORIZACIÓN CANÓNICA v2.2.0] --- */}
        <div className="p-4 grow flex flex-col text-center border-t border-border">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {product.categorization.primary}
          </p>
          <h3 className="text-md font-bold text-foreground grow">
            {product.name}
          </h3>
          {/* --- [FIN DE REFACTORIZACIÓN CANÓNICA v2.2.0] --- */}
          {product.rating && (
            <div className="flex justify-center my-2">
              <StarRating rating={product.rating} />
            </div>
          )}
          <p className="mt-2 text-xl font-semibold text-primary">
            {new Intl.NumberFormat(locale, {
              style: "currency",
              currency: product.currency,
            }).format(product.price)}
          </p>
        </div>
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <DynamicIcon
            name="ShoppingCart"
            className="w-10 h-10 text-white mb-4"
          />
          <span className="text-lg font-bold text-white text-center">
            {content.addToCartButton}
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
