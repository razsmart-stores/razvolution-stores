// RUTA: shared/ui/src/lib/components/Checkbox.tsx
/**
 * @file Checkbox.tsx
 * @description Componente de UI soberano para checkbox.
 *              Nivelado para alinearse con la arquitectura del monorepo, utilizando
 *              dependencias soberanas y con observabilidad inyectada.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v2.0.0] ---

// Paso 1 y 2: Alineación Arquitectónica e Inyección de Observabilidad
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
import { DynamicIcon } from './DynamicIcon'; // Se corrige a una ruta relativa local

// --- [FIN DE NIVELACIÓN SOBERANA v2.0.0] ---

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Paso 2: Inyección de Observabilidad
  logger.trace('[Checkbox] Renderizando componente v2.0.');

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      // Paso 3: Cumplimiento de Theming (ya se utiliza 'cn')
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <DynamicIcon name="Check" className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
