"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "@/components/ui/data-table-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";

const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return <div className="min-w-[100px] whitespace-nowrap">Destination</div>;
    },
    cell: ({ row }) => (
      <Link href={`/u/routes/${row.getValue("id")}`} className="capitalize">
        {row.getValue("destination")}
      </Link>
    ),
  },
  {
    accessorKey: "destination_code",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prefix
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <Link href={`/u/routes/${row.getValue("id")}`} className="capitalize">
        {row.getValue("destination_code")}
      </Link>
    ),
  },
  {
    accessorKey: "selling_rate",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rate $
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`/u/routes/${row.getValue("id")}`} className="font-medium">
          $ {row.getValue("selling_rate")}
        </Link>
      );
    },
  },
  {
    accessorKey: "route_type",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <Link href={`/u/routes/${row.getValue("id")}`} className="uppercase">
        {row.getValue("route_type")}
      </Link>
    ),
  },
  {
    accessorKey: "asr",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ASR %
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="">{row.getValue("asr")}%</div>;
    },
  },
  {
    accessorKey: "acd",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ACD
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "ports",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ports
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posted on
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`/u/routes/${row.getValue("id")}`} className="font-medium">
          {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
        </Link>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center gap-2 whitespace-nowrap">
          Remarks
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/u/routes/${row.getValue("id")}`}
          className="font-medium"
        ></Link>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-end justify-end">
          <Link
            href={`/u/routes/${row.getValue("id")}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Details
          </Link>
        </div>
      );
    },
  },
];

export function OffersTable({ data }: any) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  return (
    <div className="space-y-2">
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
                            header.column.columnDef.header,
                            header.getContext(),
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
