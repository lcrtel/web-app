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
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "invoice_id",
        header: ({ column }) => {
            return <div className=" ">#</div>;
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("invoice_id")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "profiles",
        header: "Client",
        cell: ({ row }) => (
            // @ts-ignore
            <div className="capitalize">{row.getValue("profiles").name} </div>
        ),
    },
    {
        accessorKey: "date_issued",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer whitespace-nowrap"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Issued Date
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => {
            const Date: Date = row.getValue("date_issued");
            const formattedDate = formatTimestamptz(Date);
            return <div className="font-medium">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "date_due",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer whitespace-nowrap"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Due Date
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => {
            const Date: Date = row.getValue("date_due");
            const formattedDate = formatTimestamptz(Date);
            return <div className="font-medium">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "total_amount",
        header: "Total Amount",
        cell: ({ row }) => (
            <div className="capitalize">
                ${Number(row.getValue("total_amount")).toFixed(2)}
            </div>
        ),
    },

    {
        accessorKey: "balance",
        header: "Balance",
        cell: ({ row }) => (
            <div className="capitalize">
                ${Number(row.getValue("balance")).toFixed(2)}
            </div>
        ),
    },
    {
        accessorKey: "invoice_id",
        header: "Actions",
        cell: ({ row }) => {
            const id = row.getValue("invoice_id");
            return (
                <Link
                    href={`/director/finance/invoices/${id}`}
                    className="font-medium  bg-blue-100 px-3 py-1.5 rounded-full text-blue-500"
                >
                    Details
                </Link>
            );
        },
    },
];

export function InvoiceTable({ data }: { data: any }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
        sorting,
        columnFilters,
    },
});

    return (
        <div className="">
            <div className="flex items-center pb-4">
                <Input
                    type="text"
                    placeholder="Search by client name"
                    value={
                        (table
                            .getColumn("client")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event: any) =>
                        table
                            .getColumn("client")
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full"
                />
            </div>
            <div className="rounded-xl border overflow-y-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <TableRow key={index}>
                                {headerGroup.headers.map((header, index) => {
                                    return (
                                        <TableHead key={index}>
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
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row
                                        .getVisibleCells()
                                        .map((cell, index) => (
                                            <TableCell key={index}>
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
                                    No invoices found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
