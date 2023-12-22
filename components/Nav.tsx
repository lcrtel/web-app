"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import Link from "next/link";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className={`fixed left-0 right-0 top-0 z-20 ${
                scrolled
                    ? "bg-secondary bg-opacity-20 backdrop-blur-xl"
                    : "bg-transparent"
            }`}
        >
            <nav className="border-gray-200 relative">
                <div className=" mx-auto flex max-w-8xl flex-wrap items-center justify-between px-4 py-6">
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
                            className="mr-3 hidden rounded-full px-4 py-2 text-center text-sm font-medium text-primary-500 focus:outline-none focus:ring-4 focus:ring-blue-300 md:block "
                        >
                            Log in
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="mr-3 rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 "
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
                                <HiOutlineX className="h-5 w-5 text-primary-500" />
                            ) : (
                                <HiOutlineMenuAlt4 className="h-5 w-5 text-primary-500" />
                            )}
                        </button>
                    </div>
                    <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
                        <ul className="flex w-full flex-col rounded-lg border p-4 font-medium text-primary-500  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0">
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
                            </li>
                        </ul>
                    </div>
                    <div className="w-full items-center justify-between md:order-1 md:hidden md:w-auto">
                        <ul
                            className={`${
                                isMenuOpen ? "slide-down" : "hidden"
                            } absolute left-0 right-0 top-[84px] w-full gap-5 flex-col border border-gray-100 shadow bg-white p-5 font-medium text-gray-400`}
                        >
                            <li>
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
                                    className="block rounded py-2 pl-3 pr-4 cursor-pointer text-primary-500 hover:font-semibold"
                                >
                                    Log in
                                </Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Nav;
