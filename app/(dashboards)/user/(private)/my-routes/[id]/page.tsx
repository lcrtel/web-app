import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiOutlineArrowCircleLeft, HiOutlinePencilAlt } from "react-icons/hi";

import formatString from "@/utils/formatString";
import { fetchUser } from "@/utils/user";

export const revalidate = 0;

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = supabaseServer();
  const user = await fetchUser();

  let { data: route } = await supabase
    .from("routes")
    .select("*")
    .match({ id: params.id })
    .single();
  if (!route) {
    redirect("/user/my-routes");
  }
  let { data: targets, error } = await supabase
    .from("targets")
    .select("*")
    .match({ destination_code: route?.destination_code })
    .eq("route_type", route?.route_type)
    .neq("client_id", user?.id);

  return (
    <div>
      <div className="">
        <div>
          <Link
            href="/user/my-routes"
            className="mb-2 inline-flex items-center text-gray-400 transition-all ease-in-out hover:text-primary-900"
          >
            <HiOutlineArrowCircleLeft className="mr-1.5" />
            My routes
          </Link>
          <div className="mb-3">
            <h2 className="text-primary text-2xl font-bold tracking-tight">
              Route Details
            </h2>
          </div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex flex-wrap">
              <p className="mr-2 text-gray-500">
                Destination:{" "}
                <span className="font-semibold capitalize text-primary-900">
                  {route?.destination}
                </span>
              </p>
              <p className="mr-2 text-gray-500">
                Type:{" "}
                <span className="font-semibold uppercase text-primary-900">
                  {route?.route_type}
                </span>
              </p>
              <p className="mr-2 text-gray-500">
                Offer Rate:{" "}
                <span className="font-semibold uppercase text-primary-900">
                  ${route?.rate}
                </span>
              </p>
            </div>{" "}
            <Link href={`/user/my-routes/post/${route?.id}`} className="">
              <HiOutlinePencilAlt className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mb-5 grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
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
            <p className="text-sm text-gray-500">Status</p>
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

        {/* <Separator />
                <div className="my-5">
                    <RoutesTable data={targets} />
                </div> */}
      </div>
    </div>
  );
}
