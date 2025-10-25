<div align="center">
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="150" alt="Logo de Nx">
  <h1>razvolution 🔱</h1>
  <p><strong>El Acelerador Soberano para E-commerce de Élite</strong></p>
  <p>Forjado por MetaShark Tech</p>
</div>

<div align="center">

[![Estado del Build](https://img.shields.io/github/actions/workflow/status/razsmart-stores/razvolution-stores-store/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/razsmart-stores/razvolution-stores-store/actions)
[![Versión del Proyecto](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge&logo=pnpm)](./package.json)
[![Licencia](https://img.shields.io/badge/license-UNLICENSED-red?style=for-the-badge)](./LICENSE)
[![Mantenido por](https://img.shields.io/badge/mantenido_por-MetaShark_Tech-0D9488?style=for-the-badge)](https://metashark.tech)

</div>

---

## 🔱 Visión Soberana

**razvolution** no es una tienda, es la **fundación definitiva** sobre la cual se forjan las plataformas de e-commerce de próxima generación. Es un acelerador de arquitectura que encapsula soluciones de grado productivo para los desafíos más complejos del comercio digital: autenticación, pagos, observabilidad, internacionalización (i18n) e inteligencia artificial.

Construido sobre una filosofía de **modularidad absoluta** y gobernado por un monorepo Nx, `razvolution` permite a los equipos de élite lanzar nuevas experiencias de compra con una velocidad y una calidad sin precedentes, eliminando la fricción del desarrollo y centrándose en lo que realmente importa: el producto.

## ✨ Los 8 Pilares de Calidad

Este proyecto se rige por un contrato inmutable de calidad, reflejado en ocho principios soberanos:

*   ⚛️ **Hiper-Atomización y Responsabilidad Única:** Cada componente, función o módulo tiene una única y bien definida responsabilidad.
*   🛡️ **Seguridad de Tipos Absoluta y Contrato Estricto (Zod):** No hay lugar para `any`. Cada dato que fluye por el sistema es validado por un schema soberano.
*   🔭 **Observabilidad Profunda y Logging de Élite:** Cada acción y proceso es trazable, medible y analizable a través del Protocolo Heimdall.
*   🌍 **Internacionalización (i18n) Nativa:** La arquitectura soporta múltiples idiomas desde su concepción, no como un añadido.
*   🎨 **Theming Semántico y Soberano:** Los estilos se derivan de un sistema de diseño centralizado, permitiendo una personalización profunda y consistente.
*   📜 **Documentación Completa (TSDoc y Manifiestos):** El código no solo funciona, sino que explica su propósito, su contrato y su uso.
*   🏛️ **Adherencia Arquitectónica y Fronteras Inmutables:** Se respetan las fronteras entre dominios (cliente vs. servidor, UI vs. datos).
*   🧠 **Inteligencia Comportamental (Nos3 Compliance):** La capacidad de entender y reproducir la experiencia del usuario es una característica de primer nivel.

## 🛠️ Stack Tecnológico

| Categoría | Tecnologías |
| :--- | :--- |
| **Arquitectura** | ![Nx](https://img.shields.io/badge/-Nx-143055?style=flat&logo=nx) ![pnpm](https://img.shields.io/badge/-pnpm-F69220?style=flat&logo=pnpm) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript) |
| **Frontend** | ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat&logo=next.js) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react) ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss) ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=flat&logo=framer) |
| **Backend & Datos** | ![Supabase](https://img.shields.io/badge/-Supabase-3ECF8E?style=flat&logo=supabase) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat&logo=postgresql) `Server Actions` |
| **Gestión de Estado** | ![Zustand](https://img.shields.io/badge/-Zustand-000000?style=flat) |
| **Validación** | ![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=flat) |
| **Observabilidad** | `Protocolo Heimdall` (Custom) |
| **Pruebas** | ![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat&logo=jest) |

## 🚀 Inicio Rápido (Getting Started)

Para poner en marcha el acelerador en tu entorno local, sigue estos pasos soberanos:

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/razsmart-stores/razvolution-stores-store.git
    cd razvolution-stores-store
    ```

2.  **Instalar Dependencias:**
    Utilizamos `pnpm` para gestionar el workspace.
    ```bash
    pnpm install
    ```

3.  **Configurar Variables de Entorno:**
    Copia el archivo de ejemplo `.env` y rellena las credenciales necesarias (principalmente las de Supabase).
    ```bash
    # En Windows (Command Prompt)
    copy .env.example .env

    # En Windows (PowerShell)
    Copy-Item .env.example .env
    ```
    Abre el archivo `.env` y añade tus claves.

4.  **Iniciar el Entorno de Desarrollo:**
    Este comando levanta la aplicación `store` y todas sus dependencias en modo de desarrollo con Hot Reloading.
    ```bash
    pnpm dev
    ```

    ¡Listo! Tu instancia de `razvolution` estará disponible en `http://localhost:4200`.

## ⚙️ Comandos Soberanos

Este monorepo se gobierna a través de los scripts definidos en `package.json`, orquestados por Nx.

| Categoría | Comando | Descripción |
| :--- | :--- | :--- |
| 🚀 **Desarrollo** | `pnpm dev` | Inicia el servidor de desarrollo para la aplicación `store`. |
| 📊 **Análisis** | `pnpm graph:web` | Abre una visualización interactiva del grafo de dependencias del proyecto. |
| 🧹 **Calidad** | `pnpm lint:all` | Ejecuta ESLint en todas las bibliotecas y aplicaciones del monorepo. |
| ✨ **Formato** | `pnpm format:write` | Formatea todo el código base utilizando Prettier. |
| ✅ **Pruebas** | `pnpm test:all` | Ejecuta la suite de pruebas completa de Jest para todos los proyectos. |
| | `pnpm test:affected`| Ejecuta las pruebas únicamente para los proyectos afectados por tus cambios. **¡Ideal para CI!** |
| 📦 **Build** | `pnpm build:all` | Compila todas las bibliotecas y aplicaciones para producción. |
| | `pnpm build:affected` | Compila únicamente los proyectos afectados por tus cambios. |
| 🔬 **Validación** | `pnpm validate:all` | Ejecuta la secuencia completa de calidad: formato, linting, pruebas y build. |
| 📜 **Generadores** | `pnpm gen:types` | Genera los tipos de la base de datos desde Supabase. |
| | `pnpm gen:icons` | Genera el manifiesto de iconos de Lucide. |

---

## 🏛️ Licencia y Propiedad

Este proyecto es **UNLICENSED** y es propiedad intelectual exclusiva de **MetaShark Tech**. Queda prohibida su distribución, copia o uso sin el consentimiento explícito por escrito del propietario.

© 2025 MetaShark Tech. Todos los derechos reservados.

<div align="center">
  <p>Forjado con soberanía por <strong>RaZ Podestá</strong> en Florianópolis, SC, Brasil. 🇧🇷</p>
</div>
