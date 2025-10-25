// RUTA: shared/db-types/src/lib/domains/logging.types.ts
/**
 * @file logging.types.ts
 * @description SSoT atómica para los tipos de base de datos del dominio de Logging (Heimdall).
 *              Nivelado para un cumplimiento estricto de tipos.
 * @version 1.1.0 (Strict Type Compliance)
 * @author IA Arquitecto
 */
import type { Json } from '../database.types';

export type Database = {
  public: {
    Tables: {
      heimdall_events: {
        Row: {
          context: Json | null;
          created_at: string;
          duration_ms: number | null;
          event_id: string;
          event_name: string;
          payload: Json | null;
          status: string;
          step_name: string | null;
          task_id: string | null;
          timestamp: string;
          trace_id: string;
        };
        Insert: {
          context?: Json | null;
          created_at?: string;
          duration_ms?: number | null;
          event_id: string;
          event_name: string;
          payload?: Json | null;
          status: string;
          step_name?: string | null;
          task_id?: string | null;
          timestamp?: string;
          trace_id: string;
        };
        Update: {
          context?: Json | null;
          created_at?: string;
          duration_ms?: number | null;
          event_id?: string;
          event_name?: string;
          payload?: Json | null;
          status?: string;
          step_name?: string | null;
          task_id?: string | null;
          timestamp?: string;
          trace_id?: string;
        };
        Relationships: [];
      };
      task_health_summary: {
        Row: {
          context: Json | null;
          created_at: string;
          duration_ms: number | null;
          status: Database['public']['Enums']['task_status'];
          task_id: string;
          task_name: string;
          timestamp: string;
          user_id: string | null;
          workspace_id: string | null;
        };
        Insert: {
          context?: Json | null;
          created_at?: string;
          duration_ms?: number | null;
          status: Database['public']['Enums']['task_status'];
          task_id: string;
          task_name: string;
          timestamp: string;
          user_id?: string | null;
          workspace_id?: string | null;
        };
        Update: {
          context?: Json | null;
          created_at?: string;
          duration_ms?: number | null;
          status?: Database['public']['Enums']['task_status'];
          task_id?: string;
          task_name?: string;
          timestamp?: string;
          user_id?: string | null;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'task_health_summary_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    // --- [INICIO DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v1.1.0] ---
    Views: Record<string, never>;
    Functions: Record<string, never>;
    // --- [FIN DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v1.1.0] ---
    Enums: {
      task_status: 'SUCCESS' | 'FAILURE';
    };
    // --- [INICIO DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v1.1.0] ---
    CompositeTypes: Record<string, never>;
    // --- [FIN DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v1.1.0] ---
  };
};
