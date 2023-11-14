"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase-client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { HiLogout, HiOutlineLogout, HiUserCircle } from "react-icons/hi";

export default function ProfileDropdown({ user }: { user: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();
    const supabase = supabaseClient();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // setTimeout(() => {
        //     setIsMenuOpen(false);
        // }, 3000);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };
    return (
        <div className="">
            <button
                type="button"
                className={`inline-flex items-center rounded-lg p-2 text-sm ${
                    isMenuOpen ? "bg-surface" : ""
                }`}
                onClick={toggleMenu}
            >
                <HiUserCircle className="w-6 h-6" />
            </button>{" "}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className=" z-20 max-w-md w-60 absolute border-2  border-surface  right-5 top-16 rounded-lg  shadow-xl bg-white"
                            initial={{ opacity: 0, y: "-8%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            exit={{ opacity: 0, y: "-8%" }}
                            onClick={(event) => setIsMenuOpen(false)}
                        >
                            <div className="flex flex-col space-y-1 p-4 border-b">
                                <p className=" font-medium leading-none">
                                    {user?.name}
                                </p>
                                <p className="text-sm leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <Link
                                    href="/user/account"
                                    className="hover:bg-surface w-full px-4 py-3 border-b"
                                >
                                    Account Settings
                                </Link>
                                <div
                                    className="hover:bg-surface flex justify-between items-center w-full px-4 py-3 cursor-pointer"
                                    onClick={handleSignOut}
                                >
                                    <p>Signout</p> <HiOutlineLogout />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
