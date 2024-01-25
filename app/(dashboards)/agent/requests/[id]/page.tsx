import { Separator } from "@/components/ui/separator";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import formatString from "@/utils/formatString";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { redirect } from "next/navigation";
import DeleteTarget from "./DeleteTarget";
import { RoutesTable } from "./routes-table";
import { EditRouteRequest } from "./EditRouteRequest";
import { supabaseServer } from "@/lib/supabase-server";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    let { data: route_request } = await supabase
        .from("targets")
        .select(`*, profiles (*)`)
        .match({ id: params.id })
        .single();
    if (!route_request) {
        redirect("/agent/requests");
    }

    let { data: routes, error } = await supabase
        .from("routes")
        .select("*")
        .match({
            destination_code: route_request?.destination_code,
            route_type: route_request?.route_type,
        })
        .neq("vendor_id", route_request?.client_id);

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Route Request Details
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        View and edit route request
                    </p>
                </div>

                <div className="flex justify-between items-start">
                    <div className="flex gap-5 flex-wrap">
                        <div>
                            <p className=" text-sm text-gray-500">
                                Destination
                            </p>
                            <p className=" font-semibold ">
                                {route_request?.destination}
                            </p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Route Type</p>
                            <p className=" font-semibold uppercase">
                                {route_request?.route_type}
                            </p>
                        </div>

                        <div>
                            <p className=" text-sm text-gray-500">
                                Requested Rate
                            </p>
                            <p className=" font-semibold">
                                {route_request?.rate}
                            </p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Our rate</p>
                            <p className=" font-semibold">
                                {route_request?.buying_rate}
                            </p>
                        </div>
                    </div>{" "}
                    <EditRouteRequest route_request={route_request} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4 mb-5">
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted by</p>
                        <p className=" font-semibold">
                            {" "}
                            {route_request?.profiles?.name}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted on</p>
                        <p className=" font-semibold">
                            {" "}
                            {formatTimestamptz(route_request?.created_at)}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Prefix</p>
                        <p className=" font-semibold">
                            {route_request?.prefix}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">
                            Destination Code
                        </p>
                        <p className=" font-semibold">
                            {route_request?.destination_code}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ASR</p>
                        <p className=" font-semibold">{route_request?.asr}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">ACD</p>
                        <p className=" font-semibold">{route_request?.acd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">PDD</p>
                        <p className=" font-semibold">{route_request?.pdd}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Ports</p>
                        <p className=" font-semibold">{route_request?.ports}</p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Capacity</p>
                        <p className=" font-semibold">
                            {route_request?.capacity}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Updated on</p>
                        <p className=" font-semibold">
                            {route_request?.updated_at
                                ? formatTimestamptz(route_request?.updated_at)
                                : "_"}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">Delete</h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <button className="p-2 bg-red-500 rounded-md text-white rou">
                        <DeleteTarget routeID={params.id} />
                    </button>
                </div>
                <Separator />
                <div className="my-5">
                    <RoutesTable data={routes} />
                </div>
            </div>
        </div>
    );
}
