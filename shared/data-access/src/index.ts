/**
 * @file index.ts
 * @description Fachada pública para la capa de acceso a datos.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import * as auth from './lib/auth';

export const actions = {
  auth,
};
