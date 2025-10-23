// RUTA: .docs/domains/logging-domain.md

# Manifiesto del Dominio de Observabilidad (`shared/logging`)

## 1. Propósito y Alcance Soberano

El dominio de `logging`, también conocido como **Protocolo Heimdall**, es el sistema nervioso central del ecosistema `razvolution`. Su propósito es proporcionar una **visibilidad profunda y unificada** sobre el comportamiento, rendimiento y salud de la aplicación en todos sus entornos (cliente, servidor, edge).

La observabilidad no es un añadido; es un pilar arquitectónico fundamental que garantiza nuestra capacidad para diagnosticar, depurar y optimizar el sistema con precisión quirúrgica.

**Alcance:** Este dominio encapsula toda la lógica de instrumentación, encolado, envío y contratación de datos de telemetría.

*   **Contiene:** Un logger isomórfico, contratos de datos de telemetría (Zod), un emisor de eventos para el navegador, y hooks de React para integrar el ciclo de vida del emisor.
*   **Fronteras:** Este dominio se sitúa en un nivel bajo de la jerarquía. Depende únicamente de `utils` (para el store de estado) y de `supabase` (para los tipos de la base de datos). **Ninguna biblioteca de `features` o de negocio puede ser una dependencia de `logging`**.

## 2. El Contrato del Dominio (Principios Inmutables)

1.  **Observabilidad Unificada:** El `logger` exportado es la **única interfaz permitida** para generar telemetría. No se deben utilizar `console.log` directos para información de negocio o de flujo en el código de producción.
2.  **Instrumentación Semántica:** Las entradas de log no son cadenas de texto arbitrarias. Deben ser eventos semánticos (`startTask`, `taskStep`, `endTask`, `traceEvent`) que describan una acción de negocio o un flujo de ejecución.
3.  **Contexto es Rey:** Cada evento de telemetría debe estar enriquecido con el máximo contexto posible (ID de traza, ID de tarea, ID de usuario, ID de workspace) para permitir un análisis correlacionado.
4.  **Resiliencia del Cliente:** El emisor del lado del cliente está diseñado para la resiliencia. Encola eventos en `localStorage` y los envía en lotes. Es tolerante a fallos de red y garantiza la entrega de datos incluso si el usuario cierra la pestaña (`sendBeacon`).
5.  **Desacoplamiento Arquitectónico:** El logger en sí es puro y no depende directamente de frameworks de UI como React. Obtiene el contexto necesario (como el `workspaceId`) bajo demanda en el momento del envío de datos, no en el momento de la instrumentación.

## 3. Inventario de Aparatos Implementados (Estado Actual)

El dominio está completamente funcional y provee los siguientes aparatos:

### 3.1. El Logger Soberano (`logger.ts`)
*   **Descripción:** Es el corazón del dominio. Es un logger isomórfico que adapta su comportamiento al entorno de ejecución.
    *   **En Desarrollo:** Proporciona una salida de consola rica y con estilo, usando `console.group` para anidar trazas y tareas, facilitando la depuración visual.
    *   **En Producción:** Minimiza la salida de consola en el navegador y formatea los logs del servidor como JSON estructurado para una fácil ingesta por parte de servicios de logging externos.
*   **API Principal:**
    *   `logger.startTask(identifier, title)`: Inicia una operación de negocio medible (ej. un pago, un registro). Devuelve un `taskId`.
    *   `logger.taskStep(taskId, stepName, status, payload)`: Registra un paso intermedio dentro de una tarea.
    *   `logger.endTask(taskId, finalStatus)`: Finaliza una tarea, calculando su duración total.
    *   `logger.startTrace(traceName)`: Un alias de `startTask` para medir flujos de ejecución o ciclos de vida de componentes.
    *   `logger.traceEvent(traceId, eventName, payload)`: Registra un evento discreto dentro de una traza.
    *   `logger.endTrace(traceId)`: Finaliza una traza.
    *   `logger.info()`, `logger.warn()`, `logger.error()`, `logger.success()`: Métodos para registrar eventos informativos simples.

### 3.2. Contratos de Datos Heimdall (`heimdall.contracts.ts`)
*   **Descripción:** La Única Fuente de Verdad (SSoT) para la estructura de todos los datos de telemetría, definida con **Zod**.
*   **Contratos Clave:**
    *   `HeimdallEventSchema`: Define la estructura de cada evento atómico de telemetría que se envía al backend.
    *   `HeimdallEventRowSchema`: Define el contrato a nivel de base de datos, garantizando la consistencia entre lo que la aplicación envía y lo que la base de datos espera.

### 3.3. Emisor de Telemetría (Lógica en `logger.ts`)
*   **Descripción:** Lógica del lado del cliente que gestiona el ciclo de vida de los eventos de telemetría.
*   **Funcionalidad:**
    *   **Encolado:** Los eventos generados por el logger se almacenan en `localStorage` en una clave (`heimdall_queue_v1`).
    *   **Procesamiento por Lotes (Batching):** Un `setInterval` envía los eventos encolados cada 15 segundos o cuando la cola alcanza un tamaño máximo de 50 eventos.
    *   **Envío Resiliente:** Utiliza `navigator.sendBeacon` durante el evento `visibilitychange` o `beforeunload` para garantizar un último intento de envío de datos sin bloquear el hilo principal.
    *   **Manejo de Errores:** Si el envío falla, los eventos se re-encolan para el siguiente intento. Si la cola está corrupta, se purga para evitar un bucle de fallos.

### 3.4. Hook de Integración de UI (`use-heimdall.hook.ts`)
*   **Descripción:** Un hook de React (`"use client"`) diseñado para ser llamado una sola vez en el layout raíz de la aplicación.
*   **Funcionalidad:** Su única responsabilidad es inicializar y gestionar los listeners del ciclo de vida del navegador (`visibilitychange`, `beforeunload`) necesarios para el emisor de telemetría.

## 4. Hoja de Ruta y Evolución del Dominio (Estado Futuro)

El Protocolo Heimdall está diseñado para evolucionar hacia una plataforma de observabilidad completa.

*   **Integración de Errores no Capturados:**
    *   **Propósito:** Capturar automáticamente los errores de JavaScript no controlados (`window.onerror`) y los rechazos de promesas no manejados, y enviarlos como eventos de telemetría de alta prioridad.
    *   **Beneficio:** Visibilidad completa sobre la estabilidad de la aplicación cliente.

*   **Métricas de Rendimiento del Navegador (Web Vitals):**
    *   **Propósito:** Integrar la captura de métricas Core Web Vitals (LCP, FID, CLS) y otras métricas de rendimiento (FCP, TTFB).
    *   **Beneficio:** Conectar el rendimiento real percibido por el usuario con las sesiones y flujos de negocio.

*   **Muestreo Inteligente (Sampling):**
    *   **Propósito:** Implementar una lógica de muestreo configurable para reducir el volumen de telemetría en entornos de alto tráfico sin perder visibilidad.
    *   **Beneficio:** Controlar los costos de ingesta y almacenamiento de datos de telemetría.

*   **Integración con OpenTelemetry (Futuro a Largo Plazo):**
    *   **Propósito:** Alinear el formato de nuestros eventos con los estándares de la industria de OpenTelemetry.
    *   **Beneficio:** Permitir la interoperabilidad con una amplia gama de herramientas de análisis y visualización (APM) como Jaeger o DataDog.

    ---

    
