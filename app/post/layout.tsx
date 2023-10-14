import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export const dynamic = "force-dynamic";
export const revalidate = 10; // revalidate at most every hour

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section className=" relative">
            <nav className="flex sticky top-0 bg-white mx-auto max-w-8xl p-4 md:px-8 md:py-6 items-center justify-between ">
                <Link passHref href="/" className="">
                    <Image
                        src="/lcrtelcom_logo.svg"
                        className=" mr-3"
                        alt="LCRTel Logo"
                        width={160}
                        height={32}
                    />
                </Link>
                <div className="flex gap-2 whitespace-nowrap">
                    <Link
                        href="/auth/login"
                        className="mr-3 hidden rounded-lg px-4 py-2 text-center text-sm font-medium text-primary-500 focus:outline-none focus:ring-4 focus:ring-blue-300 md:block "
                    >
                        Log in
                    </Link>
                    <Link
                        href="/auth/signup"
                        className=" rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 "
                    >
                        Sign up
                    </Link>
                </div>
            </nav>

            {children}
        </section>
    );
}
