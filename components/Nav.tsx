"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav() {
    const ref = useRef<HTMLElement>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const pathname = usePathname();

    return (
        <motion.header ref={ref}>
            <motion.div
                initial={false}
                animate={isIntersecting ? "intersecting" : "notIntersecting"}
                variants={{
                    intersecting: {
                        backgroundColor: "rgb(0 104 255 / 0)",
                        borderBottom: "1px solid rgb(255 255 255 / 0)",
                        paddingBottom: 20,
                        paddingTop: 20,
                    },
                    notIntersecting: {
                        backgroundColor: "rgb(255 255 255 / 0.5)",
                        borderBottom: "1px solid rgb(255 255 255 / 1)",
                        paddingBottom: 10,
                        paddingTop: 10,
                    },
                }}
                className={`fixed inset-x-0 top-0 z-50 border  ${
                    isIntersecting ? null : "backdrop-blur drop-shadow-lg "
                }`}
            >
                <div className=" mx-auto flex max-w-8xl flex-wrap items-center justify-between px-5 py-2">
                    <Link passHref href="/" className="">
                        <Image
                            src="/lcrtelcom_logo.svg"
                            className="mr-3"
                            alt="LCRTel Logo"
                            width={160}
                            height={32}
                        />
                    </Link>
                    <div className="flex md:order-2">
                        <Link
                            href="/auth/login"
                            className="mr-3 hidden rounded-full px-4 py-2 text-center text-sm font-medium text-primary-900 focus:outline-none focus:ring-4 focus:ring-blue-300 md:block "
                        >
                            Log in
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="mr-3 rounded-full bg-primary-900 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 "
                        >
                            Sign up
                        </Link>

                        <button
                            type="button"
                            className="inline-flex items-center rounded-lg p-2 text-sm  focus:outline-none focus:ring-2 focus:ring-blue-300 md:hidden"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <HiOutlineX className="h-5 w-5 text-primary-900" />
                            ) : (
                                <HiOutlineMenuAlt4 className="h-5 w-5 text-primary-900" />
                            )}
                        </button>
                    </div>
                    {pathname === "/" && (
                        <>
                            <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
                                <ul className="flex w-full flex-col rounded-lg border p-4 font-medium text-primary-900  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0">
                                    {/* <li>
                                        <ScrollLink
                                            to="home"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                            className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold md:p-0"
                                        >
                                            Home
                                        </ScrollLink>
                                    </li>
                                    <li>
                                        <ScrollLink
                                            to="features"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                            className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold md:p-0"
                                        >
                                            Features
                                        </ScrollLink>
                                    </li>
                                    <li>
                                        <ScrollLink
                                            to="faq"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                            className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold md:p-0"
                                        >
                                            FAQ
                                        </ScrollLink>
                                    </li>
                                    <li>
                                        <ScrollLink
                                            to="contact"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                            className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold md:p-0"
                                        >
                                            Contact
                                        </ScrollLink>
                                    </li> */}
                                </ul>
                            </div>
                            <MobileNav
                                isMenuOpen={isMenuOpen}
                                setIsMenuOpen={setIsMenuOpen}
                            />
                        </>
                    )}
                </div>
            </motion.div>
        </motion.header>
    );
}

const MobileNav = ({
    isMenuOpen,
    setIsMenuOpen,
}: {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: SetStateAction<boolean>) => void;
}) => {
    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "-10" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-10" }}
                    className="w-full items-center absolute left-0 right-0 top-[72px] justify-between md:order-1 md:hidden md:w-auto"
                >
                    <ul
                        className={` w-full gap-5 flex-col border border-gray-100 shadow-2xl bg-white p-4 font-medium text-gray-400`}
                    >
                        <li>
                            <li>
                                <ScrollLink
                                    to="home"
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold md:p-0"
                                >
                                    Home
                                </ScrollLink>
                            </li>
                            <ScrollLink
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                to="market"
                                spy={true}
                                smooth={true}
                                duration={500}
                                className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold"
                            >
                                Rates
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                to="features"
                                spy={true}
                                smooth={true}
                                duration={500}
                                className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold"
                            >
                                Features
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                to="faq"
                                spy={true}
                                smooth={true}
                                duration={500}
                                className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold"
                            >
                                FAQ
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                to="contact"
                                spy={true}
                                smooth={true}
                                duration={500}
                                className="block rounded py-2 pl-3 pr-4 cursor-pointer hover:font-semibold"
                            >
                                Contact
                            </ScrollLink>
                        </li>
                        <div
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                            }}
                        >
                            <Link
                                href="/auth/login"
                                className="block rounded py-2 pl-3 pr-4 cursor-pointer text-primary-900 hover:font-semibold"
                            >
                                Log in
                            </Link>
                        </div>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
