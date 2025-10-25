Manifiesto del Dominio de Funcionalidad de Autenticación (features/auth)
Atributo Valor
Dominio @razvolution/features/auth
Scope (Etiqueta Nx) scope:feature
Tipo (Etiqueta Nx) type:auth
Principios Clave Orquestación (no Creación), Invocación de Contratos, Gestión de Estado de UI

1.  Propósito y Alcance Soberano
    El dominio auth es una biblioteca de funcionalidad encapsulada (feature-library). Su propósito es proporcionar todos los elementos de UI (componentes de React) y lógica de cliente (hooks) necesarios para implementar un flujo de autenticación completo en cualquier aplicación del ecosistema razvolution.
    Este dominio es el puente entre los componentes de UI puros (shared/ui) y la lógica de negocio del servidor (shared/data-access). Orquesta la interacción del usuario y gestiona el estado de la UI relacionado con la autenticación.
    Alcance:
    Contiene: "Componentes Inteligentes" (smart components) o "Componentes Orquestadores" que ensamblan primitivas de @razvolution/shared/ui para construir formularios funcionales. Contiene hooks (useAuth) para gestionar el estado de la sesión del usuario en el lado del cliente.
    Prohíbe: La lógica de negocio del servidor. Este dominio DELEGA toda la lógica de negocio a las Server Actions importadas desde @razvolution/shared/data-access. Un componente en este dominio puede invocar una Server Action, pero nunca replicar su lógica.
2.  El Contrato del Dominio (Principios Inmutables)
    Orquestación, no Creación: Los componentes de este dominio son ensambladores. Orquestan primitivas de @razvolution/shared/ui y les inyectan estado y manejadores de eventos. No deben definir estilos o primitivas visuales reutilizables; esos pertenecen a shared/ui.
    Invocación de Contratos: Este dominio es un consumidor principal de contratos:
    Contratos de Datos: Utiliza los esquemas de Zod de @razvolution/shared/auth-contracts para la validación de formularios del lado del cliente con react-hook-form.
    Contratos de API: Invoca las Server Actions de @razvolution/shared/data-access como si fueran su API de backend.
    Gestión de Estado de UI: La responsabilidad principal de los componentes y hooks aquí es gestionar el estado específico de la UI de autenticación: isPending, error de formulario, vista actual (login/signup), etc.
    Encapsulación de Funcionalidad: La biblioteca debe ser autocontenida. Una aplicación (apps/store) debería poder importar un único componente (ej. AuthForm) para renderizar un flujo de autenticación completo sin necesidad de conocer sus detalles internos.
    Observabilidad del Flujo de Cliente: Todas las interacciones del usuario y transiciones de estado significativas deben estar instrumentadas con el logger de @razvolution/shared/logging.
3.  Inventario de Aparatos Implementados
    Tipo Aparato(s) Descripción Soberana
    Orquestador AuthForm.tsx El orquestador principal. Gestiona la vista entre LoginForm y SignUpForm y maneja las transiciones.
    Componente Inteligente LoginForm.tsx, SignUpForm.tsx, ForgotPasswordForm.tsx Construyen los formularios utilizando primitivas de ui. Integran react-hook-form con los esquemas de Zod y manejan la invocación de las Server Actions correspondientes.
    Componente Inteligente UserNav.tsx / UserNavClient.tsx Orquesta el menú de usuario. Utiliza el hook useAuth para mostrar condicionalmente el menú del usuario autenticado o un botón de "Iniciar Sesión". Contiene la lógica de logout.
    Hook de Cliente use-auth.ts El hook soberano para la gestión del estado de autenticación. Se suscribe a los cambios de estado de Supabase en tiempo real y provee el user y profile actuales. Orquesta el "Traspaso de Identidad".
    i18n i18n/auth/\*.json Archivos de traducción que contienen todo el texto necesario para los componentes de este dominio.
