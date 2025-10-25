// RUTA: shared/ui/src/lib/components/ToggleTheme.tsx
/**
 * @file ToggleTheme.tsx
 * @description Componente de UI atómico para el conmutador de tema.
 *              Nivelado a la v3.0.0 para alinearse con la arquitectura soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import { useTheme } from 'next-themes';
import React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---
import { logger } from '@razvolution/shared-logging';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
import { Button } from './Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu';
import { DynamicIcon } from './DynamicIcon';
// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

interface ToggleThemeProps {
  content: NonNullable<Dictionary['toggleTheme']>;
}

export function ToggleTheme({ content }: ToggleThemeProps): React.ReactElement {
  logger.trace('[ToggleTheme] Renderizando conmutador de tema v3.0.');
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={content.toggleAriaLabel}
        >
          <DynamicIcon
            name="Sun"
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <DynamicIcon
            name="Moon"
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">{content.toggleAriaLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {content.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {content.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          {content.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
