Manifiesto del Dominio de Contratos de Workspace (shared/workspace-contracts)
Atributo Valor
Dominio @razvolution/shared/workspace-contracts
Scope (Etiqueta Nx) scope:shared
Tipo (Etiqueta Nx) type:contract
Principios Clave Contrato Único (SSoT), Portabilidad Universal, Extensión de db-types

1.  Propósito y Alcance Soberano
    El dominio workspace-contracts es la futura Única Fuente de Verdad (SSoT) notariada para la estructura y validación de todos los datos relacionados con la gestión de workspaces, miembros e invitaciones. Su propósito es definir contratos inmutables, utilizando Zod, que serán compartidos entre la UI y las Server Actions.
    Este dominio actuará como una capa de validación de negocio sobre los tipos de base de datos puros.
    Alcance:
    Contiene: Exclusivamente esquemas de Zod y los tipos de TypeScript inferidos para operaciones como "Crear Workspace", "Invitar Miembro", "Actualizar Rol de Miembro", etc.
    Prohíbe: Cualquier lógica de negocio, efectos secundarios o dependencias que no sean zod y @razvolution/shared/db-types.
2.  El Contrato del Dominio (Principios Inmutables)
    Contrato Único (SSoT): Si un formulario o una Server Action necesita validar datos relacionados con un workspace, su esquema DEBE residir aquí.
    Extensión de db-types: Los esquemas aquí definidos a menudo se basarán y refinarán los tipos provenientes de @razvolution/shared/db-types. Por ejemplo, mientras que el tipo de la base de datos puede permitir un role como un string genérico, el esquema de Zod aquí lo restringirá a un enumerado específico ('admin' | 'member' | 'billing').
    Portabilidad Universal: Los esquemas serán agnósticos al entorno, diseñados para ser utilizados sin cambios en el cliente ("use client") y el servidor ("use server").
3.  Inventario de Aparatos Implementados (Estado de Marcador de Posición)
    Actualmente, la biblioteca workspace-contracts es un marcador de posición arquitectónico. Su estructura está definida, pero no contiene esquemas implementados. Su existencia demuestra una previsión para la escalabilidad y la separación de dominios.
    💡 Decisión de Arquitectura:
    Separar workspace-contracts de auth-contracts es una decisión deliberada. Aunque ambos se relacionan con usuarios, "autenticación" (quién eres) y "gestión de workspaces" (qué puedes hacer y dónde) son dominios de negocio distintos. Esta separación mantiene las bibliotecas atómicas y con una única responsabilidad.
4.  Hoja de Ruta y Evolución del Dominio
    La implementación de esta biblioteca es una prioridad para habilitar las funcionalidades de equipo y multi-tenencia.
    Esquema de Creación de Workspace:
    Propósito: Validar el formulario de creación de un nuevo workspace.
    Campos: name: z.string().min(3)
    Esquema de Invitación de Miembro:
    Propósito: Validar el formulario para invitar a un nuevo usuario.
    Campos: email: z.string().email(), role: z.enum(['admin', 'member'])
    Esquema de Aceptación de Invitación:
    Propósito: Validar los datos cuando un usuario acepta una invitación, potencialmente estableciendo su nombre.
    Campos: token: z.string(), fullName: z.string().optional()
5.  Integración Arquitectónica y Dependencias
    workspace-contracts será una biblioteca de contratos fundamental. Su única dependencia interna será shared/db-types. Será consumida por las capas de lógica de negocio y funcionalidad que gestionen los workspaces.
    code
    Mermaid
    graph TD
    subgraph Leyenda
    direction LR
    A[Biblioteca Base]
    B[Biblioteca Consumidora]
    end

        subgraph Grafo de Dependencias (Futuro)
            direction TD
            data_access["shared/data-access"] -- Consume --> workspace_contracts
            workspace_feature["features/workspace (futuro)"] -- Consume --> workspace_contracts

            workspace_contracts["<b>shared/workspace-contracts</b>"] -- Depende de --> db_types["shared/db-types"]
        end

        classDef base fill:#1e3a8a,stroke:#fff,stroke-width:2px,color:#fff;
        class workspace_contracts base;

        ---
