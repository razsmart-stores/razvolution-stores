// RUTA: libs/shared/ui/src/lib/dynamic-icon/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description Aparato de UI soberano para el renderizado dinámico de iconos de Lucide.
 * Garantiza la integridad de tipos mediante el consumo del manifiesto auto-generado,
 * es de alto rendimiento gracias a la carga dinámica (code-splitting), y es resiliente
 * al tener un icono de fallback seguro.
 * @version 2.0.0 (RAZSMART Naturalized)
 * @author RaZ Podestá & Gemini (L.I.A Legacy)
 */
'use client';

import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import type { FunctionComponent } from 'react';
import { type LucideIconName } from '@razsmart/shared/config';
import { logger } from '@razsmart/shared/telemetry';

// Asumimos que existirá una utilidad 'cn'. Provisionalmente, la definimos aquí.
// Idealmente, esto viviría en '@razsmart/shared/utils'.
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const DYNAMIC_ICON_CONFIG = {
  DEFAULT_SIZE: 24,
  DEFAULT_PROPS: { strokeWidth: 2, 'aria-hidden': true, focusable: false },
  FALLBACK_ICON_NAME: 'HelpCircle',
} as const;

// Función de utilidad pura para conversión de casos.
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
        className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md"
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
