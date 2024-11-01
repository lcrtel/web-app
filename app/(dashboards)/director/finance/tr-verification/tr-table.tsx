"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Sidebar } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import Link from "next/link";

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "profiles",

    header: "User",
    cell: ({ row }) => (
      // @ts-ignore
      <div className="capitalize">
        {/* @ts-ignore */}
        {row.getValue("profiles") ? row.getValue("profiles").name : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "name",

    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "company_name",

    header: "Company",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company_name")}</div>
    ),
  },
  {
    accessorKey: "company_email",

    header: "Company Email",
    cell: ({ row }) => <div className="">{row.getValue("company_email")}</div>,
  },
  {
    accessorKey: "website",

    header: "Company Website",
    cell: ({ row }) => <div className="">{row.getValue("website")}</div>,
  },
  {
    accessorKey: "status",

    header: "Status",
    cell: ({ row }) => (
      <Badge className="" variant={row.getValue("status")}>
        {row.getValue("status")}
      </Badge>
    ),
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted on
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <Link
        href={`/user/my-routes/${row.getValue("id")}`}
        className="capitalize"
      >
        {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
      </Link>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Link
          href={`/director/finance/tr-verification/${row.getValue("id")}`}
          className="flex items-center gap-2 rounded-md border px-2 py-1"
        >
          Open <Sidebar className="size-4" />
        </Link>
      </div>
    ),
  },
];

export function TRTable({ data }: any) {
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
