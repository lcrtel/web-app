import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { getUser } from "@/utils/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { HiOutlineArrowCircleLeft, HiOutlinePencilAlt } from "react-icons/hi";
import { RoutesTable } from "./routes-table";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div>
      <div>
        <Link
          href="/user/my-targets"
          className="mb-2 inline-flex items-center text-gray-400 transition-all ease-in-out hover:text-primary-900"
        >
          <HiOutlineArrowCircleLeft className="mr-1.5" /> My Targets
        </Link>
        <div className="mb-3">
          <h2 className="text-primary text-2xl font-bold tracking-tight">
            Target Details
          </h2>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <TargetDetails id={params.id} />
      </Suspense>
    </div>
  );
}

async function TargetDetails({ id }: { id: string }) {
  const supabase = await supabaseServer();
  const user = await getUser();
  let { data: target } = await supabase
    .from("targets")
    .select("*")
    .match({ id: id })
    .single();
  if (target === null) {
    redirect("/user/my-targets");
  }

  let { data: routes, error } = await supabase
    .from("routes")
    .select("*")
    .match({ destination_code: target?.destination_code })
    .eq("route_type", target?.route_type)
    .neq("vendor_id", user?.id);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-wrap">
          <p className="mr-2 text-gray-500">
            Destination:{" "}
            <span className="font-semibold capitalize text-primary-900">
              {target?.destination}
            </span>
          </p>
          <p className="mr-2 text-gray-500">
            Type:{" "}
            <span className="font-semibold uppercase text-primary-900">
              {target?.route_type}
            </span>
          </p>
          <p className="mr-2 text-gray-500">
            Requested Rate:{" "}
            <span className="font-semibold uppercase text-primary-900">
              ${target?.rate}
            </span>
          </p>
        </div>
        <Link href={`/user/my-targets/post/${target?.id}`} className="">
          <HiOutlinePencilAlt className="h-5 w-5" />
        </Link>
      </div>
      <div className="mb-5 grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
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
          <p className="text-sm text-gray-500">Posted on</p>
          <p className="font-semibold">
            {target?.created_at ? formatTimestamptz(target?.created_at) : "_"}
          </p>
        </div>
        <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
          <p className="text-sm text-gray-500">Updated on</p>
          <p className="font-semibold">
            {target?.updated_at ? formatTimestamptz(target?.updated_at) : "_"}
          </p>
        </div>
      </div>

      <Separator />
      <div className="my-5">
        <RoutesTable data={routes} />
      </div>
    </>
  );
}
