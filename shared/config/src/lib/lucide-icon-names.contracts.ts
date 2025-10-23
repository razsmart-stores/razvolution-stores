/**
 * @file lucide-icon-names.contracts.ts
 * @description Manifiesto y Contrato Soberano para los Nombres de Iconos de Lucide.
 *
 *              ADVERTENCIA: ESTE ARCHIVO ES AUTO-GENERADO.
 *              NO MODIFICAR MANUALMENTE.
 *
 *              Para actualizar, ejecute el comando soberano: 'pnpm gen:icons'
 * @author Script de Generación Automática (RAZSMART)
 * @version 2025-10-23T16:00:00.000Z
 */
import { z } from 'zod';

// Este contenido es un placeholder y será sobreescrito por el script 'pnpm gen:icons'.
export const lucideIconNames = [
  "HelpCircle"
] as const;

export const LucideIconNameSchema = z.enum(lucideIconNames);

export type LucideIconName = z.infer<typeof LucideIconNameSchema>;
