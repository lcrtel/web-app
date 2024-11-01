"use client";

import {
    ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { DataTable } from "@/components/ui/data-table";
import formatTimestamptz from "@/utils/formatTimestamptz";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "invoice_id",
    header: ({ column }) => {
      return <div className=" ">#</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("invoice_id")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "profiles",
    header: "Client",
    cell: ({ row }) => (
      // @ts-ignore
      <div className="capitalize">
        {/* @ts-ignore */}
        {row.getValue("profiles") ? row.getValue("profiles").name : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "date_issued",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Issued Date
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const Date: Date = row.getValue("date_issued");
      const formattedDate = formatTimestamptz(Date);
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "date_due",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const Date: Date = row.getValue("date_due");
      const formattedDate = formatTimestamptz(Date);
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="capitalize">
        ${Number(row.getValue("total_amount")).toFixed(2)}
      </div>
    ),
  },

  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => (
      <div className="capitalize">
        ${Number(row.getValue("balance")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "invoice_id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("invoice_id");
      return (
        <Link
          href={`/admin/finance/invoices/${id}`}
          className="rounded-full bg-blue-100 px-3 py-1.5 font-medium text-blue-500"
        >
          Details
        </Link>
      );
    },
  },
];

export function InvoiceTable({ data }: { data: any }) {
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
