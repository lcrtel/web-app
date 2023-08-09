"use client";

import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase-client";
import React, { useEffect, useState } from "react";
import { HiBan, HiClock, HiEmojiSad } from "react-icons/hi";

const SellerApplication = ({ userID }: { userID: User }) => {
    const supabase = supabaseClient();
    const [applying, setApplying] = useState(false);
    const [status, setStatus] = useState<any>("");
    useEffect(() => {
        async function fetchApplicationStatus() {
            try {
                const { data, error } = await supabase
                    .from("seller_applications")
                    .select("status").match({ user_id: userID });
                console.log(data, error);

                const applicationStatus = data?.[0].status;
                if (data) {
                    setStatus(applicationStatus);
                }
            } catch (error) {
                console.error("Error fetching application status:", error);
            }
        }
        fetchApplicationStatus();
    }, []);
    console.log(status);

    const handleApply = async () => {
        setApplying(true);
        const { data, error } = await supabase
            .from("seller_applications")
            .insert({})
            .select("status");
        setStatus(data?.[0].status === "pending" ? "pending" : "");
        console.log(error?.message);
    };

    const apply = (
        <>
            <div className="bg-surface flex items-center justify-center p-2 rounded-full">
                <HiBan className="w-10 h-10 rounded-full p-2 text-primary-500 bg-primary-50" />
            </div>
            <h2 className="text-primary-500 text-lg font-semibold">
                Apply to become a seller
            </h2>
            <p className="text-gray-500 max-w-lg text-center">
                It looks like you don&apos;t have the previliage to sell routes.
            </p>
            <Button onClick={handleApply}>Apply</Button>
        </>
    );
    const pending = (
        <>
            <div className="bg-surface flex items-center justify-center p-2 rounded-full">
                <HiClock className="w-10 h-10 rounded-full p-2 text-primary-500 bg-primary-50" />
            </div>
            <h2 className="text-primary-500 text-lg font-semibold text-center">
                Your application is pending approval.
            </h2>
        </>
    );
    const declined = (
        <>
            <div className="bg-surface flex items-center justify-center p-2 rounded-full">
                <HiEmojiSad className="w-10 h-10 rounded-full p-2 text-primary-500 bg-primary-50" />
            </div>
            <h2 className="text-primary-500 text-lg font-semibold">
                Unfortunately, your application has been declined.
            </h2>
        </>
    );
    return (
        <div className="flex p-10 flex-col gap-2 items-center justify-center">
            {status === "" && apply}
            {status === "pending" && pending}
            {status === "declined" && declined}
        </div>
    );
};

export default SellerApplication;
