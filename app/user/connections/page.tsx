import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
export const revalidate = 0;
const page = async () => {
    const supabase = supabaseServer();
    let { data: conncetions, error } = await supabase
        .from("route_connections")
        .select(`*, route_offers (*)`);
    return (
        <div>
            {" "}
            <div className="flex my-5 justify-between">
                <h3 className="text-2xl tracking-tight font-bold">
                    Connections
                </h3>
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
                            {connection?.route_offers?.destination} -{" "}
                            <span className="uppercase font-medium">
                                {connection?.route_offers?.route_type}
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
                    <p>No connections found</p>
                    {/* <Link
                            href="/user/market/offers"
                            className="bg-primary-500 px-2 ml-2 py-1 text-white rounded-md"
                        >
                            Add now
                        </Link> */}
                </div>
            )}
            {/* <p className="mt-2 text-gray-500">No active connections</p> */}
        </div>
    );
};

export default page;
