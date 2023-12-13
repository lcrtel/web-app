"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import Link from "next/link";

const Nav = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [scrolled, setScrolled] = useState(false);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.pageYOffset;
    //         if (scrollTop > 0) {
    //             setScrolled(true);
    //         } else {
    //             setScrolled(false);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };

    return (
        <header
            className={`fixed left-0 right-0 top-0 z-20 `}
        >
            <nav className="border-gray-200 relative">
                <div className=" mx-auto flex max-w-8xl w-full whitespace-nowrap overflow-x-auto items-center justify-between px-4 py-6">
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
                            className="mr-3  rounded-full px-4 py-2 text-center text-sm font-medium text-primary-500 focus:outline-none focus:ring-4 focus:ring-blue-300  "
                        >
                            Log in
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="mr-3 rounded-full bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 "
                        >
                            Sign up
                        </Link>

                       
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Nav;
