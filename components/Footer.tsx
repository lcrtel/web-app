import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-surface px-6 py-10">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link passHref href="/" className="flex items-center">
                            <Image
                                src="/lcrtelcom_logo.svg"
                                className="mr-3 "
                                alt="Flowbite Logo"
                                width={180}
                                height={20}
                            />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-primary-500 uppercase ">
                                Legal
                            </h2>
                            <ul className="text-gray-600 ">
                                <li className="mb-4">
                                    <Link
                                        href="/privacy-policy"
                                        className="hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms-and-conditions"
                                        className="hover:underline"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
                <div className="flex justify-center">
                    <span className="text-sm text-gray-500 text-center ">
                        Copyright © 2023 (1445 AH){" "}
                        <Link href="/" className="hover:underline">
                            LCRTelcom™
                        </Link>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
