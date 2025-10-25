// RUTA: shared/ui/src/lib/components/EmptyState.tsx
/**
 * @file EmptyState.tsx
 * @description Componente de presentación soberano para estados vacíos. Nivelado para
 *              cumplir con la arquitectura del monorepo, consumir contratos de tipos
 *              y tener observabilidad inyectada.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import React from 'react';

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
// Se actualizan las importaciones para usar alias del workspace o rutas relativas locales.
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './Card';
import { DynamicIcon } from './DynamicIcon';

// --- [PASO 4: ADHERENCIA A CONTRATOS (SEGURIDAD DE TIPOS)] ---
// Se importa el tipo 'LucideIconName' desde su SSoT canónica en @razvolution/shared-utils.
import type { LucideIconName } from '@razvolution/shared-utils';

/**
 * @interface EmptyStateProps
 * @description Contrato de props para el componente EmptyState.
 */
interface EmptyStateProps {
  icon: LucideIconName;
  title: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * @component EmptyState
 * @description Renderiza una tarjeta informativa para indicar que no hay contenido
 *              o datos que mostrar en una sección particular de la UI.
 * @param {EmptyStateProps} props - Las propiedades del componente.
 * @returns {React.ReactElement}
 */
export function EmptyState({
  icon,
  title,
  description,
  actions,
  className,
}: EmptyStateProps): React.ReactElement {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD] ---
  logger.trace(`[EmptyState] Renderizando estado vacío: "${title}"`);

  return (
    // --- [PASO 3: CUMPLIMIENTO DE THEMING] ---
    <Card className={cn('w-full max-w-lg mx-auto border-dashed', className)}>
      <CardHeader className="text-center">
        <div className="mx-auto bg-muted/50 p-4 rounded-full w-fit mb-4">
          <DynamicIcon
            name={icon}
            className="h-10 w-10 text-muted-foreground"
          />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {actions && <CardContent className="text-center">{actions}</CardContent>}
    </Card>
  );
}
