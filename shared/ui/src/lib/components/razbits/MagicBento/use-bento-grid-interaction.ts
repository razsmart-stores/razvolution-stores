// RUTA: shared/ui/src/lib/components/razbits/MagicBento/use-bento-grid-interaction.ts
/**
 * @file use-bento-grid-interaction.ts
 * @description Hook de lógica para el componente MagicBento. Nivelado para
 *              alinearse con la arquitectura soberana y eliminar aserciones
 *              no nulas inseguras para una mayor robustez.
 * @version 2.0.0 (Sovereign & Type-Safe)
 * @author IA Arquitecto
 */
'use client';

import { gsap } from 'gsap';
import { useRef, useEffect, useCallback } from 'react';
import type { z } from 'zod';

// --- [INICIO DE NIVELACIÓN SOBERANA v2.0.0] ---
import { logger } from '@razvolution/shared-logging';
import type { MagicBentoConfigSchema } from './magic-bento.schema';
// --- [FIN DE NIVELACIÓN SOBERANA v2.0.0] ---

type BentoConfig = z.infer<typeof MagicBentoConfigSchema>;

export const useBentoGridInteraction = (
  gridRef: React.RefObject<HTMLDivElement | null>,
  config: BentoConfig
) => {
  const isMobile = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth <= 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableAnimations = config.disableAnimations || isMobile.current;

  useEffect(() => {
    const grid = gridRef.current;

    // Guardián de seguridad para evitar aserciones no nulas (!) y mejorar robustez.
    if (
      !grid ||
      shouldDisableAnimations ||
      !config.enableSpotlight ||
      !config.spotlightRadius
    ) {
      return;
    }

    logger.trace('[Bento] Inicializando Spotlight Effect');
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed; left: 0; top: 0;
      width: ${config.spotlightRadius * 2}px;
      height: ${config.spotlightRadius * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--primary-rgb), 0.08), transparent 60%);
      pointer-events: none; transform: translate(-50%, -50%);
      z-index: 50; opacity: 0; transition: opacity 0.3s ease-in-out;
    `;
    document.body.appendChild(spotlight);

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(spotlight, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out',
        opacity: 1,
      });
    };

    const onMouseLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      if (spotlight.parentNode) {
        spotlight.parentNode.removeChild(spotlight);
      }
    };
  }, [
    gridRef,
    config.enableSpotlight,
    config.spotlightRadius,
    shouldDisableAnimations,
  ]);

  const initializeCardInteractions = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || shouldDisableAnimations) return;
      // La lógica de interacción individual de cada tarjeta (mousemove/mouseleave)
      // iría aquí si fuera necesaria.
    },
    [shouldDisableAnimations]
  );

  return { initializeCardInteractions };
};
