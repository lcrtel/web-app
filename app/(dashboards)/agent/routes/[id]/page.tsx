import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import formatString from "@/utils/formatString";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { redirect } from "next/navigation";
import DeleteRoute from "./DeleteRoute";
import { EditRoute } from "./EditRoute";
import Link from "next/link";
import { RoutesTable } from "./routes-table";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa6";
import CopyButton from "@/components/ui/copy-button";
import { EditPurchaseRequest } from "../../requests/EditPurchaseRequest";

export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
    const supabase = supabaseAdminServer();
    let { data: route } = await supabase
        .from("routes")
        .select(`*, profiles (name)`)
        .match({ id: params.id })
        .single();
    if (!route) {
        redirect("/agent/routes");
    }

    let { data: purchase_requests, error } = await supabase
        .from("purchase_requests")
        .select(`*, profiles (*), routes (*)`)
        .match({ route_id: params.id, status: "pending" });

    let { data: route_requests } = await supabase
        .from("targets")
        .select("*")
        .match({
            destination_code: route?.destination_code,
            route_type: route?.route_type,
        })
        .neq("client_id", route?.vendor_id);

    return (
        <div>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Route Offer Details
                    </h1>
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
                            <p className=" font-semibold">$ {route?.rate}</p>
                        </div>
                        <div>
                            <p className=" text-sm text-gray-500">
                                Selling Rate
                            </p>
                            <p className=" font-semibold">
                                $ {route?.selling_rate}
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
                            {route?.profiles?.name}
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
                <section>
                    <h2 className="text-xl font-bold pb-2 tracking-tight">
                        Purchase Requests
                    </h2>
                    {purchase_requests?.length ? (
                        <div className="border rounded-lg overflow-clip">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Route Offer</TableHead>
                                        <TableHead>Client</TableHead>
                                        <TableHead>
                                            Communication Status
                                        </TableHead>
                                        <TableHead>Request Status</TableHead>
                                        <TableHead>IP Address</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* <pre>{JSON.stringify(purchase_requests, null, 2)}</pre> */}
                                    {purchase_requests?.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium">
                                                <Link
                                                    href={`/agent/routes/${request.route_id}`}
                                                    className=" uppercase flex gap-2 group relative"
                                                >
                                                    {
                                                        request?.routes
                                                            ?.destination
                                                    }{" "}
                                                    -{" "}
                                                    {
                                                        request?.routes
                                                            ?.route_type
                                                    }
                                                    <HiOutlineExternalLink className=" w-5 h-5 absolute right-6 hidden group-hover:block" />
                                                </Link>
                                            </TableCell>
                                            <TableCell className="">
                                                <div className="flex gap-2 group items-center relative">
                                                    <Link
                                                        href={`/agent/clients/${request.client_id}`}
                                                    >
                                                        {
                                                            request?.profiles
                                                                ?.name
                                                        }
                                                        <span className=" text-slate-400">
                                                            (
                                                            {
                                                                request
                                                                    ?.profiles
                                                                    ?.company_name
                                                            }
                                                            )
                                                        </span>
                                                    </Link>
                                                    <Link
                                                        href={`https://wa.me/${request?.whatsapp_no}`}
                                                        className={`text-[#128c7e] hover:text-[#25d366] `}
                                                    >
                                                        <FaWhatsapp className="w-4 h-4" />{" "}
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {request?.communication_status ? (
                                                    <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1 capitalize">
                                                        {formatString(
                                                            request?.communication_status
                                                        )}
                                                    </span>
                                                ) : (
                                                    "_"
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {request?.status ? (
                                                    <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1 capitalize">
                                                        {formatString(
                                                            request?.status
                                                        )}
                                                    </span>
                                                ) : (
                                                    "_"
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <p>{request.ip}</p>
                                                    <CopyButton
                                                        textToCopy={request.ip}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <EditPurchaseRequest
                                                    request={request}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                            <p>No purchase requests yet</p>
                        </div>
                    )}
                </section>

                <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
                    <div>
                        <h3 className="font-semibold tracking-tight">Delete</h3>
                        <p className="text-sm">
                            Once deleted, it will be gone forever. Please be
                            certain.
                        </p>
                    </div>
                    <button className="p-2 bg-red-500 rounded-md text-white rou">
                        <DeleteRoute routeID={params.id} />
                    </button>
                </div>
                <Separator />
                <div className="my-5">
                    <RoutesTable data={route_requests} />
                </div>
            </div>
        </div>
    );
}
