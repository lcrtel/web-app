import CopyButton from "@/components/ui/copy-button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import formatString from "@/utils/formatString";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import DeleteRoute from "./DeleteRoute";
import { EditRoute } from "./EditRoute";
import { RoutesTable } from "./routes-table";
import { EditPurchaseRequest } from "../../purchases/EditPurchaseRequest";

export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
  const supabase = supabaseAdminServer();
  let { data: route } = await supabase
    .from("routes")
    .select(`*, profiles (name)`)
    .match({ id: params.id })
    .single();
  if (!route) {
    redirect("/director/routes");
  }

  let { data: purchase_requests, error } = await supabase
    .from("purchases")
    .select(`*, profiles (*), routes (*)`)
    .match({ route_id: params.id, status: "pending" });

  let { data: route_requests } = await supabase
    .from("targets")
    .select("*")
    .match({
      destination_code: route?.destination_code,
      route_type: route?.route_type,
    })
    .neq("client_id", route?.vendor_id);

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Route Offer Details
          </h1>
          <p className="text-muted-foreground text-sm">
            View and edit route details
          </p>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-wrap gap-5">
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-semibold capitalize">{route?.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Route Type</p>
              <p className="font-semibold uppercase">{route?.route_type}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rate $</p>
              <p className="font-semibold">$ {route?.rate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Selling Rate $</p>
              <p className="font-semibold">$ {route?.selling_rate}</p>
            </div>
          </div>{" "}
          <EditRoute route={route} />
        </div>
        <div className="mb-5 grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted by</p>
            <p className="font-semibold"> {route?.profiles?.name}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted on</p>
            <p className="font-semibold">
              {" "}
              {formatTimestamptz(route?.created_at)}
            </p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Prefix</p>
            <p className="font-semibold">{route?.destination_code}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ASR</p>
            <p className="font-semibold">{route?.asr}%</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ACD</p>
            <p className="font-semibold">{route?.acd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">PDD</p>
            <p className="font-semibold">{route?.pdd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Ports</p>
            <p className="font-semibold">{route?.ports}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Verification Status</p>
            <p className="font-semibold">{formatString(route?.verification)}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted on</p>
            <p className="font-semibold">
              {route?.created_at ? formatTimestamptz(route?.created_at) : "_"}
            </p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Updated on</p>
            <p className="font-semibold">
              {route?.updated_at ? formatTimestamptz(route?.updated_at) : "_"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-red-500 p-4 text-red-500">
          <div>
            <h3 className="font-semibold tracking-tight">Delete</h3>
            <p className="text-sm">
              Once deleted, it will be gone forever. Please be certain.
            </p>
          </div>
          <button className="rou rounded-md bg-red-500 p-2 text-white">
            <DeleteRoute routeID={params.id} />
          </button>
        </div>
        <section>
          <h2 className="pb-2 text-xl font-bold tracking-tight">
            Purchases
          </h2>
          {purchase_requests?.length ? (
            <div className="overflow-clip rounded-lg border">
              <Table>
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
                  {/* <pre>{JSON.stringify(purchase_requests, null, 2)}</pre> */}
                  {purchase_requests?.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/director/routes/offers/${request.route_id}`}
                          className="group relative flex gap-2 uppercase"
                        >
                          {request?.routes?.destination} -{" "}
                          {request?.routes?.route_type}
                          <HiOutlineExternalLink className="absolute right-6 hidden h-5 w-5 group-hover:block" />
                        </Link>
                      </TableCell>
                      <TableCell className="">
                        <div className="group relative flex items-center gap-2">
                          <Link
                            href={`/director/users/clients/${request.user_id}`}
                          >
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
                        {request?.communication_status ? (
                          <span className="rounded-full border-[1.5px] border-slate-100 bg-slate-50 px-2 py-1 text-xs capitalize text-slate-500">
                            {formatString(request?.communication_status)}
                          </span>
                        ) : (
                          "_"
                        )}
                      </TableCell>
                      <TableCell>
                        {request?.status ? (
                          <span className="rounded-full border-[1.5px] border-slate-100 bg-slate-50 px-2 py-1 text-xs capitalize text-slate-500">
                            {formatString(request?.status)}
                          </span>
                        ) : (
                          "_"
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
          )}
        </section>
        <Separator />
        <div className="my-5">
          <RoutesTable data={route_requests} />
        </div>
      </div>
    </div>
  );
}
