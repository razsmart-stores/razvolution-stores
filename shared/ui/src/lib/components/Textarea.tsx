// RUTA: shared/ui/src/lib/components/Textarea.tsx
/**
 * @file Textarea.tsx
 * @description Componente de UI atómico para áreas de texto. Nivelado para
 *              cumplir con la arquitectura soberana y las convenciones canónicas
 *              de Tailwind CSS.
 * @version 3.0.0 (Sovereign & Canonical Leveling)
 * @author IA Arquitecto
 */
import * as React from 'react';

// --- PASO 1: Nivelación de Importaciones ---
import { cn } from '@razvolution/shared-utils';
import { logger } from '@razvolution/shared-logging';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    // --- PASO 2: Inyección de Observabilidad ---
    logger.trace('[Textarea] Renderizando.');
    return (
      <textarea
        className={cn(
          // --- PASO 3 & 5: Cumplimiento de Theming e Higiene de Código ---
          'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
