import getRates from "@/app/vos/getRates";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaWhatsapp } from "react-icons/fa6";
import formatString from "@/utils/formatString";
import CopyButton from "@/components/ui/copy-button";
import { EditPurchaseRequest } from "@/app/(dashboards)/admin/requests/EditPurchaseRequest";
import { unstable_noStore } from "next/cache";

export default function PurchasedRoutesPage({
    params,
}: {
    params: { id: string };
}) {
    const supabase = supabaseServer();

    return (
        <section className="flex flex-col gap-5">
            <div className="">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mb-2">
                        Purchase Requests
                    </h3>
                </div>
                <Suspense fallback={<Skeleton className="w-full h-32" />}>
                    <PurchaseRequests supabase={supabase} userID={params.id} />
                </Suspense>
            </div>

            <div className="">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mb-2">
                        Purchased Routes{" "}
                        <span className=" text-xs text-slate-400 font-normal">
                            (Fetched from VOS3000)
                        </span>
                    </h3>
                </div>
                <Suspense fallback={<Skeleton className="w-full h-32" />}>
                    <PurchasedRoutes userID={params.id} supabase={supabase} />
                </Suspense>
            </div>
        </section>
    );
}

const PurchasedRoutes = async ({
    supabase,
    userID,
}: {
    supabase: any;
    userID: any;
}) => {
    unstable_noStore();
    const { data: client } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userID)
        .single();

    const name: string = client?.name;
    const rates = await getRates({ name: name.toLocaleUpperCase() });

    return rates.data?.length ? (
        <div className="border rounded-lg overflow-clip">
            <Table>
                <TableHeader>
                    <TableRow>
                        
                        <TableHead>Destination Code</TableHead>
                        <TableHead>Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rates.data?.map((route: any) => (
                        <TableRow key={route.id}>
                            
                            <TableCell>{route?.area_prefix}</TableCell>
                            <TableCell>{route?.rate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    ) : (
        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
            <p>No purchases yet</p>
        </div>
    );
};

const PurchaseRequests = async ({
    supabase,
    userID,
}: {
    supabase: any;
    userID: any;
}) => {
    let { data: purchaseRequests } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*), profiles (*)`)
        .match({ client_id: userID });
    return purchaseRequests?.length ? (
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
                    {/* <pre>{JSON.stringify(purchaseRequests, null, 2)}</pre> */}
                    {purchaseRequests?.map((request: any) => (
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
                            <TableCell className="">
                                <div className="flex gap-2 group items-center relative">
                                    <Link
                                        href={`/admin/clients/${request.client_id}`}
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
                                        {formatString(request?.vos_status)}
                                    </span>
                                ) : (
                                    <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1 capitalize">
                                        {formatString(request?.vos_status)}
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
        </div>
    ) : (
        <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
            <p>No purchase requests yet</p>
        </div>
    );
};
