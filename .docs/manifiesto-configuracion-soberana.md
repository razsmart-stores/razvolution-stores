.docs/manifiesto-configuracion-soberana.md
==================== INICIO DEL ARCHIVO [.docs/manifiesto-configuracion-soberana.md] ====================
Manifiesto de Configuración Soberana: TypeScript, Nx y Testing
1. Propósito
Este manifiesto establece la estrategia de configuración única y soberana para el ecosistema razvolution. Su propósito es alinear nuestro desarrollo con las prácticas más modernas y performantes que ofrecen TypeScript y Nx, garantizando que nuestro monorepo no solo sea escalable, sino también rápido, eficiente y un placer de mantener.
Las directrices aquí presentes se basan en los principios de rendimiento, límites arquitectónicos claros y automatización inteligente.
2. Estrategia de TypeScript y Vinculación de Proyectos
Nuestra configuración actual en tsconfig.base.json utiliza alias de paths, un enfoque que, aunque funcional, trata a nuestro monorepo como una única y masiva unidad de compilación. La documentación es clara: este método conduce a tiempos de compilación lentos y a un consumo de memoria excesivo en CI/CD (casos de hasta 6.14 GB de RAM).
Para evolucionar, adoptaremos la arquitectura recomendada que combina Workspaces del Gestor de Paquetes con Referencias de Proyecto de TypeScript.
Por qué (La Justificación):
Rendimiento Drástico: Las Referencias de Proyecto transforman nuestro monorepo en un grafo de "islas" interconectadas. TypeScript puede entonces compilar y verificar tipos de forma incremental, utilizando una caché (.tsbuildinfo) para reconstruir únicamente lo que ha cambiado. Esto reduce los tiempos de typecheck de minutos a segundos y desploma el uso de memoria a menos de 1 GB.
Límites Arquitectónicos Reales: Dejamos de depender de simples alias para definir la relación entre proyectos. Las referencias crean una frontera explícita a nivel de compilador, reforzando la modularidad y evitando dependencias no deseadas.
Resolución Nativa: Al usar los workspaces de PNPM, la resolución de módulos (import { ... } from '@razvolution/shared/ui') se maneja de forma nativa a través de enlaces simbólicos en node_modules, alineándonos con el estándar del ecosistema de Node.js en lugar de depender de una solución exclusiva de TypeScript.
Cómo (El Plan de Acción):
Se ejecutará una refactorización única de nuestra configuración de TypeScript para seguir estas reglas:
Habilitar Workspaces de PNPM: La raíz de package.json y pnpm-workspace.yaml ya están configurados para esto. Nos aseguraremos de que todas las dependencias entre proyectos locales se declaren en los package.json correspondientes con la versión "*".
Eliminar paths de tsconfig.base.json: Este es el paso más crítico. La propiedad paths será eliminada por completo. La vinculación de proyectos será responsabilidad exclusiva de PNPM Workspaces.
Configurar tsconfig.base.json para Referencias:
Se asegurará que compilerOptions.composite y compilerOptions.declaration estén establecidos en true. Esto habilita el modo de orquestación de builds de TypeScript.
Gestionar references en los tsconfig.json:
Raíz (tsconfig.json): Este archivo contendrá referencias a todos los proyectos del monorepo. Su única función es proporcionar inteligencia al editor de código (VSCode).
Proyectos (features/auth/tsconfig.json, etc.): Cada tsconfig.json de proyecto contendrá referencias únicamente a sus dependencias directas.
Automatización con nx sync: Confiaremos plenamente en Nx para gestionar estas referencias. El comando nx sync se ejecutará para actualizar automáticamente los tsconfig.json de los proyectos basándose en el grafo de dependencias real, eliminando la carga de mantenimiento manual.
3. Estrategia de Documentación con TSDoc
En línea con nuestro pilar de "Documentación Completa", TSDoc no es opcional. Es el contrato que define la API pública de cada módulo.
Por qué (La Justificación):
Autocompletado Inteligente: Una documentación TSDoc correcta enriquece la experiencia de desarrollo, mostrando descripciones, parámetros y ejemplos directamente en el editor.
API Clara: Obliga a los desarrolladores a pensar en la interfaz pública de sus módulos, promoviendo un diseño de API más limpio y con una responsabilidad única.
Mantenibilidad a Largo Plazo: Facilita la incorporación de nuevos miembros al equipo y reduce el tiempo necesario para entender el propósito de una función o componente.
Cómo (Las Reglas):
Encabezado de Archivo: Todo archivo .ts o .tsx debe comenzar con un bloque de TSDoc que defina su propósito, versión y autor, como ya se hace en shared/logging.
Miembros Exportados: Toda función, clase, tipo o constante exportada (export) debe tener un bloque TSDoc.
Uso de Tags Estándar:
@description: Descripción clara y concisa.
@param: Descripción de cada parámetro de función.
@returns: Descripción del valor de retorno.
@example: Un bloque de código mostrando un uso típico.
4. Estrategia de Testing con Jest y Nx
Los tests son la garantía de que nuestras "islas" modulares funcionan como se espera y de que los cambios en una no rompen otra de forma inesperada.
Por qué (La Justificación):
Confianza en la Refactorización: Un conjunto sólido de pruebas nos permite refactorizar y mejorar el código con la seguridad de que no estamos introduciendo regresiones.
Eficiencia con nx affected: La integración de Jest con Nx nos permite ejecutar pruebas únicamente en los proyectos afectados por un cambio de código, manteniendo nuestros pipelines de CI extremadamente rápidos.
Validación de Contratos: Las pruebas unitarias son la forma más eficaz de validar que el contrato (la API pública) de un módulo se cumple.
Cómo (El Enfoque):
Ubicación: Los archivos de prueba (.spec.ts, .test.ts) residirán junto al código fuente que prueban.
Enfoque en la API Pública: Las pruebas deben centrarse en probar el comportamiento de las funciones y componentes exportados, tratando los detalles de implementación interna como una caja negra siempre que sea posible.
Comandos Soberanos:
Para probar un proyecto específico: pnpm nx test <nombre-proyecto>.
Para probar solo lo afectado en una rama: pnpm nx affected:test. Este será el comando por defecto en los Pull Requests.
Cobertura de Código: Se establecerá un umbral mínimo de cobertura de código para garantizar una calidad consistente, que será verificado en el pipeline de CI.

