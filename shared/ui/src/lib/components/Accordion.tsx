// RUTA: shared/ui/src/lib/components/Accordion.tsx
/**
 * @file Accordion.tsx
 * @description Sistema de componentes de acordeón de élite.
 *              Nivelado para consumir dependencias del ecosistema soberano.
 * @version 4.0.0 (Sovereign Import Leveling)
 * @author IA Arquitecto
 */
"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import * as React from "react";

// --- [INICIO DE NIVELACIÓN SOBERANA v4.0.0] ---
// Se actualizan todas las importaciones para usar los alias del workspace,
// resolviendo el error de dependencia no utilizada y alineando el componente
// con la arquitectura del monorepo.
import { logger } from "@razvolution/shared-logging";
import { cn } from "@razvolution/shared-utils";
import { DynamicIcon } from "./DynamicIcon";
// --- [FIN DE NIVELACIÓN SOBERANA v4.0.0] ---

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  logger.trace("[AccordionItem] Renderizando.");
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <DynamicIcon
        name="ChevronDown"
        className="h-4 w-4 shrink-0 transition-transform duration-200"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  logger.trace("[AccordionContent] Renderizando contenido v4.0.");
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all"
      {...props}
      asChild
    >
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: "auto",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        exit={{
          opacity: 0,
          height: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
      </motion.div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
