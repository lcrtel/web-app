import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { RouteForm } from "./route-form";
import { redirect } from "next/navigation";
import DeleteRoute from "../../DeleteRoute";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    let { data: route } = await supabase
        .from("route_offers")
        .select("*")
        .match({ id: params.id });
    if (route?.length === 0) {
        redirect("/user/routes/offers");
    }

    return (
        <div>
            {" "}
            <Link
                href="/user/routes/offers"
                className="inline-flex items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> Manage Offers
            </Link>
            <div className="mb-3 ">
                <h2 className="text-2xl font-bold text-primary tracking-tight">
                    Route Offer Settings
                </h2>
                <p className="text-sm text-muted-foreground">
                    View and edit your route offer details
                </p>
            </div>
            <Separator className="mb-3" />
            <RouteForm route={route?.[0]} />
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
