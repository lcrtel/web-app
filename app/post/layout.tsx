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
            <nav className="flex mx-auto max-w-8xl px-8 py-5 items-center justify-center ">
                <Link passHref href="/" className="flex items-center">
                    <Image
                        src="/lcrtelcom_logo.svg"
                        className="mr-3"
                        alt="Flowbite Logo"
                        width={180}
                        height={20}
                    />
                </Link>
            </nav>

            {children}
        </section>
    );
}
