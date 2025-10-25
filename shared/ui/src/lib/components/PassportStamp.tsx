// RUTA: shared/ui/src/lib/components/PassportStamp.tsx
/**
 * @file PassportStamp.tsx
 * @description Aparato de UI atómico para la animación del sello de pasaporte (MEA/UX).
 *              Nivelado a la v3.0.0 para alinearse con la arquitectura soberana del monorepo.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';
import { motion, type Variants } from 'framer-motion';
import React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---
import { logger } from '@razvolution/shared-logging';
// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

interface PassportStampProps {
  label: string;
}

const stampVariants: Variants = {
  hidden: { scale: 1.5, opacity: 0, rotate: -30 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: -12,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
      delay: 0.1,
    },
  },
};

export function PassportStamp({
  label,
}: PassportStampProps): React.ReactElement {
  logger.trace('[PassportStamp] Renderizando animación de sello MEA/UX v3.0.');

  return (
    <motion.div
      aria-hidden="true"
      variants={stampVariants}
      initial="hidden"
      animate="visible"
      className="absolute bottom-4 right-4 z-10 pointer-events-none"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        className="text-primary/80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7.5 12.5L10.5 15.5L16.5 9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="12"
          y="7"
          fontFamily="monospace"
          fontSize="2"
          textAnchor="middle"
          fill="currentColor"
          fontWeight="bold"
        >
          {label}
        </text>
        <text
          x="12"
          y="20"
          fontFamily="monospace"
          fontSize="2"
          textAnchor="middle"
          fill="currentColor"
        >
          SDC-v4
        </text>
      </svg>
    </motion.div>
  );
}
