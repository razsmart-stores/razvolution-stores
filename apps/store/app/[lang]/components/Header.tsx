// RUTA: apps/store/app/[lang]/components/Header.tsx
/**
 * @file Header.tsx
 * @description Componente de cabecera orquestador, ahora nivelado para cumplir
 *              estrictamente con el contrato de la API del logger.
 * @version 6.1.0 (Logger API Contract Compliance)
 * @author IA Arquitecto
 */
"use client";

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { UserNav } from '@razvolution/features-auth';
import type { User } from '@supabase/supabase-js';
import type { Tables } from '@razvolution/shared-db-types';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
import { logger } from '@razvolution/shared-logging';
import { createClient } from '@razvolution/shared-supabase';
import type { Locale } from '@razvolution/shared-utils';

type NavContent = NonNullable<Dictionary['userNav']>;
type Profile = Tables<'profiles'> | null;

interface HeaderProps {
  lang: Locale;
  user: User | null;
  profile: Profile;
  navContent: NavContent;
}

export const Header = ({ lang, user, profile, navContent }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const taskId = logger.startTask({ domain: 'AUTH', entity: 'USER_SESSION', action: 'LOGOUT' }, 'User Logout from Header');
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Logout failed', { description: error.message });
      // --- [INICIO DE CORRECCIÓN DE CONTRATO DE API v6.1.0] ---
      // Se utiliza `logger.error` para registrar los detalles del fallo,
      // que es su propósito semántico.
      logger.error('[Header] Logout failed.', { error: error.message, taskId });
      // `endTask` ahora solo recibe los dos argumentos que su contrato requiere.
      logger.endTask(taskId, 'FAILURE');
      // --- [FIN DE CORRECCIÓN DE CONTRATO DE API v6.1.0] ---
    } else {
      toast.info('You have been logged out.');
      logger.endTask(taskId, 'SUCCESS');
      router.refresh();
    }
  };

  const handleLoginClick = () => {
    router.push(`/${lang}/login`);
  };

  return (
    <header className="bg-gray-100 p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">razvolution</h1>
        <nav>
          <UserNav
            locale={lang}
            user={user}
            profile={profile}
            navContent={navContent}
            onLoginClick={handleLoginClick}
            onLogout={handleLogout}
          />
        </nav>
      </div>
    </header>
  );
};
