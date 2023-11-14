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
import { ArrowUpDown, ChevronDown } from "lucide-react";

import ReloadButton from "@/components/ReloadButton";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
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
import { supabaseAdminServer } from "@/lib/supabaseAdminServer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import DeleteRoute from "./[id]/DeleteRoute";
import { supabaseClient } from "@/lib/supabase-client";

export const columns: ColumnDef<Route>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllPageRowsSelected()}
    //             onCheckedChange={(value: boolean) =>
    //                 table.toggleAllPageRowsSelected(!!value)
    //             }
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value: boolean) =>
    //                 row.toggleSelected(!!value)
    //             }
    //             aria-label="Select row"
    //         />
    //     ),
    // },
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
                href={`/admin/routes/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("destination")}
            </Link>
        ),
    },
    {
        accessorKey: "type",
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
                href={`/admin/routes/${row.getValue("id")}`}
                className="uppercase"
            >
                {row.getValue("type")}
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
                    <Link href={`/admin/gateways/${id}`} className="">
                        <HiOutlineExternalLink className="w-5 h-5" />
                    </Link>
                </div>
            );
        },
    },
];

export function GatewaysTable({ data }: any) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});
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
    const supabase = supabaseClient();
    const router = useRouter();
    useEffect(() => {
        const realTimeRoutes = supabase
            .channel("realtime_routes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "routes" },
                () => router.refresh()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(realTimeRoutes);
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
                <div className="flex gap-2 ml-auto">
                    <ReloadButton />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value: boolean) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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
                                    Looks like you didn&apos;t post any route
                                    offers
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>{" "}
            {/* <pre className="mt-2  rounded-md bg-slate-950 p-4">
                <code className="text-white">
                    {JSON.stringify(
                        table
                            .getFilteredSelectedRowModel()
                            .flatRows.map((item) => item.original),
                        null,
                        2
                    )}
                </code>
            </pre> */}
        </div>
    );
}
