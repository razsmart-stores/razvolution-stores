// RUTA: shared/ui/src/lib/components/Tooltip.tsx
/**
 * @file Tooltip.tsx
 * @description Sistema de componentes de Tooltip de élite, accesible y animado.
 *              Nivelado a la v3.0.0 para alinearse con la arquitectura soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  logger.trace('[TooltipContent] Renderizando contenido de tooltip v3.0.');

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn('z-50', className)}
        {...props}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className="overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
