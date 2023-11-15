import { buttonVariants } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import formatDate from "@/utils/formatDate";
import formatString from "@/utils/formatString";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import Overview from "./Overview";
import QuickActions from "./QuickActions";
import { InvoiceTable } from "./invoices/InvoiceTable";
import { RoutesTable } from "./routes/routes-table";
import { EditRequest } from "./gateways/requests/EditRequest";
import { supabaseServer } from "@/lib/supabase-server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home - Admin",
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
        <div className=" ">
            <div className="mb-4 flex justify-between items-center ">
                <h1 className="text-lg font-semibold text-primary">Gateways</h1>
            </div>
            <div className="w-full ">
                {gateways?.length ? (
                    <Table>
                        <TableCaption>A list of route gateways.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="max-w-[200px]">
                                    Destination
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Payment Type</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gateways?.map((connection) => (
                                <TableRow key={connection.id}>
                                    <TableCell className="font-medium">
                                        <Link
                                            href={`/admin/routes/${connection.route_id}`}
                                            className="capitalize flex gap-2 group"
                                        >
                                            {connection?.routes?.destination} -{" "}
                                            <span className="uppercase font-medium">
                                                {connection?.routes?.route_type}
                                            </span>
                                            <HiOutlineExternalLink className=" w-5 h-5 hidden group-hover:block" />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {" "}
                                        {connection.status === "active" ? (
                                            <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1">
                                                Active
                                            </span>
                                        ) : connection.status === "pending" ? (
                                            <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1">
                                                Pending
                                            </span>
                                        ) : null}
                                    </TableCell>

                                    <TableCell>
                                        <Link
                                            href={`/admin/users/${connection.client_id}`}
                                            className="flex gap-2 group"
                                        >
                                            {connection?.profiles?.email}
                                            <HiOutlineExternalLink className="w-5 h-5 hidden group-hover:block" />
                                        </Link>
                                    </TableCell>
                                    <TableCell className=" capitalize">
                                        {connection?.payment_type}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={`/admin/gateways/${connection.id}`}
                                        >
                                            <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-slate-400">No gateways yet</p>
                )}

                <div>
                    <div className="flex mb-2 justify-between items-center">
                        <h2 className="font-semibold tracking-tight text-lg">
                            Purchase Requests
                        </h2>
                        <Link
                            href="/admin/gateways/requests"
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
                        <p className="text-slate-400">
                            No purchase requests yet
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const UnverifiedRoutes = async () => {
    unstable_noStore();

    const supabase = await supabaseServer();

    let { data: unverified_routes_Count } = await supabase
        .from("routes")
        .select("id")
        .eq("verification", "pending");
    let { data: unverified_routes } = await supabase
        .from("routes")
        .select("*")
        .eq("verification", "pending")
        .range(0, 4);

    return unverified_routes?.length ? (
        <div className="w-full mt-5">
            <div className="flex mb-2 justify-between items-center">
                <h2 className="font-semibold tracking-tight text-lg">
                    Univerified Routes
                </h2>
                <Link href="/admin/routes" className=" text-sm hover:underline">
                    View All
                </Link>
            </div>
            <RoutesTable data={unverified_routes} />
        </div>
    ) : null;
};

const Payments = async () => {
    const supabase = await supabaseServer();

    const { data: payments } = await supabase
        .from("payments")
        .select(`*, profiles (*)`)
        .range(0, 4);
    return (
        <div className="">
            <div className="flex mb-2 justify-between items-center">
                <h2 className="font-semibold tracking-tight text-lg">
                    Payments
                </h2>
                <Link
                    href="/admin/transactions"
                    className=" text-sm hover:underline"
                >
                    View All
                </Link>
            </div>
            {payments?.length ? (
                <Table className="">
                    <TableCaption>A list of payments.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[200px]">
                                User
                            </TableHead>
                            <TableHead>Payment Amount</TableHead>
                            <TableHead>Payment Date</TableHead>
                            <TableHead>Payment Method</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments?.map((payment) => (
                            <TableRow key={payment.payment_id}>
                                <TableCell className="font-medium">
                                    {payment.profiles?.email}
                                </TableCell>
                                <TableCell>${payment.amount}</TableCell>

                                <TableCell>
                                    {formatDate(payment.paid_at)}
                                </TableCell>
                                <TableCell className=" capitalize">
                                    {formatString(payment.payment_method)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                    <p>No payments yet</p>
                </div>
            )}
        </div>
    );
};

const Invoices = async () => {
    const supabase = await supabaseServer();

    const { data: invoices } = await supabase
        .from("invoices")
        .select(`*`)
        .range(0, 4);

    return (
        <div className=" ">
            <div className="flex mb-2 justify-between items-center">
                <h2 className="font-semibold tracking-tight text-lg">
                    Invoices
                </h2>
                <Link
                    href="/admin/invoices"
                    className=" text-sm hover:underline"
                >
                    View All
                </Link>
            </div>
            <div className="">
                {invoices?.length ? (
                    <InvoiceTable data={invoices} />
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No invoices created yet</p>
                        <Link
                            href="/admin/invoices/new"
                            className={`${buttonVariants({
                                variant: "default",
                                size: "sm",
                            })}`}
                        >
                            Create Invoice
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
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

            {/* <div className="grid mt-5 grid-cols-1 gap-5 lg:grid-cols-2">
                <Payments />
                <Invoices />
            </div> */}
            {/* <Notifications /> */}
            {/* <RecentActivities /> */}
        </div>
    );
};

export default page;
