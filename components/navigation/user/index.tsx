"use client";
import { CartDropdown } from "@/app/(dashboards)/user/selected_routes/CartDropdown";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import NotificationsPopover from "./NotificationsPopover";
import ProfileDropdown from "./ProfileDropdown";
import { fetchUserData } from "@/utils/user";

const Navigation = () => {
  const pathname = usePathname();
  const [user, setUser]: any = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserData();
      setUser(user);
    };
    fetchUser();
  }, [setUser]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let publicNavItems: [string, any][] = [
    ["Routes", "/user/routes"],
    ["Targets", "/user/targets"],
  ];
  let privateNavItems: [string, any][] = [
    ["My Routes", "/user/my-routes"],
    ["My Targets", "/user/my-targets"],
    ["Purchases", "/user/purchases"],
  ];
  const Nav = () => {
    return (
      <>
        {publicNavItems.map(([title, url]) => (
          <li
            key={title}
            className={` ${
              pathname.startsWith(url)
                ? "border bg-slate-50 font-semibold"
                : "lg:hover:bg-slate-50"
            } m-1 rounded-full duration-150 ease-in active:scale-[95%]`}
          >
            <Link
              href={url}
              passHref
              className="block whitespace-nowrap px-4 py-2"
            >
              {title}
            </Link>
          </li>
        ))}
        {user &&
          privateNavItems.map(([title, url]) => (
            <li
              key={title}
              className={` ${
                pathname.startsWith(url)
                  ? "border bg-slate-50 font-semibold"
                  : "lg:hover:bg-slate-50"
              } m-1 rounded-full duration-150 ease-in active:scale-[95%]`}
            >
              <Link
                href={url}
                passHref
                className="block whitespace-nowrap px-4 py-2"
              >
                {title}
              </Link>
            </li>
          ))}
      </>
    );
  };

  // ["Transactions", "/user/transactions"],

  return (
    <nav className="relative mx-2 mt-2 flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 md:mx-auto md:pr-4 md:pl-5">
      <div className="flex h-8 items-center">
        <Link href="/user" passHref>
          <Image
            src="/lcrtelcom_logo.svg"
            className=""
            alt="LCRTel Logo"
            width={160}
            height={20}
          />
        </Link>
        <div className="ml-5 hidden w-full overflow-x-auto bg-white md:block">
          <nav className="mx-auto flex max-w-8xl flex-col gap-2.5">
            <ul
              id="scrollContainer"
              className="flex items-center gap-2.5 text-sm text-primary-500"
            >
              {user && (
                <li
                  className={` ${
                    pathname === "/user"
                      ? "border bg-slate-50 font-semibold"
                      : "lg:hover:bg-slate-50"
                  } m-1 rounded-full duration-150 ease-in active:scale-[95%]`}
                >
                  <Link
                    href="/user"
                    passHref
                    className="block whitespace-nowrap px-4 py-2"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <Nav />
            </ul>
          </nav>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute left-0 top-[80px] z-10 w-full bg-white  p-5 shadow-xl md:hidden rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ul
                id="scrollContainer"
                className="flex flex-col items-start gap-2.5 text-sm text-primary-500"
                onClick={(event) => setIsMenuOpen(false)}
              >
                {user && (
                  <li
                    className={` ${
                      pathname === "/user"
                        ? "border bg-slate-50 font-semibold"
                        : "lg:hover:bg-slate-50"
                    } m-1 rounded-full duration-150 ease-in active:scale-[95%]`}
                  >
                    <Link
                      href="/user"
                      passHref
                      className="block whitespace-nowrap px-3 py-2"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <Nav />
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {user && (
        <div className="flex items-center gap-2">
          <NotificationsPopover />
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
      )}
    </nav>
  );
};

export default Navigation;
