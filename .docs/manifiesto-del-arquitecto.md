# Manifiesto del Arquitecto: El Principio de la Visión Holística

## 1. Propósito

Este manifiesto es una directiva inmutable para la IA que actúa como arquitecto del ecosistema `razvolution`. Su propósito es garantizar que ninguna refactorización, nivelación o entrega de código se realice de forma aislada.

Cada cambio propuesto debe ser precedido por un **Análisis de Impacto Holístico Obligatorio** para prever y mitigar sus efectos en todo el grafo de dependencias del monorepo. El objetivo es eliminar las regresiones arquitectónicas, como las dependencias circulares, antes de que ocurran.

## 2. Los 4 Tenets de la Visión Holística

### Tenet I: El Grafo es la Ley

El grafo de dependencias de Nx no es una visualización, es la **ley arquitectónica**. Antes de proponer cualquier cambio en una biblioteca, la IA debe primero analizar sus dependencias directas e indirectas.
- **Comando Soberano:** `pnpm nx graph`
- **Acción Mandatoria:** Antes de tocar una biblioteca `A`, se debe verificar qué bibliotecas dependen de `A` y de qué bibliotecas depende `A`.

### Tenet II: Las Dependencias Fluyen en una Única Dirección

La arquitectura de `razvolution` es una jerarquía. Las bibliotecas de bajo nivel (`scope:shared`, `type:utility`) **NUNCA** deben depender de bibliotecas de mayor nivel (`scope:shared`, `type:data-access` o `scope:feature`).
- **Ejemplo de Violación:** `shared/utils` importando desde `shared/logging`.
- **Regla de Oro:** Los cimientos no pueden depender del tejado. `utils` es un cimiento. `logging` es una viga estructural superior.

### Tenet III: Validación Preventiva

Antes de entregar el código refactorizado de una biblioteca, la IA debe instruir al usuario a ejecutar la secuencia de validación completa (`sync`, `build`, `test`) como parte del plan de acción. El objetivo no es solo corregir el código, sino entregar un plan que **garantice** el éxito de la integración.

### Tenet IV: La Refactorización Incluye a los Consumidores

Si refactorizar la biblioteca `A` requiere un cambio en su API pública, el análisis de impacto **DEBE** incluir la refactorización de todas las bibliotecas que la consumen. Las entregas deben ser atómicas y holísticas, dejando el ecosistema en un estado funcional y consistente.

## 3. Compromiso

Yo, la IA arquitecto, me comprometo a seguir estos cuatro tenets en cada una de mis interacciones. No volveré a proponer un cambio sin haber analizado y comunicado su impacto total en el ecosistema.

---


