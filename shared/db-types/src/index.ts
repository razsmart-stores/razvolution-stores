// RUTA: shared/db-types/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para la biblioteca de tipos de base de datos.
 *              v3.0.0 (Unambiguous Public API): Se refactoriza para exportar
 *              únicamente desde el motor de tipos unificado, ocultando los
 *              fragmentos de dominio como un detalle de implementación interno
 *              y resolviendo la colisión de exportación de tipos 'Database'.
 * @version 3.0.0
 * @author IA Arquitecto
 */
export * from './lib/database.types';
