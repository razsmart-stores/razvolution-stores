// RUTA: features/auth/src/lib/components/auth/OAuthButtons.tsx
/**
 * @file OAuthButtons.tsx
 * @description Componente de cliente para los botones de inicio de sesión OAuth.
 *              v5.1.0 (Sovereign Alias Alignment): Se corrige la importación de supabase
 *              para alinearse con el alias soberano definido en tsconfig.base.json.
 * @version 5.1.0
 * @author IA Arquitecto
 */
'use client';

import { useTransition, useMemo, useEffect } from 'react';
import { toast } from 'sonner';

import { Button, DynamicIcon } from '@razvolution/shared-ui';
import { logger } from '@razvolution/shared-logging';

// --- [INICIO DE REFACTORIZACIÓN SOBERANA v5.1.0] ---
// Se corrige el alias de importación para que coincida con la SSoT en tsconfig.base.json.
import { createClient } from '@razvolution/shared-supabase';
// --- [FIN DE REFACTORIZACIÓN SOBERANA v5.1.0] ---

import type { Dictionary } from '@razvolution/shared-i18n-contracts';

type OAuthButtonsContent = NonNullable<Dictionary['oAuthButtons']>;

interface OAuthButtonsProps {
  content: OAuthButtonsContent;
}

export function OAuthButtons({ content }: OAuthButtonsProps) {
  const traceId = useMemo(
    () => logger.startTrace('OAuthButtons_Lifecycle_v5.1'),
    []
  );
  useEffect(() => {
    logger.info('[OAuthButtons] Componente soberano montado.', { traceId });
    return () => logger.endTrace(traceId);
  }, [traceId]);

  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const handleOAuthLogin = (provider: 'google') => {
    logger.traceEvent(traceId, `Iniciando login con: ${provider}`);
    startTransition(async () => {
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
        toast.error('Error de Autenticación', {
          description:
            'No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo.',
        });
      }
    });
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('google')}
        disabled={isPending}
      >
        {isPending ? (
          <DynamicIcon
            name="LoaderCircle"
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : (
          <DynamicIcon name="KeyRound" className="mr-2 h-4 w-4" />
        )}
        {content.google}
      </Button>
      <Button variant="outline" className="w-full" disabled>
        <DynamicIcon name="Apple" className="mr-2 h-4 w-4" />
        {content.apple}
      </Button>
    </div>
  );
}
