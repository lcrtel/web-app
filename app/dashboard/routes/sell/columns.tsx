"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import formatDate from "@/utils/formatDate";

export const columns: ColumnDef<Route>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) =>
                    row.toggleSelected(!!value)
                }
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const payment = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() =>
    //                             navigator.clipboard.writeText(payment.id)
    //                         }
    //                     >
    //                         Copy payment ID
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>
    //                         View payment details
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },

    {
        accessorKey: "destination",
        header: "Destination",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("destination")}</div>
        ),
    },
    {
        accessorKey: "destination_code",
        header: "Code",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("destination_code")}</div>
        ),
    },
    {
        accessorKey: "rate",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Rate
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const Rate = parseFloat(row.getValue("rate"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(Rate);

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "route_type",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Type
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => (
            <div className="uppercase">{row.getValue("route_type")}</div>
        ),
    },
    {
        accessorKey: "prefix",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Prefix
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "asr",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ASR
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "acd",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ACD
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "ports",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Ports
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "capacity",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Capacity
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Posted on
                    <Button variant="ghost" size="sm">
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const Date = row.getValue("created_at");
            const formattedDate = formatDate(Date);
            return <div className="font-medium">{formattedDate}</div>;
        },
    },
];
