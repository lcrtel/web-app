import { buttonVariants } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase-server";
import { fetchUserData, fetchUserMetadata } from "@/utils/user";
import Link from "next/link";
import React from "react";
import {
    HiArrowCircleRight,
    HiArrowLeft,
    HiArrowRight,
    HiOutlineArrowRight,
} from "react-icons/hi";
import { OffersTable } from "./market/offers/offers-table";
import { TargetsTable } from "./market/targets/targets-table";
import { redirect } from "next/navigation";
import FetchLocalStorage from "./FetchLocalStorage";
export const dynamic = "force-dynamic";

const page = async () => {
    const user = await fetchUserMetadata();

    const Links = () => {
        return (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 ">
                <Link
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
                </Link>
                <Link
                    href="/user/routes/targets"
                    passHref
                    className="bg-surface hover:scale-[102%] transition-all ease-in-out border-2 border-white rounded-lg shadow  p-5"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold tracking-tight text-xl">
                            🎯 Post Buying Targets
                        </h3>
                        <HiArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 mr-5">
                        Our platform empowers you to specify your exact
                        communication needs, and our system will match you with
                        route offers that align perfectly.
                    </p>
                </Link>
                <Link
                    href="/user/routes/offers"
                    passHref
                    className="bg-surface hover:scale-[102%] transition-all ease-in-out border-2 border-white rounded-lg shadow  p-5"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold tracking-tight text-xl">
                            🏷️ Post Route Offers
                        </h3>
                        <HiArrowRight className="w-5 h-5" />
                    </div>
                    <p className="text-gray-500 mr-5">
                        When you post your route offers, our intelligent system
                        will identify buying targets that align seamlessly with
                        your offerings.
                    </p>
                </Link>
            </div>
        );
    };
    const Transactions = () => {
        return (
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Transactions</h3>
            </div>
        );
    };
    const Connections = () => {
        return (
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Active Connections</h3>
            </div>
        );
    };
    return (
        <main className="flex flex-col gap-5">
            <h3 className="text-2xl mt-5 font-bold text-primary tracking-tight">
                Welcome, {user !== null ? user?.first_name : ""}👋
            </h3>
            <Links />
            <Transactions />
            <Connections />
            <FetchLocalStorage />
        </main>
    );
};

export default page;
