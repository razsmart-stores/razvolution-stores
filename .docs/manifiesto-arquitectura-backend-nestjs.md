Manifiesto de Arquitectura Backend: NestJS como Cerebro Soberano
Atributo	Valor
Visión	Centralizar toda la lógica de negocio en una API de NestJS robusta, modular y soberana.
Pila Tecnológica	NestJS, TypeScript, Inyección de Dependencias, GraphQL (opcional).
Principios Clave	API Soberana, Lógica Desacoplada del Frontend, Contratos de API Type-Safe.
1. Visión y Propósito Soberano
Rechazamos el modelo de un backend acoplado al framework de frontend. En su lugar, adoptamos una arquitectura de API Soberana. Toda la lógica de negocio, la orquestación de servicios, la gestión de datos y la comunicación con APIs de terceros residirán en una aplicación NestJS dedicada dentro de nuestro monorepo.
El propósito de esta arquitectura es triple:
Desacoplamiento Total: Nuestro storefront de Next.js (apps/store) se convierte en un consumidor puro de esta API. Su única responsabilidad es la presentación y la experiencia del usuario. Esto nos permite cambiar o añadir nuevos "frontends" (ej. una app móvil, un panel de admin) en el futuro sin reescribir una sola línea de lógica de negocio.
Escalabilidad Profesional: Aprovechamos la arquitectura de NestJS (Módulos, Inyección de Dependencias) para construir un backend mantenible, testeable y organizado por dominios de negocio claros (PaymentsModule, ProductsModule, AuthModule).
Expansión de Capacidades: Desbloqueamos funcionalidades que son complejas o poco naturales en un backend de Next.js, como WebSockets, tareas programadas (cron jobs), colas de procesamiento y microservicios.
2. La Nueva Arquitectura Holística
El ecosistema razvolution ahora tendrá dos aplicaciones principales:
apps/store (Next.js): El "Rostro". El storefront headless. Se enfoca en la UI, el renderizado del lado del servidor (SSR/SSG) y la experiencia del usuario. Ya no contiene Server Actions de negocio.
apps/api (NestJS): El "Cerebro". La API central que sirve toda la lógica de negocio. Es el único componente que tiene acceso directo a la base de datos y a las claves secretas de servicios externos.
El Rol Transformado de shared/data-access
El dominio shared/data-access sufre una transformación fundamental:
DEJA DE SER: Un contenedor de Server Actions.
SE CONVIERTE EN: Un SDK de cliente type-safe para nuestra propia API de NestJS.
Esta biblioteca generará automáticamente un cliente (usando herramientas como OpenAPI Generator o tRPC) que permitirá a nuestro frontend llamar a la API de NestJS con total seguridad de tipos, como si estuviera llamando a una función local.
3. Flujo de Datos Soberano: Del Click al Dato
code
Mermaid
graph TD
    subgraph "Dominio del Frontend (apps/store)"
        A["Componente React (features/checkout)"] --> B{shared/data-access (SDK del Cliente)}
    end

    B -- "1. Llamada Type-Safe: sdk.orders.create(...)" --> Network["🌐 Red (HTTP/GraphQL)"]

    subgraph "Dominio del Backend (apps/api - NestJS)"
        Network -- "2. Petición a /orders" --> C["OrdersController"]
        C -- "3. Invoca Servicio" --> D["OrdersService"]
        D -- "4. Usa DI para obtener PAL" --> E["PaymentService"]
        E -- "5. Usa la interfaz de PAL" --> F["shared/payments (PAL)"]
        F -- "6. Llama al adaptador específico" --> G["StripeAdapter"]
        G -- "7. Llama a la API de Stripe" --> H[("API Externa")]
    end
4. Hoja de Ruta de Implementación
FASE 1: Fundación del Cerebro:
Comando: pnpm nx g @nx/nest:app api.
Acción: Crear la aplicación apps/api de NestJS. Configurar su main.ts para que escuche en un puerto (ej. 3333) y establecer las variables de entorno.
FASE 2: El Primer Módulo (Autenticación):
Crear el AuthModule en la API de NestJS.
Migrar la lógica de las Server Actions de auth.actions.ts a un AuthService y exponerla a través de un AuthController.
Configurar Passport.js dentro de NestJS para una gestión de estrategias de autenticación robusta (JWT, local).
FASE 3: Creación del SDK y Reconexión del Frontend:
Configurar la generación automática del SDK en shared/data-access a partir de la especificación de la API de NestJS (ej. OpenAPI/Swagger).
Refactorizar los componentes en features/auth para que, en lugar de llamar a Server Actions, llamen a las funciones del nuevo SDK.
FASE 4: Migración Incremental de Dominios:
Repetir los pasos 2 y 3 para cada dominio de negocio:
Crear ProductsModule, OrdersModule, RewardsModule, etc., en NestJS.
Migrar la lógica de las Server Actions correspondientes.
Asegurar que el SDK en shared/data-access se actualice.
Refactorizar los componentes de features para consumir el SDK.
FASE 5: Eliminación de Server Actions:
Una vez que toda la lógica de negocio haya sido migrada a apps/api, la carpeta original shared/data-access (antes de su transformación a SDK) y el uso de Server Actions para negocio pueden ser eliminados por completo.

---


