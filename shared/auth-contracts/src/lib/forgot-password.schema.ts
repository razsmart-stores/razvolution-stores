/**
 * @file forgot-password.schema.ts
 * @description SSoT para el contrato de datos del formulario de recuperación de contraseña.
 * @version 2.0.0 (Elite & TSDoc)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from 'zod';

/**
 * @const ForgotPasswordSchema
 * @description Valida los datos para el formulario de solicitud de restablecimiento de contraseña.
 */
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Por favor, introduce una dirección de email válida."),
});

/**
 * @type ForgotPasswordFormData
 * @description Infiere el tipo de TypeScript para los datos del formulario de recuperación.
 */
export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
