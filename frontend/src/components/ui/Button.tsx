'use client';

import React from 'react';
import { buttonLinkClass, type ButtonVariant } from '@/lib/buttonClasses';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = 'primary', className, children, ...props }: Props) {
  return (
    <button type="button" className={buttonLinkClass(variant, className)} {...props}>
      {children}
    </button>
  );
}

export { buttonLinkClass, type ButtonVariant };
