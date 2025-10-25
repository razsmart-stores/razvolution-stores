// RUTA: shared/ui/src/lib/components/Collapsible.tsx
/**
 * @file Collapsible.tsx
 * @description Sistema de componentes de élite para contenido expandible/colapsable.
 *              Nivelado para alinearse con la arquitectura soberana del monorepo.
 * @version 4.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v4.0.0] ---

// Paso 1 y 2: Alineación Arquitectónica e Inyección de Observabilidad
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';

// --- [FIN DE NIVELACIÓN SOBERANA v4.0.0] ---

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => {
  // Paso 2: Inyección de Observabilidad
  logger.trace('[CollapsibleContent] Renderizando contenido animado v4.0.');
  return (
    <AnimatePresence initial={false}>
      <CollapsiblePrimitive.Content
        ref={ref}
        className="overflow-hidden"
        {...props}
        asChild
      >
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {/* Paso 3: Cumplimiento de Theming (ya se utiliza 'cn') */}
          <div className={cn('pt-4', className)}>{children}</div>
        </motion.div>
      </CollapsiblePrimitive.Content>
    </AnimatePresence>
  );
});
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
