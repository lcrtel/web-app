import BackButton from "@/components/BackButton";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { AddRouteTable } from "./AddTargets";

const page = async () => {
  const supabase = await supabaseAdminServer();
  let { data: clients } = await supabase
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
        <Link href="/admin/routes/targets" className="hover:underline">
          Buying targets
        </Link>
        /
        <Link
          href="/admin/routes/targets/post"
          className="font-semibold hover:underline"
        >
          Post targets
        </Link>
      </div>
      <AddRouteTable users={clients} />
    </section>
  );
};

export default page;
