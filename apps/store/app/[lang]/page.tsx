// RUTA: apps/store/app/[lang]/page.tsx
import { getDictionary } from '../../get-dictionary';
import type { Locale } from '../../../../shared/utils/src/lib/i18n/i18n-config';

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
