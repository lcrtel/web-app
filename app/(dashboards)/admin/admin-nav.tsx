"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiOutlineLogout,
  HiOutlineMenuAlt4,
  HiOutlineX,
  HiUserCircle,
} from "react-icons/hi";

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

  let adminNav: [string, any][] = [
    ["Route Offers", "/admin/routes"],
    ["Buying Targets", "/admin/requests"],
    ["Clients", "/admin/clients"],
    ["Vendors", "/admin/vendors"],
    ["Agents", "/admin/agents"],
    ["Invoices", "/admin/invoices"],
    ["Config", "/admin/config"],
  ];

  adminNav.map(([title, url]) => (
    <li
      key={title}
      className={` ${
        pathname.startsWith(url)
          ? "bg-primary-500 font-semibold text-white"
          : "md:hover:bg-white"
      } w-full rounded-full transition-all ease-in-out`}
    >
      <Link href={url} passHref className="block whitespace-nowrap px-4 py-2">
        {title}
      </Link>
    </li>
  ));
  return (
    <nav className="fixed z-40 flex w-full items-center justify-between gap-2 bg-surface py-4 pl-3 pr-5 md:h-screen md:w-64 md:flex-col md:items-start md:px-5  md:py-8">
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
      <div className="flex w-full flex-col gap-10">
        <div className="flex  w-full items-center justify-center   gap-4 rounded-xl md:flex-col">
          <Link passHref href="/admin" className="">
            <Image
              src="/lcrtelcom_logo.svg"
              className="mr-3"
              alt="LCRTel Logo"
              width={160}
              height={32}
            />
          </Link>
          <div className="flex justify-center rounded-full bg-white px-4 py-1.5 md:w-full">
            <h2 className="font-bold tracking-tight text-primary-500 md:text-lg">
              Admin
            </h2>
          </div>
        </div>
        <ul
          id="scrollContainer"
          className="hidden flex-col items-start gap-2.5 text-sm md:flex "
        >
          <li
            className={` ${
              pathname === "/admin"
                ? "bg-primary-500 font-semibold text-white"
                : "md:hover:bg-white"
            } w-full rounded-full transition-all ease-in-out`}
          >
            <Link
              href="/admin"
              passHref
              className="block whitespace-nowrap px-4 py-2"
            >
              Dashboard
            </Link>
          </li>
          {adminNav}
        </ul>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="absolute left-0 top-[68px] z-30 h-[calc(100vh-80px)] w-64 bg-white p-5 shadow-xl md:hidden"
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
                      ? "bg-primary-500 font-semibold text-white"
                      : "md:hover:bg-white"
                  } w-full rounded-lg transition-all ease-in-out`}
                >
                  <Link
                    href="/admin"
                    passHref
                    className="block whitespace-nowrap px-3 py-2"
                  >
                    Dashboard
                  </Link>
                </li>
                {adminNav}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-[68px] h-[calc(100vh-80px)] w-full bg-primary-500/20 backdrop-blur md:hidden "
            ></motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-8 w-8 md:hidden ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="relative h-8 w-8 rounded-full "
            >
              <Avatar className="h-8 w-8">
                <HiUserCircle className="h-8 w-8 " />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="my-2 mr-2 w-48 "
            align="start"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium capitalize leading-none">
                  {user?.name}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

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
      <div className="mr-2 hidden w-full items-center justify-between gap-2 md:flex">
        <div className="flex items-center gap-1.5">
          <HiUserCircle className="h-8 w-8 " />
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold capitalize leading-none tracking-tight">
              {user?.name}
            </p>
            <p className="text-xs leading-none text-gray-500">{user?.email}</p>
          </div>
        </div>
        <HiOutlineLogout
          className="h-5 w-5 cursor-pointer"
          onClick={handleSignOut}
        />
      </div>
    </nav>
  );
};

export default AdminNav;
