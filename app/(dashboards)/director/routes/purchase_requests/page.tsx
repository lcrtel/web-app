import CopyButton from "@/components/ui/copy-button";
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
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { EditPurchaseRequest } from "../targets/EditPurchaseRequest";
export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = supabaseServer();

    let { data: requests } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*), profiles (*)`);

    return (
        <div className="">
            <div className="flex pb-4 justify-between items-center">
                <h2 className="font-bold tracking-tight text-2xl">
                    Purchase Requests
                </h2>
            </div>
            {requests?.length ? (
                <div className="border rounded-lg overflow-clip">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Route Offer</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Communication Status</TableHead>
                                <TableHead>VOS Status</TableHead>
                                <TableHead>Request Status</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* <pre>{JSON.stringify(requests, null, 2)}</pre> */}
                            {requests?.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell className="font-medium">
                                        <Link
                                            href={`/director/routes/offers/${request.route_id}`}
                                            className=" uppercase flex gap-2 group relative"
                                        >
                                            {request?.routes?.destination} -{" "}
                                            {request?.routes?.route_type}
                                            <HiOutlineExternalLink className=" w-5 h-5 absolute right-6 hidden group-hover:block" />
                                        </Link>
                                    </TableCell>
                                    <TableCell className="">
                                        <div className="flex gap-2 group items-center relative">
                                            <Link
                                                href={`/director/users/clients/${request.client_id}`}
                                            >
                                                {request?.profiles?.name}
                                                <span className=" text-slate-400">
                                                    (
                                                    {
                                                        request?.profiles
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
                                        {request?.communication_status ===
                                        "contacted" ? (
                                            <span className="text-xs bg-green-50 border-[1.5px] border-green-100  text-green-500 rounded-full px-2 py-1 capitalize">
                                                {formatString(
                                                    request?.communication_status
                                                )}
                                            </span>
                                        ) : (
                                            <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1 capitalize">
                                                {formatString(
                                                    request?.communication_status
                                                )}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {request?.vos_status === "added" ? (
                                            <span className="text-xs bg-green-50 border-[1.5px] border-green-100  text-green-500 rounded-full px-2 py-1 capitalize">
                                                {formatString(
                                                    request?.vos_status
                                                )}
                                            </span>
                                        ) : (
                                            <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1 capitalize">
                                                {formatString(
                                                    request?.vos_status
                                                )}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {request?.status === "approved" ? (
                                            <span className="text-xs bg-green-50 border-[1.5px] border-green-100  text-green-500 rounded-full px-2 py-1 capitalize">
                                                {formatString(request?.status)}
                                            </span>
                                        ) : (
                                            <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1 capitalize">
                                                {formatString(request?.status)}
                                            </span>
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
        </div>
    );
}
