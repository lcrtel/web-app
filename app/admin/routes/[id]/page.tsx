import { supabaseAdmin } from "@/lib/supabase-admin";
import formatString from "@/utils/formatString";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { redirect } from "next/navigation";
import DeleteRoute from "./DeleteRoute";
import { EditRoute } from "./EditRoute";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseAdmin();
    let { data: route } = await supabase
        .from("route_offers")
        .select(`*, profiles (email)`)
        .match({ id: params.id })
        .single();
    if (!route) {
        redirect("/admin/routes");
    }

    let { data: purchase_requests, error } = await supabase
        .from("purchase_requests")
        .select(`*, profiles (email)`)
        .eq("route_id", params.id);

    let { data: route_connections } = await supabase
        .from("route_connections")
        .select(`*, profiles (email)`);

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                        Route Details
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
                            <p className=" font-semibold capitalize">
                                {route?.destination}
                            </p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">Route Type</p>
                            <p className=" font-semibold uppercase">
                                {route?.route_type}
                            </p>
                        </div>

                        <div>
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
                                }).format(parseFloat(route?.selling_rate))}
                            </p>
                        </div>
                    </div>{" "}
                    <EditRoute route={route} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 bg-surface rounded-lg p-4 mb-5">
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted by</p>
                        <p className=" font-semibold">
                            {" "}
                            {route?.profiles?.email}
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
                        <p className=" text-sm text-gray-500">
                            Verification Status
                        </p>
                        <p className=" font-semibold">
                            {formatString(route?.verification)}
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center bg-white rounded-md px-2 py-1">
                        <p className=" text-sm text-gray-500">Posted on</p>
                        <p className=" font-semibold">
                            {route?.created_at
                                ? formatTimestamptz(route?.created_at)
                                : "_"}
                        </p>
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
                {route.verification === "verified" ? (
                    purchase_requests?.length ? (
                        <div>
                            <h3 className="text-lg font-semibold tracking-tight">
                                Connection Requests
                            </h3>
                            {purchase_requests?.map((purchase_request) => (
                                <div
                                    key={purchase_request.id}
                                    className={`flex flex-col mt-2 gap-2 shadow hover:translate-x-1 cursor-pointer transition-all ease-in-out border-[1.5px] rounded-md p-4  ${
                                        purchase_request.status === "approved"
                                            ? "bg-gradient-to-l from-green-100 to-green-50 border-green-100 shadow-green-100"
                                            : "bg-gradient-to-l from-slate-100 to-slate-50 border-slate-100 shadow-slate-100"
                                    }`}
                                >
                                    <div className="flex justify-between">
                                        <p>
                                            Buyer:{" "}
                                            {purchase_request.profiles?.email}
                                        </p>
                                        <p>
                                            {purchase_request.status ===
                                            "verified" ? (
                                                <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ml-2">
                                                    Verified
                                                </span>
                                            ) : purchase_request.status ===
                                              "pending" ? (
                                                <span className="text-xs bg-slate-100 border-[1.5px] border-slate-200  text-slate-500 rounded-full px-2 py-1 ml-2">
                                                    Pending
                                                </span>
                                            ) : (
                                                <span className="text-xs bg-slate-100 border-[1.5px] border-slate-200  text-slate-500 rounded-full px-2 py-1 ml-2">
                                                    Negotiation
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <p>
                                        Requested on:{" "}
                                        {formatTimestamptz(
                                            purchase_request.created_at
                                        )}
                                    </p>
                                    <p>Message: {purchase_request.message}</p>
                                    <p>
                                        Buying Rate:{" "}
                                        {purchase_request?.buying_rate
                                            ? new Intl.NumberFormat("en-US", {
                                                  style: "currency",
                                                  currency: "USD",
                                              }).format(
                                                  parseFloat(
                                                      purchase_request?.buying_rate
                                                  )
                                              )
                                            : "N/A"}
                                    </p>
                                    <p>
                                        Preferred Payment Type:{" "}
                                        <span className="capitalize">
                                            {purchase_request.payment_type}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : null
                ) : null}
                {route.verification === "verified" ? (
                    route_connections?.length ? (
                        <div>
                            <h3 className="text-lg font-semibold tracking-tight">
                                Connections
                            </h3>
                            {route_connections?.map((route_connection) => (
                                <div
                                    key={route_connection.id}
                                    className={`flex flex-col mt-2 gap-2 shadow hover:translate-x-1 cursor-pointer transition-all ease-in-out border-[1.5px] rounded-md p-4  ${
                                        route_connection.status === "active"
                                            ? "bg-gradient-to-l from-green-100 to-green-50 border-green-100 shadow-green-100"
                                            : "bg-gradient-to-l from-slate-100 to-slate-50 border-slate-100 shadow-slate-100"
                                    }`}
                                >
                                    <div className="flex justify-between">
                                        <p>Buyer:{route_connection.buyer_id}</p>
                                        <p>
                                            {route_connection.status ===
                                            "active" ? (
                                                <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ml-2">
                                                    Active
                                                </span>
                                            ) : (
                                                route_connection.status ===
                                                    "pending" && (
                                                    <span className="text-xs bg-slate-100 border-[1.5px] border-slate-200  text-slate-500 rounded-full px-2 py-1 ml-2">
                                                        Pending
                                                    </span>
                                                )
                                            )}
                                        </p>
                                    </div>
                                    <p>
                                        Expires on:{" "}
                                        {route_connection.expiration_date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : null
                ) : null}

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
