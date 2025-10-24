// RUTA: shared/ui/src/lib/components/ComboToast.tsx
/**
 * @file ComboToast.tsx
 * @description Componente de UI para la notificación (toast) de Combo Estratégico.
 *              Nivelado para alinearse con la arquitectura soberana, desacoplando
 *              los contratos de datos y utilizando dependencias del monorepo.
 * @version 3.0.0 (Sovereign Leveling & Contract Decoupling)
 * @author IA Arquitecto
 */
"use client";

import { toast } from "sonner";
import React from "react";

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---

// Paso 1 y 2: Alineación Arquitectónica e Inyección de Observabilidad
import { logger } from "@razvolution/shared-logging";
import { Button } from "./Button";
import { DynamicIcon } from "./DynamicIcon";

// Paso 4: Adherencia a Contratos (Seguridad de Tipos Absoluta)
import type { LucideIconName } from "@razvolution/shared-utils";

/**
 * @warning TIPO PLACEHOLDER: Este contrato debe ser movido a una biblioteca
 *          soberana como '@razvolution/shared-marketing-contracts' o
 *          '@razvolution/shared-commerce-contracts' en el futuro.
 *          La capa de UI no debe ser dueña de los contratos de negocio.
 */
export interface StrategicCombo {
  name: string;
  description: string;
  icon: LucideIconName;
}

// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

interface ComboToastProps {
  combo: StrategicCombo;
}

function ComboToast({ combo }: ComboToastProps): React.ReactElement {
  // Paso 2: Inyección de Observabilidad
  logger.trace(`[ComboToast] Renderizando toast para: ${combo.name}`);
  return (
    <div className="flex items-center gap-4 w-full">
      <DynamicIcon name={combo.icon} className="h-10 w-10 text-yellow-400" />
      <div className="flex flex-col">
        <h3 className="font-bold text-base text-foreground">{combo.name}</h3>
        <p className="text-sm text-muted-foreground">{combo.description}</p>
      </div>
    </div>
  );
}

export function showComboToast(combo: StrategicCombo) {
  logger.info(`[MEA/UX] Mostrando notificación para el combo: ${combo.name}`);
  toast.custom(
    (t) => (
      <div className="flex items-center gap-2 bg-background border shadow-lg rounded-lg p-4 w-full max-w-sm">
        <ComboToast combo={combo} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toast.dismiss(t)}
          className="absolute top-1 right-1 h-6 w-6"
        >
          <DynamicIcon name="X" className="h-4 w-4" />
        </Button>
      </div>
    ),
    { duration: 5000 }
  );
}
