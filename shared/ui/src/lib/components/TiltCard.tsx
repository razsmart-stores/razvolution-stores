// RUTA: shared/ui/src/lib/components/TiltCard.tsx
/**
 * @file TiltCard.tsx
 * @description Componente envoltorio de alto orden (HOC) que aplica un efecto
 *              "tilt" 3D interactivo a su componente hijo.
 *              Nivelado a la v2.0.0 para alinearse con la arquitectura soberana.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
"use client";

import React from "react";
import { Tilt } from "react-tilt";

// --- [INICIO DE NIVELACIÓN SOBERANA v2.0.0] ---
import { logger } from "@razvolution/shared-logging";
import { cn } from "@razvolution/shared-utils";
// --- [FIN DE NIVELACIÓN SOBERANA v2.0.0] ---

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  options?: React.ComponentProps<typeof Tilt>["options"];
}

const defaultTiltOptions = {
  max: 15,
  scale: 1.02,
  speed: 500,
  glare: true,
  "max-glare": 0.2,
};

export function TiltCard({
  children,
  className,
  options = defaultTiltOptions,
}: TiltCardProps) {
  logger.trace("[TiltCard] Renderizando componente HOC v2.0.");
  return (
    <Tilt options={options} className={cn("transform-style-3d", className)}>
      {children}
    </Tilt>
  );
}
