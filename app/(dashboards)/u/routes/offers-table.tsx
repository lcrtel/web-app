"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import Link from "next/link";
import AddToCart from "./AddToCart";
const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const id: any = row.getValue("id");

      return <AddToCart routeID={id} />;
    },
  },
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
        <Link
          href={`/u/routes/${row.getValue("id")}`}
          className="font-medium"
        >
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
      return (
        <div className="">
          {row.getValue("asr")}%
        </div>
      )
    }
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
        <Link
          href={`/u/routes/${row.getValue("id")}`}
          className="font-medium"
        >
          {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
        </Link>
      );
    },
  },
];
export function OffersTable({ data }: any) {
  const [selectedRows, setSelectedRows] = React.useState<any>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  return (
    <DataTable
      filterBy="destination"
      data={data}
      setSelectedRows={setSelectedRows}
      columns={columns}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    />
  );
}