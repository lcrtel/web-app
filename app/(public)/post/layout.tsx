import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section className=" pt-20">
           

            {children}
        </section>
    );
}
