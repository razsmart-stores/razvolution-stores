Manifiesto de Integración de IA: El Sistema Nervioso Inteligente
Atributo Valor
Visión Integrar la IA como una capacidad transversal y de primera clase.
Pila Tecnológica LangChain.js (Backend) + Vercel AI SDK (Frontend)
Principios Clave Backend-Centric, Multi-Proveedor, Agentes como Primitiva, Contratos Estrictos

1.  Visión y Propósito Soberano
    La integración de IA en razvolution no se concibe como una simple "característica" (como un chatbot), sino como la creación de un sistema nervioso inteligente subyacente a toda la plataforma. El propósito es establecer una arquitectura que nos permita, de forma fácil y robusta, construir una variedad ilimitada de:
    Asistentes Inteligentes: Desde un asistente de compras que recomienda productos hasta un copiloto de marketing que ayuda a crear campañas.
    Automatizaciones Agénticas: Agentes autónomos que pueden realizar tareas complejas, como analizar el comportamiento del usuario y generar insights (Aura Insights), optimizar catálogos de productos o gestionar notificaciones.
    Generación de Contenido Dinámico: Utilizar LLMs para crear descripciones de productos, artículos de blog o contenido para redes sociales.
    Esta arquitectura debe ser, por diseño, agnóstica al proveedor y al modelo, permitiéndonos cambiar de OpenAI a Google Gemini, Anthropic o cualquier otro con una configuración mínima, garantizando nuestra soberanía tecnológica.
2.  Principios Arquitectónicos Inmutables
    Lógica Backend-Centric: Toda la orquestación de la IA, la lógica agéntica y, de manera crítica, el manejo de las claves de API, DEBE residir en el backend (en nuestras Server Actions). El frontend es una capa de presentación pura que invoca esta lógica de forma segura, sin tener nunca acceso a credenciales sensibles.
    Multi-Proveedor por Diseño: La arquitectura debe abstraer el proveedor del LLM. Cambiar de gpt-4 a claude-3-5-sonnet debe ser tan simple como cambiar una variable de entorno o una línea de configuración en la capa de data-access.
    Agentes como Ciudadanos de Primera Clase: Los agentes no son un hack. Son una primitiva arquitectónica. Diseñaremos el sistema para que los agentes puedan invocar "herramientas", que en nuestro ecosistema serán otras Server Actions (ej. getProductsAction, createOrderAction).
    Comunicación Basada en Contratos Estrictos: Todo el flujo de datos entre la UI, las Server Actions y los agentes estará validado por esquemas de Zod, definidos en su propio dominio de contratos.
3.  Nuevos Dominios Arquitectónicos de IA
    Para implementar esta visión, crearemos tres nuevos dominios soberanos, cada uno con una responsabilidad única y clara:
    Dominio Propósito Soberano Responsabilidades Clave
    shared/ai-contracts La SSoT de Datos de IA. Define con Zod la estructura de los mensajes, las conversaciones, las herramientas disponibles para los agentes y los formatos de respuesta. Es la base de la comunicación segura.
    data-access (sub-dominio ai) El Cerebro de la IA (Backend). Contiene las Server Actions que orquestan la IA. Aquí reside LangChain.js. Define los agentes, les da acceso a herramientas (otras Server Actions) y gestiona la comunicación con los LLMs.
    features/ai-chat La Cara de la IA (Frontend). Contiene los componentes de React "inteligentes" para la interacción con la IA (ej. ChatPanel). Utiliza el Vercel AI SDK (useChat) para gestionar el estado de la UI y el streaming de respuestas.
4.  Flujo de Datos Holístico: Un Agente en Acción
    Este diagrama visualiza cómo interactúan los nuevos dominios para responder a una consulta del usuario, demostrando la separación de responsabilidades.
    code
    Mermaid
    sequenceDiagram
    participant User
    participant ChatPanel as ChatPanel.tsx (features/ai-chat)
    participant useChat as Vercel AI SDK
    participant AgentAction as agentAction (data-access/ai)
    participant LangChain as LangChain.js
    participant ProductTool as getProductsAction (data-access/commerce)
    participant LLM_API as API del Proveedor (ej. OpenAI)

        User->>ChatPanel: Escribe: "¿Tienen creatina vegana?"
        ChatPanel->>useChat: Llama a `append(message)`
        useChat->>AgentAction: Invoca la Server Action con el historial de mensajes

        AgentAction->>LangChain: Pasa el control al Agente de Productos
        LangChain->>LangChain: El Agente analiza la pregunta y decide usar una herramienta.
        LangChain->>ProductTool: Invoca la herramienta `getProductsAction` con "creatina vegana"
        ProductTool-->>LangChain: Devuelve una lista de productos en formato JSON.

        LangChain->>LLM_API: Envía un prompt final con la pregunta original y los datos de los productos.
        LLM_API-->>LangChain: Empieza a *streamear* la respuesta de texto.
        LangChain-->>AgentAction: Pasa el stream de datos.
        AgentAction-->>useChat: Devuelve el stream a la UI.

        useChat->>ChatPanel: Actualiza el estado de la UI con la respuesta en tiempo real.
        ChatPanel-->>User: Muestra la respuesta generada letra por letra.

5.  Hoja de Ruta de Implementación
    Seguiremos un enfoque por fases para construir esta fundación de élite:
    FASE 1: Cimientos y Contratos:
    Crear la biblioteca shared/ai-contracts.
    Definir los esquemas básicos para Message y Conversation.
    FASE 2: El Primer Flujo (Backend):
    Crear el sub-dominio ai dentro de shared/data-access.
    Crear una Server Action simple (completionAction) que use LangChain.js para llamar a un LLM (sin agentes aún) y devolver un stream.
    FASE 3: La Primera Interfaz (Frontend):
    Crear la biblioteca features/ai-chat.
    Construir un componente ChatPanel básico que use el Vercel AI SDK (useChat) para invocar la completionAction.
    FASE 4: El Primer Agente:
    Evolucionar la completionAction a una agentAction.
    Definir una "herramienta" simple en LangChain que llame a otra Server Action existente.
    FASE 5: Iteración y Expansión:
    Construir agentes más complejos, añadir más herramientas y expandir las capacidades de la UI.

---
