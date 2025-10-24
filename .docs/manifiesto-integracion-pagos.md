Manifiesto de Integración de Pagos: La Capa de Abstracción Soberana
Atributo	Valor
Visión	Una arquitectura de pagos agnóstica al proveedor y resiliente.
Principio Clave	Abstracción del Proveedor, Flujos Estandarizados, Seguridad de Datos
1. Visión y Propósito Soberano
La integración de pagos en razvolution no será un acoplamiento directo a un único proveedor como Stripe. En su lugar, construiremos una Capa de Abstracción de Pagos (PAL). El propósito de esta capa es crear una interfaz interna unificada para todas las operaciones de pago, independientemente del proveedor que las ejecute por debajo.
Esta arquitectura nos dará la soberanía para:
Integrar Múltiples Proveedores: Soportar Stripe para tarjetas de crédito, conectar con bancos a través de APIs de Open Banking y aceptar métodos de pago locales como PIX en Brasil, todo de forma simultánea.
Minimizar el Acoplamiento: La lógica de negocio principal (ej. "crear un pedido") no sabrá si el pago se está procesando con Stripe o PIX. Solo interactuará con nuestra PAL.
Facilitar la Migración: Si en el futuro decidimos cambiar de proveedor principal, solo necesitaremos implementar un nuevo "adaptador" dentro de la PAL, sin tener que refactorizar toda la lógica de la aplicación.
Centralizar la Seguridad: Toda la lógica sensible relacionada con la comunicación con los proveedores de pago estará confinada a un único dominio.
2. Principios Arquitectónicos Inmutables
Abstracción del Proveedor: La lógica de negocio nunca debe llamar directamente a un SDK de un proveedor (ej. stripe.charges.create). Siempre debe llamar a una función genérica de nuestra PAL (ej. payments.createCharge).
Flujos Estandarizados: Definiremos un conjunto de operaciones de pago estándar que nuestra PAL soportará. Todos los proveedores deberán adaptarse a esta interfaz. Las operaciones típicas serán:
createPaymentIntent: Iniciar una transacción de pago.
handleWebhook: Procesar notificaciones asíncronas del proveedor (pago exitoso, fallido, etc.).
refundPayment: Gestionar reembolsos.
Seguridad de Datos y Cero Confianza: Nuestra base de datos nunca almacenará información de pago sensible (números de tarjeta, CVVs). Solo almacenaremos identificadores de transacción y el estado del pago. Toda la lógica que maneja claves de API secretas residirá exclusivamente en el backend.
Idempotencia: Todas las operaciones de creación de pagos deben ser idempotentes para prevenir cargos duplicados en caso de reintentos de red.
3. Nuevos Dominios Arquitectónicos de Pagos
Para implementar la PAL, introduciremos nuevos dominios y reforzaremos los existentes:
Dominio	Propósito Soberano	Responsabilidades Clave
shared/commerce-contracts (Nuevo)	La SSoT de Datos de Comercio.	Definirá con Zod la estructura de un Pedido, un Carrito, y las cargas útiles para las operaciones de pago genéricas de nuestra PAL.
shared/payments (Nuevo)	La Capa de Abstracción de Pagos (PAL).	Contendrá la interfaz genérica (payments.ts) y los "adaptadores" específicos para cada proveedor (stripe.adapter.ts, pix.adapter.ts).
data-access (sub-dominio commerce)	El Orquestador de Negocio.	Contendrá las Server Actions (createOrderAction) que utilizan la PAL. Esta capa decide qué hacer (crear un pedido), mientras que la PAL se encarga de cómo se paga.
features/checkout (Nuevo)	La Cara del Checkout (Frontend).	Contendrá los componentes de React "inteligentes" para el flujo de pago. Utilizará los SDKs de frontend de los proveedores (ej. @stripe/react-stripe-js) para renderizar los elementos de UI (ej. el formulario de tarjeta de crédito).
4. Flujo de Datos Holístico: Creación de un Pedido con Stripe
Este diagrama muestra cómo los dominios colaboran para procesar un pago con tarjeta, demostrando la abstracción.
code
Mermaid
sequenceDiagram
    participant User
    participant CheckoutForm as CheckoutForm.tsx (features/checkout)
    participant CreateOrder as createOrderAction (data-access)
    participant PAL as payments.ts (shared/payments)
    participant StripeAdapter as stripe.adapter.ts
    participant StripeAPI as API de Stripe

    User->>CheckoutForm: Rellena datos y hace clic en "Pagar"
    CheckoutForm->>CreateOrder: Invoca Server Action con datos del carrito

    CreateOrder->>PAL: Llama a `payments.createPaymentIntent({ amount, currency })`
    PAL->>StripeAdapter: Delega la llamada al adaptador de Stripe
    StripeAdapter->>StripeAPI: `stripe.paymentIntents.create(...)`
    StripeAPI-->>StripeAdapter: Devuelve un `client_secret`
    StripeAdapter-->>PAL: Devuelve el `client_secret`
    PAL-->>CreateOrder: Devuelve el `client_secret`
    CreateOrder-->>CheckoutForm: Devuelve `ActionResult` con el `client_secret`

    CheckoutForm->>CheckoutForm: Usa el `client_secret` para confirmar el pago en el frontend con el SDK de Stripe.js

    %% Manejo del Webhook para confirmar el pedido %%
    StripeAPI->>WebhookHandler: Envía evento `payment_intent.succeeded`
    WebhookHandler->>PAL: Llama a `payments.handleWebhook(event)`
    PAL->>StripeAdapter: Delega el manejo del evento al adaptador
    StripeAdapter->>CreateOrder: Notifica a la lógica de negocio para que finalice el pedido (actualizar estado, enviar email, etc.)
💡 Decisión de Arquitectura:
El handleWebhook es crucial. La confirmación final de un pedido nunca debe depender de una redirección del cliente, sino de una comunicación segura servidor-a-servidor a través de webhooks.
5. Hoja de Ruta de Implementación
FASE 1: Contratos y Fundación:
Crear la biblioteca shared/commerce-contracts y definir los esquemas para Cart y Order.
Crear la biblioteca shared/payments con la interfaz inicial (payments.ts).
FASE 2: Primer Proveedor (Stripe):
Implementar stripe.adapter.ts dentro de shared/payments.
Crear la Server Action createOrderAction en data-access que utilice la PAL.
Crear la biblioteca features/checkout con los componentes de React para el flujo de pago de Stripe.
FASE 3: Segundo Proveedor (PIX):
Implementar pix.adapter.ts dentro de shared/payments.
Actualizar la UI en features/checkout para ofrecer PIX como opción de pago.
Verificación Clave: Confirmar que no se necesita ningún cambio en data-access, demostrando el poder de la abstracción.

---

