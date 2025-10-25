// RUTA: shared/ui/src/ogl-declarations.d.ts
/**
 * @file ogl-declarations.d.ts
 * @description Archivo de declaración soberano y definitivo para 'ogl'.
 *              Mapea las importaciones profundas de los archivos .js a sus
 *              archivos de declaración de tipos .d.ts correspondientes,
 *              resolviendo la discrepancia del módulo.
 * @version 5.0.0 (Definitive Module Mapping)
 * @author IA Arquitecto
 */

declare module 'ogl/src/core/Renderer.js' {
  export * from 'ogl/types/core/Renderer';
}

declare module 'ogl/src/core/Program.js' {
  export * from 'ogl/types/core/Program';
}

declare module 'ogl/src/core/Mesh.js' {
  export * from 'ogl/types/core/Mesh';
}

declare module 'ogl/src/extras/Triangle.js' {
  export * from 'ogl/types/extras/Triangle';
}
