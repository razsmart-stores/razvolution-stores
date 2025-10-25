// RUTA: shared/ui/src/lib/components/razbits/MagicBento/BentoCard.tsx
/**
 * @file BentoCard.tsx
 * @description Componente de presentación puro para una tarjeta individual
 *              dentro de la cuadrícula MagicBento. Nivelado para alinearse
 *              con la arquitectura soberana y las clases canónicas de Tailwind.
 * @version 3.1.0 (Canonical Class Compliance)
 * @author IA Arquitecto
 */
'use client';

// --- [PASO 5: HIGIENE Y DOCUMENTACIÓN] ---
// Se elimina la importación innecesaria de React.
import React from 'react';

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
// --- [PASO 4: ADHERENCIA A CONTRATOS (SEGURIDAD DE TIPOS)] ---
import type { BentoCardData } from './magic-bento.schema';

interface BentoCardProps {
  card: BentoCardData;
  cardRef: (node: HTMLDivElement | null) => void;
  className?: string;
  textAutoHide?: boolean;
}

export function BentoCard({
  card,
  cardRef,
  className,
  textAutoHide,
}: BentoCardProps): React.ReactElement {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD (PROTOCOLO HEIMDALL)] ---
  logger.trace(`[BentoCard] Renderizando tarjeta v3.1: ${card.title}`);

  return (
    <div
      ref={cardRef}
      className={cn(
        `group card flex flex-col justify-between relative aspect-square md:aspect-4/3 min-h-[200px] p-5 rounded-3xl border border-white/10
         bg-black/30 backdrop-blur-sm overflow-hidden transition-all duration-300
         ease-in-out hover:-translate-y-1`,
        className
      )}
    >
      <div className="card-header flex justify-between items-center relative z-10">
        <span className="text-sm font-semibold text-primary">{card.label}</span>
      </div>
      <div className="card-content flex flex-col relative z-10 transition-opacity duration-300">
        <h3
          className={cn(
            'card-title font-bold text-lg text-foreground m-0 mb-1',
            textAutoHide && 'group-hover:opacity-0'
          )}
        >
          {card.title}
        </h3>
        <p
          className={cn(
            'card-description text-sm text-muted-foreground leading-snug',
            textAutoHide && 'group-hover:opacity-0'
          )}
        >
          {card.description}
        </p>
      </div>
      <div
        // --- [INICIO DE CORRECCIÓN CANÓNICA v3.1.0] ---
        className="absolute inset-0 rounded-3xl pointer-events-none
                   bg-[radial-gradient(var(--glow-radius)_circle_at_var(--glow-x)_var(--glow-y),rgba(var(--glow-color-rgb),calc(var(--glow-intensity)*0.25)),transparent_40%)]
                   opacity-(--glow-intensity) transition-opacity duration-300"
        // --- [FIN DE CORRECCIÓN CANÓNICA v3.1.0] ---
        style={
          {
            '--glow-x': '50%',
            '--glow-y': '50%',
            '--glow-intensity': 0,
            '--glow-radius': '400px',
          } as React.CSSProperties
        }
      />
    </div>
  );
}
