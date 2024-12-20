import * as React from "react"

import { cn } from '@src/shared/lib/utils/cn';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, maxLength, ...props }, ref) => {
    return (
      <input
        type={type}
        maxLength={maxLength}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-base focus:shadow-sm focus:border-primary-500 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
