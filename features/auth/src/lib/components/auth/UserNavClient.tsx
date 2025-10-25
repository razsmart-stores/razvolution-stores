// RUTA: features/auth/src/lib/components/auth/UserNavClient.tsx
/**
 * @file UserNavClient.tsx
 * @description Componente de cliente puro para la interactividad de UserNav.
 *              v2.1.0 (Sovereign Alias Alignment): Se corrige la importación de supabase.
 * @version 2.1.0
 * @author IA Arquitecto
 */
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { User } from '@supabase/supabase-js';

// --- [INICIO DE REFACTORIZACIÓN SOBERANA v2.1.0] ---
import { createClient } from '@razvolution/shared-supabase';
// --- [FIN DE REFACTORIZACIÓN SOBERANA v2.1.0] ---

import type { Tables } from '@razvolution/shared-db-types';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';

type NavContent = NonNullable<Dictionary['userNav']>;
type Profile = Tables<'profiles'> | null;

interface UserNavClientProps {
  user: User | null;
  profile: Profile;
  navContent: NavContent;
}

export function UserNavClient({
  user,
  profile,
  navContent,
}: UserNavClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.info('You have been logged out.');
    router.refresh();
  };

  if (!user) {
    return (
      <button onClick={() => router.push('/login')}>
        {navContent.loginButton}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span>{profile?.full_name || user.email}</span>
      <button onClick={handleLogout}>{navContent.logoutButton}</button>
    </div>
  );
}
