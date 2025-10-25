Manifiesto del Dominio Supabase (shared/supabase)
Atributo Valor
Dominio @razvolution/shared/supabase
Scope (Etiqueta Nx) scope:shared
Tipo (Etiqueta Nx) type:data-access
Principios Clave Abstracción, Seguridad por Contexto, Seguridad de Tipos Absoluta

1.  Propósito y Alcance Soberano
    El dominio supabase es la única y exclusiva capa de abstracción para todas las interacciones con los servicios de Supabase (Base de Datos, Autenticación, Storage, etc.). Su propósito es proporcionar un conjunto de clientes seguros y optimizados para cada entorno de ejecución (client, server, middleware, script).
    Este dominio centraliza la configuración y el acceso, actuando como el guardián de la conexión con nuestro backend.
    Alcance:
    Contiene: Fábricas de clientes que instancian el cliente de Supabase apropiado para cada contexto.
    Prohíbe: La instanciación directa de un cliente de Supabase (createClient) en cualquier otro lugar del ecosistema. Toda interacción con Supabase DEBE realizarse a través de las funciones exportadas por esta biblioteca.
2.  El Contrato del Dominio (Principios Inmutables)
    Seguridad por Contexto: El dominio proporciona un cliente específico para cada entorno. Utilizar el cliente incorrecto (ej. createServerClient en un componente de cliente) es una violación arquitectónica grave que puede comprometer la seguridad de las sesiones.
    Seguridad de Tipos Absoluta: Los clientes fabricados por este dominio están fuertemente tipados con los tipos de la biblioteca @razvolution/shared-db-types. Esto garantiza que cualquier consulta realizada a través de estos clientes tenga seguridad de tipos y autocompletado.
    Abstracción, no Implementación: Esta biblioteca proporciona los clientes (el "cómo" conectarse), no la lógica de negocio (el "qué" hacer). No contiene Server Actions ni consultas específicas. Su única responsabilidad es fabricar y configurar el conector.
    Configuración Centralizada: Todas las variables de entorno (SUPABASE_URL, SUPABASE_KEY, etc.) se leen y validan exclusivamente dentro de este dominio, reduciendo la superficie de configuración y simplificando el mantenimiento.
3.  Inventario de Aparatos Implementados
    Archivo Aparato(s) Descripción Soberana
    client.ts createClient() Fabrica una instancia Singleton del cliente de Supabase para el lado del navegador ("use client"). Maneja de forma segura las cookies de sesión.
    server.ts createServerClient() Fabrica una nueva instancia del cliente de Supabase para el entorno del servidor (Server Actions, Server Components), utilizando el service_role_key para operaciones con privilegios.
    middleware.ts updateSession() Orquesta el refresco del token de sesión del usuario en cada petición de Next.js, crucial para mantener al usuario autenticado.
    script-client.ts createScriptClient() Fabrica una instancia del cliente para ser usada en scripts de Node.js fuera de Next.js (ej. seeding, crons), autenticada con privilegios de superusuario.
4.  Hoja de Ruta y Evolución del Dominio
    Fachada para Invocación de Funciones (RPC): Crear funciones fuertemente tipadas que envuelvan las llamadas a funciones de base de datos (rpc). Esto mejoraría la experiencia de desarrollo al reemplazar supabase.rpc('my_function', ...) por una función myFunction(...) con tipos de entrada y salida definidos.
    Abstracción del Cliente de Storage: Crear funciones de utilidad específicas para interactuar con Supabase Storage (ej. uploadAvatar, getPublicUrlForImage) para centralizar la lógica de construcción de URLs y políticas de acceso.
    Integración de Health Checks: Añadir una función de diagnóstico (ej. checkSupabaseConnection()) para verificar la conectividad con las APIs de Supabase.
5.  Integración Arquitectónica y Dependencias
    shared/supabase es una biblioteca de infraestructura que depende de los contratos (db-types) y de la observabilidad (logging). Es consumida por cualquier dominio que necesite interactuar directamente con el backend.
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
            data_access["shared/data-access"] -- Consume --> supabase
            auth_feature["features/auth"] -- Consume --> supabase

            supabase["<b>shared/supabase</b>"] -- Depende de --> db_types["shared/db-types"]
            supabase -- Depende de --> logging["shared/logging"]
        end

        classDef mid fill:#0d9488,stroke:#fff,stroke-width:2px,color:#fff;
        class supabase mid;

        ---

// RUTA: .docs/domains/supabase-domain.md

# Manifiesto del Dominio Supabase (`shared/supabase`)

## 1. Propósito y Alcance Soberano

El dominio `supabase` es la **única y exclusiva capa de abstracción** para todas las interacciones con los servicios de Supabase (Base de Datos, Autenticación, Storage, etc.). Su propósito es proporcionar un conjunto de clientes seguros, optimizados para cada entorno de ejecución, y garantizar una seguridad de tipos absoluta en toda la capa de datos.

**Alcance:** Este dominio es el guardián de la conexión con nuestro backend.

- **Contiene:** Fábricas de clientes para el navegador (`client.ts`), para el servidor (`server.ts`), para middleware (`middleware.ts`) y para scripts de Node.js (`script-client.ts`). También alberga la SSoT (Única Fuente de Verdad) para los tipos de la base de datos (`database.types.ts`).
- **Prohíbe:** La instanciación directa de un cliente de Supabase en cualquier otro lugar del ecosistema. Toda interacción con Supabase **DEBE** realizarse a través de las funciones exportadas por esta biblioteca. Esto centraliza la configuración, la seguridad y la observabilidad.

