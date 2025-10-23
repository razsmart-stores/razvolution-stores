// RUTA: features/auth/src/lib/components/auth/UserNav.tsx
/**
 * @file UserNav.tsx
 * @description Aparato de UI de élite, nivelado a un componente de cliente
 *              puro y agnóstico al framework de ruteo.
 * @version 14.0.0 (Framework-Agnostic & Inversion of Control)
 * @author IA Arquitecto
 */
"use client";

import { useMemo, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import type { Tables } from '@razvolution/shared-db-types';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
import { logger } from '@razvolution/shared-logging';
import type { Locale } from '@razvolution/shared-utils';

// Componentes de UI de marcado de posición
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => <button {...props}>{children}</button>;

type NavContent = NonNullable<Dictionary['userNav']>;
type Profile = Tables<'profiles'> | null;

interface UserNavProps {
  user: User | null;
  profile: Profile;
  navContent: NavContent;
  locale: Locale;
  // --- [INICIO DE INVERSIÓN DE CONTROL] ---
  // Se reciben las acciones como callbacks, en lugar de importar useRouter.
  onLoginClick: () => void;
  onLogout: () => void;
  // --- [FIN DE INVERSIÓN DE CONTROL] ---
}

export function UserNav({ user, profile, navContent, onLoginClick, onLogout }: UserNavProps) {
  const traceId = useMemo(() => logger.startTrace('UserNav_Client_Lifecycle_v14.0'), []);
  useEffect(() => {
    logger.info('[UserNav] Componente puro montado.', { traceId, hasUser: !!user });
    return () => logger.endTrace(traceId);
  }, [traceId, user]);

  if (!user) {
    return <Button onClick={onLoginClick}>{navContent.loginButton}</Button>;
  }

  return (
    <div className="flex items-center gap-4">
       <span className="text-sm font-medium">
        {profile?.full_name || user.email}
       </span>
      <Button onClick={onLogout} title={navContent.logoutButton}>
        {navContent.logoutButton}
      </Button>
    </div>
  );
}
