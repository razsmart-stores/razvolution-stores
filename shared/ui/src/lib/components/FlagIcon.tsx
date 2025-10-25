// RUTA: shared/ui/src/lib/components/FlagIcon.tsx
/**
 * @file FlagIcon.tsx
 * @description Componente despachador soberano para iconos de banderas. Nivelado para
 *              ser resiliente ante la ausencia de archivos de iconos, utilizando
 *              placeholders seguros y cumpliendo con la arquitectura del monorepo.
 * @version 4.0.0 (Sovereign Leveling & Resilient Placeholders)
 * @author IA Arquitecto
 */
'use client';

import { type SVGProps } from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v4.0.0] ---

// Pasos 1, 2 y 4: Alineación, Observabilidad y Contratos
import { logger } from '@razvolution/shared-logging';
import { defaultLocale, type Locale } from '@razvolution/shared-utils';

// --- INICIO DE ZONA DE MARCADORES DE POSICIÓN (PLACEHOLDERS) ---
/**
 * @warning COMPONENTES DE ICONOS FALTANTES: Los siguientes componentes son
 *          placeholders para resolver un error de compilación (TS2307).
 *          Los archivos SVG reales deben ser creados en 'shared/ui/src/lib/icons/flags/'
 *          para que este componente funcione visualmente.
 */
const PlaceholderFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2 2"
    {...props}
    className="w-5 h-5"
  >
    <path fill="#f0f0f0" d="M0 0h2v2H0z" />
    <path fill="#d0d0d0" d="M0 0h1v1H0zM1 1h1v1H0z" />
  </svg>
);
const BR = (props: SVGProps<SVGSVGElement>) => <PlaceholderFlag {...props} />;
const ES = (props: SVGProps<SVGSVGElement>) => <PlaceholderFlag {...props} />;
const IT = (props: SVGProps<SVGSVGElement>) => <PlaceholderFlag {...props} />;
const US = (props: SVGProps<SVGSVGElement>) => <PlaceholderFlag {...props} />;
// --- FIN DE ZONA DE MARCADORES DE POSICIÓN ---

// --- [FIN DE NIVELACIÓN SOBERANA v4.0.0] ---

interface FlagIconProps extends SVGProps<SVGSVGElement> {
  locale: Locale;
}

const localeToFlagMap: Record<
  Locale,
  React.ComponentType<SVGProps<SVGSVGElement>>
> = {
  'it-IT': IT,
  'es-ES': ES,
  'en-US': US,
  'pt-BR': BR,
};

export function FlagIcon({
  locale,
  ...props
}: FlagIconProps): React.ReactElement {
  // Paso 2: Inyección de Observabilidad
  logger.trace(`[FlagIcon] Renderizando para locale: ${locale}`);

  const validLocale = locale in localeToFlagMap ? locale : defaultLocale;
  if (!(locale in localeToFlagMap)) {
    logger.warn(
      `[FlagIcon] Locale inválido o no soportado: "${locale}". Usando fallback a "${defaultLocale}".`
    );
  }

  const FlagComponent = localeToFlagMap[validLocale];

  if (!FlagComponent) {
    logger.error(
      `[FlagIcon] Error crítico: No se encontró componente de bandera para el locale de fallback: ${validLocale}.`
    );
    return (
      <div className="w-5 h-5 bg-red-500" title="Error de icono de bandera" />
    );
  }

  return <FlagComponent {...props} />;
}
