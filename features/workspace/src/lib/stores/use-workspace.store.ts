// RUTA: features/workspace/src/lib/stores/use-workspace.store.ts
/**
 * @file use-workspace.store.ts
 * @description SSoT para el estado global del workspace activo.
 *              Reubicado a su dominio canónico 'features/workspace'.
 * @version 2.0.0 (Sovereign Relocation)
 * @author IA Arquitecto
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceState {
  activeWorkspaceId: string | null;
  availableWorkspaces: Array<{ id: string; name: string }>;
  setActiveWorkspace: (workspaceId: string) => void;
  setAvailableWorkspaces: (
    workspaces: Array<{ id: string; name: string }>
  ) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      activeWorkspaceId: null,
      availableWorkspaces: [],
      setActiveWorkspace: (workspaceId) =>
        set({ activeWorkspaceId: workspaceId }),
      setAvailableWorkspaces: (workspaces) => {
        set((state) => {
          // Si no hay un workspace activo o el actual ya no está disponible,
          // establece el primero de la lista como activo.
          const currentActiveExists = workspaces.some(
            (ws) => ws.id === state.activeWorkspaceId
          );
          if (!state.activeWorkspaceId || !currentActiveExists) {
            return {
              availableWorkspaces: workspaces,
              activeWorkspaceId: workspaces[0]?.id ?? null,
            };
          }
          return { availableWorkspaces: workspaces };
        });
      },
    }),
    {
      name: 'razvolution-workspace-storage', // nombre de la clave en localStorage
    }
  )
);
