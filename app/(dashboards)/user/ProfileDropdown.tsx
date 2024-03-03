"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineLogout, HiUserCircle } from "react-icons/hi";
import { signOut } from "./_actions/userActions";
import toast from "react-hot-toast";

export default function ProfileDropdown({ user }: { user: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            toast.error(error.message);
            return;
        }
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
                            className=" z-20 max-w-md w-60 absolute border  right-5 top-16 rounded-lg  shadow-xl bg-white overflow-clip"
                            initial={{ opacity: 0, y: "-8%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            exit={{ opacity: 0, y: "-8%" }}
                            onClick={(event) => setIsMenuOpen(false)}
                            onMouseLeave={(event) => setIsMenuOpen(false)}
                        >
                            <div className="flex flex-col space-y-1 p-4 border-b">
                                <p className=" font-medium leading-none">
                                    {user.user_metadata?.name}
                                </p>
                                <p className="text-sm leading-none text-muted-foreground">
                                    {user.user_metadata?.email}
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
                                    className="hover:bg-surface  flex justify-between items-center w-full px-4 py-3 cursor-pointer"
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
