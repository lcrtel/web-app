"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import * as React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <div className="flex gap-2">
          <Link href={`/admin/users/vendors/${id}`} className="">
            <HiOutlineExternalLink className="h-5 w-5" />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "company_name",
    header: "Comapny",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "WhatsApp No",
  },
  {
    accessorKey: "skype_id",
    header: "Skype ID",
  },
];

export function VendorsTable({ data }: any) {
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
