import Link from "next/link";
import React from "react";
import { HiArrowRight } from "react-icons/hi";

const MetricsCard = ({
    count,
    label,
    link,
}: {
    count: number | undefined;
    label: string;
    link: any;
}) => {
    return (
        <Link
            href={link}
            className="bg-slate-50 hover:shadow-lg transition-all space-y-2 ease-in duration-300 border rounded-xl p-4 md:p-5 active:scale-[95%]"
        >
            <h3 className="text-sm font-medium text-gray-400 tracking-tight flex items-center justify-between">
                {label} <HiArrowRight className="" />
            </h3>
            <p className="font-bold tracking-tight text-3xl ">{count}</p>
        </Link>
    );
};

export default MetricsCard;
