Manifiesto de Integración de Inventario: Shopify como Backend Soberano
Atributo Valor
Visión Utilizar Shopify como un Headless CMS para toda la gestión de productos e inventario.
Pila Tecnológica Shopify Storefront API (GraphQL), Shopify Admin API (GraphQL/REST), Webhooks
Principios Clave SSoT Externa, Sincronización por Webhooks, Fachada de API Interna

1.  Visión y Propósito Soberano
    La gestión de productos, inventario, precios y colecciones es una tarea compleja. En lugar de construir nuestro propio sistema de administración desde cero, designamos a Shopify como la Única Fuente de Verdad (SSoT) Externa para todos los datos del catálogo.
    Nuestra aplicación razvolution actuará como un storefront (escaparate) "headless", completamente desacoplado del tema y de la tienda online de Shopify. Nos comunicaremos con Shopify a través de sus APIs para:
    Leer Datos de Productos: Obtener productos, colecciones, variantes, precios e imágenes para mostrarlos en nuestra tienda Next.js.
    Gestionar el Carrito: Crear y actualizar carritos de compra.
    Finalizar la Compra: Iniciar y completar el proceso de checkout.
    Recibir Actualizaciones: Reaccionar en tiempo real a cambios en el inventario o en los productos a través de webhooks.
    Esta arquitectura nos da lo mejor de ambos mundos: la potencia y fiabilidad del panel de administración de Shopify y la flexibilidad y rendimiento de un frontend personalizado con Next.js.
2.  Principios Arquitectónicos Inmutables
    SSoT Externa: El panel de Shopify es el único lugar donde se crean, actualizan y gestionan los productos, el inventario y los precios. Nuestra aplicación es de solo lectura en lo que respecta al catálogo.
    Sincronización Reactiva (Webhooks): La consistencia de los datos entre Shopify y nuestra aplicación se mantendrá a través de webhooks. Por ejemplo, cuando el stock de un producto cambia en Shopify, se dispara un webhook que notifica a nuestra aplicación. Esto es crucial para evitar vender productos sin stock.
    Fachada de API Interna: Nuestra lógica de features (UI) nunca llamará directamente a la API de Shopify. Crearemos una capa de abstracción (una "fachada") dentro de nuestro dominio data-access que encapsulará todas las interacciones con Shopify. Esto nos aísla de la complejidad de su API GraphQL y nos permitiría cambiar de proveedor de e-commerce en el futuro con un impacto controlado.
    Checkout Delegado (Inicialmente): Para una máxima seguridad y simplicidad inicial, delegaremos el proceso de checkout a la página de pago segura y optimizada de Shopify. Nuestra aplicación se encargará de llevar al usuario hasta ese punto.
3.  Nuevos y Actualizados Dominios Arquitectónicos
    Dominio Propósito Soberano Responsabilidades Clave
    shared/commerce-contracts La SSoT de Datos de Comercio. (Ya definido) Se expandirá para incluir esquemas de Zod que validen los datos de productos y colecciones que recibimos de la API de Shopify.
    shared/shopify (Nuevo) La Fachada de API de Shopify. Contendrá un cliente GraphQL configurado y funciones específicas para interactuar con las APIs de Shopify (Storefront y Admin). Ej: getProductByHandle, createCart, getCheckoutUrl.
    data-access (sub-dominio commerce) El Orquestador de Negocio. Contendrá las Server Actions (getProductsAction, addToCartAction) que utilizan la fachada de shared/shopify para ejecutar la lógica de negocio.
    features/product y features/cart (Nuevos) La Cara del Catálogo y el Carrito. Bibliotecas de features que contendrán los componentes "inteligentes" para listar productos, ver detalles de un producto y gestionar el carrito de compras.
    apps/store El Punto de Entrada de Webhooks. Contendrá las rutas de API (/api/webhooks/shopify) que recibirán y procesarán las notificaciones de Shopify, invocando Server Actions para actualizar el estado de nuestra aplicación.
4.  Flujo de Datos Holístico: Sincronización de Stock
    Este diagrama muestra el flujo reactivo cuando el stock de un producto se actualiza.
    code
    Mermaid
    sequenceDiagram
    participant Admin as Admin de la Tienda
    participant Shopify
    participant WebhookHandler as /api/webhooks/shopify (apps/store)
    participant UpdateAction as updateStockAction (data-access)
    participant Cache as Caché de Next.js (Revalidación)

        Admin->>Shopify: Actualiza el stock de un producto de 10 a 0.
        Shopify->>WebhookHandler: Envía un webhook 'inventory_level/update'

        WebhookHandler->>WebhookHandler: Valida la firma del webhook (seguridad)
        WebhookHandler->>UpdateAction: Invoca la Server Action con los datos del producto

        UpdateAction->>Cache: Revalida los datos asociados al producto (ej. `revalidateTag('products')`)

        Note right of Cache: La próxima vez que un usuario<br/>visite la página del producto,<br/>Next.js obtendrá los datos actualizados<br/>(stock: 0) directamente de Shopify.

5.  Hoja de Ruta de Implementación
    FASE 1: Configuración y Conexión:
    Configurar una tienda de desarrollo en Shopify.
    Crear una aplicación privada para obtener las credenciales de la API (Storefront y Admin).
    Crear la biblioteca shared/shopify y establecer un cliente GraphQL funcional que pueda realizar una consulta básica (ej. getShopName).
    FASE 2: Lectura del Catálogo:
    Implementar las funciones en shared/shopify para obtener productos y colecciones.
    Crear las Server Actions correspondientes en data-access.
    Crear la biblioteca features/product y los componentes para listar productos en la página de inicio y ver una página de detalle de producto.
    FASE 3: Gestión del Carrito y Checkout:
    Implementar las mutaciones de GraphQL en shared/shopify para crear un carrito, añadir/quitar artículos y obtener la URL del checkout.
    Crear la biblioteca features/cart con la UI para el carrito.
    FASE 4: Sincronización por Webhooks:
    Configurar los webhooks en Shopify para eventos clave (products/update, inventory_levels/update).
    Implementar los endpoints de API en apps/store para recibir y procesar estos webhooks, implementando la lógica de revalidación de caché de Next.js.

---
