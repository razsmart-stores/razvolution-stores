// RUTA: shared/ui/src/lib/components/DynamicIcon.tsx
/**
 * @file DynamicIcon.tsx
 * @description SSoT para el renderizado dinámico de iconos, con integridad de tipo absoluta.
 *              Nivelado a la v20.0.0 para alinearse con la arquitectura soberana del monorepo.
 * @version 20.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { memo, type FunctionComponent } from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v20.0.0] ---

// Paso 2: Inyección de Observabilidad
import { logger } from '@razvolution/shared-logging';
// Pasos 1, 3 y 4: Alineación Arquitectónica, Theming y Contratos
import { cn, type LucideIconName } from '@razvolution/shared-utils';

// --- [FIN DE NIVELACIÓN SOBERANA v20.0.0] ---

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

interface DynamicIconProps extends LucideProps {
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
      `[DynamicIcon] Icono "${name}" no encontrado en el manifiesto. Usando fallback.`
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
