// RUTA: features/auth/src/lib/components/auth/UserNavClient.tsx
/**
 * @file UserNavClient.tsx
 * @description Componente de cliente puro para la interactividad de UserNav.
 *              Nivelado para una seguridad de tipos absoluta mediante la importación
 *              de contratos soberanos.
 * @version 2.0.0 (Sovereign Type Safety)
 * @author IA Arquitecto
 */
"use client";

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// --- [INICIO DE CORRECCIÓN SOBERANA v2.0.0] ---
// Se importan los tipos necesarios desde las bibliotecas soberanas para
// eliminar los errores de tipo 'any' implícito.
import type { User } from '@supabase/supabase-js';
import { createClient } from '@razvolution/shared-supabase';
import type { Tables } from '@razvolution/shared-db-types';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
// --- [FIN DE CORRECCIÓN SOBERANA v2.0.0] ---


// Se definen los tipos para las props, siguiendo las mejores prácticas.
type NavContent = NonNullable<Dictionary['userNav']>;
type Profile = Tables<'profiles'> | null;

interface UserNavClientProps {
  user: User | null;
  profile: Profile;
  navContent: NavContent;
}

export function UserNavClient({ user, profile, navContent }: UserNavClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.info('You have been logged out.');
    router.refresh();
  };

  if (!user) {
    return <button onClick={() => router.push('/login')}>{navContent.loginButton}</button>;
  }

  return (
    <div className="flex items-center gap-4">
      <span>{profile?.full_name || user.email}</span>
      <button onClick={handleLogout}>{navContent.logoutButton}</button>
    </div>
  );
}
