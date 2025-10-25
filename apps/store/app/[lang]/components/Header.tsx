// RUTA: apps/store/app/[lang]/components/Header.tsx
/**
 * @file Header.tsx
 * @description Componente orquestador de la cabecera para la app 'store'.
 *              Consume el ShellHeader de shared/ui y le inyecta la lógica
 *              y los componentes de features.
 * @version 7.0.0 (Sovereign Refactoring)
 * @author IA Arquitecto
 */
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { UserNav } from '@razvolution/features-auth';
import type { User } from '@supabase/supabase-js';
import type { Tables } from '@razvolution/shared-db-types';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
import { logger } from '@razvolution/shared-logging';
import { createClient } from '@razvolution/shared-supabase';
import { ShellHeader } from '@razvolution/shared-ui';
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
    const taskId = logger.startTask(
      { domain: 'AUTH', entity: 'USER_SESSION', action: 'LOGOUT' },
      'User Logout from Header'
    );
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Logout failed', { description: error.message });
      logger.error('[Header] Logout failed.', { error: error.message, taskId });
      logger.endTask(taskId, 'FAILURE');
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
    <ShellHeader title="razvolution">
      <UserNav
        locale={lang}
        user={user}
        profile={profile}
        navContent={navContent}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />
    </ShellHeader>
  );
};
