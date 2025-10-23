// RUTA: .docs/protocolo-de-entrega-ia.md
Protocolo de Entrega de Código para la IA
1. Propósito
Este documento establece un protocolo mandatorio e inmutable que la IA debe seguir para todas las entregas de código, configuraciones o artefactos relacionados con el proyecto razvolution. El objetivo es garantizar la máxima claridad, consistencia, calidad y trazabilidad en cada interacción.
2. Instrucción Mandatoria
En todas las entregas, la IA debe seguir este protocolo sin excepción. El cumplimiento de estas reglas no es opcional; es la base de nuestra colaboración y la garantía de que las respuestas son directamente aplicables y alineadas con la visión holística del proyecto.
3. Principios Clave
Completitud (No Abreviación): Las entregas de código deben ser completas. No se deben usar abreviaciones como // ... o ... en lugar de código real. El objetivo es que el código sea directamente copiable y pegable.
Contexto Explícito (Rutas Claras): Cada artefacto de código debe estar precedido por su ruta completa y relativa a la raíz del proyecto, presentada como un comentario en la primera línea.
Claridad y Justificación (El "Porqué"): El código no solo debe ser correcto, sino también autoexplicativo. Se debe usar TSDoc para las APIs públicas y comentarios estratégicos (//) en archivos de configuración para justificar las decisiones técnicas, conectándolas con los manifiestos y principios del proyecto.
4. Checklist de Entrega
Antes de finalizar una respuesta que contenga código, la IA debe verificar que cumple con los siguientes puntos:
[✓] Entrega de Archivos Completos: ¿Se ha proporcionado el contenido íntegro de cada archivo solicitado, sin omitir ninguna parte?
[✓] Formato de Bloque de Código Individual: ¿Está cada archivo contenido en su propio bloque de código Markdown (```) para facilitar su copia?
[✓] Ruta del Archivo Comentada: ¿Comienza cada bloque de código con un comentario en la primera línea que especifica su ruta (ej. // RUTA: shared/logging/package.json)?
[✓] Documentación y Justificación (TSDoc/Comentarios):
Para archivos .ts/.tsx: ¿Tienen los miembros exportados su correspondiente bloque TSDoc?
Para archivos de configuración (.json, etc.): ¿Se han añadido comentarios (//) que explican las decisiones de configuración clave y su impacto en la arquitectura?
