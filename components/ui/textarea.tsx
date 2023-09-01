import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-lg border border-gray-200 bg-primary-50 focus-visible:bg-white hover:bg-white px-3 py-2 text-sm ring-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:border focus-visible:outline-none focus-visible:border-gray-400 focus-visible:ring-4 focus-visible:ring-primary-50 hover:ring-2 hover:ring-primary-50 disabled:cursor-not-allowed disabled:opacity-50  transition-all ease-in-out duration-300",
                className
            )}
            ref={ref}
            {...props}
        />
    );
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
