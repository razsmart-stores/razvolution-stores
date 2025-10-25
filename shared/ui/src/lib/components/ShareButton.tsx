// RUTA: shared/ui/src/lib/components/ShareButton.tsx
/**
 * @file ShareButton.tsx
 * @description Componente de UI soberano para compartir contenido. Nivelado para
 *              cumplir con la arquitectura del monorepo, utilizando contratos
 *              soberanos, con higiene de código de élite y manejo de errores seguro.
 * @version 6.0.0 (Sovereign & Type-Safe Error Handling)
 * @author IA Arquitecto
 */
'use client';

import { useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { toast } from 'sonner';

// Importaciones soberanas del monorepo
import { logger } from '@razvolution/shared-logging';
import { Button } from './Button';
import { DynamicIcon } from './DynamicIcon';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

/**
 * @warning TIPO PLACEHOLDER: La propiedad 'shareButton' debe ser añadida al
 *          contrato soberano en '@razvolution/shared-i18n-contracts'.
 *          Por ahora, se define localmente para mantener la seguridad de tipos.
 */
type ShareContent = {
  buttonLabel: string;
  popoverTitle: string;
  copyLinkAction: string;
  copySuccessToast: string;
};

/**
 * @interface ShareData
 * @description El contrato de datos para la información que se va a compartir.
 */
interface ShareData {
  title: string;
  text: string;
  url: string;
}

/**
 * @interface ShareButtonProps
 * @description El contrato de props para el componente ShareButton.
 */
interface ShareButtonProps {
  shareData: ShareData;
  content: ShareContent;
}

/**
 * @component ShareButton
 * @description Renderiza un botón que activa la funcionalidad de compartir del navegador
 *              nativa si está disponible, o muestra un popover con opciones de redes
 *              sociales como fallback.
 * @param {ShareButtonProps} props - Las propiedades del componente.
 * @returns {React.ReactElement} El elemento JSX del botón de compartir.
 */
export function ShareButton({ shareData, content }: ShareButtonProps) {
  logger.info('[ShareButton] Renderizando v6.0 (Sovereign & Type-Safe Error Handling).');

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Lógica para manejar el API de Share nativa del navegador.
  const handleNativeShare = async () => {
    // navigator.share solo existe en contextos seguros (HTTPS) y navegadores compatibles.
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        logger.trace('[ShareButton] Contenido compartido vía API nativa.');
      } catch (error) {
        // --- [INICIO DE CORRECCIÓN SOBERANA v6.0.0] ---
        // Se extrae el mensaje del error para asegurar que el payload es serializable
        // y cumple con el contrato del logger (evitando el error 'Type unknown is not assignable to type Json').
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.warn(
          '[ShareButton] El usuario canceló el diálogo de compartir nativo o hubo un error.',
          { error: errorMessage } // <-- Corregido
        );
        // --- [FIN DE CORRECCIÓN SOBERANA v6.0.0] ---
      }
    } else {
      // Si el API nativa no está disponible, se abre el popover como fallback.
      setIsPopoverOpen(true);
    }
  };

  // Lógica para copiar la URL al portapapeles.
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url);
    toast.success(content.copySuccessToast);
    setIsPopoverOpen(false); // Cierra el popover después de copiar.
  };

  // Verificación de capacidad nativa, se realiza una sola vez por render.
  const canShareNatively =
    typeof navigator !== 'undefined' && !!navigator.share;

  // El botón que actúa como disparador, ya sea para el share nativo o para el popover.
  const TriggerButton = (
    <Button
      variant="outline"
      size="icon"
      onClick={
        canShareNatively ? handleNativeShare : () => setIsPopoverOpen(true)
      }
      aria-label={content.buttonLabel}
    >
      <DynamicIcon name="Share2" />
    </Button>
  );

  // Si se puede compartir nativamente, solo se renderiza el botón disparador.
  if (canShareNatively) {
    return TriggerButton;
  }

  // Si no, se renderiza el botón envuelto en un Popover con las opciones de redes sociales.
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="space-y-2">
          <p className="font-semibold text-center">{content.popoverTitle}</p>
          <div className="flex gap-2">
            <TwitterShareButton url={shareData.url} title={shareData.title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <FacebookShareButton url={shareData.url}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareData.url} title={shareData.title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={shareData.url}
              subject={shareData.title}
              body={shareData.text}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={copyToClipboard}
              aria-label={content.copyLinkAction}
            >
              <DynamicIcon name="Link" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
