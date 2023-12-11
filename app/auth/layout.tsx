import Image from "next/image";
import Link from "next/link";


export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    return (
        <section className="min-h-screen flex justify-between ">
            <div
                className="hidden md:flex flex-col justify-between md:w-1/3 p-8 bg-local"
                style={{
                    backgroundImage: `url("/blue_wave_bg.webp")`,
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