4.  Flujo de Datos de un Inicio de Sesión
    code
    Mermaid
    sequenceDiagram
    participant User
    participant LoginForm as LoginForm (features/auth)
    participant LoginAction as loginAction (data-access)
    participant Supabase
    participant useAuth as useAuth Hook (features/auth)

        User->>LoginForm: Rellena y envía formulario
        LoginForm->>LoginAction: Invoca Server Action con datos
        LoginAction->>LoginAction: Valida datos con Zod (auth-contracts)
        LoginAction->>Supabase: supabase.auth.signInWithPassword(...)
        Supabase-->>LoginAction: Respuesta (Éxito/Error)
        LoginAction-->>LoginForm: Devuelve ActionResult

        Supabase->>useAuth: Emite evento 'SIGNED_IN'
        useAuth->>useAuth: Actualiza estado (user, profile)
        useAuth->>UserNav: Re-renderiza con datos del usuario

5.  Hoja de Ruta y Evolución del Dominio
    Implementación de Pruebas Unitarias: Escribir pruebas (.spec.tsx) para los componentes y hooks críticos, utilizando la Granja de Mocks (@razvolution/shared/test-utils) para simular las Server Actions y el hook useAuth.
    Flujo de Verificación de Email: Crear componentes de UI para guiar al usuario a través del proceso de verificación de su correo electrónico.
    Autenticación de Dos Factores (2FA): Añadir un flujo para que los usuarios puedan habilitar y utilizar 2FA.
6.  Integración Arquitectónica y Dependencias
    features/auth es una biblioteca de alto nivel que consume una amplia gama de bibliotecas de la capa shared para construir una experiencia de usuario completa. Es la principal consumidora de la capa de data-access.
    code
    Mermaid
    graph TD
    subgraph Leyenda
    direction LR
    A[Biblioteca Base]
    B[Biblioteca Consumidora]
    end

        subgraph Grafo de Dependencias
            direction TD
            store_app["apps/store"] -- Consume --> auth_feature

            auth_feature["<b>features/auth</b>"] -- Consume --> data_access["shared/data-access"]
            auth_feature -- Consume --> ui["shared/ui"]
            auth_feature -- Consume --> auth_contracts["shared/auth-contracts"]
            auth_feature -- Consume --> logging["shared/logging"]
            auth_feature -- Consume --> supabase["shared/supabase"]
            auth_feature -- Consume --> utils["shared/utils"]
        end

        classDef feature fill:#be185d,stroke:#fff,stroke-width:2px,color:#fff;
        class auth_feature feature;

        ---

// RUTA: .docs/domains/auth-feature-domain.md

# Manifiesto del Dominio de Funcionalidad de Autenticación (`features/auth`)

## 1. Propósito y Alcance Soberano

El dominio `auth` es una **biblioteca de funcionalidad encapsulada (`feature-library`)**. Su propósito es proporcionar todos los elementos de UI (componentes de React) y lógica de cliente (hooks) necesarios para implementar un flujo de autenticación completo en cualquier aplicación del ecosistema `razvolution`.

Este dominio es el puente entre los componentes de UI puros (`shared/ui`) y la lógica de negocio del servidor (`shared/data-access`). Orquesta la interacción del usuario y gestiona el estado de la UI relacionado con la autenticación.

**Alcance:**

- **Contiene:** "Componentes Inteligentes" (`smart components`) o "Componentes Orquestadores" que ensamblan primitivas de `shared/ui` para construir formularios funcionales como `LoginForm` y `SignUpForm`. Contiene hooks (`useAuth`) para gestionar el estado de la sesión del usuario en el lado del cliente.
- **Prohíbe:** La lógica de negocio del servidor. Este dominio **DELEGA** toda la lógica de negocio a las Server Actions importadas desde `@razvolution/shared-data-access`. Un componente en este dominio puede _invocar_ una Server Action, pero nunca replicar su lógica.

## 2. El Contrato del Dominio (Principios Inmutables)

1.  **Orquestación, no Creación:** Los componentes de este dominio son ensambladores. Orquestan componentes primitivos de `@razvolution/shared/ui` y les inyectan estado y manejadores de eventos. No deben definir estilos o primitivas visuales que podrían ser reutilizables; esos pertenecen a `ui`.
2.  **Invocación de Contratos:** Este dominio es un consumidor de contratos.
    - **Contratos de Datos:** Utiliza los esquemas de Zod de `@razvolution/shared-auth-contracts` para la validación de formularios del lado del cliente con `react-hook-form`.
    - **Contratos de API:** Invoca las Server Actions de `@razvolution/shared-data-access` como si fueran su API de backend.
