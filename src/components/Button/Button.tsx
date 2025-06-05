// src/components/Button.tsx
'use client';
import React from 'react';
import clsx from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-normal transition-colors focus:outline-none  disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        fill: 'hover:opacity-90 bg-violet-500 text-white hover:bg-violet-700',
        outline: 'border hover:bg-opacity-10 border-violet-500 text-violet-500 hover:bg-violet-100',
        ghost: 'hover:bg-opacity-10 text-violet-500 hover:text-violet-700',
        themeToggle: 'bg-black text-white dark:bg-white dark:text-black dark:border-white ',
        light: 'bg-white text-black border-black',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'fill',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
