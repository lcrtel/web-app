import MetricsCard from "@/components/MetricsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabaseServer } from "@/lib/supabase-server";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

const Routes = async () => {
    const supabase = supabaseServer();

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
    const supabase = supabaseServer();

    unstable_noStore();
    let { data: targets, error } = await supabase.from("targets").select("id");
    return (
        <MetricsCard
            count={targets?.length}
            label="Route Requests"
            link="/admin/requests"
        />
    );
};


const Clients = async () => {
    const supabase = supabaseServer();
    unstable_noStore();

    let { data: clients, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`role.eq.client,role.eq.vendor`);
    return (
        <MetricsCard
            count={clients?.length}
            label="Clients"
            link="/admin/clients"
        />
    );
};

const Vendors = async () => {
    const supabase = supabaseServer();
    unstable_noStore();

    let { data: vendors, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "vendor");
    return (
        <MetricsCard
            count={vendors?.length}
            label="Vendors"
            link="/admin/vendors"
        />
    );
};

const Agents = async () => {
    const supabase = supabaseServer();

    unstable_noStore();
    let { data: agents, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "agent");
        
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
