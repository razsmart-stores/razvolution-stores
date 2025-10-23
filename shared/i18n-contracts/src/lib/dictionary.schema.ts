// RUTA: shared/i18n-contracts/src/lib/dictionary.schema.ts
/**
 * @file dictionary.schema.ts
 * @description SSoT soberana para la estructura de los diccionarios de i18n.
 *              Este contrato está diseñado para ser incremental y escalable,
 *              componiendo esquemas atómicos en un diccionario de dominio unificado.
 * @version 2.1.0 (Contract Fortification)
 * @author IA Arquitecto
 */
import { z } from 'zod';

// ============================================================================
// §1. CONTRATOS DE COMPONENTES ATÓMICOS
//    Estos esquemas validan el contenido de los componentes más pequeños y
//    reutilizables. Son los bloques de construcción del diccionario.
// ============================================================================

/**
 * @const OAuthButtonsContentSchema
 * @description Valida el contenido para el componente `OAuthButtons`.
 */
export const OAuthButtonsContentSchema = z.object({
  google: z.string().min(1),
  apple: z.string().min(1),
  facebook: z.string().min(1),
});

/**
 * @const WorkspaceSwitcherContentSchema
 * @description Valida el contenido para el componente `WorkspaceSwitcher`.
 */
export const WorkspaceSwitcherContentSchema = z.object({
  activeWorkspaceLabel: z.string().min(1),
  loadingText: z.string().min(1),
  noWorkspacesTitle: z.string().min(1),
  noWorkspacesDescription: z.string().min(1),
  errorTitle: z.string().min(1),
  errorDescription: z.string().min(1),
});

/**
 * @const LastSignInContentSchema
 * @description Contrato atómico para el contenido del componente LastSignInInfo.
 */
export const LastSignInContentSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  ip: z.string().min(1),
  unknownLocation: z.string().min(1),
  unknownIp: z.string().min(1),
});

/**
 * @const UserNavContentSchema
 * @description Valida el contenido para el menú de navegación del usuario (`UserNav`).
 *              Demuestra la composición al anidar otros contratos atómicos.
 */
export const UserNavContentSchema = z.object({
  loginButton: z.string().min(1),
  sessionLabel: z.string().min(1),
  logoutButton: z.string().min(1),
  viewAllNotificationsLink: z.string().min(1),
  notificationsLabel: z.string().min(1),
  noNotificationsText: z.string().min(1),
  loadingText: z.string().min(1),
  workspaceSwitcher: WorkspaceSwitcherContentSchema,
  lastSignIn: LastSignInContentSchema,
});

// ============================================================================
// §2. CONTRATOS DE FEATURES Y DOMINIOS
//    Estos esquemas agrupan el contenido de funcionalidades más grandes.
// ============================================================================

/**
 * @const ForgotPasswordContentSchema
 * @description Valida el contenido para el modal de recuperación de contraseña.
 */
export const ForgotPasswordContentSchema = z.object({
  modalTitle: z.string().min(1),
  modalDescription: z.string().min(1),
  successToastTitle: z.string().min(1),
  successToastDescription: z.string().min(1),
  cancelButton: z.string().min(1),
  submitButton: z.string().min(1),
  submitButtonLoading: z.string().min(1),
});

/**
 * @const AuthFeatureContentSchema
 * @description Contrato completo para la funcionalidad de autenticación,
 *              abarcando los flujos de login, registro y recuperación.
 */
export const AuthFeatureContentSchema = z.object({
  // Contenido para el formulario de Login
  loginTitle: z.string().min(1),
  loginSubtitle: z.string().min(1),
  emailLabel: z.string().min(1),
  emailPlaceholder: z.string().min(1),
  passwordLabel: z.string().min(1),
  passwordPlaceholder: z.string().min(1),
  forgotPasswordLink: z.string().min(1),
  showPasswordAriaLabel: z.string().min(1),
  hidePasswordAriaLabel: z.string().min(1),
  loginButtonText: z.string().min(1),
  loginButtonLoadingText: z.string().min(1),
  signUpPrompt: z.string().min(1),
  // Contenido para el formulario de SignUp
  signUpTitle: z.string().min(1),
  signUpSubtitle: z.string().min(1),
  fullNameLabel: z.string().min(1),
  fullNamePlaceholder: z.string().min(1),
  confirmPasswordLabel: z.string().min(1),
  confirmPasswordPlaceholder: z.string().min(1),
  signUpButtonText: z.string().min(1),
  signUpButtonLoadingText: z.string().min(1),
  loginPrompt: z.string().min(1),
  // Contenido anidado para el modal de recuperación
  forgotPassword: ForgotPasswordContentSchema,
});

// ============================================================================
// §3. CONTRATOS DE PÁGINAS (FUTURO E-COMMERCE)
//    Marcadores de posición para demostrar la escalabilidad del sistema.
// ============================================================================

/**
 * @const StoreHomePageSchema
 * @description TODO: Definir el contrato para la página de inicio de la tienda.
 */
export const StoreHomePageSchema = z.object({
  // Ejemplo: heroTitle: z.string(),
  // Ejemplo: featuredProductsSectionTitle: z.string(),
});

/**
 * @const ProductDetailsPageSchema
 * @description TODO: Definir el contrato para la página de detalle de producto.
 */
export const ProductDetailsPageSchema = z.object({
  // Ejemplo: addToCartButton: z.string(),
  // Ejemplo: descriptionTab: z.string(),
  // Ejemplo: reviewsTab: z.string(),
});

// ============================================================================
// §4. EL DICCIONARIO SOBERANO
//    Este es el esquema maestro que ensambla todos los contratos de contenido.
//    Cada propiedad es OPCIONAL para permitir la carga incremental de
//    traducciones (Code Splitting).
// ============================================================================

export const DictionarySchema = z.object({
  // --- Contenido de Componentes Globales ---
  userNav: UserNavContentSchema.optional(),
  oAuthButtons: OAuthButtonsContentSchema.optional(),

  // --- Contenido de Features ---
  auth: AuthFeatureContentSchema.optional(),

  // --- Contenido de Páginas Específicas ---
  storeHome: StoreHomePageSchema.optional(),
  productDetails: ProductDetailsPageSchema.optional(),
});

/**
 * @type Dictionary
 * @description Infiere el tipo TypeScript del diccionario completo. Esta es la
 *              SSoT para los tipos de contenido en toda la aplicación.
 *              Gracias a que todas sus propiedades son opcionales, soporta
 *              diccionarios parciales para una carga de datos eficiente.
 */
export type Dictionary = z.infer<typeof DictionarySchema>;
