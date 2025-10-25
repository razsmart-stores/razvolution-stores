// RUTA: features/auth/src/lib/components/auth/LanguageSelectorClient.tsx
/**
 * @file LanguageSelectorClient.tsx
 * @description Componente de cliente para la selección de idioma con temporizador,
 *              nivelado para la arquitectura soberana del monorepo.
 * @version 4.1.0 (Sovereign Leveling & Code Hygiene)
 * @author IA Arquitecto
 */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// --- [INICIO DE NIVELACIÓN SOBERANA v4.1.0] ---
// Se corrigen las importaciones para usar los alias soberanos del monorepo
// definidos en tsconfig.base.json, resolviendo los errores TS2307.

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@razvolution/shared-ui';
import { defaultLocale, type Locale } from '@razvolution/shared-utils';
import { logger } from '@razvolution/shared-logging';

// NOTA: El tipo 'SelectLanguagePageContent' no existe en los contratos actuales.
// Se asume que será parte de `Dictionary` en `@razvolution/shared-i18n-contracts`.
// Por ahora, se define un tipo local como placeholder.
type SelectLanguagePageContent = {
  title: string;
  subtitle: string;
  languages: Record<string, string>;
};
// --- [FIN DE NIVELACIÓN SOBERANA v4.1.0] ---

interface LanguageSelectorClientProps {
  content: SelectLanguagePageContent;
}

export function LanguageSelectorClient({
  content,
}: LanguageSelectorClientProps) {
  logger.info(
    '[LanguageSelectorClient] Renderizando v4.1 (Sovereign & Clean).'
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown <= 0) {
      clearInterval(timer);
      logger.warn(
        '[LanguageSelector] Tiempo agotado. Redirigiendo al locale por defecto.'
      );
      const returnUrl = searchParams.get('returnUrl') || '/';
      router.replace(`/${defaultLocale}${returnUrl}`);
    }

    return () => clearInterval(timer);
  }, [countdown, router, searchParams]);

  const handleLanguageSelect = (locale: Locale) => {
    const returnUrl = searchParams.get('returnUrl') || '/';
    router.replace(`/${locale}${returnUrl}`);
  };

  const progress = (countdown / 5) * 100;

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {Object.entries(content.languages).map(([code, name]) => (
            <Button
              key={code}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleLanguageSelect(code as Locale)}
            >
              {name}
            </Button>
          ))}
        </div>
        <div className="pt-4 text-center text-sm text-muted-foreground">
          <p>Redirecting in {countdown} seconds...</p>
          <div className="w-full bg-muted rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-1000 linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
