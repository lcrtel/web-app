import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
export const revalidate = 0;
const page = async () => {
    const supabase = await supabaseServer();
    const user = await fetchUserData();
    let { data: conncetions, error } = await supabase
        .from("gateways")
        .select(`*, routes (*)`)
        .eq("client_id", user?.id);
    return (
        <div>
            {" "}
            <div className="flex my-4 justify-between">
                <h3 className="text-2xl tracking-tight font-bold">Gateways</h3>
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
                            {connection?.routes?.destination} -{" "}
                            <span className="uppercase font-medium">
                                {connection?.routes?.route_type}
                            </span>{" "}
                        </p>
                        <div className="flex items-center gap-2">
                            {connection.status === "active" ? (
                                <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1">
                                    Active
                                </span>
                            ) : connection.status === "pending" ? (
                                <span className="text-xs bg-slate-50 border-[1.5px] border-slate-100  text-slate-500 rounded-full px-2 py-1">
                                    Pending
                                </span>
                            ) : null}
                            <div>
                                <HiOutlineExternalLink className="-mt-[2px] w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="gap-2  h-12 text-center flex items-center text-sm  justify-center border py-10 rounded-lg">
                    <p>No gateways found</p>
                    {/* <Link
                            href="/user/routes"
                            className="bg-primary-500 px-2 ml-2 py-1 text-white rounded-md"
                        >
                            Add now
                        </Link> */}
                </div>
            )}
            {/* <p className="mt-2 text-gray-500">No active gateways</p> */}
        </div>
    );
};

export default page;
