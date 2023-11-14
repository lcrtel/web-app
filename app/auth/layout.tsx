
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const supabase = await supabaseServer()
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        redirect("/user");
    } 
    return (
        <section className="min-h-screen flex justify-between ">
            <div
                className="hidden md:flex flex-col justify-between md:w-1/3 p-8 bg-local"
                style={{
                    backgroundImage: `url("/blue_wave_bg.jpg")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Link href="/" passHref className="">
                    <Image
                        src="/lcrtelcom_logo.svg"
                        alt="LCRTelcom"
                        width={180}
                        height={30}
                    />
                </Link>
                <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-400 sm:text-center ">
                        {" "}
                        <Link href="/" className="hover:text-primary-500">
                            &copy; 2023 (1445 AH) LCRTelcom™
                        </Link>
                    </span>
                </div>
            </div>

            {children}
        </section>
    );
}
