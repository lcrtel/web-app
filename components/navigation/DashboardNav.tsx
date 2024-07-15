"use client";
import { ArrowRight, ChevronDown, CornerDownRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import NotificationsPopover from "./NotificationsPopover";
import ProfileDropdown from "./ProfileDropdown";

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
  accountPage: string;
  pages: SideNavItem[];
}

export default function DashboardNav({
  user,
  navItems,
}: {
  user: any;
  navItems: NavProps;
}) {
  return (
    <header className="sticky top-2 z-10 mt-2 flex w-full items-center justify-between rounded-full border bg-white py-2 pl-3 pr-2 shadow-2xl shadow-primary-900/20">
      <div className="flex items-center gap-4">
        <Link href={user ? navItems.root.path : "/"} passHref className="-mt-1">
          <Image
            src="/lcrtelcom_logo.svg"
            className=""
            alt="LCRTel Logo"
            width={160}
            height={20}
          />
        </Link>
        <Nav navItems={navItems} />
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <NotificationsPopover />
            <ProfileDropdown accountPage={navItems.accountPage} user={user} />
          </>
        ) : (
          <div className="flex">
            <Link
              href="/auth/login"
              className="mr-3 hidden rounded-full px-4 py-2 text-center text-sm font-medium text-primary-900 focus:outline-none focus:ring-4 focus:ring-blue-300 md:block"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="mr-3 rounded-full bg-primary-900 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Sign up
            </Link>
          </div>
        )}
        <MobileNav navItems={navItems} />
      </div>
    </header>
  );
}

const MobileNav = ({ navItems }: { navItems: NavProps }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col overflow-y-auto">
        <Link
          passHref
          href={navItems.root.path}
          className="flex flex-col items-center justify-center gap-4 px-8 py-5"
        >
          <Image
            src="/lcrtelcom_logo.svg"
            className="mr-3"
            alt="LCRTel Logo"
            width={160}
            height={32}
          />
          <h2 className="w-full rounded-full border border-slate-200 px-3 py-1 text-center text-sm text-slate-500">
            {navItems.root.label}
          </h2>
        </Link>
        {navItems.pages.map((item, idx) => {
          return <MobileMenuItem key={idx} item={item} />;
        })}
      </SheetContent>
    </Sheet>
  );
};
const MobileMenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(() =>
    item.subMenuItems?.some((subItem: any) => subItem.path === pathname),
  );
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <div className="relative w-full">
          <button
            onClick={toggleSubMenu}
            className={`flex w-full flex-row items-center justify-between rounded-full border-[1.5px] border-transparent bg-white px-3.5 py-1.5 ${
              pathname.includes(item.path)
                ? "border-zinc-100"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            <div className="flex flex-row items-center gap-2">
              <span className="flex text-sm font-medium">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown width="16" height="16" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="flex flex-col gap-2 pl-5 pt-2 text-sm">
              {item.subMenuItems?.map((subItem: any, idx) => {
                return (
                  <SheetClose asChild key={idx}>
                    <Link
                      href={subItem.path}
                      className={`relative flex items-center gap-1 ${
                        subItem.path === pathname
                          ? "text-primary-900"
                          : "text-zinc-500"
                      }`}
                    >
                      <CornerDownRight
                        className={`-mt-1 size-4 ${
                          subItem.path === pathname
                            ? "text-primary-900"
                            : "text-zinc-200"
                        }`}
                      />
                      <span>{subItem.title}</span>
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex w-full items-center">
          <SheetClose asChild>
            <Link
              href={item.path as any}
              className={`flex w-full flex-row items-center gap-2 rounded-full border-[1.5px] border-transparent px-3.5 py-1.5 ${
                item.path === pathname
                  ? "border-zinc-100"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              <span className="flex text-sm font-medium">{item.title}</span>
            </Link>
          </SheetClose>
        </div>
      )}
    </div>
  );
};

const Nav = ({ navItems }: { navItems: NavProps }) => {
  return (
    <nav className="mx-auto hidden max-w-8xl flex-col gap-2.5 lg:flex">
      <ul className="flex items-center gap-2.5 text-sm text-primary-900">
        {navItems.pages.map((item, idx) => {
          return <NavMenuItem key={idx} item={item} />;
        })}
      </ul>
    </nav>
  );
};

const NavMenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  return (
    <li>
      {item.submenu ? (
        <DropdownMenu open={subMenuOpen} onOpenChange={setSubMenuOpen}>
          <DropdownMenuTrigger
            asChild
            className={`rounded-full border-[1.5px] border-transparent ${
              pathname.includes(item.path)
                ? "border-zinc-100"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5">
              {item.title}

              <ChevronDown
                width="16"
                height="16"
                className={`${subMenuOpen ? "rotate-180" : ""}`}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl" avoidCollisions>
            {item.subMenuItems?.map((subItem: any, idx) => {
              return (
                <DropdownMenuItem asChild key={idx}>
                  <Link
                    href={subItem.path}
                    className={`relative flex items-center gap-1 ${
                      subItem.path === pathname
                        ? "text-primary-900"
                        : "text-zinc-500"
                    }`}
                  >
                    <ArrowRight
                      className={`size-4 ${
                        subItem.path === pathname
                          ? "text-primary-900"
                          : "text-zinc-400"
                      }`}
                    />
                    <span>{subItem.title}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="relative flex w-full items-center">
          <Link
            href={item.path as any}
            className={`flex w-full flex-row items-center gap-2 rounded-full border-[1.5px] border-transparent px-3.5 py-1.5 ${
              item.path === pathname
                ? "border-zinc-100"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            {/* {item.icon} */}
            <span className="flex text-sm font-medium">{item.title}</span>
          </Link>
        </div>
      )}
    </li>
  );
};
