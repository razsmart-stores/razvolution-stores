// RUTA: features/auth/src/lib/components/auth/AuthForm.tsx
/**
 * @file AuthForm.tsx
 * @description Orquestador de UI para autenticación, nivelado para el monorepo.
 * @version 8.0.0 (Holistic Integrity Restoration)
 * @author IA Arquitecto
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";

// --- [INICIO DE CORRECCIÓN SOBERANA v8.0.0] ---
import {
  Alert,
  AlertDescription,
  AlertTitle,
  DynamicIcon,
  TiltCard,
} from "@razvolution/shared-ui";
import { logger } from "@razvolution/shared-logging";
import {
  type LoginFormData,
  type SignUpFormData,
} from "@razvolution/shared-auth-contracts";
import type { Dictionary } from "@razvolution/shared-i18n-contracts";
import type { Locale } from "@razvolution/shared-utils";

import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
// --- [FIN DE CORRECCIÓN SOBERANA v8.0.0] ---

type AuthFormContent = NonNullable<Dictionary["auth"]>;
type OAuthButtonsContent = NonNullable<Dictionary["oAuthButtons"]>;

interface AuthFormProps {
  content: AuthFormContent;
  oAuthContent: OAuthButtonsContent;
  locale: Locale;
  contextualMessage?: string;
  onLoginSubmit: (data: LoginFormData) => void;
  onSignUpSubmit: (data: SignUpFormData) => void; // <-- Prop añadida
  isPending: boolean;
}

export function AuthForm({
  content,
  oAuthContent,
  locale,
  contextualMessage,
  onLoginSubmit,
  onSignUpSubmit, // <-- Prop añadida
  isPending,
}: AuthFormProps) {
  const traceId = useMemo(() => logger.startTrace("AuthForm_Lifecycle"), []);
  useEffect(() => {
    logger.info("[AuthForm] Orquestador de UI montado.", { traceId });
    return () => logger.endTrace(traceId);
  }, [traceId]);

  const [view, setView] = useState<"login" | "signup">("login");

  const handleSwitchView = (newView: "login" | "signup") => {
    logger.traceEvent(traceId, `Cambiando vista a '${newView}'.`);
    setView(newView);
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {contextualMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4"
          >
            <Alert>
              <DynamicIcon name="ShieldCheck" className="h-4 w-4" />
              <AlertTitle>Acceso Requerido</AlertTitle>
              <AlertDescription>{contextualMessage}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      <TiltCard>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: view === "login" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: view === "login" ? 20 : -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {view === "login" ? (
              <LoginForm
                content={content}
                oAuthContent={oAuthContent}
                locale={locale}
                onSwitchView={() => handleSwitchView("signup")}
                onSubmit={onLoginSubmit}
                isPending={isPending}
              />
            ) : (
              <SignUpForm
                content={content}
                oAuthContent={oAuthContent}
                locale={locale}
                onSwitchView={() => handleSwitchView("login")}
                onSubmit={onSignUpSubmit}
                isPending={isPending}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </TiltCard>
    </div>
  );
}
