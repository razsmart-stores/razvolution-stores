# Manifiesto del Dominio de Utilidades (`shared/utils`)

## 1. Propósito y Alcance Soberano

El dominio de `utils` es el cimiento fundamental e inmutable del ecosistema `razvolution`. Su propósito es proveer un conjunto de herramientas **puras, atómicas y agnósticas** que resuelven problemas transversales comunes a cualquier aplicativo web o de software.

**Alcance:** Este dominio se define tanto por lo que contiene como por lo que **prohíbe**:

*   **Contiene:** Funciones de bajo nivel, sin estado (en su mayoría), y con una única responsabilidad bien definida. Estas utilidades no tienen conocimiento del dominio de negocio (e-commerce, autenticación, etc.).
*   **Prohíbe:** Cualquier dependencia hacia dominios de nivel superior. Una utilidad **NUNCA** debe importar desde `data-access`, `features`, o cualquier otra biblioteca que no sea ella misma. Esta es la frontera arquitectónica más crítica del monorepo. Violarla es corromper la fundación.

## 2. El Contrato del Dominio (Principios Inmutables)

Toda pieza de código que resida en `@razvolution/shared-utils` debe adherirse a los siguientes principios:

1.  **Pureza Absoluta:** Siempre que sea posible, las funciones deben ser puras: para una misma entrada, siempre producen la misma salida, sin efectos secundarios observables.
2.  **Atomicidad:** Cada utilidad debe hacer una sola cosa y hacerla bien. Por ejemplo, `cn` fusiona clases, `normalizeStringForId` normaliza texto para slugs. No se mezclan responsabilidades.
3.  **Cero Dependencias de Dominio Superior:** Regla inmutable. Esta biblioteca es la base de la pirámide de dependencias.
4.  **Agnosticismo de Framework:** Las utilidades deben, en la medida de lo posible, ser independientes de React o Next.js para maximizar su portabilidad a otros entornos (ej. scripts de Node.js, aplicaciones móviles).

## 3. Inventario de Aparatos Implementados (Estado Actual)

El dominio ya provee un conjunto robusto de herramientas validadas y probadas, organizadas por sub-dominios:

### 3.1. Manejo de Estilos y Clases
*   **`cn.ts`**: Orquesta la fusión de clases de Tailwind CSS, combinando `clsx` y `tailwind-merge` para resolver conflictos y permitir una asignación de clases condicional y limpia. Es la SSoT para la manipulación de clases en componentes.

### 3.2. Procesamiento de Texto y Normalización
*   **`text-processing/normalization.ts`**: Provee el motor `normalizeStringForId`, una utilidad crítica que convierte cualquier cadena de texto en un formato seguro para URLs o IDs. Su algoritmo de múltiples etapas garantiza un soporte completo para caracteres internacionales (diacríticos, acentos), cumpliendo con nuestro pilar de i18n nativa.
*   **`search/keyword-normalizer.ts`**: Especializado en la optimización de términos de búsqueda, eliminando "stop words", singularizando y normalizando palabras clave para mejorar la precisión de las consultas.

### 3.3. Gestión de Estado Global
*   **`stores/use-workspace.store.ts`**: Implementa el store global para la gestión del contexto de `workspace` utilizando Zustand. Es el ejemplo soberano de cómo manejar estado global ligero y desacoplado, con persistencia en `localStorage`.

### 3.4. Internacionalización (i18n)
*   **`i18n/i18n.utils.ts`**: Contiene las utilidades puras para detectar y extraer el `locale` a partir de la ruta de la URL, constituyendo la base de nuestra estrategia de enrutamiento internacionalizado.

### 3.5. Seguridad
*   **`server-encryption.ts`**: Un aparato de seguridad de élite que proporciona funciones isomórficas (`encryptServerData`, `decryptServerData`) para encriptación simétrica, utilizando la Web Crypto API. Es fundamental para proteger datos sensibles en el servidor.

### 3.6. Tipos y Contratos Fundamentales
*   **`types/actions.types.ts`**: Define el tipo `ActionResult<T>`, el contrato de comunicación soberano para todas las Server Actions del ecosistema. Garantiza que cada acción del servidor devuelva una estructura predecible de éxito o fracaso.

### 3.7. Manipulación de Objetos
*   **`merge.ts`**: Proporciona la utilidad `deepMerge` para fusionar objetos de forma recursiva e inmutable, esencial para la gestión de configuraciones complejas.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

Este dominio está diseñado para crecer. Los siguientes aparatos son candidatos de alta prioridad para su inclusión, con el fin de fortalecer la base para futuros proyectos:

*   **Aparato de Fechas y Horas:**
    *   **Propósito:** Crear una fachada soberana sobre una biblioteca robusta como `date-fns`.
    *   **Funcionalidades:** `formatDate`, `timeAgo`, `parseISO`, etc. Esto centralizará el formato de fechas y evitará la importación directa de `date-fns` en todo el código base.

*   **Aparato de Formateo:**
    *   **Propósito:** Centralizar la lógica de formato de datos para presentación.
    *   **Funcionalidades:** `formatCurrency` (con soporte para i18n), `formatNumber`.

*   **Aparato de Manipulación de Arrays y Objetos:**
    *   **Propósito:** Expandir las capacidades de manipulación de datos.
    *   **Funcionalidades:** `groupBy`, `deepClone`, `pick`, `omit`.

*   **Aparato de Guardias de Tipo (Type Guards):**
    *   **Propósito:** Fortalecer la seguridad de tipos en tiempo de ejecución.
    *   **Funcionalidades:** `isDefined`, `isString`, `isObject`, `hasProperty`.

*   **Aparato de Asincronía:**
    *   **Propósito:** Proveer herramientas comunes para manejar operaciones asíncronas.
    *   **Funcionalidades:** `debounce`, `throttle`, `delay`.
    ---

    
