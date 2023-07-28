import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-lg  bg-primary-50 focus-visible:bg-white hover:bg-white px-3 py-2 text-sm ring-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:border focus-visible:outline-none focus-visible:border-gray-400 focus-visible:ring-4 focus-visible:ring-primary-50 hover:ring-2 hover:ring-primary-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-primary-950 dark:ring-primary-950 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-800 transition-all ease-in-out duration-300",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
