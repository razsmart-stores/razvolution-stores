// RUTA: shared/logging/src/lib/HeimdallProvider.tsx
/**
 * @file HeimdallProvider.tsx
 * @description Aparato de UI soberano y punto de entrada unificado para
 *              inicializar el Protocolo Heimdall en la aplicación cliente.
 * @version 3.1.0 (Code Hygiene & Fragment Removal)
 * @author IA Arquitecto
 */
'use client';

import { useHeimdall } from './use-heimdall.hook';

export function HeimdallProvider({ children }: { children: React.ReactNode }) {
  useHeimdall();

  // --- [INICIO DE CORRECCIÓN SOBERANA v3.1.0] ---
  // Se elimina el fragmento de React (<></>) redundante y se devuelve
  // 'children' directamente para cumplir con la regla de linter y
  // mejorar la higiene del código.
  return children;
  // --- [FIN DE CORRECCIÓN SOBERANA v3.1.0] ---
}
