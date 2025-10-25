# Manifiesto: Protocolo de Nivelación de TypeScript Soberano

## 1. Propósito

Este protocolo establece las plantillas de configuración ("Aparatos Soberanos") y el proceso mandatorio para alinear cada biblioteca del ecosistema `razvolution` con la estrategia de "Herencia Radical" definida en el `manifiesto-configuracion-soberana.md`.

El objetivo es erradicar la deriva de configuración, eliminar la redundancia y asegurar que el `tsconfig.base.json` sea la Única Fuente de Verdad (SSoT) para las opciones del compilador.

## 2. Los 3 Aparatos Soberanos (Plantillas)

Cada biblioteca en el monorepo (`features/*`, `shared/*`) DEBE tener tres archivos `tsconfig` que se ajusten exacta y rigurosamente a estas plantillas. Cualquier desviación debe ser justificada y aprobada.

---

### Aparato 1/3: El Conector (`[biblioteca]/tsconfig.json`)

**Responsabilidad Única:** Conectar la biblioteca al grafo del monorepo y a sus propias configuraciones de build y test. **NO DEBE** contener `compilerOptions` que anulen la base, excepto `composite: true`.

```json
// PLANTILLA SOBERANA: [biblioteca]/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    // Declara que esta biblioteca es una pieza componible del monorepo.
    "composite": true
  },
  // Intencionalmente vacío. La compilación se gestiona vía 'references'.
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
    // NOTA: 'pnpm nx sync' añadirá aquí las referencias a otras bibliotecas
    // para la inteligencia del editor de código.
  ]
}
Aparato 2/3: La Receta de Build ([biblioteca]/tsconfig.lib.json)
Responsabilidad Única: Definir qué archivos de código fuente (src/) se incluyen en la compilación final y de qué otras bibliotecas depende para el build.
code
JSON
// PLANTILLA SOBERANA: [biblioteca]/tsconfig.lib.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    // La propiedad "outDir" es gestionada por el ejecutor de build de Nx.
    // No es necesario especificarla aquí.
    "declaration": true,
    "types": ["node"]
  },
  // Incluye únicamente el código fuente de producción.
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  // Excluye rigurosamente cualquier archivo que no sea de producción.
  "exclude": [
    "jest.config.ts",
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.tsx"
  ]
  // NOTA: 'pnpm nx sync' gestionará y añadirá el array 'references' a los
  // 'tsconfig.lib.json' de las dependencias directas.
}
Aparato 3/3: El Entorno de Pruebas ([biblioteca]/tsconfig.spec.json)
Responsabilidad Única: Configurar el entorno de TypeScript para que Jest pueda compilar y ejecutar las pruebas correctamente.
code
JSON
// PLANTILLA SOBERANA: [biblioteca]/tsconfig.spec.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    // La única anulación permitida y justificada. Jest funciona mejor con CommonJS.
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  // Incluye TODO: el código de prueba, el código fuente y los archivos de definición
  // para proporcionar a Jest el contexto de compilación completo.
  "include": [
    "jest.config.ts",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx"
  ]
}
3. El Proceso de Nivelación (Mandatorio)
Para nivelar una biblioteca, se deben seguir los siguientes pasos en orden estricto:
Aplicar Plantillas: Reemplazar el contenido de los tres archivos tsconfig.*.json de la biblioteca con las plantillas soberanas definidas anteriormente.
Sincronizar Grafo: Ejecutar el comando pnpm nx sync. Esto actualizará el array references en tsconfig.json y tsconfig.lib.json basándose en las importaciones de código existentes.
Validar Build: Ejecutar pnpm nx build <nombre-biblioteca>. El comando debe completarse sin errores. Esto confirma que la receta de build es correcta y el grafo de dependencias está bien formado.
Validar Pruebas: Ejecutar pnpm nx test <nombre-biblioteca>. El comando debe ejecutarse (independientemente de si las pruebas pasan o fallan). Esto confirma que el entorno de pruebas de Jest está correctamente configurado.
4. Orden de Batalla (Secuencia de Nivelación)
Para minimizar la fricción y resolver las dependencias de manera ordenada, la nivelación se realizará desde las bibliotecas base hacia las bibliotecas de características:
shared/utils
shared/supabase
shared/auth-contracts
shared/test-utils
shared/logging (depende de supabase, utils)
shared/ui
shared/data-access (depende de muchas shared)
features/auth (depende de muchas shared)

---


```
