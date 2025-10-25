// RUTA: features/auth/src/lib/components/auth/LastSignInInfo.tsx
/**
 * @file LastSignInInfo.tsx
 * @description Aparato de UI de élite para mostrar la información del último
 *              inicio de sesión.
 * @version 1.2.0 (Code Hygiene & Placeholder Fortification)
 * @author IA Arquitecto
 */
'use client';

import React, { useEffect, useMemo } from 'react';

// --- Dependencias Soberanas ---
import { logger } from '@razvolution/shared-logging';
import type { Tables } from '@razvolution/shared-db-types';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';

// --- Tipos y Contratos ---
type ProfilesRow = Tables<'profiles'>;
type LastSignInContent = NonNullable<
  NonNullable<Dictionary['userNav']>['lastSignIn']
>;

interface LastSignInInfoProps {
  profile: ProfilesRow | null;
  content: LastSignInContent;
  locale: string;
}

// --- Componente de UI de Marcado de Posición ---
const DynamicIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => (
  // --- [INICIO DE SANEAMIENTO DE CÓDIGO v1.2.0] ---
  // Se utiliza la prop 'name' para añadir un atributo 'title'.
  // Esto resuelve la advertencia de variable no utilizada (TS6133) y
  // añade valor de depuración al placeholder.
  <span
    className={`inline-block h-3 w-3 ${className || ''}`}
    title={`Icon: ${name}`}
  ></span>
  // --- [FIN DE SANEAMIENTO DE CÓDIGO v1.2.0] ---
);

export function LastSignInInfo({
  profile,
  content,
  locale,
}: LastSignInInfoProps) {
  const traceId = useMemo(
    () => logger.startTrace('LastSignInInfo_Lifecycle_v1.0'),
    []
  );
  useEffect(() => {
    logger.info('[LastSignInInfo] Componente montado.', { traceId });
    return () => logger.endTrace(traceId);
  }, [traceId]);

  const lastSignInAt = profile?.last_sign_in_at;

  // --- Guardia de Resiliencia ---
  if (!lastSignInAt) {
    logger.traceEvent(
      traceId,
      'Guardián: No hay datos de último inicio de sesión. No se renderizará.'
    );
    return null;
  }

  const lastSignInDate = new Date(lastSignInAt).toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const location = profile?.last_sign_in_location || content.unknownLocation;
  const ip = profile?.last_sign_in_ip || content.unknownIp;

  logger.traceEvent(traceId, 'Render: Mostrando datos de sesión.', {
    date: lastSignInDate,
    location,
    ip,
  });

  return (
    <div className="px-4 py-2 text-xs text-gray-500">
      <p className="font-semibold text-gray-700">{content.title}</p>
      <div className="flex items-center gap-1.5 mt-1">
        <DynamicIcon name="Calendar" />
        <span>{lastSignInDate}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <DynamicIcon name="MapPin" />
        <span>{content.location.replace('{{location}}', location)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <DynamicIcon name="Network" />
        <span>{content.ip.replace('{{ip}}', ip)}</span>
      </div>
    </div>
  );
}
