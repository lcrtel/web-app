import { fetchUserData, fetchUserMetadata } from "@/utils/user";
import Link from "next/link";
import { HiArrowRight, HiOutlineExternalLink } from "react-icons/hi";
import FetchLocalStorage from "./FetchLocalStorage";
import { supabaseServer } from "@/lib/supabase-server";
import { toast } from "react-hot-toast";
import RemoveFromWatchlist from "./(dashboardComponents)/RemoveFromWatchlist";
export const revalidate = 0;
const page = async () => {
    const user = await fetchUserData();
    const userData = await fetchUserMetadata();
    const supabase = supabaseServer();
    const Links = () => {
        return (
            <div className="grid md:grid-cols-2  gap-5 ">
                {/* <Link
                    href="/user/market"
                    passHref
                    className="bg-surface hover:scale-[102%] transition-all ease-in-out border-2 border-white rounded-lg shadow  p-5"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold tracking-tight text-xl">
                            🔍 Explore the Marketplace
                        </h3>
                        <HiArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 mr-5">
                        Discover a diverse range of VoIP routes and services in
                        our vibrant marketplace.
                    </p>
                </Link> */}
                <Link
                    href="/user/market/targets"
                    passHref
                    className="bg-surface hover:scale-[102%] transition-all ease-in-out border-2 border-white rounded-lg shadow  p-5"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold tracking-tight text-xl">
                            🎯 Explore Buying Targets
                        </h3>
                        <HiArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 mr-5">
                        Our comprehensive buying targets are designed to
                        streamline your purchasing decisions. Stay
                        cost-effective and explore tailored buying targets
                        today.
                    </p>
                </Link>
                <Link
                    href="/user/market/offers"
                    passHref
                    className="bg-surface hover:scale-[102%] transition-all ease-in-out border-2 border-white rounded-lg shadow  p-5"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold tracking-tight text-xl">
                            🏷️ Explore Selling Rates
                        </h3>
                        <HiArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 mr-5">
                        Our rates are meticulously calculated, ensuring you get
                        the best deals in the market. Stay ahead of the
                        competition and explore unbeatable rates today.
                    </p>
                </Link>
            </div>
        );
    };
    const ActiveConnections = async () => {
        let { data: conncetions, error } = await supabase
            .from("route_connections")
            .select(`*, route_offers (*)`)
            .match({ buyer_id: user?.id });

        return (
            <div className="">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg mb-2 font-semibold">Connections</h3>
                    <Link
                        href="/user/connections"
                        passHref
                        className="flex items-center text-xs"
                    >
                        View All
                        <HiArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
                {conncetions?.length ? (
                    conncetions?.map((connection) => (
                        <Link
                            href={`/user/connections/${connection.id}`}
                            passHref
                            key={connection.id}
                            className={`flex gap-5 shadow-sm hover:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-md px-4 py-2  ${
                                connection.status === "active"
                                    ? "bg-green-50"
                                    : "bg-slate-50"
                            }`}
                        >
                            <p className="capitalize">
                                {connection.route_offers?.destination} -{" "}
                                <span className="uppercase font-medium">
                                    {connection.route_offers?.route_type}
                                </span>{" "}
                            </p>
                            <div className="flex items-center gap-2">
                                {connection.status === "active" ? (
                                    <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ml-2">
                                        Active
                                    </span>
                                ) : (
                                    <span className="text-xs bg-slate-100 border-[1.5px] border-slate-200  text-slate-500 rounded-full px-2 py-1 ml-2">
                                        Expired
                                    </span>
                                )}
                                <div>
                                    <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No connections yet</p>
                        {/* <Link
                            href="/user/market/offers"
                            className="bg-primary-500 px-2 ml-2 py-1 text-white rounded-md"
                        >
                            Add now
                        </Link> */}
                    </div>
                )}
            </div>
        );
    };
    const Watchlist = async () => {
        let { data: watchlist, error } = await supabase
            .from("watchlist")
            .select(`*, route_offers (*)`)
            .match({ user_id: user?.id });

        return (
            <div className=" md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Watchlist</h3>
                {/* <pre>{JSON.stringify(watchlist, null, 2)}</pre> */}
                {watchlist?.length ? (
                    <div className=" space-y-2">
                        {watchlist.map((item) => (
                            <div
                                key={item.id}
                                className={`flex gap-5 shadow-sm hover:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-md px-4 py-2  `}
                            >
                                <Link
                                    href={`/user/market/offers/${item.route_id}`}
                                    passHref
                                    className="flex gap-4"
                                >
                                    <p>Prefix: {item.route_offers?.prefix} </p>
                                    <p className="capitalize">
                                        Destination:{" "}
                                        {item.route_offers?.destination} -{" "}
                                        <span className="uppercase font-medium">
                                            {item.route_offers?.route_type}
                                        </span>{" "}
                                    </p>
                                </Link>
                                <p>Rate: ${item.route_offers?.selling_rate} </p>
                                <RemoveFromWatchlist ID={item.id} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No route offers in your watchlist</p>
                        <Link
                            href="/user/market/offers"
                            className="bg-primary-500 px-2 ml-2 py-1 text-white rounded-md"
                        >
                            Add now
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    const PurchaseRequests = async () => {
        let { data: purchaseRequests, error } = await supabase
            .from("purchase_requests")
            .select(`*, route_offers (*)`)
            .match({ buyer_id: user?.id, status: "pending" });
        return purchaseRequests?.length ? (
            <div>
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mb-2">
                        Purchase Requests
                    </h3>
                </div>

                <div className=" space-y-2">
                    {purchaseRequests.map((item) => (
                        <Link
                            href={`/user/purchase_requests/${item.id}`}
                            passHref
                            key={item.id}
                            className={`flex gap-5 shadow-sm hover:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-md px-4 py-2  `}
                        >
                            <div className="flex gap-4">
                                <p>Target Rate: ${item.buying_rate} </p>
                                <p>Prefix: {item.route_offers?.prefix} </p>
                                <p className="capitalize">
                                    Destination:{" "}
                                    {item.route_offers?.destination} -{" "}
                                    <span className="uppercase font-medium">
                                        {item.route_offers?.route_type}
                                    </span>{" "}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium bg-slate-100 border-[1.5px] border-slate-200 text-slate-500 rounded-full px-2 py-1 ml-2 capitalize">
                                    {item.status}
                                </span>
                                <div>
                                    <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        ) : null;
    };
    const Transactions = async () => {
        let { data: payments, error } = await supabase
            .from("payments")
            .select(`*`)
            .match({ user_id: user?.id });

        return (
            <div className=" md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Transactions</h3>
                {/* <pre>{JSON.stringify(watchlist, null, 2)}</pre> */}
                {payments?.length ? (
                    payments.map((item) => (
                        <Link
                            href={`/user/transactions${item.payment_id}`}
                            passHref
                            key={item.payment_id}
                            className={`flex gap-5 shadow-sm hover:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-md px-4 py-2  `}
                        >
                            <p>Amount: ${item.amount} </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium bg-slate-100 border-[1.5px] border-slate-200 text-slate-500 rounded-full px-2 py-1 ml-2 capitalize">
                                    {item.payment_status}
                                </span>
                                <div>
                                    <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No transaction yet</p>
                    </div>
                )}
            </div>
        );
    };
    const Notifications = () => {
        return (
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Active Connections</h3>
            </div>
        );
    };
    return (
        <main className="flex flex-col gap-5">
            <h3 className="text-2xl mt-5 font-bold text-primary tracking-tight">
                Welcome, {userData?.first_name}👋
            </h3>
            <Links />
            <PurchaseRequests />
            <div className="grid gap-5 md:grid-cols-3">
                <Watchlist />
                <ActiveConnections />
            </div>
            <Transactions />
            <FetchLocalStorage />
        </main>
    );
};

export default page;
