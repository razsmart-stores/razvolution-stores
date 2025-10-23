// RUTA: .docs/domains/auth-contracts-domain.md

# Manifiesto del Dominio de Contratos de Autenticación (`shared/auth-contracts`)

## 1. Propósito y Alcance Soberano

El dominio `auth-contracts` es la **Única Fuente de Verdad (SSoT) notariada** para la estructura y validación de todos los datos relacionados con los flujos de autenticación. Su propósito es definir contratos inmutables, utilizando **Zod**, que son compartidos y de obligado cumplimiento tanto para la capa de presentación (frontend) como para la capa de lógica de negocio (backend).

Este dominio elimina la ambigüedad y previene la deriva de datos entre el cliente y el servidor.

**Alcance:**

*   **Contiene:** Exclusivamente esquemas de Zod y los tipos de TypeScript inferidos de ellos para los flujos de registro, inicio de sesión, recuperación de contraseña y cualquier otra operación de autenticación.
*   **Prohíbe:** Cualquier tipo de lógica de negocio, efectos secundarios, llamadas a API o dependencias de framework. Es una biblioteca puramente declarativa y de lógica de validación. Se encuentra en la base de la pirámide de dependencias y **NO DEBE** importar ninguna otra biblioteca del monorepo `razvolution`.

## 2. El Contrato del Dominio (Principios Inmutables)

1.  **Contrato Único (SSoT):** Si un formulario de autenticación necesita validar datos, su esquema **DEBE** residir aquí. No puede haber definiciones duplicadas o ad-hoc de la forma de los datos en ningún otro lugar del ecosistema.
2.  **Portabilidad Universal:** Los esquemas son agnósticos al entorno. Están diseñados para ser importados y utilizados sin modificaciones en componentes de cliente (`"use client"`), Server Actions (`"use server"`) y scripts de Node.js.
3.  **Seguridad por Defecto:** Los esquemas deben ser tan estrictos como sea posible, definiendo tipos, longitudes mínimas/máximas y formatos (ej. `.email()`) para garantizar que solo los datos válidos puedan entrar en el sistema.
4.  **Inmutabilidad del Contrato:** Un cambio en un esquema de este dominio es un **cambio de ruptura (breaking change)** que impacta a todos sus consumidores (UI y API). Debe ser tratado con la máxima diligencia, siguiendo el Tenet IV del Manifiesto del Arquitecto (La Refactorización Incluye a los Consumidores).

## 3. Inventario de Aparatos Implementados (Estado Actual)

El dominio proporciona los contratos fundamentales para el ciclo de vida de la autenticación de un usuario.

### 3.1. Contrato de Inicio de Sesión (`login.schema.ts`)
*   **Esquema:** `LoginSchema`
*   **Tipo:** `LoginFormData`
*   **Descripción:** Valida los campos `email` y `password` para el formulario de inicio de sesión. Es consumido por `LoginForm.tsx` en el cliente y por `loginWithPasswordAction` en el servidor.

### 3.2. Contrato de Registro (`signup.schema.ts`)
*   **Esquema:** `SignUpSchema`
*   **Tipo:** `SignUpFormData`
*   **Descripción:** Valida los campos `fullName`, `email`, `password` y `confirmPassword`. Incluye una regla de refinamiento (`.refine()`) para asegurar que las dos contraseñas coincidan, demostrando un patrón de validación de lógica cruzada.

### 3.3. Contrato de Recuperación de Contraseña (`forgot-password.schema.ts`)
*   **Esquema:** `ForgotPasswordSchema`
*   **Tipo:** `ForgotPasswordFormData`
*   **Descripción:** Valida el campo `email` para el formulario de solicitud de restablecimiento de contraseña.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

Este dominio se expandirá para cubrir todos los puntos de interacción de datos relacionados con la cuenta y la sesión del usuario.

*   **Contrato de Actualización de Contraseña:**
    *   **Propósito:** Crear un esquema para el formulario donde el usuario, ya autenticado o a través de un enlace de recuperación, establece una nueva contraseña.
    *   **Campos:** `password`, `confirmPassword`.

*   **Contrato de Actualización de Perfil:**
    *   **Propósito:** Definir la estructura para la actualización de los datos del perfil de usuario.
    *   **Campos:** `fullName`, `avatar_url`.

*   **Contrato de Invitación de Miembro:**
    *   **Propósito:** Validar el formulario para invitar a un nuevo usuario a un workspace.
    *   **Campos:** `email`, `role`.

*   **Contrato de Parámetros de OAuth:**
    *   **Propósito:** Si se necesitara validar parámetros de consulta (query params) que regresan de un flujo de OAuth, se definirían aquí para ser usados en los `Route Handlers` de Next.js.

    ---

    
