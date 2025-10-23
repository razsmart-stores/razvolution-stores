// RUTA: .docs/manifiesto-de-testing-jest.md
# Manifiesto de Testing Soberano: Jest y Nx

## 1. Propósito

Este manifiesto establece la estrategia de pruebas única y soberana para el ecosistema `razvolution`. Su propósito es garantizar que cada pieza de código esté respaldada por pruebas robustas, mantenibles y eficientes que nos permitan refactorizar con total confianza y asegurar la integridad de la arquitectura.

Las pruebas no son una ocurrencia tardía; son un contrato de calidad y una parte integral del ciclo de vida del desarrollo.

## 2. Principios Rectores

Nuestra estrategia de testing se fundamenta en los siguientes pilares inmutables:

### 2.1. Pruebas Orientadas al Contrato (API Pública)

-   **Qué probamos:** El comportamiento observable y la API pública de nuestros módulos, funciones y componentes.
-   **Qué NO probamos:** Los detalles internos de implementación. Si una refactorización interna no cambia el resultado final (el contrato), las pruebas no deberían romperse. Esto hace que nuestras pruebas sean resilientes al cambio.

### 2.2. Aislamiento y Responsabilidad Única

-   Cada prueba unitaria debe ser completamente independiente. No debe depender del estado de otras pruebas.
-   Las dependencias externas (servicios, hooks, otras bibliotecas) de una unidad bajo prueba **deben ser mockeadas**. Esto asegura que estamos probando la lógica de la unidad en aislamiento, no la de sus dependencias.

### 2.3. Resiliencia y Confianza

-   El objetivo principal de nuestra suite de pruebas es darnos la **confianza** para desplegar y refactorizar agresivamente. Una suite de pruebas "verde" debe ser un sinónimo de un sistema funcional.
-   Las pruebas deben ser deterministas: siempre deben producir el mismo resultado si el código no ha cambiado.

### 2.4. Observabilidad en Pruebas

-   Los mocks deben ser "observables". Utilizaremos `jest.fn()` para espiar las llamadas, permitiéndonos afirmar no solo el resultado de una función, sino también que sus efectos secundarios (como llamar a otra función) ocurrieron como se esperaba.

## 3. Jerarquía y Tipos de Pruebas

Adoptaremos una jerarquía de pruebas clara para validar el sistema en diferentes niveles.

-   **Pruebas Unitarias (`.spec.ts`, `.spec.tsx`):**
    -   **Alcance:** Una única función, un componente de React en aislamiento, o un hook.
    -   **Herramientas:** Jest, React Testing Library.
    -   **Ubicación:** Residen junto al código fuente que prueban.
    -   **Prioridad:** Máxima. La gran mayoría de nuestras pruebas serán unitarias.

-   **Pruebas de Integración (Futuro):**
    -   **Alcance:** La interacción entre varias unidades o bibliotecas. Por ejemplo, un formulario (`features/auth`) que invoca una Server Action (`shared/data-access`).
    -   **Herramientas:** Jest, React Testing Library (con menos mocks).
    -   **Prioridad:** Media. Se escribirán para flujos de usuario críticos.

-   **Pruebas End-to-End (E2E) (Futuro):**
    -   **Alcance:** Flujos de usuario completos en un navegador real.
    -   **Herramientas:** Playwright.
    -   **Prioridad:** Selectiva. Reservadas para las funcionalidades más críticas del e-commerce.

## 4. La Granja de Mocks Soberana (`shared/test-utils`)

Para cumplir con el principio de aislamiento y evitar la duplicación, centralizaremos todos los mocks reutilizables en una biblioteca dedicada: `@razvolution/shared-test-utils`.

-   **Propósito:** Proporcionar mocks listos para usar para dependencias comunes como el cliente de Supabase, `useRouter` de Next.js, etc.
-   **Regla:** Ninguna biblioteca de producción (`features/*`, `shared/*` excepto `test-utils`) puede depender de `@razvolution/shared-test-utils`. Solo los archivos de prueba (`.spec.ts`) pueden importarla. Nx reforzará esta frontera.

## 5. Ejecución y CI/CD

-   **Desarrollo Local:** Para probar una biblioteca específica, se usará el comando `pnpm nx test <nombre-proyecto>`.
-   **Integración Continua (CI):** El comando soberano en los Pull Requests será `pnpm nx affected:test`. Esto asegura que solo se ejecuten las pruebas de los proyectos afectados por un cambio, manteniendo el pipeline rápido y eficiente.

---


