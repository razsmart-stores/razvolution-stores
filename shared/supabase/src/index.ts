// RUTA: shared/supabase/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública y SSoT para el módulo Supabase.
 *              v3.0.0: Se refactoriza para ser el punto de entrada
 *              exclusivo del CÓDIGO DE CLIENTE, evitando la fuga de
 *              módulos "server-only".
 * @version 3.0.0
 * @author IA Arquitecto
 */
export * from './lib/client';
// Los módulos 'server', 'middleware' y 'script-client' se importarán
// desde sus rutas directas en código de servidor, no desde aquí.

// Se re-exportan los tipos para mantener la compatibilidad.
export * from '@razvolution/shared-db-types';
