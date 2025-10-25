// RUTA: shared/ui/src/lib/components/Container.tsx
/**
 * @file Container.tsx
 * @description Componente de UI fundamental y orquestador de animaciones MEA/UX.
 *              Nivelado para alinearse con la arquitectura soberana del monorepo.
 * @version 4.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import { motion, type Variants } from 'framer-motion';
import React from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v4.0.0] ---

// Paso 1 y 2: Alineación Arquitectónica e Inyección de Observabilidad
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';

// --- [FIN DE NIVELACIÓN SOBERANA v4.0.0] ---

/**
 * @interface ContainerProps
 * @description Contrato de props para el componente Container.
 */
interface ContainerProps {
  /**
   * @param {React.ReactNode} children - Los elementos hijos que serán envueltos
   *        y potencialmente animados por el contenedor.
   */
  children: React.ReactNode;
  /**
   * @param {string} [className] - Clases de CSS adicionales para extender o
   *        sobreescribir los estilos base del contenedor.
   */
  className?: string;
}

/**
 * @constant containerVariants
 * @description Define los estados de la animación para framer-motion.
 *              'visible' utiliza `staggerChildren` para orquestar la animación
 *              en cascada de los elementos hijos.
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // El tiempo de retraso entre la animación de cada hijo.
    },
  },
};

/**
 * @component Container
 * @description Renderiza un contenedor centrado y de ancho máximo que además
 *              actúa como un orquestador de animaciones para sus hijos.
 * @param {ContainerProps} props Las propiedades del componente.
 * @returns {React.ReactElement} El elemento JSX animado del contenedor.
 */
export function Container({
  children,
  className,
}: ContainerProps): React.ReactElement {
  // Paso 2: Inyección de Observabilidad
  logger.trace('[Container] Renderizando v4.0 (Sovereign & MEA Engine).');

  return (
    <motion.div
      // Paso 3: Cumplimiento de Theming
      className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.1 }} // La animación se activa cuando el 10% es visible.
    >
      {children}
    </motion.div>
  );
}
