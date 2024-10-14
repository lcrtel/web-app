import BackButton from "@/components/BackButton";
import CopyButton from "@/components/ui/copy-button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { supabaseServer } from "@/lib/supabase-server";
import formatString from "@/utils/formatString";
import Link from "next/link";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { EditPurchaseRequest } from "../targets/EditPurchaseRequest";

export default function PurchaseRequestsPage() {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link
          href="/director/routes/purchase_requests"
          className="font-semibold hover:underline"
        >
          Purchase requests
        </Link>
      </div>
      <div className="mb-4 flex flex-wrap justify-between gap-2 md:items-center">
        <h1 className="text-primary text-2xl font-bold">Purchase requests</h1>
      </div>
      <div className="w-full overflow-y-auto">
        <Suspense fallback={<Skeleton className="h-28 w-full" />}>
          <PurchaseRequestsTable />
        </Suspense>
      </div>
    </div>
  );
}

async function PurchaseRequestsTable() {
  const supabase = supabaseServer();

  let { data: requests } = await supabase
    .from("purchase_requests")
    .select(`*, routes (*), profiles (*)`);
  return requests?.length ? (
    <div className="overflow-clip rounded-lg border">
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
                  className="group relative flex gap-2 uppercase"
                >
                  {request?.routes?.destination} - {request?.routes?.route_type}
                  <HiOutlineExternalLink className="absolute right-6 hidden h-5 w-5 group-hover:block" />
                </Link>
              </TableCell>
              <TableCell className="">
                <div className="group relative flex items-center gap-2">
                  <Link href={`/director/users/clients/${request.user_id}`}>
                    {request?.profiles?.name}
                    <span className="text-slate-400">
                      ({request?.profiles?.company_name})
                    </span>
                  </Link>
                  <Link
                    href={`https://wa.me/${request?.whatsapp_no}`}
                    className={`text-[#128c7e] hover:text-[#25d366]`}
                  >
                    <FaWhatsapp className="h-4 w-4" />{" "}
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                {request?.communication_status === "contacted" ? (
                  <span className="rounded-full border-[1.5px] border-green-100 bg-green-50 px-2 py-1 text-xs capitalize text-green-500">
                    {formatString(request?.communication_status)}
                  </span>
                ) : (
                  <span className="rounded-full border-[1.5px] border-slate-100 bg-slate-50 px-2 py-1 text-xs capitalize text-slate-500">
                    {formatString(request?.communication_status)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {request?.vos_status === "added" ? (
                  <span className="rounded-full border-[1.5px] border-green-100 bg-green-50 px-2 py-1 text-xs capitalize text-green-500">
                    {formatString(request?.vos_status)}
                  </span>
                ) : (
                  <span className="rounded-full border-[1.5px] border-slate-100 bg-slate-50 px-2 py-1 text-xs capitalize text-slate-500">
                    {formatString(request?.vos_status)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {request?.status === "approved" ? (
                  <span className="rounded-full border-[1.5px] border-green-100 bg-green-50 px-2 py-1 text-xs capitalize text-green-500">
                    {formatString(request?.status)}
                  </span>
                ) : (
                  <span className="rounded-full border-[1.5px] border-slate-100 bg-slate-50 px-2 py-1 text-xs capitalize text-slate-500">
                    {formatString(request?.status)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
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
    <div className="flex h-12 items-center justify-center gap-2 rounded-lg border py-10 text-center text-sm">
      <p>No purchase requests yet</p>
    </div>
  );
}
