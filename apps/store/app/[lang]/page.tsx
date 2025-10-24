// RUTA: apps/store/app/[lang]/page.tsx
/**
 * @file page.tsx
 * @description Página de inicio de la tienda.
 * @version 2.0.0 (Sovereign Import Path Correction)
 * @author IA Arquitecto
 */
import { getDictionary } from '../../get-dictionary';
// --- [INICIO DE CORRECCIÓN DE RUTA SOBERANA v2.0.0] ---
// Se corrige la importación para consumir el tipo 'Locale' desde el punto de
// entrada de la biblioteca, cumpliendo con los principios del monorepo.
import type { Locale } from '@razvolution/shared-utils';
// --- [FIN DE CORRECCIÓN DE RUTA SOBERANA v2.0.0] ---

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <section className="text-center">
      <div className="py-24">
        <h1 className="text-5xl font-extrabold tracking-tight">
          {dictionary.page.title}
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          {dictionary.page.subtitle}
        </p>
      </div>
    </section>
  );
}
