import { Button } from "@/components/ui/button";
import React from "react";

const QuickActions = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold tracking-tight text-lg mb-3">
                Quick Actions (Temperory)
            </h2>
            <div className="flex gap-2 flex-wrap">
                <Button>Add new Seller</Button>
                <Button>Add new Buyer</Button>
                <Button>Add new Manager</Button>
                <Button>Post Route Offers</Button>
                <Button>Post Buying Targets</Button>
            </div>
        </section>
    );
};

export default QuickActions;
