// RUTA: shared/supabase/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública y SSoT para el módulo Supabase.
 * @version 2.0.0 (Contract Re-export)
 */
export * from './lib/client';
export * from './lib/server';
export * from './lib/middleware';
export * from './lib/script-client';
// --- [CORRECCIÓN ARQUITECTÓNICA] ---
// Se re-exportan los tipos desde la nueva fuente de verdad para mantener
// la compatibilidad hacia atrás con cualquier consumidor que esperara
// encontrarlos aquí, sin violar la nueva jerarquía de dependencias.
export * from '@razvolution/shared-db-types';
