import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { redirect } from "next/navigation";
import DeleteTarget from "./DeleteTarget";
import { EditRouteRequest } from "./EditRouteRequest";
import { RoutesTable } from "./routes-table";

export const revalidate = 0;

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await supabaseServer();
  let { data: route_request } = await supabase
    .from("targets")
    .select(`*, profiles (*)`)
    .match({ id: params.id })
    .single();
  if (!route_request) {
    redirect("/director/requests");
  }

  let { data: routes, error } = await supabase
    .from("routes")
    .select("*")
    .match({
      destination_code: route_request?.destination_code,
      route_type: route_request?.route_type,
    })
    .neq("vendor_id", route_request?.client_id);

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Route Request Details
          </h1>
          <p className="text-muted-foreground text-sm">
            View and edit route request
          </p>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-wrap gap-5">
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-semibold">{route_request?.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Route Type</p>
              <p className="font-semibold uppercase">
                {route_request?.route_type}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Requested Rate </p>
              <p className="font-semibold">{route_request?.rate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Our rate</p>
              <p className="font-semibold">{route_request?.buying_rate}</p>
            </div>
          </div>{" "}
          <EditRouteRequest route_request={route_request} />
        </div>
        <div className="mb-5 grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted by</p>
            <p className="font-semibold"> {route_request?.profiles?.name}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted on</p>
            <p className="font-semibold">
              {" "}
              {formatTimestamptz(route_request?.created_at)}
            </p>
          </div>

          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Prefix</p>
            <p className="font-semibold">{route_request?.destination_code}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ASR</p>
            <p className="font-semibold">{route_request?.asr}%</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ACD</p>
            <p className="font-semibold">{route_request?.acd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">PDD</p>
            <p className="font-semibold">{route_request?.pdd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Ports</p>
            <p className="font-semibold">{route_request?.ports}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Updated on</p>
            <p className="font-semibold">
              {route_request?.updated_at
                ? formatTimestamptz(route_request?.updated_at)
                : "_"}
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
          <button className="rounded-md bg-red-500 p-2 text-white">
            <DeleteTarget routeID={params.id} />
          </button>
        </div>
        <Separator />
        <div className="my-5">
          <RoutesTable data={routes} />
        </div>
      </div>
    </div>
  );
}
