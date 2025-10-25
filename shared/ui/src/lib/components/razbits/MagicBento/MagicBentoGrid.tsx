// RUTA: shared/ui/src/lib/components/razbits/MagicBento/MagicBentoGrid.tsx
/**
 * @file MagicBentoGrid.tsx
 * @description Componente de trabajo de presentación puro para la cuadrícula MagicBento.
 *              Nivelado para alinearse con la arquitectura soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import type { z } from 'zod';

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
import { useBentoGridInteraction } from './use-bento-grid-interaction';
import { BentoCard } from './BentoCard';
import {
  type BentoCardData,
  type MagicBentoConfigSchema,
} from './magic-bento.schema';
// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

type BentoConfig = z.infer<typeof MagicBentoConfigSchema>;

interface MagicBentoGridProps {
  cards: BentoCardData[];
  config: BentoConfig;
  className?: string;
}

export function MagicBentoGrid({
  cards,
  config,
  className,
}: MagicBentoGridProps): React.ReactElement {
  logger.trace(
    '[MagicBentoGrid] Renderizando componente de presentación puro v3.0.'
  );
  const gridRef = useRef<HTMLDivElement | null>(null);

  const { initializeCardInteractions } = useBentoGridInteraction(
    gridRef,
    config
  );

  return (
    <div
      ref={gridRef}
      className={cn(
        `bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 max-w-7xl mx-auto p-4`,
        className
      )}
      style={
        {
          '--glow-color-rgb': `var(--${config.glowColor}-rgb)`,
        } as React.CSSProperties
      }
    >
      {cards.map((card: BentoCardData, index: number) => {
        const cardComponent = (
          <BentoCard
            key={card.title}
            card={card}
            cardRef={initializeCardInteractions}
            textAutoHide={config.textAutoHide}
            className={cn(
              index === 0 && 'lg:col-span-2 lg:row-span-2',
              index === 3 && 'lg:col-span-2'
            )}
          />
        );

        if (card.href) {
          return (
            <Link href={card.href} key={card.title} className="contents">
              {cardComponent}
            </Link>
          );
        }

        return cardComponent;
      })}
    </div>
  );
}
