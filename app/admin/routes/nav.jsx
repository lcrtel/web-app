"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RoutesNav = () => {
    const pathname = usePathname();

    return (
        <div className="w-full overflow-x-auto  pb-2">
            <nav className="inline-flex  bg-surface  items-center p-1 rounded-full space-x-1 text-sm text-primary-500">
                {[
                    ["Offers", "/admin/routes"],
                    ["Targets", "/admin/routes/targets"],
                ].map(([title, url]) => (
                    <div
                        key={title}
                        className={` ${
                            pathname === url
                                ? "bg-white shadow shadow-gray-200  font-semibold transition-all ease-in-out"
                                : "hover:bg-white"
                        } rounded-full transition-all ease-in-out `}
                    >
                        <Link
                            href={url}
                            passHref
                            className="py-2 px-4 block rounded-full transition-all ease-in-out whitespace-nowrap"
                        >
                            {title}
                        </Link>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default RoutesNav;
