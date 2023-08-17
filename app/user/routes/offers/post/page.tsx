import { PostRouteTable } from "./PostRouteTable";
import Link from "next/link";
import { HiArrowLeft, HiOutlineArrowCircleLeft } from "react-icons/hi";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData } from "@/utils/user";

const page = async () => {
    return (
        <section className="">
            <Link
                href="/user/routes/offers"
                className="inline-flex mt-3 items-center text-gray-400 hover:text-primary-500 transition-all ease-in-out mb-2"
            >
                <HiOutlineArrowCircleLeft className="mr-1.5" /> Manage Offers
            </Link>{" "}
            <PostRouteTable />{" "}
        </section>
    );
};

export default page;
