// RUTA: shared/ui/src/lib/components/Separator.tsx
/**
 * @file Separator.tsx
 * @description Componente de UI soberano para renderizar una línea de separación.
 *              Nivelado para alinearse con la arquitectura del monorepo, utilizando
 *              observabilidad y dependencias soberanas.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

// --- PASO 1 y 2: Nivelación de Importaciones e Inyección de Observabilidad ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => {
    logger.trace(`[Separator] Renderizando con orientación: ${orientation}`);
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
