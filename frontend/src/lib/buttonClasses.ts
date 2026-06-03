import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'primary-violet';

function variantClass(variant: ButtonVariant): string {
  if (variant === 'secondary') return 'btn-secondary';
  if (variant === 'primary-violet') return 'btn-primary btn-primary--violet';
  return 'btn-primary';
}

export function buttonLinkClass(variant: ButtonVariant = 'primary', className?: string): string {
  return cn(variantClass(variant), className);
}
