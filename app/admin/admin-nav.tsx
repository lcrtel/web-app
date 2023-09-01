"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
    HiChevronLeft,
    HiChevronRight,
    HiLogout,
    HiOutlineLogout,
    HiOutlineMenuAlt4,
    HiOutlineX,
    HiUserCircle,
} from "react-icons/hi";
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
import { fetchUserRole } from "@/utils/user";

const AdminNav = ({ userRole, user }: { user: any; userRole: any }) => {
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

    const adminNav = [
        ["Routes", "/admin/routes"],
        ["Connections", "/admin/connections"],
        ["Deals", "/admin/deals"],
        ["Users", "/admin/users"],
        ["Sellers", "/admin/sellers"],
        ["Managers", "/admin/managers"],
        ["Analytics", "/admin/analytics"],
        ["Invoices", "/admin/invoices"],
    ].map(([title, url]) => (
        <li
            key={title}
            className={` ${
                pathname.startsWith(url)
                    ? "bg-primary-500 text-white font-semibold"
                    : "md:hover:bg-white"
            } rounded-lg w-full transition-all ease-in-out`}
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
        <nav className="py-4 pl-3 pr-5 md:py-8 md:px-5 md:h-screen md:w-64 w-full fixed z-10 flex md:flex-col gap-2 items-center md:items-start justify-between  bg-surface">
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
            </button>{" "}
            <div className="flex flex-col gap-10 w-full">
                <div className="flex  md:flex-col items-center justify-center   w-full rounded-xl gap-4">
                    <Image
                        src="/lcrtelcom_logo.svg"
                        className=""
                        alt="LCRTel Logo"
                        width={160}
                        height={20}
                    />
                    <div className="flex justify-center px-4 py-1.5 md:w-full bg-white rounded-full">
                        <h2 className="text-primary-500 font-bold tracking-tight md:text-lg">
                            Admin
                        </h2>
                    </div>
                </div>
                <ul
                    id="scrollContainer"
                    className="md:flex flex-col hidden items-start gap-2.5 text-sm"
                >
                    <li
                        className={` ${
                            pathname === "/admin"
                                ? "bg-primary-500 text-white font-semibold"
                                : "md:hover:bg-white"
                        } rounded-lg w-full transition-all ease-in-out`}
                    >
                        <Link
                            href="/admin"
                            passHref
                            className="py-2 px-3 block whitespace-nowrap"
                        >
                            Home
                        </Link>
                    </li>
                    {adminNav}
                </ul>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="w-64 z-20 md:hidden absolute left-0 top-[68px] h-[calc(100vh-80px)] p-5 shadow-xl bg-white"
                            initial={{ opacity: 0, x: "-10%" }}
                            animate={{ opacity: 1, x: "0%" }}
                            exit={{ opacity: 0, x: "-10%" }}
                        >
                            <ul
                                id="scrollContainer"
                                className="flex flex-col items-start gap-2.5 text-sm text-primary-500"
                                onClick={(event) => setIsMenuOpen(false)}
                            >
                                <li
                                    className={` ${
                                        pathname === "/admin"
                                            ? "bg-primary-500 text-white font-semibold"
                                            : "md:hover:bg-white"
                                    } rounded-lg w-full transition-all ease-in-out`}
                                >
                                    <Link
                                        href="/admin"
                                        passHref
                                        className="py-2 px-3 block whitespace-nowrap"
                                    >
                                        Home
                                    </Link>
                                </li>
                                {adminNav}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-primary-500/20 backdrop-blur w-full md:hidden absolute left-0 top-[68px] h-[calc(100vh-80px)] "
                        ></motion.div>
                    </>
                )}
            </AnimatePresence>
            <div className="md:hidden w-8 h-8">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            className="relative h-8 w-8 rounded-full "
                        >
                            <Avatar className="h-8 w-8">
                                <HiUserCircle className="w-8 h-8 " />
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-48 my-2 mr-2"
                        align="start"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none capitalize">
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
            </div>
            <div className="hidden md:flex gap-2 justify-between w-full mr-2 items-center">
                <div className="flex items-center gap-1.5">
                    <HiUserCircle className="w-8 h-8 " />
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold tracking-tight leading-none capitalize">
                            {user?.first_name}
                        </p>
                        <p className="text-xs leading-none text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <HiOutlineLogout
                    className="w-5 h-5 cursor-pointer"
                    onClick={handleSignOut}
                />
            </div>
        </nav>
    );
};

export default AdminNav;
