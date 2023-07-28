"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TradeNav = () => {
    const pathname = usePathname();

    return (
        <ul className="inline-flex overflow-x-auto bg-primary-500 bg-opacity-5 border-2 border-surface max-w-fit items-center p-1 rounded-xl gap-1 text-sm text-primary-500">
            {[
                ["Buy", "/dashboard/routes/buy"], // Home link
                ["Sell", "/dashboard/routes/sell"], // Sell link
                // ["Compare", "/dashboard/routes/compare"], // Sell link
            ].map(([title, url]) => (
                <li
                    key={title}
                    className={` ${
                        pathname.startsWith(url)
                            ? "bg-white shadow shadow-gray-200  font-semibold transition-all ease-in-out"
                            : "hover:bg-white"
                    } rounded-md transition-all ease-in-out `}
                >
                    {/* Link to the specified URL */}
                    <Link
                        href={url}
                        passHref
                        className="py-2 px-3 block rounded-md transition-all ease-in-out whitespace-nowrap"
                    >
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default TradeNav;
