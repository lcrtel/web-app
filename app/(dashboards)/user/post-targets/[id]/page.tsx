import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { TargetForm } from "./target-form";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import DeleteRoute from "../../(private)/my-targets/DeleteRoute";
export const revalidate = 0;

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    return (
        <div>
            <Link
                href="/user/my-targets"
                className="inline-flex items-center text-gray-400 hover:text-primary-900 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> My Targets
            </Link>
            <div className="mb-3 ">
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                    Edit your target rate
                </h2>
                <p className="text-sm text-muted-foreground">
                    View and edit your target rate
                </p>
            </div>
            <Separator className="mb-3" />
            <Suspense fallback={<Loader />}>
                <TargetDetails id={params.id} />
            </Suspense>
            <div className="flex my-5 justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                <div>
                    <h3 className="font-semibold tracking-tight">
                        Delete target
                    </h3>
                    <p className="text-sm">
                        Once deleted, it will be gone forever. Please be
                        certain.
                    </p>
                </div>
                <div className="p-2 bg-red-500 text-white rounded-lg">
                    <DeleteRoute routeID={params.id} />
                </div>
            </div>
        </div>
    );
}

async function TargetDetails({ id }: { id: string }) {
    const supabase = await supabaseServer();
    let { data: target } = await supabase
        .from("targets")
        .select("*")
        .match({ id: id })
        .single();
    if (!target) {
        redirect("/user/my-targets");
    }
    return <TargetForm route={target} />;
}
