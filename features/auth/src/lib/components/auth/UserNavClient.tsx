// RUTA: features/auth/src/lib/components/auth/UserNavClient.tsx
/**
 * @file UserNavClient.tsx
 * @description Componente de cliente puro para la interactividad de UserNav.
 *              Recibe todos los datos y contenido como props.
 * @version 1.0.0
 * @author IA Arquitecto
 */
"use client";

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@razvolution/shared-supabase';
// ... (Componentes de UI de marcado de posición como antes)

export function UserNavClient({ user, profile, navContent }) {
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
