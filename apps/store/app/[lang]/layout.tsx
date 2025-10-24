// RUTA: apps/store/app/[lang]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz soberano y orquestador de datos.
 * @version 7.0.0 (Server Module Consumption Fix)
 * @author IA Arquitecto
 */

// --- [INICIO DE CORRECCIÓN SOBERANA v7.0.0] ---
// Se elimina la importación del lado del cliente de createServerClient.
// Los módulos de servidor se importarán directamente a continuación.
import { getDictionary } from '../../get-dictionary';
import type { Locale } from '@razvolution/shared-utils';
import { Footer } from '../../components/Footer';
import { Header } from './components/Header';
import { HeimdallProvider } from './components/HeimdallProvider';
import '../global.css';

// Se importa el módulo 'server-only' para garantizar que este componente
// nunca se ejecute en el cliente.
import 'server-only';

// Se importa el createServerClient directamente desde su archivo de origen
// usando una ruta relativa. Esta es la forma soberana de consumir un módulo
// de servidor desde otro módulo de servidor en un monorepo.
import { createServerClient } from '../../../../shared/supabase/src/lib/server';
// --- [FIN DE CORRECCIÓN SOBERANA v7.0.0] ---

export const metadata = {
  title: 'razvolution | Sovereign E-commerce',
  description: 'The Sovereign Base for the Modern Web',
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = data;
  }

  return (
    <html lang={lang}>
      <body className="flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <HeimdallProvider>
          <Header
            lang={lang}
            user={user}
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
