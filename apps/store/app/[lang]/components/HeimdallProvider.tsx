// RUTA: apps/store/app/[lang]/components/HeimdallProvider.tsx
/**
 * @file HeimdallProvider.tsx
 * @description Aparato de cliente aislado cuya única responsabilidad es
 *              activar el Protocolo Heimdall en el navegador.
 * @version 1.1.0 (Code Hygiene & Dependency Pruning)
 * @author IA Arquitecto
 */
"use client";

import { useHeimdall } from '@razvolution/shared-logging';
// --- [INICIO DE SANEAMIENTO DE CÓDIGO v1.1.0] ---
// Se elimina la importación no utilizada de 'useEffect'.
// import { useEffect } from 'react';
// --- [FIN DE SANEAMIENTO DE CÓDIGO v1.1.0] ---

export function HeimdallProvider({ children }: { children: React.ReactNode }) {
  // Se invoca el hook para registrar los listeners del ciclo de vida del navegador.
  useHeimdall();

  // Renderiza el resto de la aplicación que está anidada dentro.
  return <>{children}</>;
}
