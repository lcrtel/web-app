import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabaseServer } from "@/lib/supabase-server";
import formatString from "@/utils/formatString";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { DeleteButton } from "./DeleteButton";

export default function PurchaseRequests() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold tracking-tight">Purchases</h1>
      <Suspense fallback={<Loader />}>
        <Requests />
      </Suspense>
    </div>
  );
}

async function Requests() {
  const supabase = await supabaseServer();
  let { data: purchases } = await supabase
    .from("purchases")
    .select(`*, routes (*)`);
  return purchases?.length ? (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route Offer</TableHead>
            <TableHead>Asking rate</TableHead>
            <TableHead>WhatsApp No</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases?.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/user/routes/${purchase.route_id}`}
                  className="group relative flex gap-2"
                >
                  <span className="font-semibold uppercase">
                    {purchase?.routes?.destination} -{" "}
                    {purchase?.routes?.route_type},
                  </span>
                  ${purchase.routes?.selling_rate}/m
                  <HiOutlineExternalLink className="absolute right-6 hidden h-5 w-5 group-hover:block" />
                </Link>
              </TableCell>
              <TableCell className="font-medium">
                ${purchase.buying_rate}
              </TableCell>
              <TableCell className="font-medium">
                {purchase.whatsapp_no}
              </TableCell>
              <TableCell>{purchase.ip}</TableCell>
              <TableCell>
                {purchase?.status === "approved" ? (
                  <span className="rounded-full border-[1.5px] border-green-100 bg-green-50 px-2 py-1 text-xs capitalize text-green-500">
                    {formatString(purchase?.status)}
                  </span>
                ) : (
                  <span className="rounded-full border-[1.5px] border-slate-100 bg-slate-50 px-2 py-1 text-xs capitalize text-slate-500">
                    {formatString(purchase?.status)}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right flex items-center gap-2 justify-end">
                <DeleteButton id={purchase.id} />
                <Link href={`/user/purchases/${purchase.id}`}>
                  <HiOutlineExternalLink className="h-5 w-5" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="mt-4 flex h-12 items-center justify-center gap-2 rounded-lg border py-10 text-center text-sm">
      <p>No purchase requests found</p>
    </div>
  );
}
