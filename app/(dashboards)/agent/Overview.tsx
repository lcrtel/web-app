import fetchUser from "@/app/post/fetchUser";
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const Overview = async () => {
    const supabase = await supabaseAdminServer();

   
    const Routes = async () => {
        let { data: offers, error } = await supabase
            .from("routes")
            .select("verification")
            .eq("verification", "verified");
        return (
            <Link
                href="/agent/routes"
                className="bg-surface hover:scale-[102%] transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Routes <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {offers?.length}
                </p>
            </Link>
        );
    };

    const Targets = async () => {
        let { data: targets, error } = await supabase
            .from("targets")
            .select("id");
        return (
            <Link
                href="/agent/routes/targets"
                className="bg-surface hover:scale-[102%] transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Targets
                    <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {targets?.length}
                </p>
            </Link>
        );
    };

    const Clients = async () => {
        const {
            data: { users },
            error,
        } = await supabase.auth.admin.listUsers();
        const clients = users.filter(
            (obj) => obj.user_metadata.role === "client"
        );
        return (
            <Link
                href="/agent/clients"
                className="bg-surface hover:scale-[102%] hidden md:block transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Clients
                    <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {clients?.length}
                </p>
            </Link>
        );
    };

    const Vendors = async () => {
        const {
            data: { users },
            error,
        } = await supabase.auth.admin.listUsers();
        const vendors = users.filter(
            (obj) => obj.user_metadata.role === "vendor"
        );
        return (
            <Link
                href="/agent/vendors"
                className="bg-surface hover:scale-[102%] hidden md:block transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Vendors
                    <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {vendors?.length}
                </p>
            </Link>
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
