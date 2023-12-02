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
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import Overview from "./Overview";
import QuickActions from "./QuickActions";
import { EditPurchaseRequest } from "./requests/EditPurchaseRequest";
import { fetchUnVerfiedRoutes } from "./routes/fetchUnVerfiedRoutes";
import { RoutesTable } from "./routes/routes-table";

export const metadata: Metadata = {
    title: "Dashboard - Agent",
};

const PurchaseRequests = async () => {
    unstable_noStore();
    const supabase = await supabaseServer();

    let { data: gateways } = await supabase
        .from("gateways")
        .select(`*, routes (*), profiles (*)`);
    let { data: requests } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*), profiles (*)`)
        .eq("status", "pending");

    return (
        <div>
            <div className="flex mb-2 justify-between items-center">
                <h2 className="font-semibold tracking-tight text-lg">
                    Purchase Requests
                </h2>
                <Link
                    href="/agent/gateways/requests"
                    className=" text-sm hover:underline"
                >
                    View All
                </Link>
            </div>
            {requests?.length ? (
                <Table>
                    <TableCaption>
                        A list of pending purchase requests.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Route</TableHead>
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
                                        href={`/agent/routes/${request.route_id}`}
                                        className=" uppercase flex gap-2 group relative"
                                    >
                                        {request?.routes?.destination} -{" "}
                                        {request?.routes?.route_type}
                                        <HiOutlineExternalLink className=" w-5 h-5 absolute right-6 hidden group-hover:block" />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/agent/clients/${request.client_id}`}
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
                                    <EditPurchaseRequest request={request} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-slate-400">No purchase requests yet</p>
            )}
        </div>
    );
};

const UnverifiedRoutes = async () => {
    unstable_noStore();

    const unverified_routes = await fetchUnVerfiedRoutes();

    return unverified_routes?.length ? (
        <div className="w-full mt-5">
            <div className="flex mb-2 justify-between items-center">
                <h2 className="font-semibold tracking-tight text-lg">
                    Univerified Routes
                </h2>
                <Link href="/agent/routes" className=" text-sm hover:underline">
                    View All
                </Link>
            </div>
            <RoutesTable data={unverified_routes} />
        </div>
    ) : null;
};




const page = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-5">Welcome 👋</h1>
            <Overview />
            <QuickActions />
            <PurchaseRequests />
            <Suspense>
                <UnverifiedRoutes />
            </Suspense>
        </div>
    );
};

export default page;
