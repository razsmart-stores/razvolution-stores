// RUTA: shared/ui/src/lib/components/Popover.tsx
/**
 * @file Popover.tsx
 * @description Componente de UI soberano para mostrar contenido flotante.
 *              Basado en las primitivas de Radix UI para máxima accesibilidad y
 *              nivelado para el ecosistema razvolution.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD] ---
  logger.trace('[PopoverContent] Renderizando v2.0.');
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        // --- [PASO 3: CUMPLIMIENTO DE THEMING] ---
        className={cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
