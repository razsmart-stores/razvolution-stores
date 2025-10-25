// RUTA: shared/ui/src/lib/components/ValidationError.tsx
/**
 * @file ValidationError.tsx
 * @description Componente de UI de élite para mostrar errores de validación en desarrollo.
 *              Nivelado a la v4.1.0 para un manejo de errores de tipo seguro.
 * @version 4.1.0 (Type-Safe Error Handling)
 * @author IA Arquitecto
 */
'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { type ZodError } from 'zod';

import { logger } from '@razvolution/shared-logging';
import type { Dictionary } from '@razvolution/shared-i18n-contracts';
import { DynamicIcon } from './DynamicIcon';

type ValidationErrorContent = NonNullable<Dictionary['validationError']>;

interface ValidationErrorProps {
  sectionName: string;
  error: ZodError;
  content: ValidationErrorContent;
}

export function ValidationError({
  sectionName,
  error,
  content,
}: ValidationErrorProps): React.ReactElement | null {
  // --- [INICIO DE REFACTORIZACIÓN SOBERANA v4.1.0] ---
  // Se serializa el objeto de error de Zod a una cadena JSON antes de pasarlo al logger.
  // Esto asegura que el payload cumple con el contrato de tipo `Json`, que no permite
  // valores `undefined`, resolviendo el error de compilación TS2322.
  logger.error(
    `[Guardián de Contrato] Error de validación de Zod para la sección: ${sectionName}`,
    { validationErrors: JSON.stringify(error.flatten().fieldErrors, null, 2) }
  );
  // --- [FIN DE REFACTORIZACIÓN SOBERANA v4.1.0] ---

  if (process.env['NODE_ENV'] === 'production') {
    return null;
  }

  const title = content.title.replace('{{sectionName}}', sectionName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="container my-12"
    >
      <div className="border-2 border-dashed border-destructive rounded-lg bg-destructive/5 p-6 text-destructive">
        <div className="flex items-start gap-4">
          <DynamicIcon name="TriangleAlert" className="h-8 w-8 mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-lg text-destructive-foreground">
              {title}
            </h3>
            <p className="text-sm mt-1 text-destructive-foreground/90">
              {content.description}
            </p>
            <details className="mt-3 text-xs group">
              <summary className="cursor-pointer font-medium text-destructive-foreground/70 hover:text-destructive-foreground list-none flex items-center gap-1">
                <DynamicIcon
                  name="ChevronRight"
                  className="h-4 w-4 transition-transform duration-200 group-open:rotate-90"
                />
                {content.detailsLabel}
              </summary>
              <pre className="mt-2 p-3 bg-black/30 rounded-md whitespace-pre-wrap font-mono">
                {JSON.stringify(error.flatten().fieldErrors, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
