"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import formatDate from "@/utils/formatDate";
import Link from "next/link";

export const columns: ColumnDef<Route>[] = [
    {
        accessorKey: "destination",
        header: ({ column }) => {
            return (
                <div className=" min-w-[100px] whitespace-nowrap">
                    Destination Name
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/user/routes/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("destination")}
            </Link>
        ),
    },
    {
        accessorKey: "destination_code",
        header: "Code",
        cell: ({ row }) => (
            <Link
                href={`/user/routes/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("destination_code")}
            </Link>
        ),
    },
    {
        accessorKey: "selling_rate",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Rate
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => {
            const Rate = parseFloat(row.getValue("selling_rate"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(Rate);

            return (
                <div className="font-medium">
                   ${" "}{row.getValue("selling_rate")}
                </div>
            );
        },
        // cell: ({ row }) => (
        //     <Link
        //         href={`/user/routes/offers/${row.getValue("id")}`}
        //         className="uppercase"
        //     >
        //         {row.getValue("rate")}
        //     </Link>
        // ),
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
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/user/routes/${row.getValue("id")}`}
                className="uppercase"
            >
                {row.getValue("route_type")}
            </Link>
        ),
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
                    <ArrowUpDown className=" h-4 w-4" />
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
                    <ArrowUpDown className=" h-4 w-4" />
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
                    <ArrowUpDown className=" h-4 w-4" />
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
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer whitespace-nowrap"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Posted on
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => {
            const Date = row.getValue("created_at");
            const formattedDate = formatDate(Date);
            return <div className="font-medium">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const id = row.getValue("id");
            return (
                <Link
                    href={`/user/routes/${id}`}
                    className="font-medium text-sm  bg-primary-50 px-3 py-1.5 rounded-full text-primary-900 whitespace-nowrap"
                >
                    Details
                </Link>
            );
        },
    },
];

export function RoutesTable({ data }: any) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div>
            <div className="flex items-center pb-4">
                <h3 className="tracking-tight text-lg font-semibold">
                    Matching Route Requests
                </h3>
               
            </div>
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="gap-2  h-12 text-center"
                                >
                                    No matching route requests found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
