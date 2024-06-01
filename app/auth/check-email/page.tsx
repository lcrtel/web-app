import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";

export const metadata: Metadata = {
    title: "Check E-mail",
};

const page = () => {
    return (
        <div className="w-full md:w-2/3 p-8  flex items-center justify-center">
            <section>
                <div className="flex w-full flex-col mb-5 text-center items-center">
                    <Link href="/" passHref className="mb-4 md:hidden">
                        <Image
                            src="/lcr-icon.svg"
                            alt="LCRTelcom"
                            width={80}
                            height={30}
                        />
                    </Link>
                    <div className="border-2 rounded-lg border-gray-300 p-2 mb-5">
                        <HiOutlineMail className="w-6 h-6 " />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Check your email
                    </h1>
                    <p className="text-sm text-gray-400 ">
                        We sent a verification link to your email
                    </p>
                    <Link
                        href="/auth/login"
                        className="font-medium text-sm pt-2 text-primary-900 hover:underline"
                    >
                        Log In
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default page;
