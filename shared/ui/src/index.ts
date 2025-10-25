// RUTA: shared/ui/src/index.ts
/**
 * @file index.ts (Barrel File)
 * @description SSoT y fachada pública para el módulo de componentes de UI.
 *              Nivelado para exponer todos los aparatos de layout soberanos.
 * @version 9.0.0 (Sovereign Layout Exposure)
 * @author IA Arquitecto
 */
export * from './lib/components/Accordion';
export * from './lib/components/AlertDialog';
export * from './lib/components/Alert';
export * from './lib/components/Avatar';
export * from './lib/components/Badge';
export * from './lib/components/Button';
export * from './lib/components/Card';
export * from './lib/components/Carousel';
export * from './lib/components/Checkbox';
export * from './lib/components/Collapsible';
export * from './lib/components/ComboToast';
export * from './lib/components/Container';
export * from './lib/components/Dialog';
export * from './lib/components/DigitalConfetti';
export * from './lib/components/DropdownMenu';
export * from './lib/components/DynamicIcon';
export * from './lib/components/EmptyState';
export * from './lib/components/FadeIn';
export * from './lib/components/FlagIcon';
export * from './lib/components/Form';
export * from './lib/components/FormInput';
export * from './lib/components/ImageUploader';
export * from './lib/components/Input';
export * from './lib/components/Label';
export * from './lib/components/Loaders';
export * from './lib/components/NavigationMenu';
export * from './lib/components/PassportStamp';
export * from './lib/components/Popover';
export * from './lib/components/Price';
export * from './lib/components/PriceDisplay';
export * from './lib/components/RadioGroup';
export * from './lib/components/ScrollArea';
export * from './lib/components/Select';
export * from './lib/components/Separator';
export * from './lib/components/ShareButton';
export * from './lib/components/Sheet';
export * from './lib/components/Skeleton';
export * from './lib/components/Slider';
export * from './lib/components/Switch';
export * from './lib/components/Table';
export * from './lib/components/Tabs';
export * from './lib/components/TagInput';
export * from './lib/components/Textarea';
export * from './lib/components/TiltCard';
export * from './lib/components/ToggleTheme';
export * from './lib/components/Tooltip';
export * from './lib/components/ValidationError';

// Exportaciones de los "razbits"
export * from './lib/components/razbits/Dock/Dock';
export * from './lib/components/razbits/MagicBento/MagicBento';

// --- [INICIO DE CORRECCIÓN SOBERANA v9.0.0] ---
// Se exportan los componentes de layout para completar la API pública.
export * from './lib/layout/Footer';
export * from './lib/layout/ShellHeader';
// --- [FIN DE CORRECCIÓN SOBERANA v9.0.0] ---
