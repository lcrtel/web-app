import { Separator } from "@/components/ui/separator";
import React from "react";
import { CreateNewUser } from "./CreateNewUser";

const page = () => {
    return (
        <main className="">
            <h2 className="font-bold tracking-tight mb-5 text-2xl">
                Create a new user
            </h2>
            <CreateNewUser />
        </main>
    );
};

export default page;
