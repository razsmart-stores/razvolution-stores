// RUTA: apps/store/app/[lang]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz soberano, refactorizado para un manejo de datos robusto
 *              y un cumplimiento estricto de la arquitectura.
 * @version 15.0.0 (Robust Data Handling)
 * @author IA Arquitecto
 */
import 'server-only';
import { useMemo } from 'react';
import { getDictionary } from '../../get-dictionary';

import { actions } from '@razvolution/shared-data-access';
import {
  HeimdallProvider,
  logger,
  useHeimdallVitals,
} from '@razvolution/shared-logging';
import { createServerClient } from '@razvolution/shared-supabase/server'; // Se necesita para el 'user'
import { Footer } from '@razvolution/shared-ui';
import type { Locale } from '@razvolution/shared-utils';
import type { Tables } from '@razvolution/shared-db-types'; // Se necesita para el tipo 'profile'
import { Header } from './components/Header';
import '../global.css';

export const metadata = {
  title: 'razvolution | Sovereign E-commerce',
  description: 'The Sovereign Base for the Modern Web',
};

function HeimdallVitals() {
  'use client';
  const pageLifecycleTraceId = useMemo(
    () => logger.startTrace('PageLifecycle'),
    []
  );
  useHeimdallVitals(pageLifecycleTraceId);
  return null;
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  // --- [INICIO DE REFACTORIZACIÓN SOBERANA v15.0.0] ---
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Tables<'profiles'> | null = null;

  if (user) {
    const profileResult = await actions.auth.getUserProfileAction();
    if (profileResult.success) {
      profile = profileResult.data;
    } else {
      // Si la acción falla, registramos el error pero no bloqueamos el renderizado.
      logger.error('[RootLayout] La acción getUserProfileAction falló.', {
        error: profileResult.error,
      });
    }
  }
  // --- [FIN DE REFACTORIZACIÓN SOBERANA v15.0.0] ---

  return (
    <html lang={lang}>
      <body className="flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <HeimdallProvider>
          <HeimdallVitals />
          <Header
            lang={lang}
            user={user} // Se pasa el objeto 'user' completo y soberano.
            profile={profile}
            navContent={dictionary.userNav}
          />
          <main className="grow container mx-auto p-4">{children}</main>
          <Footer />
        </HeimdallProvider>
      </body>
    </html>
  );
}
