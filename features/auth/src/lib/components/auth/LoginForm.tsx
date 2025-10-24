// RUTA: features/auth/src/lib/components/auth/LoginForm.tsx
/**
 * @file LoginForm.tsx
 * @description Componente de UI de presentación puro para el formulario de inicio de sesión.
 * @version 1.0.0 (Creación Soberana)
 * @author IA Arquitecto
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@razvolution/shared-auth-contracts";
import { LoginSchema } from "@razvolution/shared-auth-contracts";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@razvolution/shared-ui";
import { OAuthButtons } from "./OAuthButtons";
import { logger } from "@razvolution/shared-logging";
import type { Dictionary } from "@razvolution/shared-i18n-contracts";
import type { Locale } from "@razvolution/shared-utils";

type AuthFormContent = NonNullable<Dictionary["auth"]>;
type OAuthButtonsContent = NonNullable<Dictionary["oAuthButtons"]>;

interface LoginFormProps {
  content: AuthFormContent;
  oAuthContent: OAuthButtonsContent;
  locale: Locale;
  onSwitchView: () => void;
  onSubmit: (data: LoginFormData) => void;
  isPending: boolean;
}

export function LoginForm({
  content,
  oAuthContent,
  onSwitchView,
  onSubmit,
  isPending,
}: LoginFormProps) {
  logger.trace("[LoginForm] Renderizando.");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{content.loginTitle}</h2>
        <p className="text-muted-foreground">{content.loginSubtitle}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{content.emailLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={content.emailPlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{content.passwordLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={content.passwordPlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? content.loginButtonLoadingText
              : content.loginButtonText}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <OAuthButtons content={oAuthContent} />
      <p className="text-center text-sm text-muted-foreground">
        {content.signUpPrompt}{" "}
        <button onClick={onSwitchView} className="underline">
          Regístrate
        </button>
      </p>
    </div>
  );
}
