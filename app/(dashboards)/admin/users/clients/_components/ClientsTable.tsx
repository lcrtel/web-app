"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import * as React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className=" ">Name</div>;
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "id",
    header: "",

    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <div className="flex gap-2">
          <Link href={`/admin/users/clients/${id}`} className="">
            <HiOutlineExternalLink className="h-5 w-5" />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => {
      return <div className=" ">Company</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company_name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <div className="">WhatsApp No</div>;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("phone")}</div>;
    },
  },
  {
    accessorKey: "skype_id",
    header: ({ column }) => {
      return <div className=" ">Skype ID</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("skype_id")}</div>
    ),
  },
  // {
  //   accessorKey: "targets",
  //   header: ({ column }) => {
  //     return <div className=" ">Buying targets</div>;
  //   },
  //   cell: ({ row }) => (
  //     // @ts-ignore
  //     <div className="capitalize">{row.getValue("targets")[0].count}</div>
  //   ),
  // },
];

export function ClientsTable({ data }: any) {
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
