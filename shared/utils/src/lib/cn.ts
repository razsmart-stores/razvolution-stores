// RUTA: shared/utils/src/lib/cn.ts
// ESTADO: Ya corregido en el snapshot. No se necesita acción.
/**
 * @file cn.ts
 * @description Aparato de utilidad y SSoT para la fusión de clases de Tailwind CSS.
 *              v2.0.0 (Sovereign & Dependency-Free): Se elimina la dependencia de 'logging'
 *              para resolver una dependencia circular crítica.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
