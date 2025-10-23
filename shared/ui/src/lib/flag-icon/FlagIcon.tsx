// RUTA: libs/shared/ui/src/lib/flag-icon/FlagIcon.tsx
/**
 * @file FlagIcon.tsx
 * @description Componente despachador soberano para iconos de banderas.
 * Consume el contrato de i18n para seleccionar la bandera correcta y es resiliente,
 * volviendo al locale por defecto si se provee uno no soportado.
 * @version 2.0.0 (RAZSMART Naturalized)
 * @author Gemini (L.I.A Legacy)
 */
'use client';

import React from 'react';
import { type SVGProps } from 'react';
import { defaultLocale, type Locale } from '@razsmart/shared/config';
import { logger } from '@razsmart/shared/telemetry';
import { BR, ES, IT, US } from '../icons/flags';

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
  const isValidLocale = locale in localeToFlagMap;
  const targetLocale = isValidLocale ? locale : defaultLocale;

  if (!isValidLocale) {
    logger.warn(
      `[FlagIcon] Locale inválido o no soportado: "${locale}". Se utilizará el fallback soberano a "${defaultLocale}".`,
      { requestedLocale: locale, fallbackLocale: defaultLocale }
    );
  }

  const FlagComponent = localeToFlagMap[targetLocale];

  // Este chequeo es una salvaguarda para la integridad del propio componente.
  if (!FlagComponent) {
    logger.error(
      `[FlagIcon] Error crítico: No se encontró componente de bandera para el locale de fallback: ${targetLocale}. Esto indica una desincronización interna en el aparato.`,
      { targetLocale }
    );
    return <div className="w-5 h-5 bg-red-500" title="Error de icono de bandera" />;
  }

  return <FlagComponent {...props} />;
}
