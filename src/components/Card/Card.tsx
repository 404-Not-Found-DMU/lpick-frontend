import React from 'react'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${className}`}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col space-y-1.5 p-6 ${className}`}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-lg font-semibold leading-none tracking-tight ${className}`}
        {...props}
      />
    )
  }
)

CardTitle.displayName = 'CardTitle'

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-6 pt-0 ${className}`}
        {...props}
      />
    )
  }
)

CardContent.displayName = 'CardContent' 