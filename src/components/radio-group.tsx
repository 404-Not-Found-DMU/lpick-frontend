import * as React from "react"
import { ssl } from "@/utils/classNames"

interface RadioGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  name: string
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <fieldset ref={ref} className={ssl("grid gap-2", className)} {...props}>
        {children}
      </fieldset>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          ref={ref}
          className={ssl(
            "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {label && <span className="text-sm">{label}</span>}
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
