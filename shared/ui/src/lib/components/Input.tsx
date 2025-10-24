// RUTA: shared/ui/src/lib/components/Input.tsx
/**
 * @file Input.tsx
 * @description Componente de UI atómico para campos de entrada.
 *              Nivelado para alinearse con la arquitectura soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import * as React from "react";

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---

// Pasos 1 y 2: Alineación Arquitectónica e Inyección de Observabilidad
import { logger } from "@razvolution/shared-logging";
import { cn } from "@razvolution/shared-utils";

// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // Paso 2: Inyección de Observabilidad
    logger.trace("[Input] Renderizando componente de UI atómico v3.0.");
    return (
      <input
        type={type}
        // Paso 3: Cumplimiento de Theming (ya se utiliza 'cn')
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
