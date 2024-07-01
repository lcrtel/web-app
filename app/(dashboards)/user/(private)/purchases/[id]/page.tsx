import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  let { data: requests, error } = await supabase
    .from("purchase_requests")
    .select(`*, routes (*)`)
    .match({ id: params.id })
    .single();
  return (
    <div>
      <div>
        <Link
          href="/user/purchases"
          className="mb-2 inline-flex items-center text-gray-400 transition-all ease-in-out hover:text-primary-900"
        >
          <HiOutlineArrowCircleLeft className="mr-1.5" /> Purchase Requests
        </Link>
        <div className="mb-3">
          <h2 className="text-primary text-2xl font-bold tracking-tight">
            Purchase Request Details
          </h2>
        </div>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-gray-500">
              Destination:{" "}
              <span className="font-semibold capitalize text-primary-900">
                {requests?.routes?.destination}
              </span>
            </p>
            <p className="text-gray-500">
              Type:{" "}
              <span className="font-semibold uppercase text-primary-900">
                {requests?.routes?.route_type}
              </span>
            </p>{" "}
            <p className="flex items-center gap-2 text-gray-500">
              Status:{" "}
              <span className="font-medium capitalize text-primary-900">
                {requests?.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-4 rounded-lg bg-surface p-4 sm:grid-cols-2">
        <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
          <p className="text-sm text-gray-500">Prefix</p>
          <p className="font-semibold">{requests?.routes?.destination_code}</p>
        </div>
        <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
          <p className="text-sm text-gray-500">ASR</p>
          <p className="font-semibold">{requests?.routes?.asr}%</p>
        </div>
        <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
          <p className="text-sm text-gray-500">ACD</p>
          <p className="font-semibold">{requests?.routes?.acd}</p>
        </div>
        <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
          <p className="text-sm text-gray-500">PDD</p>
          <p className="font-semibold">{requests?.routes?.pdd}</p>
        </div>
        <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1">
          <p className="text-sm text-gray-500">Ports</p>
          <p className="font-semibold">{requests?.routes?.ports}</p>
        </div>
      </div>
    </div>
  );
}
