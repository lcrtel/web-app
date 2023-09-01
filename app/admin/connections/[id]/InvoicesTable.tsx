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
import * as React from "react";

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
import { supabaseAdmin } from "@/lib/supabase-admin";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineExternalLink, HiOutlinePencilAlt } from "react-icons/hi";

export const columns: ColumnDef<RouteOffer>[] = [
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
        accessorKey: "invoice_id",
        header: ({ column }) => {
            return <div className=" whitespace-nowrap">#</div>;
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/invoices/${row.getValue("invoice_id")}`}
                className=""
            >
                {row.getValue("invoice_id")}
            </Link>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("description")}
            </Link>
        ),
    },
    {
        accessorKey: "date_issued",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date Issued
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/${row.getValue("id")}`}
                className="capitalize"
            >
                {formatTimestamptz(row.getValue("date_issued"))}
            </Link>
        ),
    },
    {
        accessorKey: "date_due",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date Due
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("date_due")}
            </Link>
        ),
    },

    {
        accessorKey: "total_amount",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Total Amount
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => {
            const totalAmount = parseFloat(row.getValue("total_amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(totalAmount);

            return <div className="font-medium">{formatted}</div>;
        },
    },

    {
        accessorKey: "balance",
        header: ({ column }) => {
            return (
                <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Balance
                    <ArrowUpDown className=" h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => (
            <Link
                href={`/admin/routes/${row.getValue("id")}`}
                className="capitalize"
            >
                {row.getValue("balance") === "0" ? (
                    <span className="text-xs font-medium bg-green-100 border-[1.5px] border-green-200 text-green-500 rounded-full px-2 py-1 ml-2">
                        Paid
                    </span>
                ) : (
                    new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(parseFloat(row.getValue("balance")))
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
                <div className="flex gap-2">
                    <div className="text-red-500">
                        {/* <DeleteRoute routeID={id as string} /> */}
                    </div>{" "}
                    <Link href={`/admin/connections/${id}`} className="">
                        <HiOutlineExternalLink className="w-5 h-5" />
                    </Link>
                </div>
            );
        },
    },
];

export function InvoicesTable({ data }: any) {
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
    const supabase = supabaseAdmin();
    const router = useRouter();
    React.useEffect(() => {
        const realTimeRoutes = supabase
            .channel("realtime_routes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "route_offers" },
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
