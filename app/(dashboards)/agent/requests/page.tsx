import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiOutlineExternalLink, HiOutlinePlusCircle } from "react-icons/hi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import formatString from "@/utils/formatString";
import { EditPurchaseRequest } from "./EditPurchaseRequest";
import { FaWhatsapp } from "react-icons/fa6";
import CopyButton from "@/components/ui/copy-button";
import { RequestsTable } from "./RequestsTable";
import fetchUser from "@/app/post/fetchUser";
export const revalidate = 0; // revalidate this page every 60 seconds

export default async function Page() {
    const supabase = await supabaseServer();
    const user: any = await fetchUser();
    let { data: clients } = await supabase
        .from("profiles")
        .select("*")
        .eq("agent_id", user.id);
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

    let { data: unfilteredRequests } = await supabase
        .from("purchase_requests")
        .select(`*, routes (*), profiles (*)`)
        .eq("status", "pending");

    let requests = unfilteredRequests?.filter(
        (request) => request.profiles?.agent_id === user.id
    );

    return (
        <div className="">
            <div className="flex  gap-2  flex-wrap md:items-center mb-4 justify-between ">
                <h1 className="text-2xl font-bold text-primary">
                    Route Requests
                </h1>
                <Link
                    passHref
                    href="/agent/requests/post"
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
                <RequestsTable
                    data={addClientNameToTargets(targets, clients)}
                />
            </div>
            <div className="pt-4">
                <div className="flex mb-2 justify-between items-center">
                    <h2 className="font-semibold tracking-tight text-lg">
                        Purchase Requests
                    </h2>
                    <Link
                        href="/agent/requests/purchase_requests"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
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
                                            href={`/agent/routes/${request.route_id}`}
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
                                                href={`/agent/clients/${request.client_id}`}
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
                ) : (
                    <div className="gap-2   text-center flex flex-col items-center text-sm  justify-center border py-14 rounded-lg">
                        <p>No pending purchase requests yet</p>{" "}
                        <Link
                            href="/agent/requests/purchase_requests"
                            className={buttonVariants({
                                variant: "outline",
                                size: "sm",
                            })}
                        >
                            View All
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
