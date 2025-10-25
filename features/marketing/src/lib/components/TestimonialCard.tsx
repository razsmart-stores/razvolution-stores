// RUTA: features/marketing/src/lib/components/TestimonialCard.tsx
/**
 * @file TestimonialCard.tsx
 * @description Componente atómico de UI para mostrar un testimonio individual.
 *              v6.1.0 (Sovereign Code Hygiene & Canonical Styling): Se integra la
 *              utilidad 'cn' para el manejo de clases, se adoptan las clases
 *              canónicas de Tailwind y se mejora la reusabilidad del componente.
 * @version 6.1.0
 * @author IA Arquitecto
 */
'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { logger } from '@razvolution/shared-logging';
import { DynamicIcon, TiltCard } from '@razvolution/shared-ui';
import { cn } from '@razvolution/shared-utils';

/**
 * @interface TestimonialCardProps
 * @description El contrato de datos para el componente TestimonialCard.
 */
interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  imageSrc: string;
  className?: string; // <-- MEJORA PROACTIVA: Permite la personalización externa
}

export const testimonialCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function TestimonialCard({
  quote,
  author,
  location,
  imageSrc,
  className,
}: TestimonialCardProps): React.ReactElement {
  logger.info('[TestimonialCard] Renderizando v6.1 (Elite Hygiene).');

  return (
    <motion.article
      variants={testimonialCardVariants}
      className={cn('h-full', className)} // Se aplica 'cn'
    >
      <TiltCard className="h-full">
        <div
          className={cn( // Se aplica 'cn'
            'relative h-full rounded-lg border border-border bg-background/50 p-6 shadow-lg transition-shadow hover:shadow-primary/20 flex flex-col'
          )}
        >
          <DynamicIcon
            name="Quote"
            className="absolute top-4 right-4 h-16 w-16 text-muted/20 -z-10"
            aria-hidden="true"
          />
          <div className={cn('flex items-start gap-4 grow')}> {/* Se corrige a 'grow' */}
            <Image
              src={imageSrc}
              alt={`Foto de ${author}`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover border-2 border-primary/50"
            />
            <blockquote className={cn('text-foreground grow')}> {/* Se corrige a 'grow' */}
              <p>&quot;{quote}&quot;</p>
            </blockquote>
          </div>
          <footer className="mt-4 text-right">
            <p className="font-bold text-primary">{author}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </footer>
        </div>
      </TiltCard>
    </motion.article>
  );
}
