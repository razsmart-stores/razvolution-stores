// RUTA: features/auth/src/lib/components/auth/OAuthButtons.tsx
/**
 * @file OAuthButtons.tsx
 * @description Componente de cliente para los botones de inicio de sesión OAuth.
 *              v5.0.0 (Sovereign Alignment): Nivelado holísticamente para alinearse
 *              con la arquitectura soberana del monorepo, corrigiendo los alias de
 *              importación, eliminando dependencias innecesarias y consumiendo
 *              los contratos de i18n correctos.
 * @version 5.0.0
 * @author IA Arquitecto
 */
"use client";

import { useTransition, useMemo, useEffect } from "react";
import { toast } from "sonner";

// --- [INICIO DE ALINEACIÓN SOBERANA v5.0.0] ---

// Se importan las dependencias utilizando los alias de workspace correctos
// definidos en el tsconfig.base.json, resolviendo los errores TS2307.
import { Button, DynamicIcon } from "@razvolution/shared-ui";
import { logger } from "@razvolution/shared-logging";
import { createClient } from "@razvolution/shared-supabase";

// Se consume el tipo 'Dictionary' desde la biblioteca de contratos soberana,
// en lugar de un schema local o incorrecto.
import type { Dictionary } from "@razvolution/shared-i18n-contracts";

// --- [FIN DE ALINEACIÓN SOBERANA v5.0.0] ---

// Se define el tipo de contenido específico para este componente a partir del Dictionary global.
type OAuthButtonsContent = NonNullable<Dictionary["oAuthButtons"]>;

interface OAuthButtonsProps {
  content: OAuthButtonsContent;
}

export function OAuthButtons({ content }: OAuthButtonsProps) {
  const traceId = useMemo(
    () => logger.startTrace("OAuthButtons_Lifecycle_v5.0"),
    []
  );
  useEffect(() => {
    logger.info("[OAuthButtons] Componente soberano montado.", { traceId });
    return () => logger.endTrace(traceId);
  }, [traceId]);

  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const handleOAuthLogin = (provider: "google") => {
    logger.traceEvent(traceId, `Iniciando login con: ${provider}`);
    startTransition(async () => {
      // Se obtiene la URL de redirección del entorno del navegador para mayor robustez.
      const redirectTo = `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      if (error) {
        logger.error(
          `[OAuthButtons] Fallo en signInWithOAuth para ${provider}.`,
          {
            error: error.message,
            traceId,
          }
        );
        toast.error("Error de Autenticación", {
          description:
            "No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo.",
        });
      }
    });
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin("google")}
        disabled={isPending}
      >
        {isPending ? (
          <DynamicIcon
            name="LoaderCircle"
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : (
          // Icono semánticamente más apropiado para un proveedor externo.
          <DynamicIcon name="KeyRound" className="mr-2 h-4 w-4" />
        )}
        {content.google}
      </Button>
      {/* Placeholder para futuros proveedores de OAuth */}
      <Button variant="outline" className="w-full" disabled>
        <DynamicIcon name="Apple" className="mr-2 h-4 w-4" />
        {content.apple}
      </Button>
    </div>
  );
}
