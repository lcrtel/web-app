import { Button } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import {
  ArrowRight,
  BadgeDollarSign,
  Calendar,
  HandCoins,
  Heart,
  History,
  Router,
  Share2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import AddToCart from "../AddToCart";
import { PriceChart } from "./_components/LineChart";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = supabaseServer();
  let { data: route } = await supabase
    .from("routes")
    .select("*")
    .match({ id: params.id })
    .single();
  const { data: rateHistory } = await supabase
    .from("routes_history")
    .select("*")
    .match({ route_id: params.id });
  if (route === null) {
    redirect("/user/routes");
  }

  const spec = [
    { title: "Prefix", value: route.destination_code },
    { title: "Capacity", value: route.capacity },
    { title: "Route type", value: route.route_type },
    { title: "ACD", value: route.acd },
    { title: "ASR", value: route.asr },
    { title: "PDD", value: route.pdd },
    { title: "Ports", value: route.ports },
  ];
  return (
    <div>
      <Link
        href="/user/routes"
        className="inline-flex items-center text-gray-400 transition-all ease-in-out hover:text-primary-900"
      >
        <HiOutlineArrowCircleLeft className="mr-1.5" /> Routes
      </Link>
      <div className="mb-20 grid w-full gap-5 md:mb-0 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex justify-between">
            <h2 className="flex items-center gap-2 py-2 text-2xl font-semibold">
              <Router /> {route?.destination}
              <span className=" font-medium text-slate-400">
                (+{route?.destination_code})
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Heart className="size-4 text-red-500" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="size-4 text-primary-900" />
              </Button>
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <p className="text-slate-400">
              Posted on: {formatTimestamptz(route?.created_at)}
            </p>
            <p className="text-slate-400">
              Updated on: {formatTimestamptz(route?.updated_at)}
            </p>
          </div>

          <div className="overflow-clip rounded-lg border border-primary-900 bg-primary-50">
            <div className=" bg-primary-900 py-4 text-center text-white">
              <h3 className=" text-xl font-medium">Specifications</h3>
              <p className=" text-sm ">
                Verified on:{" "}
                {route?.verified_at
                  ? formatTimestamptz(route?.verified_at)
                  : "Not verified"}
              </p>
            </div>
            <div className="space-y-3 p-3">
              {spec.map((item, index) => (
                <div
                  key={index}
                  className="rounded-md border border-primary-100/50 bg-white p-3 shadow"
                >
                  <h4 className="text-slate-500 ">{item.title}: </h4>
                  <p className="font-semibold text-primary-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4 md:col-span-1">
          <div className="fixed bottom-0 left-0 flex h-fit w-full flex-col overflow-clip rounded-2xl border border-slate-100 bg-white drop-shadow-sm md:relative">
            <div className="flex items-center justify-between gap-2 bg-surface p-4 text-primary-900">
              <h3 className="text-2xl font-semibold">
                $ {route?.selling_rate}{" "}
                <span className="text-base font-normal text-slate-400">
                  /min
                </span>
              </h3>
              <PriceChart rates={rateHistory} />
            </div>
            <div className="flex w-full items-center gap-2 border-t p-4">
              <Button className="w-full gap-2" variant="default">
                <ShoppingCart className="size-4" /> Purchase now
              </Button>
              <Button className="w-full gap-2" variant="secondary">
                <HandCoins className=" size-4" /> Make an offer
              </Button>
              <AddToCart routeID={params.id} />
            </div>
          </div>
          <Link
            href="/user/my-targets/post"
            className="flex flex-col gap-1 rounded-lg border border-primary-100/50 bg-gradient-to-br from-primary-100/10 to-white p-4"
          >
            <h3 className="text-lg font-semibold">
              Didn&apos;t find what you were looking for?
            </h3>
            <p className="text-pretty text-base text-slate-400">
              Post your target route and let us handle the rest.
            </p>
            <div className="flex w-fit items-center justify-center gap-2 self-end rounded-full border py-1 pl-4 pr-2 ">
              Post target <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            href="/user/my-routes/post"
            className="flex items-end gap-2 rounded-lg border border-primary-100/50 bg-gradient-to-br from-primary-100/10 to-white p-4"
          >
            <div className="">
              <h3 className=" text-base font-semibold">
                Ready to Sell Your Route?
              </h3>
              <p className="text-pretty text-sm text-slate-400">
                Explore a hassle-free way to sell your route! <br />
                Post your route offers, and let us handle the rest.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-full border p-2">
              <ArrowRight className="size-4" />
            </div>
          </Link>
        </div>
      </div>
      <SimilarRoutes route={route} />
    </div>
  );
}

const SimilarRoutes = async ({ route }: { route: any }) => {
  const supabase = supabaseServer();
  let { data: similarRoutes } = await supabase
    .from("routes")
    .select("*")
    .eq("verification", "verified")
    .neq("id", route.id)
    .match({ destination_code: route?.destination_code });
  return (
    similarRoutes && (
      <div className=" mt-5 space-y-4">
        <h2 className="text-xl font-semibold">
          Similar routes in the same destination
        </h2>
        <div className="grid grid-cols-4">
          {similarRoutes.map((route: any) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    )
  );
};

const RouteCard = ({ route }: { route: any }) => {
  return (
    <Link href={`/user/routes/${route.id}`} className="rounded-lg border border-primary-100/50 bg-gradient-to-br from-surface to-white p-4  pt-3">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="mb-2 flex flex-col">
          <h4 className="flex items-center gap-2 text-xl font-semibold text-primary-900">
            <Router className=" size-4" />
            {route.destination}
            <span className=" text-sm font-normal text-slate-400">
              ({route.route_type})
            </span>
          </h4>
          <h4 className="flex items-center gap-2 text-xl font-semibold">
            <BadgeDollarSign className="size-4" />
            <span>
              ${route.selling_rate}
              <span className=" text-base font-normal text-slate-500">
                /min
              </span>
            </span>
          </h4>
        </div>

        <Button variant="outline" size="icon">
          <Heart className="size-4 text-red-500" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Calendar className="size-4" /> {formatTimestamptz(route.created_at)}
        </div>
      </div>
    </Link>
  );
};
