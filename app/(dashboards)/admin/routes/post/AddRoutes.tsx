"use client";
import { Button } from "@/components/ui/button";
import { RowData } from "@tanstack/react-table";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ImportDropdown, PostRoutesTable } from "@/components/PostRoutesTable";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { insertRoutesInDb } from "../../_actions/routeActions";


export function AddRouteTable({ users }: { users: any }) {
    const [posting, setPosting] = useState(false);
    const [vendor, setVendor] = useState("");
    const router = useRouter();
    const [data, setData] = useState<any>([
        {
            id: uuidv4(),
            destination: "",
            rate: 0,
            route_type: "cli",
            asr: "",
            acd: "",
            ports: "",
            pdd: "",
            capacity: "",
        },
    ]);

    const postRoutes = async () => {
        setPosting(true);
        const { data: route, error } = await insertRoutesInDb(data, vendor);
        if (error) {
            setPosting(false);
            toast.error(error.message);
            return;
        }
        setPosting(false);
        setData([]);
        toast.success("Route Offer Posted");
        router.refresh();
        router.push("/admin/routes");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (vendor !== "") {
            await postRoutes();
        } else {
            toast.error("Select a vendor to post");
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 mb-4 ">
                <div className="text-sm flex gap-2 items-center whitespace-nowrap">
                    <p className=" font-semibold text-lg tracking-tight">
                        Vendor
                    </p>
                    <VendorsDropdown
                        setVendor={setVendor}
                        users={users}
                        vendor={vendor}
                    />
                </div>
                <div className="text-sm flex gap-2 items-center ">
                    <p>{data.length} route(s)</p>{" "}
                    <ImportDropdown setData={setData} />
                </div>
            </div>
            <PostRoutesTable
                data={data}
                handleSubmit={handleSubmit}
                setData={setData}
                posting={posting}
            />
        </div>
    );
}

function VendorsDropdown({
    users,
    vendor,
    setVendor,
}: {
    users: any;
    vendor: string;
    setVendor: Dispatch<SetStateAction<string>>;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                >
                    {vendor ? (
                        <>
                            {
                                users.find((user: any) => user.id === vendor)
                                    ?.user_metadata.name
                            }{" "}
                            {users.find((user: any) => user.id === vendor)
                                ?.user_metadata.company_name && (
                                <span className="text-slate-400">
                                    (
                                    {
                                        users.find(
                                            (user: any) => user.id === vendor
                                        )?.user_metadata.company_name
                                    }
                                    )
                                </span>
                            )}
                        </>
                    ) : (
                        "Select Vendor..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0 " align="start">
                <Command>
                    <CommandInput placeholder="Search vendors..." />
                    <CommandEmpty>No vendors found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-auto">
                        {users
                            .filter(
                                (item: any) =>
                                    item.user_metadata.role === "vendor"
                            )
                            .map((user: any) => (
                                <CommandItem
                                    key={user.id}
                                    onSelect={() => {
                                        setVendor(
                                            user.id === vendor ? "" : user.id
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            vendor === user.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {user.user_metadata.name}
                                    {user.user_metadata.company_name && (
                                        <span className="text-slate-400">
                                            ({user.user_metadata.company_name})
                                        </span>
                                    )}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
