import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { fetchUser } from "@/utils/user";
import { BadgeDollarSign, Calendar, Router } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import RouteOfferForm from "./route-offer-form";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = supabaseServer();
  const user = await fetchUser();
  let { data: target } = await supabase
    .from("targets")
    .select("*")
    .match({ id: params.id })
    .single();

  if (target === null) {
    redirect("/user/targets");
  }

  const spec = [
    { title: "Prefix", value: target.destination_code },
    { title: "Route type", value: target.route_type },
    { title: "ACD", value: target.acd },
    { title: "ASR %", value: target.asr },
    { title: "PDD", value: target.pdd },
    { title: "Ports", value: target.ports },
    { title: "Remarks", value: target.remarks },
  ];

  return (
    <div className="space-y-4 pb-5">
      <Link
        href="/user/targets"
        className="inline-flex items-center text-gray-400 transition-all ease-in-out hover:text-primary-900"
      >
        <HiOutlineArrowCircleLeft className="mr-1.5" /> Targets
      </Link>
      <div className="grid w-full gap-5 md:mb-0 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex justify-between">
            <h2 className="flex items-center gap-2 py-2 text-2xl font-semibold capitalize">
              <Router /> {target?.destination}
              <span className="text-sm font-medium text-slate-400">
                (+{target?.destination_code})
              </span>
            </h2>
          </div>
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <p className="text-slate-500">
              Posted on: {formatTimestamptz(target?.created_at)}
            </p>
            {target?.updated_at && (
              <p className="text-slate-500">
                Updated on: {formatTimestamptz(target?.updated_at)}
              </p>
            )}
          </div>

          <div className="overflow-clip rounded-2xl border bg-white shadow-sm">
            <div className="border-b bg-slate-100 px-4 py-3 text-primary-900">
              <h3 className="text-xl font-semibold">Specifications</h3>
            </div>
            <div className="divide-y p-2">
              {spec.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap justify-between gap-2 p-2"
                >
                  <h4 className="text-slate-500">{item.title}: </h4>
                  <p className="font-semibold uppercase text-primary-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-fit w-full flex-col overflow-clip rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b bg-primary-50 p-4 text-primary-900">
            <h3 className="text-2xl font-bold">
              $ {target?.buying_rate}{" "}
              <span className="text-base font-normal text-slate-400">/min</span>
            </h3>
          </div>
          {searchParams.option !== "sell" && (
            <div className="flex w-full items-center gap-2 border-t p-4">
              <Link
                className={`w-full gap-2 ${buttonVariants({ variant: "default" })}`}
                href="?option=sell"
              >
                Post your route offer
              </Link>
            </div>
          )}
          <Accordion
            type="single"
            value={searchParams.option === "sell" ? "sell" : undefined}
            collapsible
            className="w-full"
          >
            <AccordionItem value="sell" className="w-full border-b-0">
              <AccordionContent className="w-full p-4">
                <h3 className="mb-3 text-xl font-semibold">
                  Post your route offer
                </h3>
                <RouteOfferForm target={target} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {user && (
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <MatchingRouteOffers target={target} userId={user?.id} />
        </Suspense>
      )}
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <SimilarTargets target={target} />
      </Suspense>
    </div>
  );
}

async function MatchingRouteOffers({
  target,
  userId,
}: {
  target: any;
  userId: string;
}) {
  const supabase = supabaseServer();
  let { data: matchingOffers } = await supabase
    .from("routes")
    .select("*")
    .eq("vendor_id", userId)
    .match({ destination_code: target?.destination_code })
    .range(0, 4);

  return (
    matchingOffers &&
    matchingOffers?.length > 0 && (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Matching route offers</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {matchingOffers.map((route: any) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    )
  );
}
const SimilarTargets = async ({ target }: { target: any }) => {
  const supabase = supabaseServer();
  let { data: similarTargets } = await supabase
    .from("targets")
    .select("*")
    .neq("id", target.id)
    .match({ destination_code: target?.destination_code })
    .range(0, 4);
  return (
    similarTargets &&
    similarTargets?.length > 0 && (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Similar targets in the same destination
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {similarTargets.map((route: any) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    )
  );
};

const RouteCard = ({ route }: { route: any }) => {
  return (
    <Link
      href={`/user/routes/${route.id}`}
      className="rounded-lg border bg-gradient-to-br from-surface to-white p-4 pt-3 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="mb-2 flex flex-col">
          <h4 className="flex items-center gap-2 text-xl font-semibold text-primary-900">
            <Router className="size-4" />
            {route.destination}
            <span className="text-sm font-normal text-slate-400">
              ({route.route_type})
            </span>
          </h4>
          <h4 className="flex items-center gap-2 text-xl font-semibold">
            <BadgeDollarSign className="size-4" />
            <span>
              ${route.buying_rate || route.selling_rate}
              <span className="text-base font-normal text-slate-500">/min</span>
            </span>
          </h4>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Calendar className="size-4" /> {formatTimestamptz(route.created_at)}
        </div>
      </div>
    </Link>
  );
};
