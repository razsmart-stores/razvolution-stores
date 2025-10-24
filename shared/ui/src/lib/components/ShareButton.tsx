// RUTA: shared/ui/src/lib/components/ShareButton.tsx
/**
 * @file ShareButton.tsx
 * @description Componente de UI soberano para compartir contenido. Nivelado para
 *              cumplir con la arquitectura del monorepo, utilizando contratos
 *              soberanos y con higiene de código de élite.
 * @version 5.0.0 (Sovereign Icon & Contract Compliance)
 * @author IA Arquitecto
 */
"use client";

import { useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { toast } from "sonner";

import { logger } from "@razvolution/shared-logging";
import { Button } from "./Button";
import { DynamicIcon } from "./DynamicIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./Popover";

// @warning TIPO PLACEHOLDER: La propiedad 'shareButton' debe ser añadida al
//          contrato soberano en '@razvolution/shared-i18n-contracts'.
type ShareContent = {
    buttonLabel: string;
    popoverTitle: string;
    copyLinkAction: string;
    copySuccessToast: string;
};

interface ShareData {
  title: string;
  text: string;
  url: string;
}

interface ShareButtonProps {
  shareData: ShareData;
  content: ShareContent;
}

export function ShareButton({ shareData, content }: ShareButtonProps) {
  logger.info("[ShareButton] Renderizando v5.0 (Sovereign Icon Compliance).");

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        logger.trace("[ShareButton] Contenido compartido vía API nativa.");
      } catch (error) {
        logger.warn(
          "[ShareButton] El usuario canceló el diálogo de compartir nativo.",
          { error }
        );
      }
    } else {
      setIsPopoverOpen(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url);
    toast.success(content.copySuccessToast);
    setIsPopoverOpen(false);
  };

  const canShareNatively =
    typeof navigator !== "undefined" && !!navigator.share;

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

  if (canShareNatively) {
    return TriggerButton;
  }

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
