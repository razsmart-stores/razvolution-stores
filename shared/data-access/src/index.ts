// RUTA: shared/data-access/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública soberana para la capa de acceso a datos.
 *              v2.1.0: Se añade 'getUserProfileAction' para centralizar la
 *              obtención de perfiles de usuario.
 * @version 2.1.0
 * @author IA Arquitecto
 */

import * as auth from './lib/auth/auth.actions';
import * as getUserProfile from './lib/auth/getUserProfile.action'; // <-- Importar la nueva acción
import * as linkSession from './lib/auth/linkAnonymousSessionToUser.action';
import * as cart from './lib/commerce/cart.actions';
import * as checkout from './lib/commerce/checkout.action';

export const actions = {
  auth: {
    ...auth,
    ...linkSession,
    ...getUserProfile,
  },
  commerce: {
    ...cart,
    ...checkout,
  },
};
