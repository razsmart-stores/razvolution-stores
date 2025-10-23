Manifiesto de Migración: Forjando razvolution
1. Visión del Proyecto
razvolution es la evolución soberana de revolution-smart-store. Es una plataforma de e-commerce de élite, diseñada desde cero para la venta de suplementos alimenticios. Hereda la robustez técnica, la observabilidad y los principios de calidad de su predecesor, pero se despoja de toda la complejidad innecesaria para centrarse en un único objetivo: ofrecer una experiencia de compra de alta conversión, rápida y fiable.
2. Misión y Objetivos
Nuestra misión es transformar un framework de creación de campañas multifuncional en una aplicación de e-commerce especializada, siguiendo una arquitectura de monorepo que garantice:
Modularidad Absoluta: Cada pieza de lógica (UI, acceso a datos, autenticación) residirá en su propia biblioteca (lib) aislada y reutilizable.
Gobernanza y Consistencia: Utilizar las herramientas de NX (tags, dependency graph) para asegurar que la arquitectura se mantenga limpia y predecible.
Escalabilidad Futura: La estructura de monorepo nos permitirá añadir nuevas aplicaciones (ej. un panel de administración, una app móvil) que consuman las mismas bibliotecas compartidas sin duplicar código.
Calidad de Código de Élite: Cada línea de código migrada será "nivelada" para cumplir con nuestros principios rectores.
3. Principios Rectores: Los 8 Pilares de Calidad
Extraídos directamente del manifiesto del proyecto original, estos pilares son el contrato inmutable que guía nuestra migración y desarrollo:
Hiper-Atomización y Responsabilidad Única: Cada componente, función o módulo tiene una única y bien definida responsabilidad.
Seguridad de Tipos Absoluta y Contrato Estricto (Zod): No hay lugar para any. Cada dato, desde la API hasta la UI, es validado por un schema soberano.
Observabilidad Profunda y Logging de Élite: Cada acción del usuario y cada proceso del sistema es trazable, medible y analizable.
Internacionalización (i18n) Nativa: La arquitectura soporta múltiples idiomas desde su concepción, no como una ocurrencia tardía.
Theming Semántico y Soberano: Los estilos se derivan de un sistema de diseño centralizado, permitiendo una personalización profunda y consistente.
Documentación Completa (TSDoc y Manifiestos): El código no solo funciona, sino que explica su propósito, su contrato y su uso.
Adherencia Arquitectónica y Fronteras Inmutables: Se respetan las fronteras entre dominios (ej. cliente vs. servidor, UI vs. datos).
Inteligencia Comportamental (Nos3 Compliance): La capacidad de entender y reproducir la experiencia del usuario es una característica de primer nivel.
Roadmap de Migración Holístico
Seguiremos un enfoque por fases, asegurando la estabilidad en cada paso.
FASE 0: Fundación (¡Completada!)
Objetivo: Crear la estructura base del monorepo.
Hitos:
✅ Creación del workspace razvolution.
✅ Instalación de plugins de NX (@nx/react, @nx/next).
✅ Generación de la estructura de bibliotecas (shared/, features/).
✅ Fusión de dependencias en el package.json raíz.
FASE 1: El Aparato de Observabilidad (En Progreso)
Objetivo: Migrar y estabilizar la base de nuestro sistema de logging y telemetría.
Hitos:
✅ Migrar archivos heimdall.emitter.ts, heimdall.contracts.ts, use-heimdall.hook.ts a libs/shared/logging.
➡️ Adaptar el código y las configuraciones para que la biblioteca sea compilable y funcional.
Verificar con pnpm nx build logging y pnpm nx lint logging.
Documentar en libs/shared/logging/README.md.
FASE 2: El Sistema de Diseño (UI)
Objetivo: Migrar todos los componentes de UI reutilizables.
Bibliotecas Involucradas: @razvolution/shared/ui, @razvolution/shared/utils.
Hitos:
Migrar cn.ts y merge.ts a libs/shared/utils.
Migrar todos los componentes de src/components/ui a libs/shared/ui.
Adaptar importaciones y dependencias.
Verificar con pnpm nx build ui.
FASE 3: Lógica de Autenticación y Datos
Objetivo: Migrar el flujo de autenticación y los clientes de servicios.
Bibliotecas Involucradas: @razvolution/features/auth, @razvolution/shared/data-access, @razvolution/shared/supabase.
Hitos:
Migrar los clientes de Supabase a libs/shared/supabase.
Migrar componentes y hooks de autenticación a libs/features/auth.
Migrar clientes de API (Cloudinary, Resend, etc.) y Server Actions a libs/shared/data-access.
FASE 4: La Aplicación store
Objetivo: Ensamblar la aplicación principal de Next.js.
Hitos:
Crear la aplicación apps/store con pnpm nx g @nx/next:app store.
Configurar el layout.tsx raíz para que consuma los componentes de las bibliotecas (Header, Footer, etc.).
Crear las páginas (/, /store, /product/[slug]) importando la lógica y los componentes desde las libs.
FASE 5: Poda Final y Verificación Holística
Objetivo: Eliminar el proyecto original y verificar la integridad total del monorepo.
Hitos:
Ejecutar pnpm nx graph para visualizar el grafo de dependencias y asegurar que es correcto.
Ejecutar pnpm test para correr todas las pruebas unitarias.
Archivar o eliminar el proyecto revolution-smart-store.

---


