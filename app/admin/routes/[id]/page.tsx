import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { HiTrash } from "react-icons/hi";
import DeleteRoute from "./DeleteUser";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    const adminSupabase = supabaseAdmin();
    let { data: route } = await supabase
        .from("route_posts")
        .select("*")
        .match({ id: params.id });
    const userID = route?.[0]?.seller_id;
    const {
        data: { user },
    } = await adminSupabase.auth.admin.getUserById(userID as string);
    // console.log();

    return (
        <div>
            <div className="space-y-6">
                <h3 className="text-lg font-semibold">Route Details</h3>
                {/* <p className="text-sm text-muted-foreground">
                        View and edit route details
                    </p> */}

                <Separator />
                <div className="flex gap-5 flex-wrap">
                    <div>
                        <p className=" text-sm text-gray-500">Posted by</p>
                        <p className=" font-semibold capitalize">
                            {user?.user_metadata.first_name}
                        </p>
                    </div>
                    <div>
                        <p className=" text-sm text-gray-500">Created at</p>
                        <p className=" font-semibold">
                            {formatTimestamptz(route?.[0]?.created_at)}
                        </p>
                    </div>
                    <div>
                        <p className=" text-sm text-gray-500">Updated at</p>
                        <p className=" font-semibold">
                            {formatTimestamptz(route?.[0]?.updated_at)}
                        </p>
                    </div>
                </div>
                <div className="flex gap-5 flex-wrap capitalize">
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">Prefix</p>
                        <p className=" font-semibold">{route?.[0]?.prefix}</p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">Destination</p>
                        <p className=" font-semibold">
                            {route?.[0]?.destination}
                        </p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">
                            Destination Code
                        </p>
                        <p className=" font-semibold">
                            {route?.[0]?.destination_code}
                        </p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">Route Type</p>
                        <p className=" font-semibold">
                            {route?.[0]?.route_type}
                        </p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">Rate</p>
                        <p className=" font-semibold">{route?.[0]?.rate}</p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">ASR</p>
                        <p className=" font-semibold">{route?.[0]?.asr}</p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">ACD</p>
                        <p className=" font-semibold">{route?.[0]?.acd}</p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">PDD</p>
                        <p className=" font-semibold">{route?.[0]?.pdd}</p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">Ports</p>
                        <p className=" font-semibold">{route?.[0]?.ports}</p>
                    </div>
                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">Capacity</p>
                        <p className=" font-semibold">{route?.[0]?.capacity}</p>
                    </div>

                    <div className="min-w-[200px]">
                        <p className=" text-sm text-gray-500">Status</p>
                        <p className=" font-semibold">{route?.[0]?.status}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">
                            Delete this Route
                        </h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <button className="p-2 bg-red-500 rounded-md text-white rou">
                        <DeleteRoute routeID={params.id} />
                    </button>
                </div>
            </div>
        </div>
    );
}
