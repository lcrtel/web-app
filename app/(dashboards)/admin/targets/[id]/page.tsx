import { Separator } from "@/components/ui/separator";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import formatString from "@/utils/formatString";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { redirect } from "next/navigation";
import DeleteTarget from "./DeleteTarget";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const supabase = await supabaseAdminServer();
    let { data: route } = await supabase
        .from("targets")
        .select("*")
        .match({ id: params.id })
        .single();
    if (!route) {
        redirect("/admin/routes");
    }
    const userID = route?.client_id;
    const {
        data: { user },
    } = await supabase.auth.admin.getUserById(userID as string);

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                        Buying Target Details
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        View and edit route details
                    </p>
                </div>

                <div className="flex justify-between items-start">
                    <div className="flex gap-5 flex-wrap">
                        <div>
                            <p className=" text-sm text-gray-500">
                                Destination
                            </p>
                            <p className=" font-semibold ">
                                {route?.destination}
                            </p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Route Type</p>
                            <p className=" font-semibold uppercase">
                                {route?.route_type}
                            </p>
                        </div>

                        {/* <div>
                            <p className=" text-sm text-gray-500">Rate</p>
                            <p className=" font-semibold">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(parseFloat(route?.rate))}
                            </p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">
                                Selling Rate
                            </p>
                            <p className=" font-semibold">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(parseFloat(route?.buying_rate))}
                            </p>
                        </div> */}
                    </div>{" "}
                    {/* <EditRoute route={route} /> */}
                </div>
                <Separator />
                <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4 mb-5">
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted by</p>
                        <p className=" font-semibold">
                            {" "}
                            {user?.user_metadata.email}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted on</p>
                        <p className=" font-semibold">
                            {" "}
                            {formatTimestamptz(route?.created_at)}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Prefix</p>
                        <p className=" font-semibold">{route?.prefix}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">
                            Destination Code
                        </p>
                        <p className=" font-semibold">
                            {route?.destination_code}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ASR</p>
                        <p className=" font-semibold">{route?.asr}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ACD</p>
                        <p className=" font-semibold">{route?.acd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">PDD</p>
                        <p className=" font-semibold">{route?.pdd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Ports</p>
                        <p className=" font-semibold">{route?.ports}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Capacity</p>
                        <p className=" font-semibold">{route?.capacity}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Updated on</p>
                        <p className=" font-semibold">
                            {route?.updated_at
                                ? formatTimestamptz(route?.updated_at)
                                : "_"}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">
                            Delete this target
                        </h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <button className="p-2 bg-red-500 rounded-md text-white rou">
                        <DeleteTarget routeID={params.id} />
                    </button>
                </div>
            </div>
        </div>
    );
}
