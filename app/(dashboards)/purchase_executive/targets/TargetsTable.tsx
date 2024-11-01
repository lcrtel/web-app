"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import DeleteTarget from "@/components/routes-and-targets/DeleteTarget";

export const columns: ColumnDef<Route>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profiles",
    header: "Client",
    cell: ({ row }) => (
      <div className="capitalize">
        {/* @ts-ignore */}
        {row.getValue("profiles") ? row.getValue("profiles").name : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "client_company",
    header: "Company",
    cell: ({ row }) => (
      <div className="capitalize">
        {/* @ts-ignore */}
        {row.getValue("profiles") ? row.getValue("profiles").company_name: "N/A"}
      </div>
    ),
  },

  {
    accessorKey: "destination",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Destination Name</div>;
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
    cell: ({ row }) => {
      return <div className="font-medium">$ {row.getValue("rate")}</div>;
    },
  },
  {
    accessorKey: "buying_rate",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Buying Rate $
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">$ {row.getValue("buying_rate")}</div>;
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
      <div className="capitalize">
        {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <div className="flex items-center justify-end gap-2">
          <div className="text-red-500">
            <DeleteTarget targetId={id as string} />
          </div>{" "}
          <Link href={`/sales_manager/targets/${id}`} className="">
            <HiOutlineExternalLink className="h-5 w-5" />
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
    <>
      {/* {!!selectedRows.length && (
        <div className="flex items-center gap-2">
          <DeleteTargets
            selectedRows={selectedRows.map((r: any) => r.id)}
            setSelectedRows={setSelectedRows}
            setRowSelection={setRowSelection}
          />
        </div>
      )} */}
      <DataTable
        columns={columns}
        data={data}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        setSelectedRows={setSelectedRows}
      />
    </>
  );
}
