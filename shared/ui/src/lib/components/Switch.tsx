// RUTA: shared/ui/src/lib/components/Switch.tsx
/**
 * @file Switch.tsx
 * @description Componente de UI soberano para un control de interruptor (toggle switch).
 *              Basado en las primitivas de Radix UI para máxima accesibilidad y
 *              nivelado para el ecosistema razvolution.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
import { logger } from "@razvolution/shared-logging";
import { cn } from "@razvolution/shared-utils";

/**
 * @component Switch
 * @description Un control que permite al usuario alternar entre dos estados: encendido y apagado.
 * @param {React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>} props - Props del componente.
 * @returns {React.ReactElement}
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD] ---
  logger.trace('[Switch] Renderizando v2.0.');

  return (
    <SwitchPrimitives.Root
      // --- [PASO 3: CUMPLIMIENTO DE THEMING] ---
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
