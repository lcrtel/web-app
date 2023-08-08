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
    HiUserCircle,
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

const Navigation = ({
    userRole,
    user,
}: {
    user: User | undefined;
    userRole: any;
}) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const router = useRouter();
    const supabase = supabaseClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const buyerNav = [
        ["Routes", "/user/routes"],
        ["Trade History", "/user/trade-history"],
        ["Transactions", "/user/transactions"],
    ].map(([title, url]) => (
        <li
            key={title}
            className={` ${
                pathname.startsWith(url)
                    ? "bg-surface shadow shadow-gray-200  font-semibold"
                    : "lg:hover:bg-surface"
            } rounded-md`}
        >
            <Link
                href={url}
                passHref
                className="py-2 px-3 block whitespace-nowrap"
            >
                {title}
            </Link>
        </li>
    ));
    const sellerNav = [
        ["Routes", "/dashboard/routes"],
        ["Trade History", "/dashboard/user/trade-history"],
        ["Transactions", "/dashboard/user/transactions"],
    ].map(([title, url]) => (
        <li
            key={title}
            className={` ${
                pathname.startsWith(url)
                    ? "bg-surface shadow shadow-gray-200  font-semibold"
                    : "lg:hover:bg-surface"
            } rounded-md`}
        >
            <Link
                href={url}
                passHref
                className="py-2 px-3 block whitespace-nowrap"
            >
                {title}
            </Link>
        </li>
    ));

    return (
        <nav className="py-4 px-8 max-w-8xl mx-auto relative flex items-center justify-between">
            <div className="flex items-center h-8">
                <Image
                    src="/lcrtelcom_logo.svg"
                    className=""
                    alt="LCRTel Logo"
                    width={160}
                    height={20}
                />
                <Separator
                    orientation="vertical"
                    className="hidden md:block mx-5"
                />
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
                                        pathname === "/dashboard"
                                            ? "bg-surface shadow shadow-gray-200  font-semibold"
                                            : "lg:hover:bg-surface"
                                    } rounded-md`}
                                >
                                    <Link
                                        href="/dashboard"
                                        passHref
                                        className="py-2 px-3 block whitespace-nowrap"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                {userRole === "buyer" && buyerNav}
                                {userRole === "seller" && sellerNav}
                            </ul>
                        </div>
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
                                        pathname === "/dashboard"
                                            ? "bg-surface shadow shadow-gray-200  font-semibold"
                                            : "lg:hover:bg-surface"
                                    } rounded-md`}
                                >
                                    <Link
                                        href="/dashboard"
                                        passHref
                                        className="py-2 px-3 block whitespace-nowrap"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                {userRole === "buyer" && buyerNav}
                                {userRole === "seller" && sellerNav}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
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
                                    {user?.first_name}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                Account
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleSignOut}
                        >
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
