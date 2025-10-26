// RUTA: shared/ui/src/lib/hooks/use-sound.ts
/**
 * @file use-sound.ts
 * @description Hook de élite para la reproducción de efectos de sonido.
 *              Nivelado para un manejo de errores seguro y el cumplimiento
 *              del contrato de logging del Protocolo Heimdall.
 * @version 2.0.0 (Sovereign & Type-Safe Error Handling)
 * @author IA Arquitecto
 */
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { logger } from '@razvolution/shared-logging';

/**
 * @function useSound
 * @description Un hook de React que pre-carga un efecto de sonido y devuelve
 *              una función para reproducirlo.
 * @param {string} soundPath - La ruta pública al archivo de sonido (ej. '/sounds/pop.mp3').
 * @param {number} [volume=1.0] - El volumen de reproducción, de 0.0 a 1.0.
 * @returns {() => void} Una función memoizada que, al ser llamada, reproduce el sonido.
 */
export function useSound(soundPath: string, volume = 1.0) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audioRef.current = audio;
      logger.trace(`[useSound] Audio pre-cargado para: ${soundPath}`);
    } catch (error) {
      // --- [INICIO DE CORRECCIÓN SOBERANA v2.0.0] ---
      // Se procesa el error 'unknown' a una cadena de texto antes de pasarlo al logger.
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      logger.error(
        `[useSound] Fallo al crear instancia de Audio para: ${soundPath}`,
        { error: errorMessage }
      );
      // --- [FIN DE CORRECCIÓN SOBERANA v2.0.0] ---
    }
  }, [soundPath, volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        // --- [INICIO DE CORRECCIÓN SOBERANA v2.0.0] ---
        // Se aplica el mismo patrón de manejo de errores seguro aquí.
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        logger.warn(`[useSound] Fallo al reproducir sonido: ${soundPath}`, {
          error: errorMessage,
        });
        // --- [FIN DE CORRECCIÓN SOBERANA v2.0.0] ---
      });
    }
  }, []);

  return play;
}
