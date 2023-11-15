import MetricsCard from "@/components/MetricsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

const Routes = async () => {
    const supabase = await supabaseServer();

    unstable_noStore();
    let { data: offers, error } = await supabase
        .from("routes")
        .select("verification")
        .eq("verification", "verified");
    return (
        <MetricsCard
            count={offers?.length}
            label="Routes"
            link="/admin/routes"
        />
    );
};

const Targets = async () => {
    const supabase = await supabaseServer();

    unstable_noStore();
    let { data: targets, error } = await supabase
        .from("targets")
        .select("id");
    return (
        <MetricsCard
            count={targets?.length}
            label="Targets"
            link="/admin/targets"
        />
    );
};

const Gateways = async () => {
    const supabase = await supabaseServer();

    unstable_noStore();
    let { data: gateways, error } = await supabase
        .from("gateways")
        .select("id");
    return (
        <MetricsCard
            count={gateways?.length}
            label="Gateways"
            link="/admin/gateways"
        />
    );
};

const Clients = async () => {
    const supabase = await supabaseServer();

    unstable_noStore();
    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    const clients = users.filter(
        (obj) => obj.user_metadata.role === "client"
    );
    return (
        <MetricsCard
            count={clients?.length}
            label="Clients"
            link="/admin/clients"
        />
    );
};

const Vendors = async () => {
    const supabase = await supabaseServer();

    unstable_noStore();

    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    const vendors = users.filter(
        (obj) => obj.user_metadata.role === "vendor"
    );
    return (
        <MetricsCard
            count={vendors?.length}
            label="Vendors"
            link="/admin/vendors"
        />
    );
};

const Agents = async () => {
    const supabase = await supabaseServer();

    unstable_noStore();

    const {
        data: { users },
        error,
    } = await supabase.auth.admin.listUsers();
    const agents = users.filter(
        (obj) => obj.user_metadata.role === "agent"
    );
    return (
        <MetricsCard
            count={agents?.length}
            label="Agents"
            link="/admin/agents"
        />
    );
};

const Overview = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold text-lg mb-3">Overview</h2>
            <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 items-center">
                <Suspense
                    fallback={
                        <Skeleton className="h-[110px] border rounded-xl " />
                    }
                >
                    <Routes />
                </Suspense>
                <Suspense
                    fallback={
                        <Skeleton className="h-[110px] border rounded-xl " />
                    }
                >
                    <Targets />
                </Suspense>
                <Suspense
                    fallback={
                        <Skeleton className="h-[110px] border rounded-xl " />
                    }
                >
                    <Gateways />
                </Suspense>
                <Suspense
                    fallback={
                        <Skeleton className="h-[110px] border rounded-xl " />
                    }
                >
                    <Clients />
                </Suspense>
                <Suspense
                    fallback={
                        <Skeleton className="h-[110px] border rounded-xl " />
                    }
                >
                    {" "}
                    <Vendors />
                </Suspense>
                <Suspense
                    fallback={
                        <Skeleton className="h-[110px] border rounded-xl " />
                    }
                >
                    {" "}
                    <Agents />
                </Suspense>
            </div>
        </section>
    );
};

export default Overview;
