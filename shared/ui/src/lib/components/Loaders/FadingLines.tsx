// RUTA: shared/ui/src/lib/components/Loaders/FadingLines.tsx
/**
 * @file FadingLines.tsx
 * @description Componente de UI soberano para el loader de líneas que se desvanecen.
 *              Nivelado para cumplir con la arquitectura de monorepo, inyectado
 *              con observabilidad y alineado con los pilares de calidad de razvolution.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import React from 'react';

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
// Se corrige la ruta de importación para usar el alias soberano del workspace.
import { cn } from '@razvolution/shared-utils';

// --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD (PROTOCOLO HEIMDALL)] ---
// Se importa el logger desde la biblioteca de observabilidad.
import { logger } from '@razvolution/shared-logging';

/**
 * @component FadingLines
 * @description Renderiza un loader SVG animado con un efecto de líneas radiales que
 *              se desvanecen, ideal para indicar actividad o carga.
 * @param {React.SVGProps<SVGSVGElement>} props - Props estándar de SVG para personalización.
 * @returns {React.ReactElement}
 */
export function FadingLines({ className, ...props }: React.SVGProps<SVGSVGElement>): React.ReactElement {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD] ---
  logger.trace('[FadingLines] Renderizando componente v2.0.');

  const lines = Array.from({ length: 12 });
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      // --- [PASO 3: CUMPLIMIENTO DE THEMING] ---
      // La utilidad 'cn' ya se está utilizando correctamente.
      className={cn('text-primary', className)}
      {...props}
      aria-label="Cargando contenido" // --- [PASO 5: HIGIENE Y ACCESIBILIDAD] ---
    >
      <g>
        {lines.map((_, i) => (
          <rect
            key={i}
            x="11"
            y="1"
            width="2"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0"
            transform={`rotate(${i * 30} 12 12)`}
          >
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin={`${(i * 1) / 12}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    </svg>
  );
}
