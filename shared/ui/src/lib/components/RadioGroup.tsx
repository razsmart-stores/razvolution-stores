// RUTA: shared/ui/src/lib/components/RadioGroup.tsx
/**
 * @file RadioGroup.tsx
 * @description Sistema de componentes soberano para grupos de radio-botones.
 *              Nivelado para alinearse con la arquitectura del monorepo,
 *              utilizando observabilidad y dependencias soberanas.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

// --- PASO 1 y 2: Nivelación de Importaciones e Inyección de Observabilidad ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
import { DynamicIcon } from './DynamicIcon';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  logger.trace('[RadioGroup] Renderizando.');
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  logger.trace('[RadioGroupItem] Renderizando.');
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <DynamicIcon
          name="Circle"
          className="h-2.5 w-2.5 fill-current text-current"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
