// RUTA: shared/ui/src/lib/flag-icon/FlagIcon.tsx
/**
 * @file FlagIcon.tsx
 * @description Componente despachador soberano para iconos de banderas.
 * @version 3.0.0 (Sovereign & Naturalized)
 * @author IA Arquitecto
 */
'use client';

import React from 'react';
import { type SVGProps } from 'react';
import { defaultLocale, type Locale } from '@razvolution/shared-utils'; // <-- CORREGIDO
import { logger } from '@razvolution/shared-logging'; // <-- CORREGIDO
import { BR, ES, IT, US } from '../icons/flags'; // <-- CORREGIDO

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

  if (!FlagComponent) {
    logger.error(
      `[FlagIcon] Error crítico: No se encontró componente de bandera para el locale de fallback: ${targetLocale}.`,
      { targetLocale }
    );
    return (
      <div className="w-5 h-5 bg-red-500" title="Error de icono de bandera" />
    );
  }

  return <FlagComponent {...props} />;
}
