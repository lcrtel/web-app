"use client";

import {
    ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

export const columns: ColumnDef<Target>[] = [
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return (
        <div className="min-w-[100px] whitespace-nowrap">Destination Name</div>
      );
    },
    cell: ({ row }) => (
      <Link href={`/user/targets/${row.getValue("id")}`} className="capitalize">
        {row.getValue("destination")}
      </Link>
    ),
  },
  {
    accessorKey: "destination_code",
    header: "Prefix",
    cell: ({ row }) => (
      <Link href={`/user/targets/${row.getValue("id")}`} className="capitalize">
        {row.getValue("destination_code")}
      </Link>
    ),
  },
  {
    accessorKey: "buying_rate",
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
      const Rate = parseFloat(row.getValue("buying_rate"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Rate);

      return <div className="font-medium">$ {row.getValue("buying_rate")}</div>;
    },
    // cell: ({ row }) => (
    //     <Link
    //         href={`/user/targets/${row.getValue("id")}`}
    //         className="uppercase"
    //     >
    //         {row.getValue("rate")}
    //     </Link>
    // ),
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
      <Link href={`/user/targets/${row.getValue("id")}`} className="uppercase">
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
        <div className="font-medium">
          {" "}
          {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
        </div>
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
      return <div className="font-medium">{row.getValue("remarks")}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-end justify-end">
          <Link
            href={`/user/targets/${row.getValue("id")}`}
            className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs"
          >
            Details <HiOutlineExternalLink className="size-4" />
          </Link>
        </div>
      );
    },
  },
];

export function TargetsTable({ data }: any) {
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
