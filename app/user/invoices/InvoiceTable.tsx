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

interface InvoiceDetails {
    balance: string;
    date_due: string;
    date_issued: string;
    deal_id: number;
    invoice_id: number;
    invoice_to: string;
    users: {
        user_id: string;
        email: string;
        first_name: string;
        last_name: string;
    };
    paid_at: string;
    status: string;
    total_amount: number;
}
export const columns: ColumnDef<InvoiceDetails>[] = [
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
        accessorKey: "total_amount",
        header: "Total",
        cell: ({ row }) => (
            <div className="capitalize">${row.getValue("total_amount")}</div>
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
            const Date = row.getValue("date_issued");
            const formattedDate = formatTimestamptz(Date);
            return <p className="font-medium">{formattedDate}</p>;
        },
    },
    {
        accessorKey: "balance",
        header: "Balance",
        cell: ({ row }) => (
            <div className="capitalize">${row.getValue("balance")}</div>
        ),
    },
    {
        accessorKey: "invoice_id",
        header: "Actions",
        cell: ({ row }) => {
            const id = row.getValue("invoice_id");
            return (
                <Link
                    href={`/user/invoices/${id}`}
                    className="font-medium  bg-blue-100 px-3 py-1.5 rounded-full text-blue-500"
                >
                    Details
                </Link>
            );
        },
    },
];

export function InvoiceTable({ data }: any) {
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
                                    No managers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}