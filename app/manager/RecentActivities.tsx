import Link from "next/link";
import React from "react";
import { HiArrowRight, HiOutlineUserCircle } from "react-icons/hi";

const RecentActivities = () => {
    const NewUserRegistrations = () => {
        return (
            <div className=" overflow-x-auto text-primary-500 p-4 bg-slate-50 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold tracking-tight mb-1">
                            New User Registrations
                        </h3>
                        <p className=" leading-none text-sm text-gray-500 mb-5">
                            Latest additions to our community.
                        </p>
                    </div>

                    <Link
                        href="#"
                        passHref
                        className="flex gap-2 items-center text-sm text-right"
                    >
                        View all <HiArrowRight />
                    </Link>
                </div>
                <div className="bg-white px-3 py-1 flex items-center justify-between rounded-lg shadow">
                    <div className="w-full py-2 flex items-center gap-2 ">
                        <HiOutlineUserCircle className=" w-7 h-7" />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">
                                Aman Hisham
                            </span>
                            <span className=" leading-none text-xs text-gray-500">
                                amanhisham@gmail.com
                            </span>
                        </div>
                    </div>
                    <Link
                        href="#"
                        className="text-xs mr-3 flex items-center gap-3"
                    >
                        View
                        <span className="relative flex h-3 w-3 ">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </Link>
                </div>
            </div>
        );
    };
    const RecentlyApprovedRoutes = () => {
        return (
            <div className=" overflow-x-auto text-primary-500 p-4 bg-slate-50 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold tracking-tight mb-1">
                            Recently Verified Routes
                        </h3>
                        <p className=" leading-none text-sm text-gray-500 mb-5">
                            Latest additions to our routes collection.
                        </p>
                    </div>

                    <Link
                        href="#"
                        passHref
                        className="flex gap-2 items-center text-sm text-right"
                    >
                        View all <HiArrowRight />
                    </Link>
                </div>
                <div className="bg-white px-3 py-1 flex items-center justify-between rounded-lg shadow">
                    <div className="w-full py-2 flex items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">
                                United Arab Emirates
                            </span>
                            <span className=" leading-none text-xs text-gray-500">
                                Type: CLI, Posted on: 28/6/2023
                            </span>
                        </div>
                    </div>
                    <Link
                        href="#"
                        className="text-xs mr-3 flex items-center gap-3"
                    >
                        View
                        <span className="relative flex h-3 w-3 ">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </Link>
                </div>
            </div>
        );
    };
    const RecentSales = () => {
        return (
            <div className=" overflow-x-auto text-primary-500 p-4 bg-slate-50 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold tracking-tight mb-1">
                            Recent Sales
                        </h3>
                        <p className=" leading-none text-sm text-gray-500 mb-5">
                            Recent successful route sales
                        </p>
                    </div>

                    <Link
                        href="#"
                        passHref
                        className="flex gap-2 items-center text-sm text-right"
                    >
                        View all <HiArrowRight />
                    </Link>
                </div>
                <div className="bg-white px-3 py-1 flex items-center justify-between rounded-lg shadow">
                    <div className="w-full py-2 flex items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">
                                United Kingdom
                            </span>
                            <span className=" leading-none text-xs text-gray-500">
                                Type: SMS, Sold on: 28/6/2023
                            </span>
                        </div>
                    </div>
                    <Link
                        href="#"
                        className="text-xs mr-3 flex items-center gap-3"
                    >
                        View
                        <span className="relative flex h-3 w-3 ">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </Link>
                </div>
            </div>
        );
    };
    return (
        <section className="mb-5">
            <h2 className="font-semibold tracking-tight text-lg mb-3">
                Recent Activities
            </h2>
            <main className="grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3 gap-2">
                <NewUserRegistrations />
                <RecentlyApprovedRoutes />
                <RecentSales />
            </main>
        </section>
    );
};

export default RecentActivities;
