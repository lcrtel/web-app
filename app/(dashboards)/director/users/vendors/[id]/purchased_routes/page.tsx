import { EditPurchaseRequest } from "@/app/(dashboards)/director/routes/targets/EditPurchaseRequest";
import getRates from "@/app/vos/getRates";
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
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";

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
          <h3 className="mb-2 text-lg font-semibold">Purchase Requests</h3>
        </div>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <PurchaseRequests supabase={supabase} userID={params.id} />
        </Suspense>
      </div>

      {/* <div className="">
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
            </div> */}
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
    <div className="overflow-clip rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prefix</TableHead>
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
    <div className="flex h-12 items-center justify-center gap-2 rounded-lg border py-10 text-center text-sm">
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
          {/* <pre>{JSON.stringify(purchaseRequests, null, 2)}</pre> */}
          {purchaseRequests?.map((request: any) => (
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
                  <Link href={`/director/users/clients/${request.client_id}`}>
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
};
