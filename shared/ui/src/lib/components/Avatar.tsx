// RUTA: shared/ui/src/lib/components/Avatar.tsx
/**
 * @file Avatar.tsx
 * @description Sistema de componentes de Avatar de élite.
 *              Nivelado a la v2.0.0 para alinearse con la arquitectura soberana del monorepo.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v2.0.0] ---

// Paso 2: Inyección de Observabilidad
import { logger } from '@razvolution/shared-logging';
// Paso 1: Alineación Arquitectónica
import { cn } from '@razvolution/shared-utils';

// --- [FIN DE NIVELACIÓN SOBERANA v2.0.0] ---

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => {
  logger.trace('[Avatar] Renderizando componente raíz.');
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  logger.trace('[AvatarImage] Renderizando imagen de avatar.');
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  logger.trace('[AvatarFallback] Renderizando fallback de avatar.');
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    />
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
