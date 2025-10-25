// RUTA: shared/ui/src/lib/components/Skeleton.tsx
/**
 * @file Skeleton.tsx
 * @description Componente de esqueleto de élite, inyectado con MEA/UX.
 *              Nivelado a la v3.1.0 para alinearse con la arquitectura soberana
 *              y las convenciones canónicas de Tailwind CSS.
 * @version 3.1.0 (Canonical Class Compliance)
 * @author IA Arquitecto
 */
'use client';

import { motion } from 'framer-motion';
// --- [PASO 5: HIGIENE Y DOCUMENTACIÓN] ---
// Se elimina la importación innecesaria de React.
import React from 'react';

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD (PROTOCOLO HEIMDALL)] ---
  logger.trace('[Skeleton] Renderizando esqueleto de élite v3.1.');

  return (
    <div
      // --- [PASO 3: CUMPLIMIENTO DE THEMING (THEMING SOBERANO)] ---
      className={cn('relative overflow-hidden rounded-md bg-muted', className)}
      {...props}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 1.5,
          ease: 'linear',
        }}
        // --- [INICIO DE CORRECCIÓN CANÓNICA v3.1.0] ---
        className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-muted-foreground/10 to-transparent"
        // --- [FIN DE CORRECCIÓN CANÓNICA v3.1.0] ---
      />
    </div>
  );
}
