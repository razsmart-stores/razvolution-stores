// RUTA: features/auth/src/lib/components/auth/SignUpForm.tsx
/**
 * @file SignUpForm.tsx
 * @description Componente de UI de presentación puro y completo para el formulario de registro.
 * @version 1.1.0 (Functional Completion)
 * @author IA Arquitecto
 */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  SignUpSchema,
  type SignUpFormData,
} from '@razvolution/shared-auth-contracts';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@razvolution/shared-ui';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
import { logger } from '@razvolution/shared-logging';
import type { Locale } from '@razvolution/shared-utils';

import { OAuthButtons } from './OAuthButtons';

type AuthFormContent = NonNullable<Dictionary['auth']>;
type OAuthButtonsContent = NonNullable<Dictionary['oAuthButtons']>;

interface SignUpFormProps {
  content: AuthFormContent;
  oAuthContent: OAuthButtonsContent;
  locale: Locale;
  onSwitchView: () => void;
  // Añadimos props para manejar el estado de envío y el callback
  onSubmit: (data: SignUpFormData) => void;
  isPending: boolean;
}

export function SignUpForm({
  content,
  oAuthContent,
  onSwitchView,
  onSubmit,
  isPending,
}: SignUpFormProps) {
  logger.trace('[SignUpForm] Renderizando v1.1 (Completo).');

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{content.signUpTitle}</h2>
        <p className="text-muted-foreground">{content.signUpSubtitle}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{content.fullNameLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={content.fullNamePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{content.confirmPasswordLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={content.confirmPasswordPlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? content.signUpButtonLoadingText
              : content.signUpButtonText}
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
        {content.loginPrompt}{' '}
        <button onClick={onSwitchView} className="underline hover:text-primary">
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
