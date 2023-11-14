import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div>
            {" "}
            <div className="flex mt-5 justify-between">
                <h3 className="text-2xl tracking-tight font-bold">
                    Transactions
                </h3>
            </div>
            <p className="mt-2 text-gray-500">No transactions found</p>
        </div>
    );
};

export default page;
