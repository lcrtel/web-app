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
    const supabase = await supabaseServer();
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
                    href="/user/routes"
                    passHref
                    className="bg-surface hover:scale-[102%] transition-all ease-in-out border-2 border-white rounded-lg shadow  p-5"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold tracking-tight text-xl">
                            🏷️ Explore Our Rates
                        </h3>
                        <HiArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 mr-5">
                        Our rates are meticulously calculated, ensuring you get
                        the best deals in the market. Stay ahead of the
                        competition and explore unbeatable rates today.
                    </p>
                </Link>
                {/* <Link
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
                        Our comprehensive targets are designed to
                        streamline your purchasing decisions. Stay
                        cost-effective and explore tailored targets
                        today.
                    </p>
                </Link> */}
            </div>
        );
    };
    const ActiveConnections = async () => {
        let { data: conncetions, error } = await supabase
            .from("gateways")
            .select(`*, routes (*)`)
            .match({ client_id: user?.id });

        return (
            <div className="">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg mb-2 font-semibold">Gateways</h3>
                    <Link
                        href="/user/gateways"
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
                            href={`/user/gateways/${connection.id}`}
                            passHref
                            key={connection.id}
                            className={`flex gap-5 shadow-sm hover:translate-x-1 cursor-pointer transition-all ease-in-out duration-500 items-center justify-between border rounded-md px-4 py-2  ${
                                connection.status === "active"
                                    ? "bg-green-50"
                                    : "bg-slate-50"
                            }`}
                        >
                            <p className="capitalize">
                                {connection.routes?.destination} -{" "}
                                <span className="uppercase font-medium">
                                    {connection.routes?.route_type}
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
                        <p>No gateways yet</p>
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
            .select(`*, routes (*)`)
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
                                    <p>Prefix: {item.routes?.prefix} </p>
                                    <p className="capitalize">
                                        Destination:{" "}
                                        {item.routes?.destination} -{" "}
                                        <span className="uppercase font-medium">
                                            {item.routes?.route_type}
                                        </span>{" "}
                                    </p>
                                </Link>
                                <p>Rate: ${item.routes?.selling_rate} </p>
                                <RemoveFromWatchlist ID={item.id} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                        <p>No routes in your watchlist</p>
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
            .select(`*, routes (*)`)
            .match({ client_id: user?.id, status: "pending" });
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
                                <p>Prefix: {item.routes?.prefix} </p>
                                <p className="capitalize">
                                    Destination:{" "}
                                    {item.routes?.destination} -{" "}
                                    <span className="uppercase font-medium">
                                        {item.routes?.route_type}
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
                <h3 className="text-lg font-semibold">Active Gateways</h3>
            </div>
        );
    };
    return (
        <main className="flex flex-col gap-5">
            <h3 className="text-2xl mt-5 font-bold text-primary tracking-tight">
                Welcome, {userData?.name}👋
            </h3>
            <Links />
            <PurchaseRequests />
                <ActiveConnections />
            <div className="grid gap-5 md:grid-cols-3">
                {/* <Watchlist /> */}
            </div>
            <Transactions />
            <FetchLocalStorage />
        </main>
    );
};

export default page;
