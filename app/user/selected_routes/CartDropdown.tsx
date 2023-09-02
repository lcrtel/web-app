"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase-client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

export function CartDropdown() {
    const supabase = supabaseClient();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState<any>([]);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setTimeout(() => {
            setIsMenuOpen(false);
        }, 2000);
    };
    useEffect(() => {
        const fetchCartItems = async () => {
            const { data: user } = await supabase.auth.getUser();
            const { data: selectedRoutes, error } = await supabase
                .from("selected_routes")
                .select(`*, route_offers (*)`)
                .eq("user_id", user?.user?.id);
            if (selectedRoutes) {
                setCartItems(selectedRoutes);
            }
        };

        const selectedRoutes = supabase
            .channel("realtime-cart")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "selected_routes" },
                async () => {
                    const { data: user } = await supabase.auth.getUser();
                    const { data: selectedRoutes, error } = await supabase
                        .from("selected_routes")
                        .select(`*, route_offers (*)`)
                        .eq("user_id", user?.user?.id);
                    setIsMenuOpen(true);
                    router.refresh();
                    setTimeout(() => {
                        setIsMenuOpen(false);
                    }, 1000);
                    if (selectedRoutes) {
                        setCartItems(selectedRoutes);
                    }
                }
            )
            .subscribe();
        fetchCartItems();
        return () => {
            supabase.removeChannel(selectedRoutes);
        };
    }, [supabase, router]);
    return (
        <div className="">
            <button
                type="button"
                className={`inline-flex items-center rounded-lg p-2 text-sm ${
                    isMenuOpen ? "bg-surface" : ""
                }`}
                onClick={toggleMenu}
            >
                <FaCartShopping className="w-5 h-5" />
            </button>{" "}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className=" z-20 max-w-md w-60 absolute border-2  border-surface  right-5 top-16 rounded-lg p-4 shadow-xl bg-white"
                            initial={{ opacity: 0, y: "-8%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            exit={{ opacity: 0, y: "-8%" }}
                            onClick={(event) => setIsMenuOpen(false)}
                        >
                            <h3 className="text-lg tracking-tight mb-2 font-bold">
                                Selected Routes
                            </h3>
                            {cartItems.length ? (
                                <div className="grid gap-2 mb-2">
                                    {cartItems.map((route: any) => (
                                        <div
                                            key={route.id}
                                            className=" px-2 py-1 bg-surface shadow-sm flex gap-2 justify-between rounded-md font-medium"
                                        >
                                            <p>
                                                {
                                                    route?.route_offers
                                                        ?.destination
                                                }{" "}
                                                -{" "}
                                                {
                                                    route?.route_offers
                                                        ?.route_type
                                                }
                                            </p>
                                            <p>
                                                $
                                                {
                                                    route?.route_offers
                                                        ?.selling_rate
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-4">
                                    <p className="font-medium tracking-tight text-center text-slate-400">
                                        No Route Selected
                                    </p>
                                </div>
                            )}

                            {cartItems.length ? (
                                <Link
                                    href="/user/selected_routes"
                                    className={`${buttonVariants({
                                        variant: "default",
                                    })} w-full`}
                                >
                                    View All
                                </Link>
                            ) : null}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
