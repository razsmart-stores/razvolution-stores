// RUTA: features/auth/src/lib/components/auth/ForgotPasswordForm.tsx
/**
 * @file ForgotPasswordForm.tsx
 * @description Componente de cliente para el formulario de recuperación de contraseña,
 *              nivelado para cumplir con la arquitectura soberana del monorepo y
 *              la estructura de exportación de la capa de datos.
 * @version 2.1.0 (Sovereign Export Structure Compliance)
 * @author IA Arquitecto
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DynamicIcon,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@razvolution/shared-ui";
// --- [INICIO DE CORRECCIÓN SOBERANA v2.1.0] ---
// Se importa el objeto 'actions' en lugar de la función directamente.
import { actions } from "@razvolution/shared-data-access";
// --- [FIN DE CORRECCIÓN SOBERANA v2.1.0] ---
import { logger } from "@razvolution/shared-logging";
import {
  ForgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@razvolution/shared-auth-contracts";
import type { Dictionary } from "@razvolution/shared-i18n-contracts";

// Asumimos que el tipo Dictionary se actualizará para tener esta forma
type ForgotPasswordContent = NonNullable<Dictionary["auth"]>["forgotPassword"];

interface ForgotPasswordFormProps {
  content: ForgotPasswordContent;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ForgotPasswordForm({
  content,
  onSuccess,
  onCancel,
}: ForgotPasswordFormProps) {
  logger.info("[ForgotPasswordForm] Renderizando v2.1 (Sovereign).");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email:
        process.env['NODE_ENV'] === "development" ? "superuser@webvork.dev" : "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    startTransition(async () => {
      // --- [INICIO DE CORRECCIÓN SOBERANA v2.1.0] ---
      // Se utiliza la estructura correcta para llamar a la Server Action.
      const result = await actions.auth.sendPasswordResetAction(data);
      // --- [FIN DE CORRECCIÓN SOBERANA v2.1.0] ---
      if (result.success) {
        toast.success(content.successToastTitle, {
          description: content.successToastDescription,
        });
        onSuccess();
      } else {
        toast.error("Error", { description: result.error });
      }
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{content.modalTitle}</DialogTitle>
        <DialogDescription>{content.modalDescription}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="forgot-password-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button variant="ghost" onClick={onCancel}>
          {content.cancelButton}
        </Button>
        <Button
          type="submit"
          form="forgot-password-form"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending && (
            <DynamicIcon
              name="LoaderCircle"
              className="mr-2 h-4 w-4 animate-spin"
            />
          )}
          {isPending ? content.submitButtonLoading : content.submitButton}
        </Button>
      </DialogFooter>
    </>
  );
}
