// RUTA: shared/ui/src/lib/components/Price.tsx
/**
 * @file Price.tsx
 * @description Componente de UI de élite para la visualización de precios.
 *              Nivelado para alinearse con la arquitectura soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import {
  motion,
  useSpring,
  useInView,
  type HTMLMotionProps,
} from "framer-motion";
import React, { useEffect, useRef } from "react";

// --- PASO 1 y 2: Nivelación de Importaciones e Inyección de Observabilidad ---
import { logger } from "@razvolution/shared-logging";
import { cn } from "@razvolution/shared-utils";


// Componente atómico interno para el contador animado.
const AnimatedCounter = ({
  value,
  locale,
  currencyCode,
}: {
  value: number;
  locale: string;
  currencyCode: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const springValue = useSpring(isInView ? value : value * 0.9, {
    mass: 0.8,
    stiffness: 100,
    damping: 15,
  });

  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currencyCode,
          currencyDisplay: "narrowSymbol",
        }).format(latest);
      }
    });
    return unsubscribe;
  }, [springValue, locale, currencyCode]);

  return <span ref={ref} />;
};

type MotionPProps = Omit<HTMLMotionProps<"p">, "children">;

interface PriceProps extends MotionPProps {
  amount: string | number;
  locale: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
  isHighlighted?: boolean;
}

export function Price({
  amount,
  locale,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
  isHighlighted = false,
  ...props
}: PriceProps): React.ReactElement {
  logger.trace(`[Price] Renderizando v3.0 para locale: ${locale}`);

  const numericAmount = Number(amount);

  return (
    <motion.p
      animate={{ scale: isHighlighted ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      suppressHydrationWarning={true}
      className={cn(
        "transition-colors duration-300",
        isHighlighted && "text-accent",
        className
      )}
      {...props}
    >
      <AnimatedCounter
        value={numericAmount}
        locale={locale}
        currencyCode={currencyCode}
      />
      <span className={cn("ml-1 inline", currencyCodeClassName)}>
        {currencyCode}
      </span>
    </motion.p>
  );
}
