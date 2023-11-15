import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabaseServer } from "@/lib/supabase-server";
import formatString from "@/utils/formatString";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import CreateGateway from "./CreateGateway";
import { EditRequest } from "./requests/EditRequest";

export const revalidate = 0;


export default async function Page() {
    const supabase = await supabaseServer();
    const admin:any = await fetchUserData();
    let { data: gateways } = await supabase
        .from("gateways")
        .select(`*, routes (*), profiles (*)`);

    let { data: requests } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*), profiles (*)`)
        .eq("status", "pending");

    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .or(`role.eq.client,role.eq.vendor`);

    let { data: routes } = await supabase
        .from("routes")
        .select("*, profiles (*)");

    return (
        <div className=" ">
            <div className="mb-4 flex justify-between items-center ">
                <h1 className="text-2xl font-bold text-primary">Gateways</h1>
                <CreateGateway routes={routes} clients={clients} />
            </div>
            <div className="w-full grid grid-cols-1 gap-5">
                {gateways?.length ? (
                    <div className="border rounded-lg">
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">
                                        Gateway Name
                                    </TableHead>
                                    <TableHead className="">Route</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Payment Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {gateways?.map((gateway) => (
                                    <TableRow key={gateway.id}>
                                        <TableCell className="font-medium">
                                            {gateway?.name
                                                ? gateway?.name
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={`/admin/routes/${gateway.route_id}`}
                                                className="capitalize flex items-center gap-2 group"
                                            >
                                                {gateway?.routes?.destination} -{" "}
                                                <span className="uppercase font-medium">
                                                    {
                                                        gateway?.routes
                                                            ?.route_type
                                                    }
                                                </span>
                                                <HiOutlineExternalLink className=" w-4 h-4 text-slate-400" />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/admin/clients/${gateway.client_id}`}
                                                className="flex gap-2 group"
                                            >
                                                {gateway?.profiles?.name} (
                                                {
                                                    gateway?.profiles
                                                        ?.company_name
                                                }
                                                )
                                                <HiOutlineExternalLink className=" w-4 h-4 text-slate-400" />
                                            </Link>
                                        </TableCell>
                                        <TableCell className=" capitalize">
                                            {gateway?.payment_type}
                                        </TableCell>
                                        <TableCell>
                                            {" "}
                                            {gateway.status === "active" ? (
                                                <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1">
                                                    Active
                                                </span>
                                            ) : gateway.status === "pending" ? (
                                                <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1">
                                                    Pending
                                                </span>
                                            ) : null}
                                        </TableCell>{" "}
                                        <TableCell className="text-right flex items-center gap-2 justify-end">
                                            <Link
                                                href={`/admin/gateways/${gateway.id}`}
                                            >
                                                <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No gateways found</p>
                    </div>
                )}

                <div>
                    <div className="flex mb-2 justify-between items-center">
                        <h2 className="font-semibold tracking-tight text-lg">
                            Purchase Requests
                        </h2>
                    </div>
                    {requests?.length ? (
                        <Table>
                            <TableCaption>
                                A list of pending purchase requests.
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Route Offer</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Communication Status</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* <pre>{JSON.stringify(requests, null, 2)}</pre> */}
                                {requests?.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={`/admin/routes/${request.route_id}`}
                                                className=" uppercase flex gap-2 group relative"
                                            >
                                                {request?.routes?.destination} -{" "}
                                                {request?.routes?.route_type}
                                                <HiOutlineExternalLink className=" w-5 h-5 absolute right-6 hidden group-hover:block" />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/admin/users/${request.client_id}`}
                                                className="flex gap-2 group relative"
                                            >
                                                {request?.profiles?.email}
                                                <HiOutlineExternalLink className="w-5 h-5 absolute right-6 hidden group-hover:block" />
                                            </Link>
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
                                        <TableCell className="text-right">
                                            <EditRequest request={request} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                            <p>No purchase requests yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
