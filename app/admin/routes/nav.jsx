"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RoutesNav = () => {
    const pathname = usePathname();

    return (
        <nav className="inline-flex overflow-x-auto bg-surface max-w-fit items-center p-1 rounded-lg space-x-1 text-sm text-primary-500">
            {[
                ["Offers", "/admin/routes"],
                ["Requests", "/admin/routes/requests"],
                ["sold", "/admin/routes/sold"],
            ].map(([title, url]) => (
                <div
                    key={title}
                    className={` ${
                        pathname === url
                            ? "bg-white shadow shadow-gray-200  font-semibold transition-all ease-in-out"
                            : "hover:bg-white"
                    } rounded-md transition-all ease-in-out `}
                >
                    <Link
                        href={url}
                        passHref
                        className="py-2 px-4 block rounded-md transition-all ease-in-out whitespace-nowrap"
                    >
                        {title}
                    </Link>
                </div>
            ))}
        </nav>
    );
};

export default RoutesNav;
