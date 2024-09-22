import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import formatTimestamptz from "@/utils/formatTimestamptz";
import { format } from "date-fns";
import {
  AreaChart,
  ArrowRight,
  BadgeDollarSign,
  Calendar,
  CheckCircle2,
  Heart,
  Router,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { getTRVerificationStatus } from "../../(private)/account/tr-verification/actions";
import PurchaseForm from "./_components/PurchaseForm";
import { RateHistoryChart } from "./_components/RateHistoryChart";
export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
    redirect("/u/routes");
  }
  const { data: purchaseRequests } = await supabase
    .from("purchase_requests")
    .select(`*`);
  const purchaseRequest = purchaseRequests?.find(
    (p) => p.route_id === params.id,
  );
  const spec = [
    { title: "Prefix", value: route.destination_code },
    { title: "Route type", value: route.route_type },
    { title: "ACD", value: route.acd },
    { title: "ASR %", value: route.asr },
    { title: "PDD", value: route.pdd },
    { title: "Ports", value: route.ports },
  ];

  let trVerified = await getTRVerificationStatus();

  return (
    <div className="pb-5">
      <Link
        href="/u/routes"
        className="inline-flex items-center text-gray-400 transition-all ease-in-out hover:text-primary-900"
      >
        <HiOutlineArrowCircleLeft className="mr-1.5" /> Routes
      </Link>
      <div className="grid w-full gap-5 md:mb-0 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex justify-between">
            <h2 className="flex items-center gap-2 py-2 text-2xl font-semibold capitalize">
              <Router /> {route?.destination}
              <span className="text-sm font-medium text-slate-400">
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
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <p className="text-slate-500">
              Posted on: {formatTimestamptz(route?.created_at)}
            </p>
            <p className="text-slate-500">
              Updated on: {formatTimestamptz(route?.updated_at)}
            </p>
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
              $ {route?.selling_rate}{" "}
              <span className="text-base font-normal text-slate-400">/min</span>
            </h3>
          </div>
          <div className="bg-slate-50 pr-4 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="text-md py-3 pl-4 font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    <AreaChart className="size-4" /> <span>Rate history</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <RateHistoryChart rates={rateHistory} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {purchaseRequest ? (
            <div className="m-4 rounded-lg border bg-slate-50 px-4 pb-4">
              <div className="flex items-center justify-center gap-2 p-4">
                Your purchase request has been submitted{" "}
                <CheckCircle2 className="size-5" />
              </div>
              <div className="space-y-3 rounded-lg border bg-white p-5 text-slate-500">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
                  <h4 className="font-medium text-primary-900">Buying rate:</h4>
                  <p>{purchaseRequest.buying_rate}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
                  <h4 className="font-medium text-primary-900">IP Address:</h4>
                  <p>{purchaseRequest.ip}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
                  <h4 className="font-medium text-primary-900">WhatsApp No:</h4>
                  <p>{purchaseRequest.whatsapp_no}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
                  <h4 className="font-medium text-primary-900">Website:</h4>
                  <p>
                    {format(
                      new Date(purchaseRequest.created_at),
                      "hh:mm, dd, MMM, yyyy",
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
                  <h4 className="font-medium text-primary-900">
                    Verification:
                  </h4>
                  <Badge variant="default">
                    {purchaseRequest.communication_status?.toLowerCase()}
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <>
              {searchParams.option !== "purchase" && (
                <div className="flex w-full items-center gap-2 border-t p-4">
                  <Link
                    className={`w-full gap-2 ${buttonVariants({ variant: "default" })}`}
                    href="?option=purchase"
                  >
                    Purchase now
                  </Link>
                </div>
              )}
              <Accordion
                type="single"
                value={
                  searchParams.option === "purchase" ? "purchase" : undefined
                }
                collapsible
                className="w-full border-t"
              >
                <AccordionItem value="purchase" className="w-full border-b-0">
                  <AccordionContent className="w-full p-4">
                    <PurchaseForm
                      routeId={params.id}
                      buying_rate={route?.selling_rate}
                      ip={purchaseRequests?.length ? purchaseRequests?.[0].ip : ""}
                      whatsapp_no={
                        purchaseRequests?.length
                          ? purchaseRequests?.[0].whatsapp_no
                          : ""
                      }
                      trVerified={trVerified}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
      </div>

      <SimilarRoutes route={route} />

      <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
        <Link
          href="/u/my-targets/post"
          className="flex flex-wrap items-start justify-between gap-1 rounded-2xl border border-primary-100/50 bg-gradient-to-br from-primary-100/10 to-white p-4 shadow-sm transition-all hover:shadow-lg"
        >
          <div className="">
            <h3 className="text-lg font-semibold">
              Didn&apos;t find what you were looking for?
            </h3>
            <p className="text-pretty text-base text-slate-400">
              Post your target route and let us handle the rest.
            </p>
          </div>
          <div className="flex w-fit items-center justify-center gap-2 self-end rounded-full border py-1 pl-4 pr-2">
            Post target <ArrowRight className="size-4" />
          </div>
        </Link>
        <Link
          href="/u/my-routes/post"
          className="flex flex-wrap items-start justify-between gap-1 rounded-2xl border border-primary-100/50 bg-gradient-to-br from-primary-100/10 to-white p-4 shadow-sm transition-all hover:shadow-lg"
        >
          <div className="">
            <h3 className="text-base font-semibold">
              Want to Sell Your Route?
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
    similarRoutes &&
    similarRoutes?.length > 0 && (
      <div className="space-y-4 border-b py-5">
        <h2 className="text-xl font-semibold">
          Similar routes in the same destination
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    <Link
      href={`/u/routes/${route.id}`}
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
              ${route.selling_rate}
              <span className="text-base font-normal text-slate-500">/min</span>
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
