"use client";
import { Separator } from "@/components/ui/separator";
import { supabaseClient } from "@/lib/supabase-client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import ProfileDropdown from "./ProfileDropdown";
import { CartDropdown } from "./selected_routes/CartDropdown";

const Navigation = ({ userRole, user }: { user: any; userRole: any }) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const router = useRouter();
    const supabase = supabaseClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    const Nav = [
        ["Market", "/user/market"],
        ["My Offers", "/user/routes/offers"],
        ["My Targets", "/user/routes/targets"],
        ["Connections", "/user/connections"],
        // ["Transactions", "/user/transactions"],
    ].map(([title, url]) => (
        <li
            key={title}
            className={` ${
                pathname.startsWith(url)
                    ? "bg-surface shadow shadow-gray-200  font-semibold"
                    : "lg:hover:bg-surface"
            } rounded-full m-1`}
        >
            <Link
                href={url}
                passHref
                className="py-2 px-4 block whitespace-nowrap"
            >
                {title}
            </Link>
        </li>
    ));

    return (
        <nav className="py-3 px-8 max-w-8xl mx-auto relative flex items-center justify-between">
            <div className="flex items-center h-8">
                <Link href="/user" passHref>
                    <Image
                        src="/lcrtelcom_logo.svg"
                        className=""
                        alt="LCRTel Logo"
                        width={160}
                        height={20}
                    />
                </Link>
                <Separator
                    orientation="vertical"
                    className="hidden md:block mx-5"
                />
                <div className="bg-white hidden md:block w-full overflow-x-auto">
                    <nav className="mx-auto flex flex-col gap-2.5 max-w-8xl">
                        <ul
                            id="scrollContainer"
                            className="flex items-center gap-2.5 text-sm text-primary-500"
                        >
                            <li
                                className={` ${
                                    pathname === "/user"
                                        ? "bg-surface shadow shadow-gray-200  font-semibold"
                                        : "lg:hover:bg-surface"
                                } rounded-full m-1`}
                            >
                                <Link
                                    href="/user"
                                    passHref
                                    className="py-2 px-4 block whitespace-nowrap"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {Nav}
                        </ul>
                    </nav>
                </div>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="w-full z-10 md:hidden absolute left-0 top-[80px]  p-5 shadow-xl bg-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ul
                                id="scrollContainer"
                                className="flex flex-col items-start gap-2.5 text-sm text-primary-500"
                                onClick={(event) => setIsMenuOpen(false)}
                            >
                                <li
                                    className={` ${
                                        pathname === "/user"
                                            ? "bg-surface shadow shadow-gray-200  font-semibold"
                                            : "lg:hover:bg-surface"
                                    } rounded-md`}
                                >
                                    <Link
                                        href="/user"
                                        passHref
                                        className="py-2 px-3 block whitespace-nowrap"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                {Nav}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
                <CartDropdown />
                <ProfileDropdown user={user} />
                <button
                    type="button"
                    className="inline-flex items-center rounded-lg p-2 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-300 md:hidden"
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                        <HiOutlineX className="h-5 w-5 text-primary-500" />
                    ) : (
                        <HiOutlineMenuAlt4 className="h-5 w-5 text-primary-500" />
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
