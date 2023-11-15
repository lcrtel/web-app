import MetricsCard from "@/components/MetricsCard";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const Overview = async () => {
    const supabase = await supabaseServer();
    const user = await fetchUserData();

    const Routes = async () => {
        unstable_noStore();
        let { data: verified_routes } = await supabase
            .from("routes")
            .select(`*, profiles (agent_id)`)
            .match({ verification: "verified" });

        let routes = verified_routes?.filter(
            (offer) => offer.profiles?.agent_id === user?.id
        );

        return (
            <MetricsCard
                count={routes?.length}
                label="Routes"
                link="/agent/routes"
            />
        );
    };

    const Targets = async () => {
        let { data: targets, error } = await supabase
            .from("targets")
            .select(`*, profiles (agent_id)`);

        let targetCount = targets?.filter(
            (offer) => offer.profiles?.agent_id === user?.id
        )?.length;

        return (
            <MetricsCard
                count={targetCount}
                label="Targets"
                link="agent/targets"
            />
        );
    };

    const Clients = async () => {
        let { data: clients, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("agent_id", user?.id)
            .or(`role.eq.client,role.eq.vendor`);
        return (
            <MetricsCard
                count={clients?.length}
                label="Clients"
                link="/agent/clients"
            />
        );
    };

    const Vendors = async () => {
       let { data: vendors, error } = await supabase
           .from("profiles")
           .select("*")
           .match({ agent_id: user?.id, role: "vendor" });
        return (
            <MetricsCard
                count={vendors?.length}
                label="Vendors"
                link="/agent/vendors"
            />
        );
    };

    return (
        <section className="mb-5">
            <h2 className="font-semibold text-lg mb-3">Overview</h2>
            <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center">
                {/* <ActiveConnections /> */}
                <Routes />
                <Targets />
                <Clients />
                <Vendors />
            </div>
        </section>
    );
};

export default Overview;
