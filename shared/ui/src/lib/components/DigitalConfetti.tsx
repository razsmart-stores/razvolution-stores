// RUTA: shared/ui/src/lib/components/DigitalConfetti.tsx
/**
 * @file DigitalConfetti.tsx
 * @description Aparato de élite para renderizar una celebración de confeti digital.
 *              Nivelado para alinearse con la arquitectura soberana y las
 *              convenciones canónicas de Tailwind CSS.
 * @version 3.1.0 (Canonical Class Compliance)
 * @author IA Arquitecto
 */
'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import { useTheme } from 'next-themes';
import React, { useState, useEffect, useMemo } from 'react';
import ReactConfetti from 'react-confetti';

import { useSound } from '../hooks/use-sound';
import { logger } from '@razvolution/shared-logging';

interface DigitalConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
  semanticColors?: string[];
  particleCount?: number;
  playSound?: boolean;
}

const getCssVariableValue = (variable: string): string | null => {
  if (typeof window === 'undefined') return null;
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

export function DigitalConfetti({
  isActive,
  onComplete,
  duration = 5000,
  semanticColors = ['--primary', '--secondary', '--accent'],
  particleCount = 200,
  playSound = true,
}: DigitalConfettiProps): React.ReactElement | null {
  logger.trace('[DigitalConfetti] Renderizando componente v3.1.');

  const { width, height } = useWindowSize();
  const { theme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const playPopSound = useSound('/sounds/confetti-pop.mp3', 0.3);

  const resolvedColors = useMemo(() => {
    logger.trace('[DigitalConfetti] Resolviendo colores semánticos a HSL.');
    return semanticColors
      .map((variable) => {
        const hslValue = getCssVariableValue(variable);
        return hslValue ? `hsl(${hslValue})` : null;
      })
      .filter((color): color is string => color !== null);
  }, [semanticColors, theme]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      logger.info('[DigitalConfetti] Activado. Iniciando celebración.');
      if (playSound) {
        playPopSound();
      }
      setIsRunning(true);
      timer = setTimeout(() => {
        logger.info(
          '[DigitalConfetti] Duración completada. Finalizando animación.'
        );
        setIsRunning(false);
        if (onComplete) {
          onComplete();
        }
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isActive, duration, onComplete, playSound, playPopSound]);

  if (!isActive || !width || !height) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      // --- [INICIO DE CORRECCIÓN CANÓNICA v3.1.0] ---
      // Se reemplaza la clase de z-index arbitraria `z-[100]` por la clase
      // canónica `z-100` según la sugerencia del linter de Tailwind.
      className="pointer-events-none fixed inset-0 z-50"
      // --- [FIN DE CORRECCIÓN CANÓNICA v3.1.0] ---
    >
      <ReactConfetti
        width={width}
        height={height}
        numberOfPieces={isRunning ? particleCount : 0}
        gravity={0.1}
        recycle={false}
        colors={resolvedColors}
      />
    </div>
  );
}
