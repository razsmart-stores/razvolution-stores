// RUTA: features/community/src/lib/community.tsx
/**
 * @file community.tsx
 * @description Componente de UI placeholder para la feature 'community'.
 *              Nivelado para eliminar dependencias de estilos y alinearse
 *              con el principio de simplicidad arquitectónica.
 * @version 2.0.0 (Architectural Simplification & Hygiene)
 * @author IA Arquitecto
 */

// Se elimina la importación del módulo CSS, ya que las features no deben
// definir sus propios estilos. Deben orquestar componentes de `shared/ui`.
// import styles from './community.module.css';

// La importación de React es innecesaria con los JSX transforms modernos.

export function RazvolutionCommunity() {
  return (
    // Se elimina el uso de la clase del módulo CSS. El estilo, si es
    // necesario, se aplicará componiendo primitivas de `shared/ui`.
    <div>
      <h1>Welcome to RazvolutionCommunity!</h1>
    </div>
  );
}

export default RazvolutionCommunity;
