Manifiesto de Integración Logística y Pagos (LATAM)
Atributo	Valor
Visión	Integrar proveedores líderes de LATAM (Mercado Pago, Correios) dentro de una arquitectura de abstracción agnóstica.
Pila Tecnológica	Mercado Pago SDK (Backend/Frontend), API de Correios (SOAP/REST), Webhooks.
Principios Clave	Capas de Abstracción (PAL/SAL), Flujos Estandarizados, Experiencia de Checkout Nativa.
1. Visión y Propósito Soberano
Para conquistar el mercado brasileño y sentar las bases para la expansión en LATAM, razvolution debe integrarse de forma nativa con los líderes del ecosistema local. Este manifiesto detalla la estrategia para incorporar:
Mercado Pago: Como un proveedor de pagos de primer nivel, soportando no solo tarjetas de crédito a través de su Checkout Transparente (API), sino también métodos de pago locales esenciales como PIX.
Correios de Brasil: Como nuestro primer proveedor logístico, para el cálculo de costos de envío (frete) en tiempo real y el seguimiento de paquetes (rastreamento).
La integración se realizará a través de capas de abstracción para evitar el acoplamiento directo y mantener nuestra soberanía arquitectónica.
2. Principios Arquitectónicos Inmutables
Doble Abstracción (PAL y SAL): No tendremos una, sino dos capas de abstracción:
PAL (Payment Abstraction Layer): Nuestra ya definida shared/payments acomodará a Mercado Pago como un nuevo "adaptador".
SAL (Shipping Abstraction Layer): Crearemos una nueva capa, shared/shipping, que definirá una interfaz genérica para operaciones logísticas (getRates, trackPackage) y contendrá un "adaptador" para Correios.
Checkout Nativo ("Transparente"): La experiencia de pago debe ser fluida y ocurrir dentro de nuestro storefront. Utilizaremos el Checkout Transparente de Mercado Pago, donde su SDK de frontend tokeniza de forma segura la información de la tarjeta en el navegador del cliente, y nuestro backend procesa el pago con ese token.
Cálculo de Envío en Tiempo Real: Durante el checkout, nuestra aplicación se comunicará con la SAL para consultar la API de Correios y presentar al usuario las opciones de envío (SEDEX, PAC) y sus costos, basados en su CEP (código postal).
Confirmación Asíncrona (Webhooks): La confirmación final de un pedido y la actualización de su estado a "Pagado" dependerán exclusivamente de los webhooks (IPN - Notificaciones de Pago Instantáneas) enviados por Mercado Pago a nuestro backend.
3. Nuevos y Actualizados Dominios Arquitectónicos
Dominio	Propósito Soberano	Responsabilidades Clave
shared/commerce-contracts	La SSoT de Datos de Comercio.	(Expandido) Definirá con Zod las estructuras para CotaDeEnvio y los payloads genéricos para la SAL.
shared/payments	La Capa de Abstracción de Pagos (PAL).	(Actualizado) Se añadirá un mercadopago.adapter.ts que implemente la interfaz de la PAL utilizando el SDK de Mercado Pago.
shared/shipping (Nuevo)	La Capa de Abstracción de Envíos (SAL).	Contendrá la interfaz genérica (shipping.ts) y el adaptador correios.adapter.ts para comunicarse con la API de Correios.
data-access (sub-dominio commerce)	El Orquestador de Negocio.	Las Server Actions (getCheckoutInfoAction, createOrderAction) orquestarán las llamadas a la PAL y a la SAL para construir la experiencia de checkout.
features/checkout	La Cara del Checkout (Frontend).	(Actualizado) Integrará el SDK de frontend de Mercado Pago (mercadopago-js) para el formulario de pago y mostrará las cotas de envío obtenidas de la SAL.
features/account	El Panel del Cliente.	(Nuevo/Actualizado) Contendrá una sección para que el usuario pueda rastrear sus pedidos, utilizando la SAL para consultar la API de Correios.
4. Flujo de Datos Holístico: Checkout Completo en Brasil
Este diagrama muestra el flujo completo, desde el cálculo del envío hasta la confirmación del pago.
code
Mermaid
sequenceDiagram
    participant User
    participant CheckoutPage as features/checkout
    participant DataAccess as data-access/commerce
    participant SAL as shared/shipping
    participant CorreiosAPI
    participant PAL as shared/payments
    participant MP_API as Mercado Pago API

    User->>CheckoutPage: Ingresa su CEP (código postal).
    CheckoutPage->>DataAccess: Llama a `getShippingRatesAction({ cep, items })`.
    DataAccess->>SAL: Llama a `shipping.getRates(...)`.
    SAL->>CorreiosAPI: Llama a la API `CalcularPrecoPrazo`.
    CorreiosAPI-->>SAL: Devuelve opciones (SEDEX, PAC) y precios.
    SAL-->>DataAccess: Devuelve cotas estandarizadas.
    DataAccess-->>CheckoutPage: Devuelve las cotas.
    CheckoutPage-->>User: Muestra las opciones de envío.

    User->>CheckoutPage: Selecciona envío, método de pago (Mercado Pago) y hace clic en "Pagar".
    CheckoutPage->>DataAccess: Invoca `createOrderAction({ cart, shippingChoice })`.
    DataAccess->>PAL: Llama a `payments.createPaymentIntent(...)`.
    PAL->>MP_API: Crea una intención de pago en Mercado Pago.
    MP_API-->>PAL: Devuelve un `preferenceId` o similar.
    PAL-->>DataAccess: Devuelve el `preferenceId`.
    DataAccess-->>CheckoutPage: Devuelve el `preferenceId`.

    CheckoutPage->>CheckoutPage: Usa `mercadopago-js` y el `preferenceId` para renderizar y procesar el pago en el frontend.

    %% Flujo Asíncrono de Confirmación %%
    MP_API->>WebhookHandler: Envía webhook de `payment.succeeded`.
    WebhookHandler->>PAL: Llama a `payments.handleWebhook(event)`.
    PAL->>DataAccess: Notifica para actualizar el estado del pedido a "Pagado" e iniciar el proceso de despacho.
5. Hoja de Ruta de Implementación
FASE 1: Fundación Logística (Correios):
Crear la biblioteca shared/shipping con la interfaz de la SAL y el adaptador para Correios.
Implementar la Server Action getShippingRatesAction y la lógica de UI en features/checkout para calcular y mostrar el costo del envío en tiempo real.
FASE 2: Integración de Pagos (Mercado Pago):
Añadir el mercadopago.adapter.ts a la shared/payments.
Integrar el SDK de frontend de Mercado Pago en features/checkout para el pago con tarjeta y PIX.
Modificar la createOrderAction para que se comunique con la PAL y devuelva las credenciales necesarias al frontend.
FASE 3: Webhooks y Confirmación:
Implementar el endpoint (/api/webhooks/mercadopago) para recibir notificaciones de Mercado Pago.
Crear la lógica en la PAL y data-access para manejar estos webhooks, actualizar el estado del pedido y notificar al cliente.
FASE 4: Post-Compra (Tracking):
Implementar la funcionalidad de trackPackage en el correios.adapter.ts.
Crear una Server Action para ello y construir la UI en features/account para que los usuarios puedan ver el estado de su envío con el código de rastreo.

---

