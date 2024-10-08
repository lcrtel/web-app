import BackButton from "@/components/BackButton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { AddRouteTable } from "./AddRoutes";

export default async function page() {
  const supabase = supabaseAdminServer();
  let { data: vendors } = await supabase
    .from("profiles")
    .select("*, user_roles!inner(*)")
    .eq("user_roles.role_slug", "user")
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
          href="/director/routes/post"
          className="font-semibold hover:underline"
        >
          Post Routes
        </Link>
      </div>
      <AddRouteTable users={vendors} />
    </section>
  );
}
