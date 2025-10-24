// RUTA: shared/ui/src/lib/components/FormInput.tsx
/**
 * @file FormInput.tsx
 * @description Componente de UI atómico para campos de texto de formulario.
 *              Nivelado para alinearse con la arquitectura soberana, consumir
 *              contratos de tipo soberanos y cumplir con los pilares de calidad.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import React, { forwardRef } from "react";

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---

// Pasos 1, 2, 3 y 4: Alineación, Observabilidad, Theming y Contratos
import { logger } from "@razvolution/shared-logging";
import { cn, type LucideIconName } from "@razvolution/shared-utils";
import { DynamicIcon } from "./DynamicIcon";

// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIconName;
  label: string;
  error?: string;
  containerClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { id, name, icon, label, error, className, containerClassName, ...props },
    ref
  ) => {
    // Paso 2: Inyección de Observabilidad
    logger.trace(`[FormInput] Renderizando v3.0 para input: ${id || name}`);

    return (
      <div className={cn("relative", containerClassName)}>
        <label
          htmlFor={id || name}
          className="absolute left-3 -top-2.5 bg-background px-1 text-xs text-muted-foreground"
        >
          {label}
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <DynamicIcon
              name={icon}
              className={cn(
                "h-5 w-5",
                error ? "text-destructive" : "text-muted-foreground"
              )}
              aria-hidden="true"
            />
          </div>
          <input
            id={id || name}
            name={name}
            ref={ref}
            // Paso 3: Cumplimiento de Theming
            className={cn(
              "block w-full rounded-md border-0 bg-background/50 py-3 pl-10 pr-3 text-foreground ring-1 ring-inset transition-all duration-150 placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
              error
                ? "ring-destructive focus:ring-destructive"
                : "ring-input focus:ring-primary",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 pl-3 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
