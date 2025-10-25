Manifiesto de Gamificación: El Motor de Lealtad
Atributo Valor
Visión Un sistema unificado para recompensar la lealtad del cliente y la promoción de la marca.
Pila Tecnológica Lógica de Negocio en data-access, Funciones de Base de Datos (PostgreSQL), features de React para la UI.
Principios Clave Basado en Eventos, Reglas Configurables, Recompensas Flexibles, Transparencia para el Usuario.

1.  Visión y Propósito Soberano
    El objetivo no es simplemente dar "puntos por comprar". Es crear un motor de engagement que rastree y recompense una amplia gama de acciones valiosas del usuario, tanto transaccionales como sociales. Este sistema servirá a dos audiencias principales:
    Socios (Clientes Leales): Recompensar a los clientes por compras repetidas, dejar reseñas de productos y participar en la comunidad.
    Embajadores (Promotores): Recompensar a un grupo selecto de usuarios por generar ventas a través de enlaces de referidos, crear contenido en redes sociales y representar activamente la marca.
    La arquitectura debe ser modular, permitiéndonos empezar con un sistema simple de puntos y evolucionar hacia mecánicas más complejas como niveles, insignias (badges) y misiones.
2.  Principios Arquitectónicos Inmutables
    Arquitectura Basada en Eventos: El motor no se activará de forma ad-hoc. Reaccionará a eventos de negocio discretos que ocurren en todo el ecosistema (ej. pedido.completado, comentario.creado, referido.convertido). Esto lo mantiene desacoplado y escalable.
    Reglas Configurables: La lógica de "qué acción otorga cuántos puntos" no debe estar hardcodeada. Se almacenará en la base de datos en una tabla de reglas, permitiendo al equipo de negocio ajustar el programa de lealtad sin necesidad de desplegar nuevo código.
    Recompensas Flexibles: El sistema debe soportar diferentes tipos de recompensas, no solo puntos. Por ejemplo: cupones de descuento, acceso anticipado a productos, insignias digitales, o incluso comisiones monetarias para embajadores.
    Transparencia y Visibilidad para el Usuario: El usuario debe tener una sección clara en su perfil (/account/rewards) donde pueda ver su historial de puntos, su nivel actual, las recompensas disponibles y las próximas acciones que puede realizar para ganar más.
3.  Nuevos y Actualizados Dominios Arquitectónicos
    Dominio Propósito Soberano Responsabilidades Clave
    shared/rewards-contracts (Nuevo) La SSoT de Datos de Lealtad. Definirá con Zod la estructura de un EventoRecompensa, una ReglaDeLealtad, el HistorialDePuntos de un usuario y las RecompensasDisponibles.
    data-access (sub-dominio rewards) El Motor de Lealtad (Backend). Contendrá la lógica central: una Server Action principal, processRewardEventAction, que recibe un evento, busca la regla correspondiente, calcula los puntos/recompensas y actualiza el perfil del usuario.
    features/rewards (Nuevo) El Panel de Recompensas (Frontend). Contendrá los componentes de React "inteligentes" para la sección /account/rewards del usuario: visualización del balance de puntos, historial de transacciones, catálogo de recompensas canjeables, etc.
    Bases de Datos (Nuevas Tablas) El Ledger de Lealtad. Se crearán nuevas tablas en Supabase: rewards_rules (las reglas), rewards_ledger (historial inmutable de cada punto ganado/gastado), user_rewards_profile (balance actual de puntos del usuario).
    Funciones de Base de Datos (PostgreSQL) Procesador de Eventos (Alternativa). Para un rendimiento ultra alto, la lógica de processRewardEventAction podría implementarse como una función de PostgreSQL en Supabase, invocada a través de rpc().
4.  Flujo de Datos Holístico: Un Cliente Gana Puntos por una Reseña
    Este diagrama ilustra el flujo de eventos desacoplado. La acción de "crear comentario" no sabe nada sobre el sistema de recompensas; solo emite un evento.
    code
    Mermaid
    sequenceDiagram
    participant User
    participant CommentForm as features/community/CommentForm
    participant CreateComment as createCommentAction (data-access/content)
    participant RewardsEngine as processRewardEventAction (data-access/rewards)
    participant DB as Base de Datos (Supabase)

        User->>CommentForm: Escribe y envía una reseña de un producto.
        CommentForm->>CreateComment: Invoca Server Action con los datos del comentario.

        CreateComment->>DB: Guarda el comentario en la tabla `comments`.

        Note over CreateComment, RewardsEngine: El trabajo de `createCommentAction` ha terminado. Ahora, de forma asíncrona o en la misma transacción, emite un evento.

        CreateComment->>RewardsEngine: Invoca `processRewardEventAction({ type: 'comment.created', userId, ... })`

        RewardsEngine->>DB: Busca en la tabla `rewards_rules` una regla para el evento 'comment.created'.
        DB-->>RewardsEngine: Devuelve la regla: { event: 'comment.created', points: 50 }.

        RewardsEngine->>DB: Actualiza el perfil de recompensas del usuario (ej. `user_rewards_profile`) y añade una entrada al historial (`rewards_ledger`).

        Note right of User: La próxima vez que el usuario visite<br/>su panel de recompensas (`features/rewards`),<br/>verá sus 50 puntos nuevos y la razón por la que los ganó.

5.  Hoja de Ruta de Implementación
    FASE 1: Fundación y Contratos:
    Crear la biblioteca shared/rewards-contracts.
    Diseñar y crear las nuevas tablas en Supabase (rewards_rules, rewards_ledger, etc.).
    Poblar la tabla rewards_rules con algunas reglas iniciales (ej. "compra realizada", "reseña escrita").
    FASE 2: El Motor Backend:
    Implementar la Server Action processRewardEventAction en data-access.
    Integrar la llamada a esta action en los puntos clave del sistema existentes (ej. al final de createOrderAction y createCommentAction).
    FASE 3: Visibilidad para el Usuario:
    Crear la biblioteca features/rewards.
    Construir la página /account/rewards, incluyendo Server Actions de solo lectura para obtener el historial y el balance de puntos del usuario.
    FASE 4: Canje de Recompensas:
    Implementar la lógica para canjear puntos por recompensas (ej. generar un código de descuento único).
    FASE 5: Programa de Embajadores:
    Expandir el sistema para manejar enlaces de referidos.
    Crear un target en tools para generar reportes de comisiones para los embajadores.

---
