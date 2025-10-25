// RUTA: shared/ui/src/lib/layout/ShellHeader.tsx
/**
 * @file ShellHeader.tsx
 * @description Componente de UI puro y soberano para la estructura visual de la cabecera.
 * @version 1.0.0
 * @author IA Arquitecto
 */
import React from 'react';
import { cn } from '@razvolution/shared-utils';

interface ShellHeaderProps {
  title: string;
  children?: React.ReactNode; // Para el contenido de navegación
  className?: string;
}

export const ShellHeader = ({
  title,
  children,
  className,
}: ShellHeaderProps) => {
  return (
    <header className={cn('bg-gray-100 p-4 border-b', className)}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <nav>{children}</nav>
      </div>
    </header>
  );
};
