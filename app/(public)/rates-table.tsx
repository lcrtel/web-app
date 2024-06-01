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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/utils/formatDate";

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
        className="flex cursor-pointer items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rate
        <ArrowUpDown className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("rate"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">$ {row.getValue("rate")}</div>;
    },
  },
  {
    accessorKey: "asr",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ASR%
        <ArrowUpDown className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("asr")}</div>,
  },
  {
    accessorKey: "pdd",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PDD
        <ArrowUpDown className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("pdd")}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Posted on
        <ArrowUpDown className="h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const date: any = row.getValue("created_at");
      return <div className="lowercase">{formatDate(date)}</div>;
    },
  },
];

export function RatesTable({ data }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
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
    <div className="">
      {data && (
        <div className="mt-4 max-h-[266px] overflow-y-auto rounded-xl border">
          <Table className="relative">
            <TableHeader className="sticky top-0">
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
              {table?.getRowModel().rows?.length ? (
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
                  <TableCell colSpan={columns.length} className="h-8">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
