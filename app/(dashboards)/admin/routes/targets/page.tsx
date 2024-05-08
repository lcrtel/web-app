import { buttonVariants } from "@/components/ui/button";
import CopyButton from "@/components/ui/copy-button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineExternalLink, HiOutlinePlusCircle } from "react-icons/hi";
import { EditPurchaseRequest } from "./EditPurchaseRequest";
import { unstable_noStore } from "next/cache";
import { TargetsTable } from "./TargetsTable";

export default function Page() {
    const supabase = supabaseServer();
    return (
        <div className="">
            <div className="flex  gap-2  flex-wrap md:items-center mb-4 justify-between ">
                <h1 className="text-2xl font-bold text-primary">
                   Buying Targets
                </h1>
                <Link
                    passHref
                    href="/admin/routes/targets/post"
                    className={buttonVariants({
                        variant: "default",
                        size: "sm",
                    })}
                >
                    <HiOutlinePlusCircle className="mr-2 h-5 w-5" />
                    Add
                </Link>
            </div>
            <div className="w-full  overflow-y-auto">
                <Suspense fallback={<Skeleton className="w-full h-28" />}>
                    <BuyingTargets supabase={supabase} />
                </Suspense>
            </div>
            <div className="pt-4">
                <div className="flex mb-2 justify-between items-center">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Purchase Requests
                    </h2>
                    <Link
                        href="/admin/routes/purchase_requests"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        View All
                    </Link>
                </div>
                <Suspense fallback={<Skeleton className="w-full h-28" />}>
                    <PurchaseRequests supabase={supabase} />
                </Suspense>
            </div>
        </div>
    );
}

async function BuyingTargets({ supabase }: { supabase: SupabaseClient }) {
    unstable_noStore();
    let { data: clients } = await supabase.from("profiles").select("*");
    let { data: targets } = await supabase.from("targets").select("*");

    function addClientNameToTargets(targets: any, users: any) {
        return targets
            .filter((target: any) =>
                users.some((user: any) => user.id === target.client_id)
            )
            .map((target: any) => {
                const { client_id } = target;
                const user = users.find((user: any) => user.id === client_id);
                const clientName = user ? user.name : null;
                const clientCompany = user ? user.company_name : null;

                return {
                    ...target,
                    client: clientName,
                    client_company: clientCompany,
                };
            });
    }
    return <TargetsTable data={addClientNameToTargets(targets, clients)} />;
}

async function PurchaseRequests({ supabase }: { supabase: SupabaseClient }) {
    unstable_noStore();
    let { data: requests } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*), profiles (*)`)
        .eq("status", "pending");
    return requests?.length ? (
        <Table>
            <TableCaption>A list of pending purchase requests.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Route Offer</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Communication Status</TableHead>
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
                                href={`/admin/routes/offers/${request.route_id}`}
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
                                    href={`/admin/users/clients/${request.client_id}`}
                                >
                                    {request?.profiles?.name}
                                    <span className=" text-slate-400">
                                        ({request?.profiles?.company_name})
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
                                    {formatString(request?.status)}
                                </span>
                            ) : (
                                "_"
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2 items-center">
                                <p>{request.ip}</p>
                                <CopyButton textToCopy={request.ip} />
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <EditPurchaseRequest request={request} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ) : (
        <div className="gap-2   text-center flex flex-col items-center text-sm  justify-center border py-14 rounded-lg">
            <p>No pending purchase requests yet</p>{" "}
            <Link
                href="/admin/routes/purchase_requests"
                className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                })}
            >
                View All
            </Link>
        </div>
    );
}
