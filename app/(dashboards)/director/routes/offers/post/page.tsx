import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { Suspense } from "react";
import { AddRouteTable } from "./AddRoutes";

export default function page() {
  return (
    <section className="">
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <BackButton />
        <Link href="/director" className="hover:underline">
          Dashboard
        </Link>
        /
        <Link href="/director/routes/offers" className="hover:underline">
          Routes
        </Link>
        /
        <Link
          href="/director/routes/offers/post"
          className="font-semibold hover:underline"
        >
          Post Routes
        </Link>
      </div>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <AddRoutes />
      </Suspense>
    </section>
  );
}

async function AddRoutes() {
  const supabase = supabaseAdminServer();
  let { data: vendors } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user");
  return <AddRouteTable users={vendors} />;
}
