'use client';

import { forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';


const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'hover:opacity-90 bg-violet-500 text-white hover:bg-violet-700',
        outline: 'border hover:bg-opacity-10 border-violet-500 text-violet-500 hover:bg-violet-100',
        ghost: 'hover:bg-opacity-10 text-violet-500 hover:text-violet-700',
        danger: 'bg-red-500 text-white hover:bg-red-700',
        themeToggle:
          'bg-black text-white dark:bg-white dark:text-black dark:border-white',
        light: 'bg-white text-black border-black',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Button 컴포넌트에 전달 가능한 props
 * - variant: 'primary' | 'outline' | 'ghost' | 'themeToggle' | 'light'
 * - size: 'sm' | 'md' | 'lg'
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className = '', children, ...props }, ref) => {
    const mergedClasses = useMemo(
      () => clsx(buttonVariants({ variant, size }), className),
      [variant, size, className]
    );

    return (
      <button
        ref={ref}
        type="button"
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
