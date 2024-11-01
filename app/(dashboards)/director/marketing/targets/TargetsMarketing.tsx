"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import EmailForm from "./EmailForm";

export default function TargetsMarketing({
  targets,
  vendors,
}: {
  targets: Target[] | null;
  vendors: Profile[] | null;
}) {
  const [selectedTargets, setSelectedTargets] = useState<any>([]);
  const [selectedVendors, setSelectedVendors] = useState<any>([]);
  const [routesSelection, setRoutesSelection] = useState({});
  const [clientsSelection, setClientsSelection] = useState({});
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative w-full space-y-2 rounded-lg border p-4 pt-3">
          <div className="">
            <h3 className="text-lg font-semibold">Target rates</h3>
            <p className="text-sm text-gray-500">
              Select target rates that you would like to send to vendors.
            </p>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {targets?.length ? (
              <DataTable
                data={targets}
                setSelectedRows={setSelectedTargets}
                columns={routeColumns}
                rowSelection={routesSelection}
                setRowSelection={setRoutesSelection}
              />
            ) : (
              <p>No targets found</p>
            )}
          </div>
        </div>
        <div className="relative space-y-2 rounded-lg border px-4 py-3 md:w-1/4">
          <div className="">
            <h3 className="text-lg font-semibold">Vendors</h3>
            <p className="text-sm text-gray-500">
              Select vendors to send target rates.
            </p>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {vendors?.length ? (
              <DataTable
                data={vendors}
                setSelectedRows={setSelectedVendors}
                columns={clientsColumns}
                rowSelection={clientsSelection}
                setRowSelection={setClientsSelection}
              />
            ) : (
              <p>No vendors found</p>
            )}
          </div>
        </div>
      </div>
      <EmailForm vendors={selectedVendors} targets={selectedTargets} />
    </div>
  );
}

export const routeColumns: ColumnDef<Target>[] = [
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
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Client</div>;
    },
    // @ts-ignore
    cell: ({ row }) => (
      <div>
        {/* @ts-ignore */}
        {row.getValue("profiles") ? row.getValue("profiles").name : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "profiles",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Company</div>;
    },
    cell: ({ row }) => (
      <div>
        {/* @ts-ignore */}
        {row.getValue("profiles") ? row.getValue("profiles").company_name: "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Destination</div>;
    },
    cell: ({ row }) => <div>{row.getValue("destination")}</div>,
  },
  {
    accessorKey: "destination_code",
    header: "Prefix",
    cell: ({ row }) => <div>{row.getValue("destination_code")}</div>,
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
      const rate = parseFloat(row.getValue("rate"));

      return <div className="font-medium">$ {Number(rate).toFixed(5)}</div>;
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
      const rate: number = row.getValue("buying_rate");

      return <div className="font-medium">$ {Number(rate).toFixed(5)}</div>;
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
      <div className="uppercase">{row.getValue("route_type")}</div>
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
          Posted on
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}</div>
    ),
  },
];

export const clientsColumns: ColumnDef<Profile>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Name</div>;
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
];
