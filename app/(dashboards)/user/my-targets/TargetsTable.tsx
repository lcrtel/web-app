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
    useReactTable
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
import { supabaseClient } from "@/lib/supabase-client";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineExternalLink, HiOutlinePencilAlt } from "react-icons/hi";
import DeleteRoute from "./DeleteRoute";

export const columns: ColumnDef<Route>[] = [
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
            <Link
                href={`/user/my-targets/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("destination")}
            </Link>
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
                    Destination Code
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/user/my-targets/${row.getValue("id")}`}
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
        cell: ({ row }) => (
            <Link
                href={`/user/my-targets/${row.getValue("id")}`}
                className="uppercase"
            >
                $ {row.getValue("rate")}
            </Link>
        ),
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
                href={`/user/my-targets/${row.getValue("id")}`}
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
                href={`/user/my-targets/${row.getValue("id")}`}
                className="capitalize"
            >
                {formatTimestamptz(row.getValue("created_at"))}
            </Link>
        ),
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const id = row.getValue("id");
            return (
                <div className="flex gap-2">
                    <div className="text-red-500">
                        <DeleteRoute routeID={id as string} />
                    </div>{" "}
                    <Link href={`/user/my-targets/post/${id}`} className="">
                        <HiOutlinePencilAlt className="w-5 h-5" />
                    </Link>
                    <Link href={`/user/my-targets/${id}`} className="">
                        <HiOutlineExternalLink className="w-5 h-5" />
                    </Link>
                </div>
            );
        },
    },
];

export function TargetsTable({ data }: any) {
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
    const supabase = supabaseClient();
    const router = useRouter();
    React.useEffect(() => {
        const realTimeTargets = supabase
            .channel("realtime_targets")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "targets" },
                () => router.refresh()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(realTimeTargets);
        };
    }, [supabase, router]);
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
            <div className="rounded-lg border ">
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
                                    No targets posted yet
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
