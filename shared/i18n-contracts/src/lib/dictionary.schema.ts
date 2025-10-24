// RUTA: shared/i18n-contracts/src/lib/dictionary.schema.ts
/**
 * @file dictionary.schema.ts
 * @description SSoT (Única Fuente de Verdad) soberana para la estructura de todos los
 *              diccionarios de internacionalización (i18n) en el ecosistema razvolution.
 *              Esta versión ha sido fortalecida holísticamente para incluir todos los
 *              contratos de UI, Features, Razbits y herramientas de desarrollo.
 * @version 8.0.0 (Holistic, Elite & Self-Documenting Contract)
 * @author IA Arquitecto
 */
import { z } from 'zod';

// ============================================================================
// §1. CONTRATOS DE COMPONENTES ATÓMICOS Y GLOBALES
//    Estos esquemas validan el contenido de los componentes de UI más pequeños,
//    reutilizables y presentes en toda la aplicación.
// ============================================================================

/**
 * @const OAuthButtonsContentSchema
 * @description Valida el contenido para el componente `OAuthButtons`.
 * @example
 * // en-US.json
 * {
 *   "oAuthButtons": {
 *     "google": "Continue with Google",
 *     "apple": "Continue with Apple",
 *     "facebook": "Continue with Facebook"
 *   }
 * }
 */
export const OAuthButtonsContentSchema = z.object({
  google: z.string().min(1, "El texto para el botón de Google es requerido."),
  apple: z.string().min(1, "El texto para el botón de Apple es requerido."),
  facebook: z.string().min(1, "El texto para el botón de Facebook es requerido."),
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
 * @description Contrato atómico para el contenido del componente `LastSignInInfo`.
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
 * @description Valida el contenido para el menú de navegación del usuario (`UserNav`),
 *              demostrando la composición al anidar otros contratos atómicos.
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

/**
 * @const ToggleThemeContentSchema
 * @description Contrato para el contenido del componente de cambio de tema.
 */
export const ToggleThemeContentSchema = z.object({
  toggleAriaLabel: z.string().min(1),
  light: z.string().min(1),
  dark: z.string().min(1),
  system: z.string().min(1),
});


// ============================================================================
// §2. CONTRATOS DE COMPONENTES COMPLEJOS ("RAZBITS")
//    Estos esquemas definen el contenido y la configuración de los componentes
//    de UI más avanzados y característicos del proyecto.
// ============================================================================

/**
 * @const BentoCardSchema
 * @description Contrato para una única tarjeta dentro de la cuadrícula `MagicBento`.
 * @warning Este schema se duplica temporalmente desde 'shared/ui' para romper una
 *          dependencia circular. La solución a largo plazo es consolidar los schemas
 *          de contenido exclusivamente en esta biblioteca de contratos.
 */
export const BentoCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  label: z.string(),
  href: z.string().optional(),
});

/**
 * @const MagicBentoConfigSchema
 * @description Contrato para la configuración de los efectos visuales del `MagicBento`.
 */
export const MagicBentoConfigSchema = z.object({
  textAutoHide: z.boolean().default(true),
  enableStars: z.boolean().default(true),
  enableSpotlight: z.boolean().default(true),
  enableBorderGlow: z.boolean().default(true),
  disableAnimations: z.boolean().default(false),
  spotlightRadius: z.number().default(300),
  particleCount: z.number().default(12),
  enableTilt: z.boolean().default(false),
  glowColor: z.string().default("primary"),
  clickEffect: z.boolean().default(true),
  enableMagnetism: z.boolean().default(true),
});

/**
 * @const MagicBentoContentSchema
 * @description Agrupa la configuración y las tarjetas para el componente `MagicBento`.
 */
const MagicBentoContentSchema = z.object({
    config: MagicBentoConfigSchema.optional(),
    cards: z.array(BentoCardSchema),
});

/**
 * @const RaysOriginSchema
 * @description Define las posiciones de origen válidas para los rayos de luz.
 * @warning Duplicado temporalmente para romper dependencia circular.
 */
export const RaysOriginSchema = z.enum([
  "top-center", "top-left", "top-right", "right", "left",
  "bottom-center", "bottom-right", "bottom-left",
]);

/**
 * @const LightRaysConfigSchema
 * @description Contrato para la configuración de los efectos visuales de `LightRays`.
 * @warning Duplicado temporalmente para romper dependencia circular.
 */
