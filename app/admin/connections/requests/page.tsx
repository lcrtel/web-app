import ReloadButton from "@/components/ReloadButton";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabaseAdmin } from "@/lib/supabase-admin";
import formatString from "@/utils/formatString";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import { EditRequest } from "./EditRequest";
export const revalidate = 0; // revalidate at most every hour

const page = async () => {
    const supabase = supabaseAdmin();

    const PendingRequests = async () => {
        let { data: requests } = await supabase
            .from("purchase_requests")
            .select(`*, route_offers (*), profiles (email)`)
            .eq("status", "pending");
        return requests?.length ? (
            <Table>
                <TableCaption>
                    A list of pending connection requests.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Route Offer</TableHead>
                        <TableHead>Buyer</TableHead>
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
                                    {request?.route_offers?.destination} -{" "}
                                    {request?.route_offers?.route_type}
                                    <HiOutlineExternalLink className=" w-5 h-5 absolute right-6 hidden group-hover:block" />
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/admin/users/${request.buyer_id}`}
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
                <p>No connection requests yet</p>
            </div>
        );
    };
    const ApprovedRequests = async () => {
        let { data: requests } = await supabase
            .from("purchase_requests")
            .select(`*, route_offers (*), profiles (email)`)
            .eq("status", "approved");
        return requests?.length ? (
            <Table>
                <TableCaption>
                    A list of pending connection requests.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Route Offer</TableHead>
                        <TableHead>Buyer</TableHead>
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
                                    {request?.route_offers?.destination} -{" "}
                                    {request?.route_offers?.route_type}
                                    <HiOutlineExternalLink className=" w-5 h-5 absolute right-6 hidden group-hover:block" />
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/admin/users/${request.buyer_id}`}
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
                <p>No approved requests found</p>
            </div>
        );
    };

    return (
        <div>
            {" "}
            <div className="mb-4 flex justify-between items-center ">
                <h1 className="text-2xl font-bold text-primary">
                    Connection Requests
                </h1>
                <ReloadButton />
            </div>
            <div className="grid gap-5 grid-cols-2">
                <div className=" space-y-2">
                    <h2 className=" text-lg tracking-tight font-semibold">
                        Pending Requests
                    </h2>
                    <PendingRequests />
                </div>
                <div className=" space-y-2">
                    <h2 className=" text-lg tracking-tight font-semibold">
                        Approved Requests
                    </h2>
                    <ApprovedRequests />
                </div>
            </div>
        </div>
    );
};

export default page;
