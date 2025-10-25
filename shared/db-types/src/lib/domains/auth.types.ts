// RUTA: shared/db-types/src/lib/domains/auth.types.ts
/**
 * @file auth.types.ts
 * @description SSoT atómica y soberana para los tipos de base de datos del dominio
 *              de Autenticación y Gestión de Workspaces. Nivelado para un cumplimiento
 *              estricto de tipos.
 * @version 2.1.0 (Strict Type Compliance)
 * @author IA Arquitecto
 */
export type Database = {
  public: {
    Tables: {
      /**
       * @table profiles
       * @description SSoT para los perfiles de usuario, extendiendo la data
       *              del servicio de autenticación de Supabase.
       */
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          last_sign_in_at: string | null;
          last_sign_in_ip: string | null;
          last_sign_in_location: string | null;
          provider_avatar_url: string | null;
          provider_name: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          last_sign_in_at?: string | null;
          last_sign_in_ip?: string | null;
          last_sign_in_location?: string | null;
          provider_avatar_url?: string | null;
          provider_name?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          last_sign_in_at?: string | null;
          last_sign_in_ip?: string | null;
          last_sign_in_location?: string | null;
          provider_avatar_url?: string | null;
          provider_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };

      /**
       * @table workspaces
       * @description Entidad central para la multi-tenencia. Cada workspace
       *              es un contenedor aislado de recursos.
       */
      workspaces: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          owner_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          owner_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          owner_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      /**
       * @table workspace_members
       * @description Tabla de unión que define la relación, y el rol,
       *              entre un usuario (`profiles`) y un `workspaces`.
       */
      workspace_members: {
        Row: {
          created_at: string;
          role: string;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          role: string;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          created_at?: string;
          role?: string;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'workspace_members_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };

      /**
       * @table invitations
       * @description Almacena las invitaciones de usuarios a un workspace,
       *              incluyendo su estado y token de invitación.
       */
      invitations: {
        Row: {
          created_at: string;
          id: string;
          invited_by_user_id: string;
          invitee_email: string;
          status: Database['public']['Enums']['invitation_status'];
          token: string;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          invited_by_user_id: string;
          invitee_email: string;
          status?: Database['public']['Enums']['invitation_status'];
          token: string;
          workspace_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          invited_by_user_id?: string;
          invitee_email?: string;
          status?: Database['public']['Enums']['invitation_status'];
          token?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'invitations_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspaces';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    // --- [INICIO DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v2.1.0] ---
    Views: Record<string, never>;
    // --- [FIN DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v2.1.0] ---
    Functions: {
      /**
       * @function get_user_role_in_workspace
       * @description Devuelve el rol de un usuario dentro de un workspace específico.
       */
      get_user_role_in_workspace: {
        Args: { workspace_id_to_check: string };
        Returns: string;
      };

      /**
       * @function is_workspace_member
       * @description Verifica si el usuario autenticado es miembro de un workspace,
       *              opcionalmente con un rol mínimo.
       */
      is_workspace_member: {
        Args: { min_role?: string; workspace_id_to_check: string };
        Returns: boolean;
      };

      /**
       * @function link_fingerprint_to_user
       * @description Orquesta el "Traspaso de Identidad" al vincular un
       *              fingerprint de visitante anónimo a una cuenta de usuario
       *              recién autenticada.
       */
      link_fingerprint_to_user: {
        Args: { p_fingerprint_id: string; p_user_id: string };
        Returns: undefined;
      };
    };
    Enums: {
      /**
       * @enum invitation_status
       * @description Define los posibles estados de una invitación a un workspace.
       */
      invitation_status: 'pending' | 'accepted' | 'declined';
      /**
       * @enum notification_type
       * @description Define los tipos semánticos de notificaciones para un usuario.
       */
      notification_type: 'info' | 'success' | 'warning' | 'error';
    };
    // --- [INICIO DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v2.1.0] ---
    CompositeTypes: Record<string, never>;
    // --- [FIN DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v2.1.0] ---
  };
};