3.  **Gestión de Estado de UI:** La responsabilidad principal de los componentes y hooks en este dominio es gestionar el estado específico de la UI de autenticación: `isPending`, `error de formulario`, `vista actual (login/signup)`, etc.
4.  **Encapsulación de Funcionalidad:** La biblioteca debe ser autocontenida. Un aplicativo (como una app Next.js) debería poder importar un único componente (ej. `AuthForm`) para renderizar un flujo de autenticación completo sin necesidad de conocer sus detalles internos.
5.  **Observabilidad del Flujo de Cliente:** Todas las interacciones del usuario y transiciones de estado significativas deben estar instrumentadas con el `logger` de `@razvolution/shared-logging` para proporcionar visibilidad sobre el comportamiento del usuario en el frontend.

## 3. Inventario de Aparatos Implementados (Estado Actual)

El dominio `auth` está casi completamente implementado y es funcional.

### 3.1. Componentes Orquestadores

- **`AuthForm.tsx`**: El orquestador principal. Gestiona la vista entre `LoginForm` y `SignUpForm` y maneja las transiciones animadas.
- **`LoginForm.tsx`**, **`SignUpForm.tsx`**, **`ForgotPasswordForm.tsx`**: "Componentes Inteligentes" que construyen los formularios utilizando primitivas de `shared/ui`. Integran `react-hook-form` con los esquemas de Zod y manejan el estado de envío (`isPending`) y la invocación de las Server Actions correspondientes.
- **`UserNav.tsx` / `UserNavClient.tsx`**: Orquesta el menú de usuario. Utiliza el hook `useAuth` para mostrar condicionalmente el menú del usuario autenticado o un botón de "Iniciar Sesión". Contiene la lógica de logout.
- **`WorkspaceSwitcher.tsx`**: Un componente que gestiona la selección del `workspace` activo. Invoca la Server Action `getWorkspacesForUserAction` y sincroniza el estado con el store de Zustand `useWorkspaceStore`.

### 3.2. Hooks de Cliente

- **`use-auth.ts`**: El hook de cliente soberano para la gestión del estado de autenticación.
  - **Funcionalidad:** Se suscribe a los cambios de estado de autenticación de Supabase en tiempo real.
  - **Provee:** El `user` actual, el `profile` de la base de datos y un estado de `isLoading`.
  - **Orquesta:** El "Traspaso de Identidad" invocando la `linkAnonymousSessionToUserAction` después de un inicio de sesión exitoso.

### 3.3. Contenido de Internacionalización (i18n)

- **`i18n/auth/*.i18n.json`**: Archivos de traducción que contienen todo el texto necesario para los componentes de este dominio, cumpliendo con nuestro pilar de i18n nativa.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

La funcionalidad base es sólida. La evolución se centrará en enriquecer la experiencia del usuario y añadir flujos de autenticación adicionales.

- **Implementación de Pruebas Unitarias:**

  - **Acción:** Escribir pruebas unitarias (`.spec.tsx`) para los componentes y hooks críticos.
  - **Objetivo:** Probar el comportamiento de la UI en aislamiento utilizando la Granja de Mocks (`@razvolution/shared-test-utils`) para simular las Server Actions y el hook `useAuth`. Por ejemplo:
    - Verificar que al enviar el `LoginForm` con datos válidos, se llama a la Server Action `loginWithPasswordAction`.
    - Verificar que se muestran los mensajes de error de Zod cuando la validación del formulario falla.

- **Flujos de "Social Login" (OAuth):**

  - **Acción:** El componente `OAuthButtons.tsx` ya existe. La tarea es completar la implementación para otros proveedores además de Google (ej. Apple, GitHub) y asegurar que el callback de autenticación se gestione correctamente.

- **Flujo de Verificación de Email:**

  - **Acción:** Crear componentes de UI para guiar al usuario a través del proceso de verificación de su correo electrónico después del registro.

- **Autenticación de Dos Factores (2FA):**

  - **Propósito:** Añadir un flujo para que los usuarios puedan habilitar y utilizar 2FA.
  - **Componentes:** `Enable2FAForm`, `Verify2FATokenForm`.

  ***
