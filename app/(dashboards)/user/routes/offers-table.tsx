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
import {
    ArrowUpDown
} from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import formatTimestamptz from "@/utils/formatTimestamptz";
import AddToCart from "./AddToCart";

export function OffersTable({ data }: any) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const columns: ColumnDef<Route>[] = [
        {
            accessorKey: "id",
            header: "",
            cell: ({ row }) => {
                const id: any = row.getValue("id");
                
                return (
                    <AddToCart routeID={id}/>
                );
            },
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
                        <ArrowUpDown className=" h-4 w-4" />
                    </div>
                );
            },
        },
        {
            accessorKey: "destination",
            header: ({ column }) => {
                return (
                    <div className=" min-w-[100px] whitespace-nowrap">
                        Destination
                    </div>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("destination")}</div>
            ),
        },
        {
            accessorKey: "destination_code",
            header: ({ column }) => {
                return (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Area Prefix
                        <ArrowUpDown className=" h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.getValue("destination_code")}
                </div>
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
                return (
                    <div className="font-medium">
                        $ {row.getValue("selling_rate")}
                    </div>
                );
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
                        <ArrowUpDown className=" h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }) => (
                <div
                    className="uppercase"
                >
                    {row.getValue("route_type")}
                </div>
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
                const formattedDate = formatTimestamptz(Date);
                return <div className="font-medium">{formattedDate}</div>;
            },
        },
    ];
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
                <Input
                    placeholder="Enter phone code"
                    value={
                        (table
                            .getColumn("destination_code")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("destination_code")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-[200px] mr-2"
                />
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
                                    No offers matching your filter
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
