// RUTA: shared/ui/src/lib/components/ImageUploader.tsx
/**
 * @file ImageUploader.tsx
 * @description Componente de UI soberano para la subida de imágenes.
 *              Nivelado para alinearse con la arquitectura del monorepo,
 *              corregir las clases canónicas de Tailwind y cumplir con todos
 *              los pilares de calidad.
 * @version 3.0.0 (Sovereign Leveling & Canonical Styling)
 * @author IA Arquitecto
 */
"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { toast } from "sonner";

// --- [INICIO DE NIVELACIÓN SOBERANA v3.0.0] ---

// Pasos 1, 2, 3 y 4: Alineación, Observabilidad, Theming y Contratos
import { logger } from "@razvolution/shared-logging";
import { cn, type ActionResult } from "@razvolution/shared-utils";
import { DynamicIcon } from "./DynamicIcon";

// --- [FIN DE NIVELACIÓN SOBERANA v3.0.0] ---

interface ImageUploaderProps {
  onUpload: (formData: FormData) => Promise<ActionResult<{ path: string }>>;
  onUploadSuccess: (filePath: string) => void;
  acceptedFileTypes?: Accept;
  maxFiles?: number;
  content: {
    dropzoneText: string;
    dropzoneSubtext: string;
    loadingText?: string;
    activeDragText?: string;
  };
  className?: string;
}

export function ImageUploader({
  onUpload,
  onUploadSuccess,
  acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/svg+xml": [".svg"],
  },
  maxFiles = 1,
  content,
  className,
}: ImageUploaderProps) {
  // Paso 2: Inyección de Observabilidad
  logger.trace("[ImageUploader] Renderizando v3.0.");

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setIsLoading(true);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      const formData = new FormData();
      formData.append("file", file);
      const result = await onUpload(formData);
      if (result.success) {
        onUploadSuccess(result.data.path);
        toast.success("Archivo subido con éxito.");
      } else {
        toast.error(result.error || "Ocurrió un error al subir el archivo.");
        setPreview(null);
        URL.revokeObjectURL(previewUrl);
      }
      setIsLoading(false);
    },
    [onUpload, onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: maxFiles,
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        // --- [INICIO DE CORRECCIÓN CANÓNICA v3.0.0] ---
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/30 hover:border-primary/50",
          preview && "p-0! border-solid! border-primary!"
        )}
        // --- [FIN DE CORRECCIÓN CANÓNICA v3.0.0] ---
      >
        <input {...getInputProps()} />
        {preview ? (
          // --- [INICIO DE CORRECCIÓN CANÓNICA v3.0.0] ---
          <div className="relative w-full aspect-2/1 max-h-24">
          {/* --- [FIN DE CORRECCIÓN CANÓNICA v3.0.0] --- */}
            <Image
              src={preview}
              alt="Vista previa del archivo subido"
              fill
              className="object-contain p-2"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <DynamicIcon
              name="Upload"
              className="w-12 h-12 text-muted-foreground/50 mb-2"
            />
            <p className="font-semibold text-foreground">
              {content.dropzoneText}
            </p>
            <p className="text-xs text-muted-foreground">
              {content.dropzoneSubtext}
            </p>
          </div>
        )}
        {(isDragActive || isLoading) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <p className="font-bold text-primary animate-pulse">
              {isLoading
                ? content.loadingText || "Cargando..."
                : content.activeDragText || "¡Suelta el archivo!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
