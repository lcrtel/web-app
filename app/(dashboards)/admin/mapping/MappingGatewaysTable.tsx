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

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const columns: ColumnDef<Route>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "client",
        header: "Client",
    },
    {
        accessorKey: "ports",
        header: "Ports",
    },
    {
        accessorKey: "ip",
        header: "IP Address",
    },
];

export function MappingGatewaysTable({ data }: { data: any }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div>
            <Input
                placeholder="Search"
                value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="w-full "
            />
            <p className="py-2 text-xs text-slate-500 text-right">Fetched from VOS3000, {data?.length} Gateways</p>
            <div className="rounded-lg border ">
                <Table>
                    <TableHeader className="">
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
                                    Looks like you didn&apos;t post any route
                                    offers
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
