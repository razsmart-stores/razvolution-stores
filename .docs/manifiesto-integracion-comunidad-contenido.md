Manifiesto de Comunidad y Contenido: El Ecosistema de Engagement
Atributo Valor
Visión Construir una plataforma de contenido propia y fomentar una comunidad activa alrededor de la marca.
Pila Tecnológica CMS Propio (basado en data-access), React-Markdown, APIs Sociales, Proveedor de Email (ej. Resend)
Principios Clave Propiedad del Contenido, Experiencia de Usuario Unificada, Feedback como Dato

1.  Visión y Propósito Soberano
    Más allá de una simple tienda, razvolution será una plataforma de conocimiento y comunidad. El propósito de este ecosistema es doble:
    Establecer Autoridad (Contenido Propio): Construiremos y seremos dueños de nuestra plataforma de contenido (blog y newsletters). Esto nos da control total sobre el SEO, la experiencia de usuario y la monetización de nuestro contenido, a diferencia de depender de plataformas de terceros como Medium.
    Fomentar el Engagement (Comunidad): Crearemos canales para que los usuarios proporcionen feedback, interactúen entre ellos (comentarios) y compartan nuestro contenido y productos en sus redes, convirtiéndolos en embajadores de la marca.
    La arquitectura debe ser intuitiva para los creadores de contenido y transparente para los usuarios.
2.  Principios Arquitectónicos Inmutables
    Propiedad del Contenido: La base de datos de Supabase será la SSoT para todo el contenido del blog y los suscriptores de la newsletter. Utilizaremos un esquema de "bloques" flexibles (similar a Notion o Strapi) para permitir una creación de contenido rica y personalizable.
    Experiencia de Usuario Unificada: La lectura de un artículo del blog, la suscripción a la newsletter y la visualización de comentarios deben sentirse como una parte integral de la tienda, no como un sistema desconectado. Compartirán la misma UI (shared/ui) y autenticación (features/auth).
    Feedback como Dato Estructurado: Los comentarios y el feedback no serán solo texto. Se almacenarán como datos estructurados, vinculados a un usuario y a un producto/artículo, permitiéndonos realizar análisis futuros sobre el sentimiento del cliente.
    Abstracción de Servicios Externos: Las interacciones con APIs externas (redes sociales para compartir, Resend para enviar emails) serán encapsuladas en sus respectivas fachadas dentro de data-access, siguiendo el mismo patrón que usamos para Shopify y Stripe.
3.  Nuevos y Actualizados Dominios Arquitectónicos
    Dominio Propósito Soberano Responsabilidades Clave
    shared/content-contracts (Nuevo) La SSoT de Datos de Contenido. Definirá con Zod la estructura de un ArticuloDeBlog, un BloqueDeContenido (ej. párrafo, imagen, video), un Comentario y una SuscripcionNewsletter.
    data-access (sub-dominio content) El CMS Headless (Backend). Contendrá las Server Actions para la gestión de contenido: getPublishedArticlesAction, getArticleBySlugAction, createCommentAction, subscribeToNewsletterAction.
    data-access (sub-dominio social) La Fachada Social. Encapsulará la lógica para interactuar con APIs de terceros. Por ejemplo, sendNewsletterAction (usando un adaptador para Resend).
    features/blog (Nuevo) La Cara del Blog (Frontend). Contendrá los componentes "inteligentes" para listar artículos, renderizar un artículo completo (usando react-markdown) y mostrar el árbol de comentarios.
    features/community (Nuevo) La Cara de la Comunidad. Contendrá componentes de UI para: el formulario de comentarios, el formulario de suscripción a la newsletter y los botones para compartir en redes sociales.
4.  Flujo de Datos Holístico: Publicación y Lectura de un Artículo
    Este diagrama ilustra la separación de responsabilidades entre la creación de contenido (que se haría a través de un futuro panel de administración o directamente en Supabase) y su consumo en el storefront.
    code
    Mermaid
    graph TD
    subgraph "Flujo de Creación (Admin)"
    direction LR
    AdminPanel["Panel de Admin (Futuro)"] -- "1. Llama a createOrUpdateArticleAction" --> CmsActions["data-access/content"]
    CmsActions -- "2. Valida con Zod (content-contracts)" --> ZodContracts["shared/content-contracts"]
    CmsActions -- "3. Guarda en la Base de Datos" --> SupabaseDB["Supabase (Tabla 'articles')"]
    end

        subgraph "Flujo de Lectura (Usuario)"
            direction LR
            User["Usuario"] -- "4. Visita /blog/[slug]" --> BlogPage["features/blog/ArticlePage"]
            BlogPage -- "5. Invoca getArticleBySlugAction" --> CmsActions
            CmsActions -- "6. Lee desde la Base de Datos" --> SupabaseDB
            SupabaseDB -- "7. Devuelve datos del artículo" --> CmsActions
            CmsActions -- "8. Devuelve datos a la página" --> BlogPage
            BlogPage -- "9. Renderiza el contenido (Markdown a HTML)" --> User
        end

5.  Hoja de Ruta de Implementación
    FASE 1: Fundación del Contenido:
    Crear la biblioteca shared/content-contracts y definir los esquemas básicos para Article y Comment.
    Crear las tablas correspondientes en Supabase.
    Implementar las Server Actions de solo lectura en data-access: getPublishedArticlesAction y getArticleBySlugAction.
    FASE 2: El Blog (Lectura):
    Crear la biblioteca features/blog.
    Construir la página de listado de artículos (/blog) y la página de detalle del artículo (/blog/[slug]), utilizando react-markdown para renderizar el contenido.
    FASE 3: Primer Pilar de Comunidad (Comentarios):
    Implementar la Server Action createCommentAction.
    Crear el componente CommentForm en features/community.
    Integrar el formulario y la visualización de comentarios en la página del artículo. El usuario debe estar autenticado para comentar.
    FASE 4: Segundo Pilar (Newsletters):
    Configurar un proveedor de email (ej. Resend).
    Crear la fachada y la Server Action subscribeToNewsletterAction.
    Crear el componente NewsletterForm en features/community e integrarlo en el footer y en el blog.
    FASE 5: Engagement Social:
    Crear un componente SocialShareButtons en features/community que utilice una biblioteca como react-share para facilitar que los usuarios compartan artículos y productos.

---
