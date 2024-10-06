"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import Link from "next/link";
import { HiOutlineExternalLink, HiOutlinePencilAlt } from "react-icons/hi";
import DeleteRoute from "./DeleteRoute";

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return <div className="min-w-[100px] whitespace-nowrap">Destination</div>;
    },
    cell: ({ row }) => (
      <Link href={`/user/my-routes/${row.getValue("id")}`} className="capitalize">
        {row.getValue("destination")}
      </Link>
    ),
  },
  {
    accessorKey: "destination_code",
    header: "Prefix",
    cell: ({ row }) => (
      <Link href={`/user/my-routes/${row.getValue("id")}`} className="capitalize">
        {row.getValue("destination_code")}
      </Link>
    ),
  },
  {
    accessorKey: "rate",
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
    cell: ({ row }) => (
      <Link href={`/user/my-routes/${row.getValue("id")}`} className="uppercase">
        $ {row.getValue("rate")}
      </Link>
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
      <Link href={`/user/my-routes/${row.getValue("id")}`} className="uppercase">
        {row.getValue("route_type")}
      </Link>
    ),
  },
  {
    accessorKey: "verification",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verification
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <Link href={`/user/my-routes/${row.getValue("id")}`} className="capitalize">
        {row.getValue("verification") === "verified" ? (
          <span className="ml-2 rounded-full border-[1.5px] border-green-200 bg-green-100 px-2 py-1 text-xs font-medium text-green-500">
            Verified
          </span>
        ) : (
          <span className="ml-2 rounded-full border-[1.5px] border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-500">
            Pending
          </span>
        )}
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
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posted on
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <Link href={`/user/my-routes/${row.getValue("id")}`} className="capitalize">
        {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
      </Link>
    ),
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center gap-2">Remarks</div>
      );
    },
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
          <Link href={`/user/my-routes/post/${id}`} className="">
            <HiOutlinePencilAlt className="h-5 w-5" />
          </Link>
          <Link href={`/user/my-routes/${id}`} className="">
            <HiOutlineExternalLink className="h-5 w-5" />
          </Link>
        </div>
      );
    },
  },
];

export function RoutesTable({ data }: any) {
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
