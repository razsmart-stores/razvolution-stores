// RUTA: shared/ui/src/lib/components/TagInput.tsx
/**
 * @file TagInput.tsx
 * @description Componente de UI atómico y de élite para la entrada de etiquetas (tags).
 *              Nivelado para la arquitectura soberana del monorepo.
 * @version 2.0.0 (Sovereign Leveling)
 * @author IA Arquitecto
 */
'use client';

import React, { useState } from 'react';

// --- PASO 1: Nivelación de Importaciones (Alineación Arquitectónica) ---
import { logger } from '@razvolution/shared-logging';
import { cn } from '@razvolution/shared-utils';
import { Badge } from './Badge';
import { DynamicIcon } from './DynamicIcon';
import { Input, type InputProps } from './Input';

interface TagInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: string[];
  onChange: (tags: string[]) => void;
}

export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, className, ...props }, ref) => {
    // --- PASO 2: Inyección de Observabilidad (Protocolo Heimdall) ---
    logger.trace('[TagInput] Renderizando.');
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = (tagToAdd: string) => {
      const newTag = tagToAdd.trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInputValue('');
    };

    // --- PASO 5: Higiene de Código (Tipado Explícito) ---
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        handleAddTag(inputValue);
      }
    };

    const handleRemoveTag = (tagToRemove: string) => {
      onChange(value.filter((tag) => tag !== tagToRemove));
    };

    return (
      <div>
        <div
          className={cn(
            'flex flex-wrap gap-2 rounded-md border border-input bg-background p-2',
            className
          )}
        >
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="rounded-full hover:bg-muted-foreground/20"
                aria-label={`Remove ${tag}`}
              >
                <DynamicIcon name="X" className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Input
            ref={ref}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-none shadow-none focus-visible:ring-0 h-auto p-0"
            {...props}
          />
        </div>
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';
