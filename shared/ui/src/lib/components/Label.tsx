// RUTA: shared/ui/src/lib/components/Label.tsx
/**
 * @file Label.tsx
 * @description Componente de etiqueta de élite, basado en Radix UI para máxima
 *              accesibilidad. Nivelado a la v3.0.0 para alinearse con la arquitectura
 *              soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---

// Paso 2: Inyección de Observabilidad (Ruta Corregida)
import { logger } from "@razvolution/shared-logging";
// Pasos 1 y 3: Alineación Arquitectónica y Cumplimiento de Theming (Ruta Corregida)
import { cn } from "@razvolution/shared-utils";

// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => {
  logger.trace("[Label] Renderizando componente de etiqueta.");
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
