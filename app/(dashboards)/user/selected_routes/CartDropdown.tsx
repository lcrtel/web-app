"use client";

import { buttonVariants } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi";

export function CartDropdown({ items }: { items: any[] | null }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="">
            <button
                type="button"
                className={`inline-flex relative items?-center rounded-lg p-2 text-sm ${
                    isMenuOpen ? "bg-surface" : ""
                }`}
                onClick={toggleMenu}
            >
                <div className="bg-surface w-5 h-5 flex items?-center justify-center text-xs rounded-full absolute -top-[2px] -right-[2px]">
                    {items?.length}
                </div>
                <FaCartShopping className="w-5 h-5" />
            </button>{" "}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className=" z-20 max-w-md min-w-[250px] absolute border  right-5 top-16 rounded-xl p-4 shadow-xl bg-slate-50"
                            initial={{ opacity: 0, y: "-8%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            exit={{ opacity: 0, y: "-8%" }}
                            onClick={(event) => setIsMenuOpen(false)}
                            onMouseLeave={(event) => setIsMenuOpen(false)}
                        >
                            <h3 className="text-lg tracking-tight mb-2 font-bold">
                                Cart
                            </h3>
                            {items?.length ? (
                                <div className="grid gap-2 mb-2">
                                    {items?.map((route: any) => (
                                        <div
                                            key={route.id}
                                            className=" px-3 py-1 bg-white border flex gap-2 justify-between rounded-full font-medium uppercase"
                                        >
                                            <p className=" ">
                                                {route?.routes?.destination} -{" "}
                                                {route?.routes?.route_type}
                                            </p>
                                            <p>
                                                ${route?.routes?.selling_rate}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-4">
                                    <p className="font-medium tracking-tight text-center text-slate-400">
                                        Empty
                                    </p>
                                </div>
                            )}

                            {items?.length ? (
                                <Link
                                    href="/user/selected_routes"
                                    className={`${buttonVariants({
                                        variant: "secondary",
                                        size: "sm",
                                    })} w-full gap-2 mt-2`}
                                >
                                    View All{" "}
                                    <HiArrowRight className="w-4 h-4" />
                                </Link>
                            ) : null}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
