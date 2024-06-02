import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  let { data: target } = await supabase
    .from("targets")
    .select("*")
    .match({ id: params.id });
  if (target === null) {
    redirect("/user/targets");
  }

  return (
    <div>
      <Link
        href="/user/targets"
        className="mb-2 inline-flex items-center text-gray-400 transition-all ease-in-out hover:text-primary-900"
      >
        <HiOutlineArrowCircleLeft className="mr-1.5" /> Targets
      </Link>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Target Details</h3>
          </div>
          <div className="flex flex-wrap">
            <p className="mr-2 text-sm text-gray-500">
              Destination:{" "}
              <span className="font-semibold capitalize text-primary-900">
                {target?.[0]?.destination}
              </span>
            </p>
            <p className="mr-2 text-sm text-gray-500">
              Type:{" "}
              <span className="font-semibold uppercase text-primary-900">
                {target?.[0]?.route_type}
              </span>
            </p>
            <p className="mr-2 text-sm text-gray-500">
              Target Rate:{" "}
              <span className="font-semibold uppercase text-primary-900">
                ${target?.[0]?.buying_rate}
              </span>
            </p>
          </div>
        </div>
        <div className="grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Prefix</p>
            <p className="font-semibold">{target?.[0]?.destination_code}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ASR</p>
            <p className="font-semibold">{target?.[0]?.asr}%</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">ACD</p>
            <p className="font-semibold">{target?.[0]?.acd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">PDD</p>
            <p className="font-semibold">{target?.[0]?.pdd}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Ports</p>
            <p className="font-semibold">{target?.[0]?.ports}</p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Posted on</p>
            <p className="font-semibold">
              {target?.[0]?.created_at
                ? formatTimestamptz(target?.[0]?.created_at)
                : "_"}
            </p>
          </div>
          <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
            <p className="text-sm text-gray-500">Updated on</p>
            <p className="font-semibold">
              {target?.[0]?.updated_at
                ? formatTimestamptz(target?.[0]?.updated_at)
                : "_"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
