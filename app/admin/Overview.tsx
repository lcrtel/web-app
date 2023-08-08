import React from "react";

const Overview = () => {
    return (
        <section className="mb-5">
            <h2 className="font-semibold text-lg mb-3">Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 items-center">
                <div className="bg-primary-500 rounded-lg pt-1">
                    <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                            Active Listings
                        </h3>
                        <p className="font-bold tracking-tight text-3xl ">0</p>
                    </div>
                </div>
                <div className="bg-primary-500 rounded-lg pt-1">
                    <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                            Total Sales
                        </h3>
                        <p className="font-bold tracking-tight text-3xl ">0</p>
                    </div>
                </div>
                <div className="bg-primary-500 rounded-lg pt-1">
                    <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                            Total Users
                        </h3>
                        <p className="font-bold tracking-tight text-3xl ">0</p>
                    </div>
                </div>
                <div className="bg-primary-500 rounded-lg pt-1">
                    <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                            Total Sellers
                        </h3>
                        <p className="font-bold tracking-tight text-3xl ">0</p>
                    </div>
                </div>
                <div className="bg-primary-500 rounded-lg pt-1">
                    <div className="rounded-md bg-surface px-5 py-4 shadow-sm border">
                        <h3 className="text-sm font-medium text-gray-400 tracking-tight">
                            Total Managers
                        </h3>
                        <p className="font-bold tracking-tight text-3xl ">0</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
