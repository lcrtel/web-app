"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "./header-mobile";
import { ChevronDown, CornerDownRight, LogOut, User, UserCircle2, UserRound } from "lucide-react";
import Image from "next/image";
import { HiUserCircle } from "react-icons/hi";
import { handleSignOut } from "./actions";
import { Settings03Icon } from "@hugeicons/react-pro";

export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};
export interface NavProps {
    root: {
        label: string;
        path: any;
    };
    pages: SideNavItem[];
}

const SideNav = ({ navItems, user }: { navItems: NavProps, user: any }) => {
    return (
        <div className="md:w-60 bg-white h-screen flex-1 fixed hidden md:flex ">
            <div className="flex flex-col gap-4 w-full h-full">
                <Link
                    passHref
                    href={navItems.root.path}
                    className="flex items-center justify-center gap-4 flex-col py-5 px-8"
                >
                    <Image
                        src="/lcrtelcom_logo.svg"
                        className="mr-3"
                        alt="LCRTel Logo"
                        width={160}
                        height={32}
                    />
                    <h2 className="text-slate-500 text-sm px-3 w-full text-center py-1 rounded-full border border-slate-200">
                        {navItems.root.label}
                    </h2>
                </Link>
                <div className="flex flex-col gap-2 flex-1">
                    {navItems.pages.map((item, idx) => {
                        return <MenuItem key={idx} item={item} />;
                    })}
                </div>
                <div className="hidden md:flex gap-2 justify-between w-full p-5 items-center">
                    <div className="flex items-center gap-1.5">
                        <UserRound className="w-4 h-4 " />
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-semibold tracking-tight leading-none capitalize">
                                {user?.name}
                            </p>
                            <p className="text-xs leading-none text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <Settings03Icon
                        size={24}
                        color={"#000000"}
                        variant={"stroke"}
                    />
                    <LogOut
                        className="w-5 h-5 cursor-pointer"
                        onClick={(e) => handleSignOut()}
                    />
                </div>
            </div>
        </div>
    );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
    const pathname = usePathname();
     const [subMenuOpen, setSubMenuOpen] = useState(() =>
         item.subMenuItems?.some((subItem: any) => subItem.path === pathname)
     );
    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    return (
        <div className="">
            {item.submenu ? (
                <div className="relative w-full px-5">
                    <button
                        onClick={toggleSubMenu}
                        className={`flex flex-row items-center border-[1.5px] border-transparent bg-white relative z-10 px-3.5 py-1.5 rounded-full hover-bg-zinc-100 w-full justify-between ${
                            pathname.includes(item.path)
                                ? "border-zinc-100"
                                : "hover:bg-zinc-100 text-zinc-400"
                        }`}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            {item.icon}
                            <span className="font-medium text-sm  flex">
                                {item.title}
                            </span>
                        </div>

                        <div
                            className={`${
                                subMenuOpen ? "rotate-180" : ""
                            } flex`}
                        >
                            <ChevronDown width="16" height="16" />
                        </div>
                    </button>

                    {subMenuOpen && (
                        <div className="flex flex-col gap-2 text-sm pt-2 pl-5">
                            {item.subMenuItems?.map((subItem: any, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        href={subItem.path}
                                        className={`flex relative items-center gap-1 ${
                                            subItem.path === pathname
                                                ? "text-primary-500"
                                                : "text-zinc-400"
                                        }`}
                                    >
                                        <CornerDownRight
                                            className={`size-4 -mt-1 ${
                                                subItem.path === pathname
                                                    ? "text-primary-500"
                                                    : "text-zinc-200"
                                            }`}
                                        />
                                        {/* <div
                                            className={`-z-[1] absolute left-[2.2px] -top-5 w-[1.2px]  h-7 ${
                                                subItem.path === pathname
                                                    ? "bg-primary-500"
                                                    : "bg-zinc-200"
                                            }`}
                                        /> */}
                                        <span>{subItem.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                    { pathname.includes(item.path) && (
                        <span className="w-1 h-5 bg-primary-500 rounded-r-[4px] absolute left-0 top-2" />
                    )}
                </div>
            ) : (
                <div className="relative w-full flex items-center px-5">
                    <Link
                        href={item.path as any}
                        className={`flex flex-row w-full gap-2 border-[1.5px] border-transparent items-center px-3.5 py-1.5 rounded-full ${
                            item.path === pathname
                                ? " border-zinc-100"
                                : "hover:bg-zinc-100 text-zinc-400"
                        }`}
                    >
                        {item.icon}
                        <span className="font-medium text-sm flex">
                            {item.title}
                        </span>
                    </Link>
                    {item.path === pathname && (
                        <span className="w-1 h-5 bg-primary-500 rounded-r-[4px] absolute left-0" />
                    )}
                </div>
            )}
        </div>
    );
};
