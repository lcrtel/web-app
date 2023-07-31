"use client";

import * as React from "react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const columns: ColumnDef<Route>[] = [
    {
        accessorKey: "destination",
        header: ({ column }) => {
            return <div className=" ">Destination</div>;
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("destination")}</div>
        ),
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
            <div className="uppercase">{row.getValue("route_type")}</div>
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
                <ArrowUpDown className=" h-4 w-4" />
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
        accessorKey: "asr",
        header: ({ column }) => (
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                ASR%
                <ArrowUpDown className=" h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("asr")}</div>
        ),
    },
    {
        accessorKey: "pdd",
        header: ({ column }) => (
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                PDD
                <ArrowUpDown className=" h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("pdd")}</div>
        ),
    },
    {
        accessorKey: "prefix",
        header: ({ column }) => (
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Prefix
                <ArrowUpDown className=" h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("prefix")}</div>
        ),
    },
    {
        accessorKey: "posted_on",
        header: ({ column }) => (
            <div
                className="flex gap-2 items-center cursor-pointer whitespace-nowrap"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Posted on
                <ArrowUpDown className=" h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("posted_on")}</div>
        ),
    },
];

export function RatesTable({ data }: any) {
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
        getPaginationRowModel: getPaginationRowModel(),
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
        <div className="">
            <div className="flex items-center pb-4">
                <Input
                    type="number"
                    placeholder="Enter phone code"
                    value={
                        (table
                            .getColumn("destination_code")
                            ?.getFilterValue() as number) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("destination_code")
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full"
                />
            </div>
            <div className="rounded-xl border max-h-[500px] overflow-y-auto">
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
                        {table?.getRowModel().rows?.length ? (
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
                                    className="h-8 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
