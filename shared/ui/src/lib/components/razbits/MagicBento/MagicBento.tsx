// RUTA: shared/ui/src/lib/components/razbits/MagicBento/MagicBento.tsx
/**
 * @file MagicBento.tsx
 * @description Orquestador de élite para la sección MagicBento.
 *              Nivelado para alinearse con la arquitectura soberana del monorepo
 *              y consumir contratos desde la fuente de verdad.
 * @version 7.0.0 (Sovereign Contract Compliance)
 * @author IA Arquitecto
 */
'use client';

import React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v7.0.0] ---
import { logger } from '@razvolution/shared-logging';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
import { MagicBentoConfigSchema } from './magic-bento.schema';
import { MagicBentoGrid } from './MagicBentoGrid';
// --- [FIN DE NIVELACIÓN SOBERANA v7.0.0] ---

interface MagicBentoProps {
  content?: Dictionary['magicBento'];
  className?: string;
}

export function MagicBento({
  content,
  className,
}: MagicBentoProps): React.ReactElement | null {
  logger.info('[MagicBento] Renderizando orquestador v7.0.');

  if (!content) {
    logger.warn('[MagicBento] No se proporcionó contenido. No se renderizará.');
    return null;
  }

  const { config, cards } = content;

  const validatedConfig = MagicBentoConfigSchema.parse(config || {});

  return (
    <MagicBentoGrid
      cards={cards}
      config={validatedConfig}
      className={className}
    />
  );
}
