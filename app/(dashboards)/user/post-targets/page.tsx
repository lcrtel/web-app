import { supabaseServer } from "@/lib/supabase-server";
import { fetchUser } from "@/utils/user";
import { OffersTable } from "../routes/offers-table";
import { PostTargetTable } from "./PostTargetTable";
import React from "react";
export const revalidate = 0;
const page = async () => {
  const user = await fetchUser();
  const supabase = supabaseServer();
  let { data: routes, error } = await supabase
    .from("routes")
    .select("*")
    .eq("verification", "verified")
    .neq("vendor_id", user?.id);
  return (
    <section className="">
      <PostTargetTable userId={user?.id} userEmail={user?.email} />
      {routes?.length ? (
        <>
          <h3 className="mb-2 mt-4 flex items-center border-t pt-4 text-xl font-bold tracking-tight text-primary-900">
            Our Route Offers
          </h3>
          <OffersTable data={routes} />
        </>
      ) : null}
    </section>
  );
};

export default page;
