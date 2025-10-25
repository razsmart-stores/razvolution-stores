/**
 * @file login.schema.ts
 * @description SSoT para el contrato de datos del formulario de login.
 * @version 2.0.0 (Elite & TSDoc)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from 'zod';

/**
 * @const LoginSchema
 * @description Valida los datos para el formulario de inicio de sesión.
 *              Es el contrato que deben cumplir tanto la UI del cliente como la Server Action.
 */
export const LoginSchema = z.object({
  email: z
    .string()
    .email('Por favor, introduce una dirección de email válida.'),
  password: z.string().min(1, 'La contraseña no puede estar vacía.'),
});

/**
 * @type LoginFormData
 * @description Infiere el tipo de TypeScript para los datos del formulario de login.
 */
export type LoginFormData = z.infer<typeof LoginSchema>;
