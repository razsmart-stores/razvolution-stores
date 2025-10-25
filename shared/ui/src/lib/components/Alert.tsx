// RUTA: shared/ui/src/lib/components/Alert.tsx
/**
 * @file Alert.tsx
 * @description Componente de alerta de élite, nivelado para el ecosistema soberano.
 *              Cumple con la visión holística, utilizando dependencias del monorepo
 *              y el protocolo de entrega de aparatos completos.
 * @version 3.0.0 (Sovereign Import Leveling)
 * @author IA Arquitecto
 */
'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import * as React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---
// Se refactorizan las importaciones para que consuman desde las bibliotecas
// soberanas del workspace, resolviendo los errores TS2307.
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const AlertComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  logger.trace('[AlertComponent] Renderizando componente base de alerta.');
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
});
AlertComponent.displayName = 'AlertComponent';

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  logger.trace('[Alert] Renderizando alerta con animación MEA/UX.');
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <AlertComponent
        ref={ref}
        className={className}
        variant={variant}
        {...props}
      />
    </motion.div>
  );
});
Alert.displayName = 'Alert';

export { Alert, AlertTitle, AlertDescription };
