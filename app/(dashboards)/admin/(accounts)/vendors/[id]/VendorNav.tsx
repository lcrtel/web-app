"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

export function VendorNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();
    return (
        <nav className="hidden md:flex mb-4 overflow-x-auto bg-surface max-w-fit items-center p-1 rounded-full space-x-1 text-sm text-primary-500 w-full">
            {items.map((item: any) => (
                <div
                    key={item.title}
                    className={` ${
                        pathname === item.href
                            ? "bg-white shadow shadow-gray-200  font-semibold transition-all ease-in-out"
                            : "hover:bg-white"
                    } rounded-full transition-all ease-in-out `}
                >
                    <Link
                        href={item.href}
                        passHref
                        className="py-2 px-4 block rounded-full transition-all ease-in-out whitespace-nowrap"
                    >
                        {item.title}
                    </Link>
                </div>
            ))}
        </nav>
    );
}
