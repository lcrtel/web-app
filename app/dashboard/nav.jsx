"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
    HiChevronLeft,
    HiChevronRight,
    HiOutlineMenuAlt4,
    HiOutlineX,
} from "react-icons/hi";
import { Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    createClientComponentClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabaseClient } from "@/lib/supabase-client";

const Navigation = (props) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const user = props.user;

    const router = useRouter();
    const supabase = supabaseClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <nav className="py-4 px-8 max-w-8xl mx-auto flex items-center justify-between">
            <div className="flex space-x-4 h-8">
                <Image
                    src="/lcrtelcom_logo.svg"
                    className="mr-3"
                    alt="LCRTel Logo"
                    width={160}
                    height={20}
                />
                <Separator orientation="vertical" />
                <div className="bg-white hidden md:block w-full">
                    {/* Navigation */}
                    <nav className="mx-auto flex flex-col gap-2.5 max-w-8xl">
                        {/* user Dashboard header */}

                        {/* Navigation links */}
                        <div className="flex relative items-center">
                            <ul
                                id="scrollContainer"
                                className="flex items-center gap-2.5 text-sm text-primary-500"
                            >
                                <li
                                    className={` ${
                                        pathname.includes("/dashboard/routes")
                                            ? "bg-surface shadow shadow-gray-200  font-semibold"
                                            : "lg:hover:bg-surface"
                                    } rounded-md`}
                                >
                                    {/* Link to the specified URL */}
                                    <Link
                                        href="/dashboard/routes/buy"
                                        passHref
                                        className="py-2 px-3 block whitespace-nowrap  "
                                    >
                                        Routes
                                    </Link>
                                </li>
                                <li
                                    className={` ${
                                        pathname.includes(
                                            "/dashboard/trade-history"
                                        )
                                            ? "bg-surface shadow shadow-gray-200  font-semibold"
                                            : "lg:hover:bg-surface"
                                    } rounded-md`}
                                >
                                    {/* Link to the specified URL */}
                                    <Link
                                        href="/dashboard/trade-history"
                                        passHref
                                        className="py-2 px-3 block rounded-md lg:hover:bg-primary-500 whitespace-nowrap lg:hover:bg-opacity-5 "
                                    >
                                        Trade History
                                    </Link>
                                </li>
                                <li
                                    className={` ${
                                        pathname.includes(
                                            "/dashboard/transactions"
                                        )
                                            ? "bg-surface shadow shadow-gray-200  font-semibold"
                                            : "lg:hover:bg-surface"
                                    } rounded-md`}
                                >
                                    {/* Link to the specified URL */}
                                    <Link
                                        href="/dashboard/transactions"
                                        passHref
                                        className="py-2 px-3 block rounded-md lg:hover:bg-primary-500 whitespace-nowrap lg:hover:bg-opacity-5 "
                                    >
                                        Transactions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="w-full z-10 md:hidden absolute left-0 top-[56px]  p-5 shadow-xl bg-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ul
                                id="scrollContainer"
                                className="flex flex-col items-start gap-2.5 text-sm text-primary-500"
                            >
                                <li
                                    onClick={setIsMenuOpen(false)}
                                    className={` ${
                                        pathname.includes("/dashboard/routes")
                                            ? "bg-surface rounded-md font-semibold"
                                            : ""
                                    } w-full `}
                                >
                                    {/* Link to the specified URL */}
                                    <Link
                                        href="/dashboard/routes/buy"
                                        passHref
                                        className="py-2 px-3 block rounded-md lg:hover:bg-primary-500 whitespace-nowrap lg:hover:bg-opacity-5 "
                                    >
                                        Routes
                                    </Link>
                                </li>
                                <li
                                    onClick={setIsMenuOpen(false)}
                                    className={` ${
                                        pathname.includes(
                                            "/dashboard/trade-history"
                                        )
                                            ? "bg-surface rounded-md font-semibold"
                                            : ""
                                    } w-full `}
                                >
                                    {/* Link to the specified URL */}
                                    <Link
                                        href="/dashboard/trade-history"
                                        passHref
                                        className="py-2 px-3 block rounded-md lg:hover:bg-primary-500 whitespace-nowrap lg:hover:bg-opacity-5 "
                                    >
                                        Trade History
                                    </Link>
                                </li>
                                <li
                                    onClick={setIsMenuOpen(false)}
                                    className={` ${
                                        pathname.includes(
                                            "/dashboard/transactions"
                                        )
                                            ? "bg-surface rounded-md font-semibold"
                                            : ""
                                    } w-full `}
                                >
                                    {/* Link to the specified URL */}
                                    <Link
                                        href="/dashboard/transactions"
                                        passHref
                                        className="py-2 px-3 block rounded-md lg:hover:bg-primary-500 whitespace-nowrap lg:hover:bg-opacity-5 "
                                    >
                                        Transactions
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-8 w-8 rounded-full"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/blue_wave_bg.jpg" alt="" />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {user !== null ? user[0].first_name : ""}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user !== null ? user[0].email : ""}
                                </p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>New Team</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
