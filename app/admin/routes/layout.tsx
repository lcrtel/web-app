import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiOutlinePlusCircle } from "react-icons/hi";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const supabase = supabaseServer();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        redirect("/auth/login");
    }

    return (
        <section className="h-full">
            <div className="flex  gap-2  flex-wrap md:items-center mb-4 justify-between ">
                <Link
                    href="/admin/routes"
                    className="text-2xl font-bold text-primary"
                >
                    Routes
                </Link>
                <div className="flex gap-2 flex-wrap">
                    <Link
                        passHref
                        href="/admin/routes/post"
                        className={buttonVariants({
                            variant: "default",
                            size: "sm",
                        })}
                    >
                        <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
                        Add Offers
                    </Link>
                    <Link
                        passHref
                        href="/admin/routes/targets/post"
                        className={buttonVariants({
                            variant: "default",
                            size: "sm",
                        })}
                    >
                        <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
                        Add Targets
                    </Link>
                </div>
            </div>
            <main className="h-full">{children}</main>
        </section>
    );
}
