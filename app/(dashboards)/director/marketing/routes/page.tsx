import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { Suspense } from "react";
import { fetchVerfiedRoutes } from "../../routes/offers/actions";
import RoutesMarketing from "./RoutesMarketing";

export default function RoutesMarketingPage() {
  return (
    <section className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/director/marketing" className="hover:underline">
          Marketing
        </Link>
        /
        <Link href="/director/marketing/routes" className="hover:underline">
          Routes
        </Link>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Routes Marketing</h2>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <Marketing />
      </Suspense>
    </section>
  );
}

async function Marketing() {
  const supabase = supabaseAdminServer();
  const routes = await fetchVerfiedRoutes();
  let clients: Profile[] = [];
  let { data } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  // @ts-ignore
  clients = data;
  return <RoutesMarketing routes={routes} clients={clients} />;
}
