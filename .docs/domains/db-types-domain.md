Manifiesto del Dominio de Tipos de Base de Datos (shared/db-types)
Atributo	Valor
Dominio	@razvolution/shared/db-types
Scope (Etiqueta Nx)	scope:shared
Tipo (Etiqueta Nx)	type:contract
Principios Clave	SSoT del Esquema, Generación Automatizada, Fundación Arquitectónica
1. Propósito y Alcance Soberano
El dominio db-types es la Única Fuente de Verdad (SSoT) para la estructura completa de la base de datos de Supabase. Su único propósito es proporcionar un conjunto de tipos de TypeScript que reflejen con absoluta fidelidad el esquema de la base de datos, incluyendo tablas, vistas, enumeraciones (enums) y funciones RPC.
Este dominio es el garante de la seguridad de tipos en todas las operaciones de datos, eliminando una clase entera de errores en tiempo de ejecución.
Alcance:
Contiene: Exclusivamente tipos de TypeScript. Estos tipos son generados automáticamente a partir de la introspección de la base de datos.
Prohíbe: Cualquier tipo de lógica, funciones, clientes o dependencias de otras bibliotecas del monorepo. Es la biblioteca más pura y fundacional del ecosistema.
2. El Contrato del Dominio (Principios Inmutables)
SSoT del Esquema: Si una estructura de datos existe en la base de datos, su tipo correspondiente DEBE residir aquí. No hay otra fuente de verdad.
Generación Automatizada: Los tipos en este dominio no se escriben manualmente. Son el artefacto resultante de ejecutar el comando soberano pnpm gen:types, que utiliza la CLI de Supabase para generar los tipos a partir de la base de datos activa.
Fundación Arquitectónica: Su existencia como una biblioteca sin dependencias es intencional y crítica. Permite que bibliotecas de alto nivel (data-access) y de bajo nivel (supabase) dependan de un contrato común sin crear una dependencia circular.
Atomicidad por Dominio de Datos: La estructura interna, que separa los tipos en archivos por dominio (auth.types.ts, logging.types.ts), es el patrón soberano para la escalabilidad. A medida que se añadan nuevas áreas de negocio (ej. commerce), se crearán nuevos archivos de dominio aquí.
3. Inventario de Aparatos Implementados
Archivo	Aparato(s)	Descripción Soberana
domains/auth.types.ts	Tipos de Dominio de Autenticación	Define los contratos para las tablas profiles, workspaces, workspace_members y las funciones RPC relacionadas con la autenticación y autorización.
domains/logging.types.ts	Tipos de Dominio de Logging	Define los contratos para las tablas heimdall_events y task_health_summary del Protocolo Heimdall.
database.types.ts	Motor de Tipos Genéricos	Ensambla los tipos de todos los dominios y proporciona los helpers genéricos (Tables<T>, Enums<T>, etc.) para consultar los tipos de forma segura.
index.ts	Fachada Pública	Exporta únicamente el motor de tipos genéricos, presentando una API unificada y simple a los consumidores.
💡 Decisión de Arquitectura:
La división en domains/ permite organizar los tipos de manera lógica y coherente con el resto de la arquitectura del monorepo, facilitando el mantenimiento y la comprensión del esquema de datos a medida que crece.
4. Hoja de Ruta y Evolución del Dominio
Sincronización Continua: Integrar la ejecución de pnpm gen:types en los flujos de CI/CD para detectar cualquier "deriva de esquema" (cambios en la base de datos no reflejados en los tipos) de forma temprana.
Expansión a Nuevos Dominios: A medida que se desarrolle la funcionalidad de e-commerce, se creará un nuevo archivo domains/commerce.types.ts para albergar los tipos de products, orders, customers, etc.
5. Integración Arquitectónica y Dependencias
db-types es una biblioteca fundacional sin dependencias internas. Es consumida por cualquier parte del sistema que necesite interactuar con la base de datos de forma segura.
code
Mermaid
graph TD
    subgraph Leyenda
        direction LR
        A[Biblioteca Base]
        B[Biblioteca Consumidora]
    end

    subgraph Grafo de Dependencias
        direction LR
        supabase["shared/supabase"] -- Consume --> db_types
        logging["shared/logging"] -- Consume --> db_types
        data_access["shared/data-access"] -- Consume --> db_types
        auth_feature["features/auth"] -- Consume --> db_types
        db_types["<b>shared/db-types</b>"]
    end

    classDef base fill:#1e3a8a,stroke:#fff,stroke-width:2px,color:#fff;
    class db_types base;

    ---

    
