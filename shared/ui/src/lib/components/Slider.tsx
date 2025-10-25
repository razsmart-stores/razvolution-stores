// RUTA: shared/ui/src/lib/components/Slider.tsx
/**
 * @file Slider.tsx
 * @description Componente de UI soberano para un control deslizante (slider).
 *              Basado en las primitivas de Radix UI para máxima accesibilidad y
 *              nivelado para el ecosistema razvolution.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';

/**
 * @component Slider
 * @description Un control de entrada que permite a los usuarios seleccionar un valor
 *              de un rango deslizando un pulgar a lo largo de una pista.
 * @param {React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>} props - Props del componente.
 * @returns {React.ReactElement}
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD] ---
  logger.trace('[Slider] Renderizando v2.0.');

  return (
    <SliderPrimitive.Root
      ref={ref}
      // --- [PASO 3: CUMPLIMIENTO DE THEMING] ---
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
