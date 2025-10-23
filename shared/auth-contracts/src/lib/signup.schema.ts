/**
 * @file signup.schema.ts
 * @description SSoT para el contrato de datos del formulario de registro.
 * @version 2.0.0 (Elite & TSDoc)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from 'zod';

/**
 * @const SignUpSchema
 * @description Valida los datos para el formulario de registro de nuevos usuarios.
 *              Incluye una validación refinada para asegurar que las contraseñas coincidan.
 */
export const SignUpSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "El nombre completo debe tener al menos 3 caracteres."),
    email: z
      .string()
      .email("Por favor, introduce una dirección de email válida."),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"], // Asocia el error al campo de confirmación
  });

/**
 * @type SignUpFormData
 * @description Infiere el tipo de TypeScript para los datos del formulario de registro.
 */
export type SignUpFormData = z.infer<typeof SignUpSchema>;
