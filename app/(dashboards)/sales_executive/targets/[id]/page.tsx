import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { redirect } from "next/navigation";
import DeleteTarget from "./DeleteTarget";
import { EditBuyingTarget } from "./EditBuyingTarget";
import { RoutesTable } from "./routes-table";

export const revalidate = 0;

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await supabaseServer();
  let { data: targets } = await supabase
    .from("targets")
    .select(`*, profiles (*)`)
    .match({ id: params.id })
    .single();
  if (!targets) {
    redirect("/sales_executive/targets");
  }

  let { data: routes, error } = await supabase
    .from("routes")
    .select("*")
    .match({
      destination_code: targets?.destination_code,
      route_type: targets?.route_type,
    })
    .neq("vendor_id", targets?.client_id);

  return (
    <div>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Buying Target Details
          </h1>
          <p className="text-muted-foreground text-sm">
            View and edit buying target
          </p>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-wrap gap-5">
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-semibold">{targets?.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Route Type</p>
              <p className="font-semibold uppercase">{targets?.route_type}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rate</p>
              <p className="font-semibold">{targets?.rate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Buying Rate</p>
              <p className="font-semibold">{targets?.buying_rate}</p>
            </div>
          </div>{" "}
          <EditBuyingTarget buyingTarget={targets} />
        </div>
        <div className="mb-5 grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted by</p>
            <p className="font-semibold"> {targets?.profiles?.name}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted on</p>
            <p className="font-semibold">
              {" "}
              {formatTimestamptz(targets?.created_at)}
            </p>
          </div>

          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Prefix</p>
            <p className="font-semibold">{targets?.destination_code}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ASR</p>
            <p className="font-semibold">{targets?.asr}%</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ACD</p>
            <p className="font-semibold">{targets?.acd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">PDD</p>
            <p className="font-semibold">{targets?.pdd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Ports</p>
            <p className="font-semibold">{targets?.ports}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Updated on</p>
            <p className="font-semibold">
              {targets?.updated_at
                ? formatTimestamptz(targets?.updated_at)
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
