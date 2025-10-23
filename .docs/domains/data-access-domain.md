// RUTA: .docs/domains/data-access-domain.md

# Manifiesto del Dominio de Acceso a Datos (`shared/data-access`)

## 1. Propósito y Alcance Soberano

El dominio `data-access` es la **capa de lógica de negocio del servidor** y la **fachada soberana** para todas las operaciones de datos del ecosistema `razvolution`. Su propósito es orquestar la comunicación con las fuentes de datos (a través del dominio `supabase`) y ejecutar la lógica de negocio en un entorno seguro y exclusivo del servidor.

Este dominio es el guardián de la integridad de los datos y el ejecutor principal de las acciones de negocio.

**Alcance:**

*   **Contiene:** Exclusivamente **Server Actions** (`"use server"`). Estas acciones son funciones asíncronas que se ejecutan en el servidor y pueden ser invocadas de forma segura desde los componentes del cliente. Encapsulan tareas como:
    *   Autenticar usuarios.
    *   Realizar operaciones CRUD en la base de datos.
    *   Interactuar con APIs de terceros.
    *   Orquestar flujos de trabajo complejos.
*   **Prohíbe:** Cualquier código del lado del cliente. Toda la biblioteca está marcada implícitamente como "server-only". No debe contener componentes de React, hooks, o ninguna lógica que dependa de las APIs del navegador.

## 2. El Contrato del Dominio (Principios Inmutables)

1.  **Frontera Servidor-Cliente:** Esta biblioteca es la materialización de la frontera entre el servidor y el cliente. Las funciones aquí definidas son la única vía por la cual el código del cliente puede solicitar la ejecución de lógica de negocio en el servidor.
2.  **Cumplimiento de Contratos de Datos:** Cada Server Action que recibe datos como entrada **DEBE** validarlos utilizando los esquemas de Zod provenientes de los dominios de contratos (ej. `@razvolution/shared-auth-contracts`). La validación es el primer paso de cualquier acción.
3.  **Comunicación Estructurada:** Cada Server Action **DEBE** devolver un objeto que cumpla con el tipo `ActionResult<T>` (definido en `@razvolution/shared-utils`). Esto garantiza que todas las llamadas desde el cliente reciban una respuesta predecible (`{ success: true, data: ... }` o `{ success: false, error: ... }`).
4.  **Observabilidad de Élite:** Cada Server Action **DEBE** estar instrumentada con el Protocolo Heimdall (`@razvolution/shared-logging`). Como mínimo, cada acción debe ser envuelta en un `logger.startTask`/`logger.endTask` para medir su ejecución y capturar su resultado. Las acciones complejas deben usar `logger.taskStep` para una trazabilidad granular.
5.  **Abstracción de la Fuente de Datos:** Las Server Actions interactúan con el dominio `supabase` para acceder a la base de datos, pero no exponen los detalles de esa interacción a sus llamadores. Su responsabilidad es traducir una intención de negocio (ej. "registrar usuario") en una serie de operaciones de datos.

## 3. Inventario de Aparatos Implementados (Estado Actual)

El dominio ya contiene la implementación del flujo de autenticación, sirviendo como el ejemplo soberano para todas las futuras Server Actions.

### Sub-dominio de Autenticación (`lib/auth/`)

*   **`auth.actions.ts`**:
    *   `loginWithPasswordAction(data: LoginFormData)`: Orquesta el flujo de inicio de sesión. Valida la entrada con `LoginSchema`, invoca a `supabase.auth.signInWithPassword`, y revalida la ruta de Next.js en caso de éxito.
    *   `signUpAction(data: SignUpFormData)`: Orquesta el flujo de registro de usuario. Valida la entrada con `SignUpSchema`, invoca a `supabase.auth.signUp` con los metadatos necesarios.
    *   `sendPasswordResetAction(data: ForgotPasswordFormData)`: Orquesta la solicitud de restablecimiento de contraseña. Valida el email y invoca a `supabase.auth.resetPasswordForEmail`.

*   **`linkAnonymousSessionToUser.action.ts`**:
    *   `linkAnonymousSessionToUserAction(input)`: Una acción crítica para el "Traspaso de Identidad". Después de que un usuario anónimo inicia sesión, esta acción se invoca para vincular su `fingerprintId` anónimo con su nuevo `user.id` a través de una llamada RPC a la base de datos.

Todos estos aparatos están completamente instrumentados con Heimdall, proporcionando una trazabilidad completa de cada operación.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

Este dominio se expandirá para cubrir toda la lógica de negocio del e-commerce y otras funcionalidades de la plataforma.

*   **Sub-dominio de Gestión de Cuentas:**
    *   **Propósito:** Añadir acciones para la gestión del perfil del usuario.
    *   **Acciones:** `updateUserProfileAction`, `updatePasswordAction`.

*   **Sub-dominio de E-commerce (`commerce`):**
    *   **Propósito:** Encapsular toda la lógica de negocio del e-commerce.
    *   **Acciones:** `getProductsAction`, `getProductBySlugAction`, `addToCartAction`, `createCheckoutSessionAction`.

*   **Sub-dominio de Workspaces:**
    *   **Propósito:** Lógica para la gestión de workspaces y miembros.
    *   **Acciones:** `getWorkspacesForUserAction` (ya referenciada en el código), `createWorkspaceAction`, `inviteUserToWorkspaceAction`.

*   **Integración con APIs de Terceros:**
    *   **Propósito:** Crear sub-dominios para cada servicio de terceros (ej. Stripe, Resend).
    *   **Ejemplo (`stripe`):** `createStripeCustomerAction`, `handleStripeWebhookAction`.
    *   **Beneficio:** Aislar la lógica de interacción con APIs externas en un solo lugar, facilitando el mantenimiento y la sustitución de proveedores si fuera necesario.

    ---

    
