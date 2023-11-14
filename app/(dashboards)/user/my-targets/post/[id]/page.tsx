import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import { revalidatePath } from "next/cache";
import { RouteForm } from "./route-form";
import DeleteRoute from "../../DeleteRoute";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
// import DeleteUser from "./DeleteUser";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseServer();
    let { data: route } = await supabase
        .from("targets")
        .select("*")
        .match({ id: params.id });
    if (route === null) {
        redirect("/user/routes/targets");
    }

    return (
        <div>
            <Link
                href="/user/routes/targets"
                className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> Manage Targets
            </Link>
            <div className="mb-3 ">
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                    Buying Target Settings
                </h2>
                <p className="text-sm text-muted-foreground">
                    View and edit your buying target details
                </p>
            </div>
            <Separator className="mb-3" />
            {route?.length ? <RouteForm route={route?.[0]} /> : null}

            <div className="flex my-5 justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                <div>
                    <h3 className="font-semibold tracking-tight">
                        Delete offer
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
