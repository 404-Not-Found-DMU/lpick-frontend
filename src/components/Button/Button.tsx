// src/components/Button/Button.tsx
'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-violet-500 text-white hover:bg-violet-700',
        outline: 'border border-violet-500 text-violet-500 hover:bg-violet-100',
        ghost: 'text-violet-500 hover:bg-violet-100',
        danger: 'bg-red-500 text-white hover:bg-red-700',
        success: 'bg-green-500 text-white hover:bg-green-700',
        themeToggle: 'bg-black text-white dark:bg-white dark:text-black dark:border-white',
        light: 'bg-white text-black border-black',
        dark: 'bg-black text-white border-white',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    compoundVariants: [
      { variant: 'outline', size: 'lg', className: 'px-8' },
      { variant: 'danger', size: 'sm', className: 'text-xs' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className = '', children, ...props }, ref) => {
    // CVA + 사용자 className을 직접 합칩니다.
    const mergedClasses = clsx(buttonVariants({ variant, size }), className);

    return (
      <button
        ref={ref}
        type={props.type ?? 'button'}
        disabled={props.disabled}
        aria-disabled={props.disabled}
        {...props}
        className={mergedClasses}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
