// RUTA: shared/data-access/src/lib/auth/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública y SSoT para las Server Actions del dominio de Autenticación.
 * @version 1.0.0
 * @author IA Asistente de Calidad
 */
"use server";

// Se importan y re-exportan explícitamente las funciones de acción.
// Esto crea una API pública clara para el módulo 'auth'.
export * from "./auth.actions";
export * from "./linkAnonymousSessionToUser.action";
