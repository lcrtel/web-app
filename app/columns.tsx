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
        accessorKey: "destination",
        header: ({ column }) => {
            return <div className=" min-w-[200px]">Destination Name</div>;
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("destination")}</div>
        ),
    },
    {
        accessorKey: "rate",
        header: ({ column }) => (
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
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("rate"));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div className=" font-medium">{formatted}</div>;
        },
    },

    {
        accessorKey: "destination_code",
        header: "Code",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("destination_code")}</div>
        ),
    },
    {
        accessorKey: "route_type",
        header: "Type",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("route_type")}</div>
        ),
    },
    {
        accessorKey: "asr",
        header: ({ column }) => (
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                ASR%
                <Button variant="ghost" size="sm">
                    <ArrowUpDown className=" h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("asr")}</div>
        ),
    },
];
