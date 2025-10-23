// RUTA: .docs/domains/ui-domain.md

# Manifiesto del Dominio de Interfaz de Usuario (`shared/ui`)

## 1. Propósito y Alcance Soberano

El dominio `ui` es el **Sistema de Diseño Soberano** y la biblioteca de componentes visuales de `razvolution`. Su propósito es proporcionar un conjunto de componentes de React **puros, sin estado, de presentación y agnósticos al negocio**, que sirvan como los bloques de construcción fundamentales para todas las interfaces de usuario.

Este dominio es la encarnación de nuestro pilar de "Theming Semántico y Soberano" y la base para una experiencia de usuario consistente y de alta calidad.

**Alcance:**

*   **Contiene:** Componentes de React primitivos y reutilizables como `Button`, `Card`, `Input`, `Dialog`, `Avatar`, etc. Estos componentes encapsulan el estilo, la accesibilidad (a11y) y las interacciones básicas, pero no contienen lógica de negocio ni estado de la aplicación.
*   **Prohíbe:** Cualquier conocimiento sobre el dominio de negocio. Un componente `Button` en este dominio no sabe si se está usando para "Añadir al Carrito" o para "Iniciar Sesión". También se prohíbe el fetching de datos o la invocación directa de Server Actions. Estas responsabilidades pertenecen a las bibliotecas de `features`.

## 2. El Contrato del Dominio (Principios Inmutables)

1.  **Pureza de Presentación:** Los componentes de UI deben ser "componentes tontos" (`dumb components`). Reciben datos y callbacks a través de `props` y renderizan una UI. No deben gestionar su propio estado complejo ni provocar efectos secundarios relacionados con la lógica de la aplicación.
2.  **Componibilidad y Atomicidad:** Los componentes se diseñan siguiendo los principios del Diseño Atómico. Se construyen a partir de primitivas que se pueden componer para crear interfaces más complejas. Cada componente debe tener una API de `props` clara y predecible.
3.  **Estilo a través de `cva` y `tailwind-merge`:** El estilo de los componentes se gestiona con `class-variance-authority` (cva) para definir variantes (ej. `variant='destructive'`, `size='lg'`) y `tailwind-merge` (a través de la utilidad `cn` de `@razvolution/shared-utils`) para permitir la personalización y anulación de clases de forma segura desde el exterior.
4.  **Accesibilidad (a11y) por Diseño:** Los componentes deben ser accesibles por defecto, siguiendo las especificaciones de WAI-ARIA. Se prioriza el uso de primitivas de componentes sin estilo de bibliotecas como Radix UI, que proporcionan una base sólida de accesibilidad y comportamiento.
5.  **Agnosticismo de Datos:** Los componentes no saben de dónde vienen los datos. Reciben `props` y las renderizan. La responsabilidad de obtener y gestionar los datos recae en las capas superiores de la arquitectura (`features`).

## 3. Inventario de Aparatos Implementados (Estado Actual)

El dominio `ui` está actualmente en su fase inicial. Aunque la estructura está definida (`project.json`, `tsconfig.json`), la migración de los componentes primitivos desde el proyecto original aún está pendiente, según el roadmap (`proyecto-razvolution.md`).

*   **`index.ts`**: El punto de entrada de la biblioteca existe, pero actualmente no exporta ningún componente.

*   **Componentes Primitivos (A ser migrados):**
    *   `Accordion`
    *   `Alert` y `Alert-Dialog`
    *   `Avatar`
    *   `Button`
    *   `Card`
    *   `Checkbox`
    *   `Dialog`
    *   `DropdownMenu`
    *   `Form` (orquestador de `react-hook-form`)
    *   `Input`
    *   `Label`
    *   `Select`
    *   `Separator`
    *   `Skeleton`
    *   `Switch`
    *   `Tooltip`
    *   ...y otros componentes base.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

La prioridad inmediata para este dominio es la **FASE 2: El Sistema de Diseño (UI)** del roadmap de migración.

*   **Migración Holística de Componentes Primitivos:**
    *   **Acción:** Mover todos los componentes de la carpeta `src/components/ui` del proyecto original a la biblioteca `@razvolution/shared/ui`.
    *   **Nivelación:** Cada componente migrado debe ser "nivelado" para cumplir con el contrato del dominio:
        1.  Asegurar que no contenga lógica de negocio.
        2.  Verificar que todas sus dependencias (como `cn` o `cva`) se importen correctamente desde `@razvolution/shared-utils`.
        3.  Añadir documentación **TSDoc** a su API de `props`.
        4.  Crear un archivo de pruebas (`.spec.tsx`) básico que verifique que el componente se renderiza sin errores (prueba de humo).

*   **Desarrollo de Storybook:**
    *   **Propósito:** Implementar Storybook para esta biblioteca.
    *   **Beneficio:** Crear un taller visual aislado para desarrollar, documentar y probar componentes de UI de forma interactiva. Esto acelerará el desarrollo del frontend y mejorará la calidad de la documentación.

*   **Componentes de Disposición (Layout) Genéricos:**
    *   **Propósito:** Crear componentes de layout reutilizables y agnósticos.
    *   **Ejemplos:** `Container`, `Grid`, `Flex`, `Stack`.

*   **Integración del Sistema de Theming:**
    *   **Propósito:** Asegurar que los componentes utilicen variables CSS semánticas (ej. `bg-primary`, `text-destructive`) en lugar de valores hardcodeados, permitiendo que el theming soberano funcione correctamente.
