"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "profiles",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Vendor</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {/* @ts-ignore */}
        {/* {row.getValue("profiles").name} */}
      </div>
    ),
  },
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Destination</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("destination")}</div>
    ),
  },
  {
    accessorKey: "destination_code",
    header: "Prefix",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("destination_code")}</div>
    ),
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
      <div className="uppercase">{row.getValue("route_type")}</div>
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
          ASR%
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("asr")}</div>,
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
    cell: ({ row }) => <div className="uppercase">{row.getValue("acd")}</div>,
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
    cell: ({ row }) => <div className="uppercase">{row.getValue("ports")}</div>,
  },
  {
    accessorKey: "pdd",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PDD
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("pdd")}</div>,
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Remarks
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("remarks")}</div>,
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posted on
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
      </div>
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
      const rate: number = row.getValue("selling_rate");

      return <div className="font-medium">$ {Number(rate).toFixed(5)}</div>;
    },
  },
];

export function RoutesTableReadOnlyAdmin({ data }: any) {
  const [selectedRows, setSelectedRows] = React.useState<any>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  return (
    <DataTable
      data={data}
      setSelectedRows={setSelectedRows}
      columns={columns}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    />
  );
}
