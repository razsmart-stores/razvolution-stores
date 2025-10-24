// RUTA: shared/data-access/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública soberana para la capa de acceso a datos.
 *              v2.0.0: Se refactoriza para importar explícitamente las acciones
 *              y construir un objeto 'actions' anidado. Esta estructura resuelve
 *              el error de compilación de 'export *' en un contexto "use server"
 *              y proporciona a los consumidores un único punto de entrada predecible.
 * @version 2.0.0
 * @author IA Arquitecto
 */

import * as auth from './lib/auth/auth.actions';
import * as linkSession from './lib/auth/linkAnonymousSessionToUser.action';
import * as cart from './lib/commerce/cart.actions';
import * as checkout from './lib/commerce/checkout.action';

/**
 * @const actions
 * @description Objeto soberano que agrupa y exporta todas las Server Actions del
 *              ecosistema, organizadas por dominio de negocio. Este es el único
 *              punto de entrada para consumir la lógica de negocio desde el cliente.
 *
 * @example
 * // En un componente de cliente:
 * import { actions } from '@razvolution/shared-data-access';
 *
 * const handleLogin = async (data) => {
 *   const result = await actions.auth.loginWithPasswordAction(data);
 *   // ...
 * };
 */
export const actions = {
  /**
   * @namespace actions.auth
   * @description Contiene todas las Server Actions relacionadas con la autenticación,
   *              sesión y gestión de usuarios.
   */
  auth: {
    ...auth,
    ...linkSession,
  },

  /**
   * @namespace actions.commerce
   * @description Contiene todas las Server Actions relacionadas con la lógica de
   *              comercio electrónico, como la gestión del carrito y el checkout.
   */
  commerce: {
    ...cart,
    ...checkout,
  },
};
