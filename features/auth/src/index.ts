// RUTA: features/auth/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública soberana para la biblioteca de funcionalidades de autenticación.
 * @version 2.0.0 (Scalable Public API)
 * @author IA Arquitecto
 */

// Exportamos todos los componentes orquestadores y de UI del dominio.
export * from './lib/components/auth/AuthForm';
export * from './lib/components/auth/ForgotPasswordForm';
export * from './lib/components/auth/LastSignInInfo';
export * from './lib/components/auth/LoginForm';
export * from './lib/components/auth/OAuthButtons';
export * from './lib/components/auth/SignUpForm';
export * from './lib/components/auth/UserNav';

// Exportamos los hooks de cliente del dominio.
export * from './lib/hooks/use-auth';