---

Guía Técnica de Migración y Configuración Soberana
El objetivo de esta migración es abandonar el obsoleto sistema de paths de TypeScript y adoptar el enfoque moderno que nos brinda un rendimiento y uso de memoria órdenes de magnitud superior.
1. tsconfig.base.json (El Cerebro del Monorepo)
Este es el cambio más fundamental. Pasamos de un archivo que define rutas a uno que establece las reglas para la compilación compuesta.
Estado Actual (Incorrecto):
code
JSON
{
  "compilerOptions": {
    // ... otras opciones
    "paths": {
      "@razvolution/features/auth": ["features/auth/src/index.ts"],
      "@razvolution/shared/data-access": ["shared/data-access/src/index.ts"],
      // ... etc
    }
  }
}
Configuración Soberana (Correcta):
code
JSON
{
  "compilerOptions": {
    // --- [1] ELIMINAR 'paths' POR COMPLETO ---
    // La resolución de módulos ahora es responsabilidad de PNPM Workspaces.
    // 'baseUrl' también debe ser eliminado si existe.

    // --- [2] HABILITAR EL MODO 'COMPOSITE' ---
    "composite": true, // Activa el motor de Referencias de Proyecto.
    "declaration": true, // Requerido por 'composite'. Genera archivos .d.ts.
    "declarationMap": true, // Mejora la experiencia de debugging en el editor.

    // --- [3] OTRAS OPCIONES BASE ---
    "target": "es2022",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "strict": true,
    "skipLibCheck": true,
    "emitDeclarationOnly": true // Nx maneja la transpilación real.
    // ... etc
  }
}```
**Justificación:**
*   **Eliminación de `paths`**: Desacoplamos TypeScript de la responsabilidad de encontrar los módulos. Ahora, PNPM crea enlaces simbólicos en `node_modules`, y la resolución de `import` se vuelve un proceso nativo y estándar de Node.js.
*   **Adición de `composite: true`**: Este es el interruptor maestro que le dice a `tsc` que opere en "modo build" (`-b`). Le permite entender el grafo de `references`, cachear compilaciones en archivos `.tsbuildinfo` y reconstruir solo lo necesario.

---

#### 2. `package.json` de cada Proyecto (El Manifiesto de Dependencias)

Para que los Workspaces de PNPM funcionen, las dependencias entre proyectos locales deben ser explícitas.

**Estado Actual (Incompleto):**
Los `package.json` de las bibliotecas (`shared/ui`, `features/auth`) probablemente solo tienen dependencias externas.

**Configuración Soberana (Correcta):**
Si un proyecto (ej. `features/auth`) depende de otro (ej. `shared/ui`), su `package.json` debe declararlo.

**Ejemplo: `features/auth/package.json`**```json
{
  "name": "@razvolution/features/auth", // El nombre debe coincidir con el import path
  "version": "0.0.1",
  "dependencies": {
    // Dependencias externas como 'react'
  },
  "devDependencies": {
    // --- [1] DECLARAR DEPENDENCIAS INTERNAS ---
    "@razvolution/shared/ui": "*",
    "@razvolution/shared/utils": "*"
  }
}
Justificación:
name: El nombre del paquete es el identificador que PNPM usará para crear el enlace simbólico en node_modules. Debe coincidir exactamente con cómo quieres importarlo.
devDependencies: Al declarar @razvolution/shared/ui como una dependencia, informamos al gestor de paquetes sobre la relación. Nx también utiliza esta información para construir su grafo de dependencias.
Versión "*": Esto es crucial. Le dice a PNPM: "No busques este paquete en el registro de npm; usa la versión que se encuentra localmente en este workspace".
3. tsconfig.json de cada Proyecto (El Conector de Dependencias)
Este archivo actúa como el mapa de carreteras para un proyecto específico, diciéndole a TypeScript a qué otros proyectos está conectado.
Configuración Soberana (Correcta):
Ejemplo: features/auth/tsconfig.json```json
{
"extends": "../../tsconfig.base.json",
"files": [], // Intencionalmente vacío para evitar que TS compile archivos no deseados.
"include": [],
"references": [
// --- [1] REFERENCIAS A DEPENDENCIAS DIRECTAS ---
// Esta lista es gestionada AUTOMÁTICAMENTE por 'nx sync'.
// Si 'auth' importa desde 'ui' y 'utils', Nx añadirá:
{ "path": "../../shared/ui" },
{ "path": "../../shared/utils" },
code
Code
// --- [2] REFERENCIAS A SUS PROPIOS ARCHIVOS DE CONFIG ---
{ "path": "./tsconfig.lib.json" },
{ "path": "./tsconfig.spec.json" }
]
}
code
Code
**Justificación:**
*   **`references`**: Este array es el corazón de las Referencias de Proyecto. Le dice a `tsc -b` que, antes de compilar `auth`, primero debe asegurarse de que `ui` y `utils` estén compilados y actualizados.
*   **Automatización de Nx**: Mantener estas rutas manualmente es un infierno. **Nx lo hace por ti**. Al ejecutar `nx build auth` o `nx sync`, Nx analiza tus `import` y el `package.json` para generar este array de `references` automáticamente.

---

#### 4. `tsconfig.lib.json` (El Archivo de Build de la Biblioteca)

Define qué archivos de código fuente deben incluirse en la compilación final de la biblioteca.

**Configuración Soberana (Correcta):**

**Ejemplo: `features/auth/tsconfig.lib.json`**
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    // Opciones específicas de la librería si son necesarias
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "jest.config.ts",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ],
  // --- [1] REFERENCIAS A LOS ARCHIVOS .lib DE LAS DEPENDENCIAS ---
  // También gestionado por 'nx sync'
  "references": [
    { "path": "../../shared/ui/tsconfig.lib.json" },
    { "path": "../../shared/utils/tsconfig.lib.json" }
  ]
}
Justificación:
references (aquí): Es una optimización sutil pero importante. Le indica a TypeScript que, para el build de la librería auth, debe basarse en el output de build de las librerías ui y utils (definido en sus respectivos tsconfig.lib.json), no en sus archivos de test u otras configuraciones.
5. jest.config.ts (Configuración de Pruebas)
La buena noticia es que la configuración de Jest proporcionada por Nx está diseñada para funcionar perfectamente en un entorno de workspace.
Configuración Soberana (Sin Cambios Requeridos):
Ejemplo: features/auth/jest.config.ts
code
TypeScript
export default {
  displayName: 'auth',
  preset: '../../jest.preset.js',
  // ... resto de la configuración por defecto de Nx
};
Justificación:
El preset de Jest de Nx (@nx/jest/preset) ya incluye la configuración necesaria (moduleNameMapper) para resolver correctamente los import paths como @razvolution/shared/ui durante la ejecución de las pruebas. Funciona "out-of-the-box" con la estructura de workspaces.
El verdadero beneficio aquí no es la configuración, sino la ejecución. Debemos adoptar pnpm nx affected:test en nuestro CI para ejecutar pruebas solo en los proyectos impactados por un cambio, aprovechando al máximo la inteligencia del grafo de Nx.

---

ACTUALIZACION
// RUTA: .docs/manifiesto-configuracion-soberana.md```markdown
Manifiesto de Configuración Soberana v2.0: TypeScript, Nx y Testing
1. Propósito
Este manifiesto establece la estrategia de configuración única y soberana para el ecosistema razvolution. Su propósito es alinear nuestro desarrollo con las prácticas más modernas y performantes que ofrecen TypeScript y Nx, garantizando un monorepo rápido, eficiente y resiliente.
2. Estrategia de TypeScript: Herencia Radical sobre Anulación
Nuestra arquitectura se basa en un principio inmutable: el tsconfig.base.json es la Única Fuente de Verdad (SSoT) para las opciones del compilador. Las configuraciones de las bibliotecas (tsconfig.json, tsconfig.lib.json, tsconfig.spec.json) deben heredar estas opciones y no anularlas, salvo en casos excepcionales y justificados (como el module para Jest).
2.1. El Cerebro del Monorepo: tsconfig.base.json
Este archivo es la SSoT. Define la configuración de compilación para todo el workspace.
"module": "nodenext" y "moduleResolution": "nodenext": Son inmutables. Todo el código fuente del proyecto se escribirá y compilará como módulos ES nativos.
"composite": true": Es el interruptor maestro que activa las Referencias de Proyecto. Permite a TypeScript entender el grafo de dependencias y compilar de forma incremental.
"paths": Define los alias de importación (@razvolution/...). Nx gestiona la resolución de estos alias en tiempo de ejecución y compilación.
2.2. El Conector de Biblioteca: [biblioteca]/tsconfig.json
Este archivo actúa como el "conector" de una biblioteca al grafo de dependencias del monorepo.
"extends": Siempre debe heredar de ../../tsconfig.base.json.
"composite": true": Declara que esta biblioteca es una pieza componible del proyecto, permitiendo que otras bibliotecas hagan referencia a ella.
"references": Este array es la clave. Define las dependencias directas de esta biblioteca con otras del monorepo. Nx gestiona esta sección automáticamente al ejecutar nx sync o cualquier tarea de build.
2.3. La Receta de Build: [biblioteca]/tsconfig.lib.json
Este archivo tiene una única responsabilidad: decirle a tsc qué archivos de código fuente (src) incluir en la compilación de la biblioteca.
"extends": Hereda de su tsconfig.json local.
"compilerOptions": Debe estar casi vacío. No debe contener module, moduleResolution, target ni otras opciones ya definidas en la base. Su única función es definir "outDir" si Nx no lo infiere.
"include" y "exclude": Definen explícitamente que solo se compilarán los archivos de src, excluyendo los archivos de prueba.
2.4. El Entorno de Pruebas: [biblioteca]/tsconfig.spec.json
Este archivo configura TypeScript específicamente para el entorno de ejecución de Jest.
"extends": Hereda de su tsconfig.json local.
"compilerOptions.module": "commonjs": Esta es la única anulación permitida y justificada. Jest tradicionalmente funciona mejor con módulos CommonJS.
"include": Incluye tanto los archivos de código fuente (src) como los de prueba (*.spec.ts, *.test.ts) para que Jest pueda compilarlos juntos.
Con esta arquitectura, eliminamos la ambigüedad y los conflictos. Cada archivo tiene una única responsabilidad, y la herencia asegura la consistencia en todo el ecosistema.
code
Code
#### Aparato 2/5: La Base Soberana (`tsconfig.base.json`) - REFORZADO