export const LightRaysConfigSchema = z.object({
  raysOrigin: RaysOriginSchema.default("top-center").optional(),
  raysColor: z.string().default("primary").optional(),
  raysSpeed: z.number().min(0).default(1.5).optional(),
  lightSpread: z.number().min(0).default(0.8).optional(),
  rayLength: z.number().min(0).default(1.2).optional(),
  pulsating: z.boolean().default(false).optional(),
  fadeDistance: z.number().min(0).max(1).default(1.0).optional(),
  saturation: z.number().min(0).max(1).default(1.0).optional(),
  followMouse: z.boolean().default(true).optional(),
  mouseInfluence: z.number().min(0).max(1).default(0.1).optional(),
  noiseAmount: z.number().min(0).max(1).default(0.1).optional(),
  distortion: z.number().min(0).max(1).default(0.05).optional(),
});


// ============================================================================
// §3. CONTRATOS DE FEATURES (FUNCIONALIDADES)
//    Estos esquemas agrupan el contenido necesario para funcionalidades completas.
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
 * @description Contrato completo para la funcionalidad de autenticación.
 */
export const AuthFeatureContentSchema = z.object({
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
  signUpTitle: z.string().min(1),
  signUpSubtitle: z.string().min(1),
  fullNameLabel: z.string().min(1),
  fullNamePlaceholder: z.string().min(1),
  confirmPasswordLabel: z.string().min(1),
  confirmPasswordPlaceholder: z.string().min(1),
  signUpButtonText: z.string().min(1),
  signUpButtonLoadingText: z.string().min(1),
  loginPrompt: z.string().min(1),
  forgotPassword: ForgotPasswordContentSchema,
});


// ============================================================================
// §4. CONTRATOS DE COMPONENTES DE DESARROLLO
//    Contenido para herramientas y componentes que solo son visibles
//    en entornos de no-producción.
// ============================================================================

/**
 * @const ValidationErrorContentSchema
 * @description Contrato para el componente de error de validación (`ValidationError`).
 */
export const ValidationErrorContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  detailsLabel: z.string().min(1),
});

// ============================================================================
// §5. EL DICCIONARIO SOBERANO
//    Este es el esquema maestro que ensambla todos los contratos de contenido.
//    Cada propiedad es OPCIONAL para permitir la carga incremental de
//    traducciones (Code Splitting) en el frontend.
// ============================================================================

export const DictionarySchema = z.object({
  // --- Contenido de Componentes Globales ---
  userNav: UserNavContentSchema.optional(),
  oAuthButtons: OAuthButtonsContentSchema.optional(),
  toggleTheme: ToggleThemeContentSchema.optional(),

  // --- Contenido de Features ---
  auth: AuthFeatureContentSchema.optional(),

  // --- Contenido de Componentes Complejos (Razbits) ---
  magicBento: MagicBentoContentSchema.optional(),
  lightRays: LightRaysConfigSchema.optional(),

  // --- Contenido de Componentes de Desarrollo ---
  validationError: ValidationErrorContentSchema.optional(),

  // --- Contenido de Páginas (Placeholder) ---
  storeHome: z.any().optional(),
  productDetails: z.any().optional(),
});

/**
 * @type Dictionary
 * @description Infiere el tipo TypeScript del diccionario completo. Esta es la
 *              SSoT para los tipos de contenido en toda la aplicación.
 * @example
 * // En un componente de servidor Next.js
 * import { getDictionary } from '@/path/to/get-dictionary';
 * import type { Dictionary } from '@razvolution/shared-i18n-contracts';
 * import { Locale } from '@razvolution/shared-utils';
 *
 * async function MyPage({ params: { lang } }: { params: { lang: Locale } }) {
 *   const dictionary: Dictionary = await getDictionary(lang);
 *
 *   // TypeScript ahora entiende que `dictionary.auth` puede existir y conoce su forma.
 *   // El autocompletado y la verificación de tipos funcionan perfectamente.
 *   if (dictionary.auth) {
 *     return <AuthComponent content={dictionary.auth} />;
 *   }
 *
 *   return <div>Contenido de autenticación no disponible para este idioma.</div>;
 * }
 */
export type Dictionary = z.infer<typeof DictionarySchema>;
