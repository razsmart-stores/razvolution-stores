// RUTA: shared/ui/src/lib/dynamic-icon/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description Aparato de UI soberano para el renderizado dinámico de iconos de Lucide.
 * @version 3.0.0 (Sovereign & Naturalized)
 * @author IA Arquitecto
 */
'use client';

import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import type { FunctionComponent } from 'react';
import { type LucideIconName } from '@razvolution/shared-utils'; // <-- CORREGIDO
import { logger } from '@razvolution/shared-logging'; // <-- CORREGIDO
import { cn } from '@razvolution/shared-utils'; // <-- CORREGIDO

const DYNAMIC_ICON_CONFIG = {
  DEFAULT_SIZE: 24,
  DEFAULT_PROPS: { strokeWidth: 2, 'aria-hidden': true, focusable: false },
  FALLBACK_ICON_NAME: 'HelpCircle',
} as const;

const pascalToKebab = (str: string): string => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
};

interface DynamicIconProps extends Omit<LucideProps, 'name'> {
  name: LucideIconName;
}

const DynamicIconComponent: FunctionComponent<DynamicIconProps> = ({
  name,
  className,
  ...props
}) => {
  const kebabCaseName = pascalToKebab(name);
  const fallbackKebabCaseName = pascalToKebab(
    DYNAMIC_ICON_CONFIG.FALLBACK_ICON_NAME
  );

  const iconToLoad = (
    Object.keys(dynamicIconImports).includes(kebabCaseName)
      ? kebabCaseName
      : fallbackKebabCaseName
  ) as keyof typeof dynamicIconImports;

  if (
    iconToLoad === fallbackKebabCaseName &&
    kebabCaseName !== fallbackKebabCaseName
  ) {
    logger.warn(
      `[DynamicIcon] El icono solicitado "${name}" no fue encontrado en el manifiesto soberano. Se ha renderizado el icono de fallback.`,
      { requestedIcon: name }
    );
  }

  const LucideIcon = dynamic(dynamicIconImports[iconToLoad], {
    loading: () => (
      <div
        style={{
          width: props.size ?? DYNAMIC_ICON_CONFIG.DEFAULT_SIZE,
          height: props.size ?? DYNAMIC_ICON_CONFIG.DEFAULT_SIZE,
        }}
        className="animate-pulse bg-muted/50 rounded-md"
        aria-label="Cargando icono..."
      />
    ),
  });

  return (
    <LucideIcon
      {...DYNAMIC_ICON_CONFIG.DEFAULT_PROPS}
      {...props}
      className={cn('lucide-icon', className)}
    />
  );
};

export const DynamicIcon = memo(DynamicIconComponent);
