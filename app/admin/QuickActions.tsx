import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import CreateNewUser from "./users/CreateNewUser";
import Link from "next/link";
import CreateNewSeller from "./sellers/CreateNewSeller";
import CreateNewManager from "./managers/CreateNewManager";

const QuickActions = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold tracking-tight text-lg mb-3">
                Quick Actions
            </h2>
            <div className="flex gap-2 flex-wrap">
                <CreateNewUser />
                <CreateNewSeller />
                <CreateNewManager />
                <Link
                    href="/admin/routes/post"
                    className={`${buttonVariants({
                        variant: "secondary",
                    })}`}
                >
                    Post Route Offers
                </Link>
                <Link
                    href="/admin/routes/requests/post"
                    className={`${buttonVariants({
                        variant: "outline",
                    })}`}
                >
                    Post Route Requests
                </Link>
            </div>
        </section>
    );
};

export default QuickActions;
