// RUTA: features/auth/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública soberana para la biblioteca de funcionalidades de autenticación.
 * @version 3.0.0 (Sovereign API Correction)
 * @author IA Arquitecto
 */

// Se exporta el orquestador principal y los componentes atómicos reutilizables.
// LoginForm y SignUpForm son detalles de implementación internos de AuthForm y no se exportan.
export * from './lib/components/auth/AuthForm';
export * from './lib/components/auth/ForgotPasswordForm';
export * from './lib/components/auth/LastSignInInfo';
export * from './lib/components/auth/OAuthButtons';
export * from './lib/components/auth/UserNav';

// Se exportan los hooks de cliente del dominio.
export * from './lib/hooks/use-auth';
