// RUTA: .docs/domains/test-utils-domain.md

# Manifiesto del Dominio de Utilidades de Pruebas (`shared/test-utils`)

## 1. Propósito y Alcance Soberano

El dominio `test-utils`, o la **Granja de Mocks Soberana**, es el arsenal centralizado para el aislamiento de pruebas en el ecosistema `razvolution`. Su único propósito es **fabricar y proveer mocks de alta fidelidad** para las dependencias externas y transversales del sistema, como clientes de servicios, hooks de frameworks o APIs del navegador.

Este dominio es la implementación directa del principio de "Aislamiento y Responsabilidad Única" del Manifiesto de Testing. Permite que las pruebas unitarias se centren exclusivamente en la lógica de la unidad bajo prueba, sin verse afectadas por el comportamiento de sus dependencias.

**Alcance:**

*   **Contiene:** Fábricas de mocks (`createMock...`) que generan versiones simuladas de objetos complejos. Estas fábricas deben producir mocks que sean estructuralmente idénticos y, en la medida de lo posible, tipados para coincidir con la implementación real.
*   **Prohíbe:** Cualquier lógica de producción. Este es un dominio exclusivo para el desarrollo y las pruebas (`devDependencies`).

## 2. El Contrato del Dominio (Principios Inmutables)

1.  **Frontera Arquitectónica Inmutable:** Esta es la regla más crítica del dominio: **`@razvolution/shared-test-utils` NUNCA debe ser importado por código de producción**. Solo puede ser una dependencia en los archivos de prueba (`*.spec.ts`, `*.test.ts`). Nx reforzará esta regla a través de las restricciones de `tags` en `eslint.config.mjs` para prevenir dependencias ilegales.
2.  **Alta Fidelidad y Tipado Estricto:** Los mocks no son simples objetos vacíos. Deben simular la API pública del objeto real con la mayor fidelidad posible, incluyendo funciones mockeadas con `jest.fn()`. Esto permite a las pruebas no solo controlar el comportamiento de las dependencias, sino también afirmar que fueron llamadas correctamente (observabilidad en pruebas).
3.  **Atomicidad y Componibilidad:** La granja se construye con "aparatos atómicos". Cada fábrica de mock debe tener una única responsabilidad (ej. `createMockAuthClient`). Los mocks más complejos (ej. `createMockSupabaseClient`) deben componerse a partir de estos aparatos atómicos, promoviendo la reutilización y el mantenimiento.
4.  **Agnosticismo de Implementación:** Las fábricas de mocks deben devolver objetos que cumplan con una *interfaz* o *contrato*, no con los detalles internos de una implementación. Esto hace que los mocks y las pruebas que los usan sean más resilientes a refactorizaciones.

## 3. Inventario de Aparatos Implementados (Estado Actual)

La granja ya proporciona el andamiaje completo para simular el cliente de Supabase, permitiendo probar cualquier lógica que dependa de él en total aislamiento.

### 3.1. Aparato Atómico: Mock del `SupabaseAuthClient` (`mocks/supabase/auth-client.mock.ts`)
*   **Fábrica:** `createMockAuthClient()`
*   **Descripción:** Fabrica un mock para el cliente de autenticación de Supabase (`supabase.auth`). Proporciona implementaciones de `jest.fn()` para funciones clave como `signInWithPassword`, `signOut`, `getUser`, etc., preconfiguradas para resolver con éxito por defecto.

### 3.2. Aparato Atómico: Mock del `PostgrestQueryBuilder` (`mocks/supabase/query-builder.mock.ts`)
*   **Fábrica:** `createMockQueryBuilder()`
*   **Descripción:** Fabrica un mock para el constructor de consultas de Supabase. Permite encadenar llamadas (`.select().eq().single()`) y resuelve con datos mock por defecto. Es la pieza clave para simular consultas a la base de datos.

### 3.3. Orquestador: Mock del `SupabaseClient` (`mocks/supabase/supabase-client.mock.ts`)
*   **Fábrica:** `createMockSupabaseClient()`
*   **Descripción:** Es el orquestador principal que ensambla los aparatos atómicos. Devuelve un mock completo y funcional del `SupabaseClient`. La llamada a `from()` devuelve una instancia del `QueryBuilder` mockeado, y la propiedad `auth` devuelve una instancia del `AuthClient` mockeado.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

La Granja de Mocks crecerá a medida que el ecosistema integre más dependencias externas.

*   **Mock del Router de Next.js:**
    *   **Propósito:** Crear una fábrica `createMockNextRouter()` para simular el hook `useRouter` de Next.js.
    *   **Funcionalidades:** Proveerá `jest.fn()` para `push`, `replace`, `refresh`, y permitirá simular `pathname`, `query`, etc.
    *   **Beneficio:** Permitirá probar componentes que realizan navegación sin depender del entorno de Next.js.

*   **Mock de la API `fetch` Global:**
    *   **Propósito:** Crear una utilidad para mockear respuestas de `fetch` de manera estandarizada.
    *   **Beneficio:** Esencial para probar Server Actions o componentes de cliente que realizan llamadas a APIs de terceros.

*   **Mock de APIs del Navegador:**
    *   **Propósito:** Crear fábricas para simular APIs del navegador como `localStorage`, `sessionStorage`, o `matchMedia`.
    *   **Beneficio:** Permitirá probar hooks y componentes que interactúan con estas APIs en el entorno de pruebas de Node.js de Jest. (Nota: Una versión parcial de `localStorage` ya existe en `logger.spec.ts` y debería ser promovida a este dominio).

*   **Factorías de Datos de Prueba (Test Data Factories):**
    *   **Propósito:** Crear funciones que generen datos de prueba consistentes (ej. `createMockUser()`, `createMockProduct()`).
    *   **Beneficio:** Reducir la duplicación de código en la configuración de las pruebas y garantizar que los datos de prueba cumplan con los contratos del sistema.

    ---

    