// RUTA: tsconfig.base.json
```json
{
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "composite": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2022",
    "lib": ["es2022", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@razvolution/features-auth": ["features/auth/src/index.ts"],
      "@razvolution/shared/data-access": ["shared/data-access/src/index.ts"],
      "@razvolution/shared-logging": ["shared/logging/src/index.ts"],
      "@razvolution/shared-observability": [
        "shared/observability/src/index.ts"
      ],
      "@razvolution/shared-supabase": ["shared/supabase/src/index.ts"],
      "@razvolution/shared-ui": ["shared/ui/src/index.ts"],
      "@razvolution/shared-utils": ["shared/utils/src/index.ts"]
    },
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "exclude": ["node_modules", "tmp"]
}
Aparato 3/5: Plantilla para [biblioteca]/tsconfig.json (El Conector)
// PLANTILLA: [biblioteca]/tsconfig.json
code
JSON
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
    // Las referencias a otras bibliotecas son gestionadas por 'nx sync'
  ]
}
Aparato 4/5: Plantilla para [biblioteca]/tsconfig.lib.json (La Receta de Build)
// PLANTILLA: [biblioteca]/tsconfig.lib.json
code
JSON
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "declaration": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "jest.config.ts",
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.tsx"
  ]
}
Aparato 5/5: Plantilla para [biblioteca]/tsconfig.spec.json (El Entorno de Pruebas)
// PLANTILLA: [biblioteca]/tsconfig.spec.json
code
JSON
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": [
    "jest.config.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.ts",
    "src/**/*.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx"
  ]
}
Ahora, con este manifiesto y estas plantillas soberanas, estamos listos para supervisar y nivelar cada biblioteca individualmente, eliminando el ruido y asegurando que cada tsconfig esté configurado correctamente para su caso de uso específico. Este es el camino para restaurar la integridad del ecosistema.

---


