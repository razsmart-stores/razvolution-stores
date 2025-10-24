// RUTA: shared/ui/src/lib/components/Badge.tsx
/**
 * @file Badge.tsx
 * @description Componente de insignia de élite, inyectado con MEA/UX.
 *              Nivelado a la v3.0.0 para alinearse con la arquitectura soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---

// Paso 2: Inyección de Observabilidad (Ruta Corregida)
import { logger } from "@razvolution/shared-logging";
// Pasos 1 y 3: Alineación Arquitectónica y Cumplimiento de Theming (Ruta Corregida)
import { cn } from "@razvolution/shared-utils";

// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const BadgeComponent = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    logger.trace("[Badge] Renderizando componente de insignia.");
    return (
      <div
        className={cn(badgeVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
BadgeComponent.displayName = "Badge";

const AnimatedBadge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (props, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -1,
          boxShadow: "0 4px 10px hsla(var(--primary-rgb), 0.1)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="inline-block" // Necesario para que la transformación de hover funcione correctamente
      >
        <BadgeComponent {...props} ref={ref} />
      </motion.div>
    );
  }
);
AnimatedBadge.displayName = "Badge";

export { AnimatedBadge as Badge, badgeVariants };
