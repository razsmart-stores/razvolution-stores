// RUTA: apps/store/app/[lang]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz soberano y orquestador de datos.
 * @version 5.1.0 (Sovereign Import Alignment & Code Hygiene)
 * @author IA Arquitecto
 */
import { createServerClient } from '@razvolution/shared-supabase';
import { getDictionary } from '../../get-dictionary';
// --- [INICIO DE CORRECCIÓN SOBERANA DE IMPORTACIÓN v5.1.0] ---
// Se corrige la ruta de importación para apuntar a la SSoT en 'shared-utils'.
import type { Locale } from '@razvolution/shared-utils';
// --- [FIN DE CORRECCIÓN SOBERANA DE IMPORTACIÓN v5.1.0] ---
import { Footer } from '../../components/Footer';
import { Header } from './components/Header';
import { HeimdallProvider } from './components/HeimdallProvider';
import './global.css';

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
          {/* --- [INICIO DE CORRECCIÓN DE HIGIENE DE CÓDIGO v5.1.0] --- */}
          {/* Se elimina la directiva '@ts-expect-error' ya que es innecesaria. */}
          {/* --- [FIN DE CORRECCIÓN DE HIGIENE DE CÓDIGO v5.1.0] --- */}
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
