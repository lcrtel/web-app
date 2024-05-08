"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { HiChevronDown, HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: any;
        title: string;
    }[];
}

export function DropDownMenu({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className="relative md:hidden">
            <button
                type="button"
                className={`w-full relative z-30 justify-between mb-4  ${buttonVariants({variant: "secondary"})}`}
                onClick={toggleMenu}
            >
                <p className="h-5">{items.find((item) => item.href === pathname)?.title}</p>
                <span className="sr-only">Open main menu</span>
              
                    <HiChevronDown className={`h-5 w-5 text-primary-500 duration-150 ease-in ${isMenuOpen ? " rotate-180" : ""}`} />
                
            </button>{" "}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className=" z-20 md:hidden absolute w-full flex flex-col gap-2 right-0 top-11 border rounded-lg p-4 shadow-xl bg-white"
                            initial={{ opacity: 0, y: "-10%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            exit={{ opacity: 0, y: "-10%" }}
                            onClick={(event) => setIsMenuOpen(false)}
                        >
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        pathname === item.href
                                            ? "bg-surface hover:bg-none"
                                            : "hover:bg-transparent hover:underline",
                                        "justify-start w-full"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