## 2. El Contrato del Dominio (Principios Inmutables)

1.  **Seguridad por Contexto:** El dominio proporciona un cliente específico para cada contexto de ejecución (`server`, `client`, `middleware`, `script`). Utilizar el cliente incorrecto (ej. el cliente de servidor en un componente de cliente) es una violación arquitectónica grave que puede comprometer la seguridad.
2.  **Seguridad de Tipos Absoluta:** La SSoT de los tipos de la base de datos (`database.types.ts`) es generada automáticamente a partir del esquema de la base de datos (`pnpm supabase:gen-types`). Esto garantiza que el código de la aplicación siempre esté sincronizado con la estructura de los datos, eliminando una clase entera de errores en tiempo de ejecución. Cualquier consulta a la base de datos debe estar fuertemente tipada usando estos tipos generados.
3.  **Abstracción, no Implementación:** Esta biblioteca proporciona los _clientes_, no la lógica de negocio. No debe contener Server Actions, consultas específicas o lógica de manipulación de datos. Su única responsabilidad es fabricar y configurar el conector al servicio.
4.  **Configuración Centralizada:** Todas las variables de entorno y la configuración de conexión a Supabase se gestionan exclusivamente dentro de este dominio. Esto simplifica el mantenimiento y reduce la superficie de ataque.

## 3. Inventario de Aparatos Implementados (Estado Actual)

El dominio está completamente implementado y proporciona los siguientes aparatos críticos:

### 3.1. Fábrica de Clientes para el Navegador (`client.ts`)

- **Función:** `createClient()`
- **Descripción:** Crea una instancia **Singleton** del cliente de Supabase para el lado del cliente (`"use client"`). Utiliza `createBrowserClient` de `@supabase/ssr`, que maneja de forma segura las cookies de sesión en el navegador. Es seguro para ser llamado múltiples veces, siempre devolverá la misma instancia.

### 3.2. Fábrica de Clientes para el Servidor (`server.ts`)

- **Función:** `createServerClient()`
- **Descripción:** Crea una nueva instancia del cliente de Supabase para el entorno del servidor (Server Components, Server Actions, Route Handlers). Utiliza `createServerClient` de `@supabase/ssr` y se integra con el almacén de cookies de Next.js para gestionar la sesión del usuario que realiza la petición. Está marcado con `"server-only"` para evitar su importación accidental en el cliente. Para operaciones con privilegios de administrador, utiliza la `SUPABASE_SERVICE_ROLE_KEY`.

### 3.3. Orquestador de Middleware (`middleware.ts`)

- **Función:** `updateSession(request)`
- **Descripción:** Es una función de middleware de Next.js que se encarga de refrescar el token de sesión del usuario en cada petición. Esto es crucial para mantener al usuario autenticado sin interrupciones mientras navega por la aplicación.

### 3.4. Fábrica de Clientes para Scripts (`script-client.ts`)

- **Función:** `createScriptClient()`
- **Descripción:** Crea una instancia del cliente de Supabase para ser utilizada exclusivamente en scripts de Node.js fuera del ciclo de vida de Next.js (ej. seeding de base de datos, tareas programadas). Se autentica con la `SUPABASE_SERVICE_ROLE_KEY` para obtener privilegios de superusuario, permitiendo operaciones de sistema.

### 3.5. Contrato de Tipos de la Base de Datos (`database.types.ts`)

- **Descripción:** Este archivo es la SSoT para el esquema completo de la base de datos de Supabase. No se debe editar manualmente.
- **Generación:** Se actualiza ejecutando el comando soberano `pnpm supabase:gen-types`, que introspecciona la base de datos remota y genera las interfaces de TypeScript para todas las tablas, vistas, funciones y enums.
- **Uso:** Proporciona tipos genéricos como `Tables<'profiles'>` o `TablesInsert<'orders'>` que garantizan que todas las operaciones de datos estén fuertemente tipadas.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

Este dominio es estable, pero puede evolucionar para mejorar la experiencia de desarrollo y la robustez.

- **Abstracción del Cliente de Storage:**

  - **Propósito:** Crear funciones de utilidad específicas para interactuar con Supabase Storage (ej. `uploadAvatar`, `getPublicUrlForImage`).
  - **Beneficio:** Abstraer los detalles de implementación de la gestión de archivos y centralizar la lógica de construcción de URLs y políticas de acceso.

- **Fachada para Invocación de Funciones (RPC):**

  - **Propósito:** Crear funciones fuertemente tipadas que envuelvan las llamadas a funciones de base de datos (`rpc`).
  - **Beneficio:** En lugar de `supabase.rpc('my_function', { param: 1 })`, se podría tener una función `myFunction({ param: 1 })` con tipos de entrada y salida definidos, mejorando la seguridad de tipos y el autocompletado.

- **Integración de Health Checks:**
  - **Propósito:** Añadir una función de diagnóstico (ej. `checkSupabaseConnection()`) que verifique la conectividad con la API de la base de datos y de autenticación.
  - **Beneficio:** Permitiría la creación de scripts de diagnóstico automatizados y páginas de estado del sistema.
