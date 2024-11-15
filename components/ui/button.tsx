import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex active:scale-[98%] hover:scale-[102%] transition-all ease-in-out items-center justify-center duration-150 rounded-full whitespace-nowrap text-sm font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-primary-950 dark:focus-visible:ring-primary-800 active:scale-[98%]",
    {
        variants: {
            variant: {
                default:
                    "bg-primary-900 text-primary-50 hover:bg-primary-900/90 dark:bg-primary-50 dark:text-primary-900 dark:hover:bg-primary-50/90 ",
                destructive:
                    "bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 text-white hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
                destructiveOutline:
                    "bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 text-red-500 hover:bg-red-100/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
                outline:
                    "border border-gray-200 bg-white hover:bg-primary-50 hover:text-primary-900 dark:border-primary-800 dark:bg-primary-950 dark:hover:bg-primary-800 dark:hover:text-primary-50",
                secondary:
                    "bg-primary-50 text-primary-900 hover:bg-primary-50/80 dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-800/80",
                ghost: "hover:bg-primary-50 hover:text-primary-900 dark:hover:bg-primary-800 dark:hover:text-primary-50",
                link: "text-primary-900 underline-offset-4 hover:underline dark:text-primary-50",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-full px-3",
                lg: "h-11 rounded-full px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
