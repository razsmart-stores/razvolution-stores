// RUTA: shared/ui/src/lib/components/Table.tsx
/**
 * @file Table.tsx
 * @description Sistema de componentes de tabla de élite, nivelado para el ecosistema
 *              soberano de razvolution. Cumple con los pilares de arquitectura,
 *              observabilidad y calidad de código.
 * @version 3.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import * as React from 'react';

// --- [PASO 1: NIVELACIÓN DE IMPORTACIONES (ARQUITECTURA)] ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';

// --- [PASO 5: HIGIENE Y DOCUMENTACIÓN] ---
// Se añade documentación TSDoc a cada componente exportado.

/**
 * @component Table
 * @description Un contenedor para datos tabulares.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
  // --- [PASO 2: INYECCIÓN DE OBSERVABILIDAD] ---
  logger.trace('[Table] Renderizando v3.0.');
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        // --- [PASO 3: CUMPLIMIENTO DE THEMING] ---
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
});
Table.displayName = 'Table';

/**
 * @component TableHeader
 * @description El encabezado de una tabla, que contiene las filas de cabecera.
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

/**
 * @component TableBody
 * @description El cuerpo de una tabla, que contiene las filas de datos.
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

/**
 * @component TableFooter
 * @description El pie de una tabla, para resúmenes u otra información final.
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

/**
 * @component TableRow
 * @description Una fila dentro de una tabla.
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

/**
 * @component TableHead
 * @description Una celda de encabezado dentro de una fila de encabezado de tabla.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/**
 * @component TableCell
 * @description Una celda de datos estándar dentro de una fila de tabla.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/**
 * @component TableCaption
 * @description Un título o leyenda para una tabla.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
