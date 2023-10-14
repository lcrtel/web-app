import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const Overview = async () => {
    const supabase = supabaseAdmin();
    const ActiveConnections = async () => {
        let { data: connections, error } = await supabase
            .from("route_connections")
            .select("status")
            .eq("status", "active");
        return (
            <Link
                href="/admin/connections"
                className="bg-surface hover:scale-[102%] transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Connections <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {connections?.length}
                </p>
            </Link>
        );
    };
    const Rates = async () => {
        let { data: offers, error } = await supabase
            .from("route_offers")
            .select("verification")
            .eq("verification", "verified");
        return (
            <Link
                href="/admin/routes"
                className="bg-surface hover:scale-[102%] transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Selling Rates <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {offers?.length}
                </p>
            </Link>
        );
    };
    const Targets = async () => {
        let { data: targets, error } = await supabase
            .from("buying_targets")
            .select("id");
        return (
            <Link
                href="/admin/routes/targets"
                className="bg-surface hover:scale-[102%] transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Buying Targets
                    <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {targets?.length}
                </p>
            </Link>
        );
    };
    const TotalUsers = async () => {
        const {
            data: { users },
            error,
        } = await supabase.auth.admin.listUsers();
        return (
            <Link
                href="/admin/users"
                className="bg-surface hover:scale-[102%] hidden md:block transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Total Users
                    <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {users?.length}
                </p>
            </Link>
        );
    };
    const TotalSellers = async () => {
        const {
            data: { users },
            error,
        } = await supabase.auth.admin.listUsers();
        const sellers = users.filter(
            (obj) => obj.user_metadata.role === "seller"
        );
        return (
            <Link
                href="/admin/sellers"
                className="bg-surface hover:scale-[102%] hidden md:block transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
            >
                <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                    Total Sellers
                    <HiArrowRight className="" />
                </h3>
                <p className="font-bold tracking-tight text-3xl ">
                    {sellers?.length}
                </p>
            </Link>
        );
    };
    // const TotalManagers = async () => {
    //     const {
    //         data: { users },
    //         error,
    //     } = await supabase.auth.admin.listUsers();
    //     const managers = users.filter(
    //         (obj) => obj.user_metadata.role === "agent"
    //     );
    //     return (
    //         <Link
    //             href="/admin/managers"
    //             className="bg-surface hover:scale-[102%] transition-all space-y-2 ease-in-out border-2 border-white rounded-2xl shadow  p-5"
    //         >
    //             <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
    //                 Total Managers
    //                 <HiArrowRight className="" />
    //             </h3>
    //             <p className="font-bold tracking-tight text-3xl ">
    //                 {managers?.length}
    //             </p>
    //         </Link>
    //     );
    // };
    return (
        <section className="mb-5">
            <h2 className="font-semibold text-lg mb-3">Overview</h2>
            <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center">
                <ActiveConnections />
                <Rates />
                <Targets />
                <TotalUsers />
                <TotalSellers />
                {/* <TotalManagers /> */}
            </div>
        </section>
    );
};

export default Overview;
