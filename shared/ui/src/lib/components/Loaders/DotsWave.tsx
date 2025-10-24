// RUTA: shared/ui/src/lib/components/Loaders/DotsWave.tsx
/**
 * @file DotsWave.tsx
 * @description Loader SVG animado con efecto de onda.
 *              Nivelado a la v2.0.0 para alinearse con la arquitectura soberana del monorepo.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

// --- [INICIO DE NIVELACIÓN SOBERANA v2.0.0] ---

// Paso 5: Higiene de Código - Se elimina la importación innecesaria de React.
// import React from 'react';

// Paso 2: Inyección de Observabilidad
import { logger } from '@razvolution/shared-logging';
// Pasos 1 y 3: Alineación Arquitectónica y Cumplimiento de Theming
import { cn } from '@razvolution/shared-utils';

// --- [FIN DE NIVELACIÓN SOBERANA v2.0.0] ---

export function DotsWave({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  // Paso 2: Inyección de Observabilidad - Se traza el renderizado del componente.
  logger.trace('[DotsWave] Renderizando componente de UI atómico.');

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-primary', className)}
      {...props}
    >
      <circle cx="4" cy="12" r="3" fill="currentColor">
        <animate
          id="a"
          begin="0;c.end-0.25s"
          attributeName="r"
          from="3"
          to="3"
          values="3;0;3"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="currentColor">
        <animate
          id="b"
          begin="a.end-0.75s"
          attributeName="r"
          from="3"
          to="3"
          values="3;0;3"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="currentColor">
        <animate
          id="c"
          begin="b.end-0.5s"
          attributeName="r"
          from="3"
          to="3"
          values="3;0;3"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
