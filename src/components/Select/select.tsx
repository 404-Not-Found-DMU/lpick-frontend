import * as React from 'react'
import { ssl } from '@/utils/classNames'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  id?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, id, children, ...props }, ref) => {
    const selectId = React.useId()
    const resolvedId = id || selectId
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={resolvedId} className="block text-sm font-medium mb-2">
            {label}
          </label>
        )}
        <select
          id={resolvedId}
          ref={ref}
          className={ssl(
            'w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-lavender-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'


