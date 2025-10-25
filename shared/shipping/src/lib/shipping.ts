// RUTA: shared/shipping/src/lib/shipping.ts
/**
 * @file shipping.ts
 * @description SSoT y fachada para la Capa de Abstracción de Envíos (SAL).
 * @version 1.1.0 (Type-Safe Logging)
 * @author IA Arquitecto
 */
import { logger } from '@razvolution/shared-logging';

export interface GetRatesParams {
  postalCode: string;
  items: Array<{
    weightKg: number;
    quantity: number;
  }>;
}

export interface ShippingRate {
  provider: string;
  serviceName: string;
  cost: number;
  estimatedDeliveryDays: number;
}

export interface TrackPackageParams {
  trackingCode: string;
  provider: string;
}

export interface TrackingInfo {
  status: string;
  history: Array<{
    date: string;
    location: string;
    description: string;
  }>;
}

export const getRates = async (
  params: GetRatesParams
): Promise<ShippingRate[]> => {
  // --- [INICIO DE CORRECCIÓN SOBERANA v1.1.0] ---
  // Se pasa el objeto de parámetros dentro de una propiedad para cumplir con el contrato 'Json'.
  logger.info('[SAL] Obteniendo cotizaciones de envío (placeholder)...', {
    paramsData: { ...params },
  });
  // --- [FIN DE CORRECCIÓN SOBERANA v1.1.0] ---
  return Promise.resolve([
    {
      provider: 'Correios',
      serviceName: 'SEDEX',
      cost: 25.5,
      estimatedDeliveryDays: 3,
    },
  ]);
};

export const trackPackage = async (
  params: TrackPackageParams
): Promise<TrackingInfo> => {
  // --- [INICIO DE CORRECCIÓN SOBERANA v1.1.0] ---
  logger.info('[SAL] Rastreando paquete (placeholder)...', {
    paramsData: { ...params },
  });
  // --- [FIN DE CORRECCIÓN SOBERANA v1.1.0] ---
  return Promise.resolve({
    status: 'En Tránsito',
    history: [
      {
        date: new Date().toISOString(),
        location: 'Centro de Distribución',
        description: 'Objeto posteado',
      },
    ],
  });
};
