"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import DeleteRoute from "./[id]/DeleteRoute";
import formatDate from "@/utils/formatDate";

export const columns: ColumnDef<Route>[] = [
    {
        accessorKey: "vendor",
        header: ({ column }) => {
            return <div className=" whitespace-nowrap">Vendor</div>;
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/offers/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("vendor")}
            </Link>
        ),
    },
    {
        accessorKey: "vendor_company",
        header: ({ column }) => {
            return <div className=" whitespace-nowrap"> Company</div>;
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/offers/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("vendor_company")}
            </Link>
        ),
    },
    {
        accessorKey: "destination",
        header: ({ column }) => {
            return <div className=" whitespace-nowrap">Destination</div>;
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/offers/${row.getValue("id")}`}
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
                href={`/admin/routes/offers/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("destination_code")}
            </Link>
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
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => {
            const rate = parseFloat(row.getValue("rate"));

            return (
                <div className="font-medium">$ {Number(rate).toFixed(5)}</div>
            );
        },
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
                    Selling Rate
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => {
            const rate: number = row.getValue("selling_rate");

            return (
                <div className="font-medium">$ {Number(rate).toFixed(5)}</div>
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
            <Link
                href={`/admin/routes/offers/${row.getValue("id")}`}
                className="uppercase"
            >
                {row.getValue("route_type")}
            </Link>
        ),
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
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/offers/${row.getValue("id")}`}
                className="capitalize"
            >
                {formatDate(row.getValue("created_at"))}
            </Link>
        ),
    },
    {
        accessorKey: "verification",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Verification
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/offers/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("verification") === "verified" ? (
                    <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ml-2">
                        Verified
                    </span>
                ) : (
                    <span className="text-xs bg-slate-100 border-[1.5px] border-slate-200  text-slate-500 rounded-full px-2 py-1 ml-2">
                        Pending
                    </span>
                )}
            </Link>
        ),
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const id = row.getValue("id");
            return (
                <div className="flex gap-2 items-center justify-end">
                    <div className="text-red-500">
                        <DeleteRoute routeID={id as string} />
                    </div>{" "}
                    <Link href={`/admin/routes/offers/${id}`} className="">
                        <HiOutlineExternalLink className="w-5 h-5" />
                    </Link>
                </div>
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
        <div className=" ">
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
            <div className="rounded-lg border overflow-y-auto">
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
                                        <TableCell
                                            key={cell.id}
                                            className="p-2"
                                        >
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
                                    No routes found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}