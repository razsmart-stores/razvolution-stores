// RUTA: shared/ui/src/lib/hooks/use-sound.ts
/**
 * @file use-sound.ts
 * @description Hook de élite para la reproducción de efectos de sonido.
 *              Creado para restaurar la integridad del sistema y encapsular la
 *              lógica de audio de manera segura y reutilizable.
 * @version 1.0.0 (Sovereign Creation)
 * @author IA Arquitecto
 */
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { logger } from '@razvolution/shared-logging';

export function useSound(soundPath: string, volume = 1.0) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audioRef.current = audio;
      logger.trace(`[useSound] Audio pre-cargado para: ${soundPath}`);
    } catch (error) {
      logger.error(`[useSound] Fallo al crear instancia de Audio para: ${soundPath}`, { error });
    }
  }, [soundPath, volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        // Los errores de play son comunes si el usuario no ha interactuado
        // con la página, por lo que se registran como 'warn'.
        logger.warn(`[useSound] Fallo al reproducir sonido: ${soundPath}`, { error });
      });
    }
  }, []);

  return play;
}
