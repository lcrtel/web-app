import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { redirect } from "next/navigation";
import DeleteTarget from "./_components/DeleteTarget";
import { RoutesTable } from "./_components/routes-table";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { EditTarget } from "./_components/EditTarget";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";

export const revalidate = 0;

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabaseAdmin = await supabaseAdminServer();
  let { data: target } = await supabaseAdmin
    .from("targets")
    .select(`*, profiles (*)`)
    .match({ id: params.id })
    .single();
  if (!target) {
    redirect("/admin/routes/targets");
  }

  let { data: routes, error } = await supabaseAdmin
    .from("routes")
    .select("*")
    .match({
      destination_code: target?.destination_code,
      route_type: target?.route_type,
    })
    .neq("vendor_id", target?.client_id);

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Buying Target Details</PageHeaderHeading>
      </PageHeader>
      <div className="space-y-6 pt-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap gap-5">
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-semibold">{target?.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Route Type</p>
              <p className="font-semibold uppercase">
                {target?.route_type}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Requested Rate </p>
              <p className="font-semibold">{target?.rate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Our rate</p>
              <p className="font-semibold">{target?.buying_rate}</p>
            </div>
          </div>{" "}
          <EditTarget target={target} />
        </div>
        <div className="mb-5 grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted by</p>
            <p className="font-semibold"> {target?.profiles?.name}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted on</p>
            <p className="font-semibold">
              {" "}
              {formatTimestamptz(target?.created_at)}
            </p>
          </div>

          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Prefix</p>
            <p className="font-semibold">{target?.destination_code}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ASR</p>
            <p className="font-semibold">{target?.asr}%</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ACD</p>
            <p className="font-semibold">{target?.acd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">PDD</p>
            <p className="font-semibold">{target?.pdd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Ports</p>
            <p className="font-semibold">{target?.ports}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Updated on</p>
            <p className="font-semibold">
              {target?.updated_at
                ? formatTimestamptz(target?.updated_at)
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
