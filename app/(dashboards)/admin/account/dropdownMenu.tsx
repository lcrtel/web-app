"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

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
        <div className="relative">
            <button
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-300 md:hidden"
                onClick={toggleMenu}
            >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                    <HiOutlineX className="h-5 w-5 text-primary-900" />
                ) : (
                    <HiOutlineMenuAlt3 className="h-5 w-5 text-primary-900" />
                )}
            </button>{" "}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className=" z-20 md:hidden absolute right-0 top-10 rounded-lg p-5 shadow-xl bg-white"
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
                                        "justify-start"
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
