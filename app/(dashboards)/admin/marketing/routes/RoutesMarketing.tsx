"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import EmailForm from "./EmailForm";

export default function RoutesMarketing({
  routes,
  clients,
}: {
  routes: Route[] | null;
  clients: Profile[] | null;
}) {
  const [selectedRouts, setSelectedRouts] = useState<any>([]);
  const [selectedClients, setSelectedClients] = useState<any>([]);
  const [routesSelection, setRoutesSelection] = useState({});
  const [clientsSelection, setClientsSelection] = useState({});
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative w-full space-y-2 rounded-lg border p-4 pt-3">
          <div className="">
            <h3 className="text-lg font-semibold">Route offers</h3>
            <p className="text-sm text-gray-500">
              Select route offers that you would like to send to clients.
            </p>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {routes?.length ? (
              <DataTable
                data={routes}
                setSelectedRows={setSelectedRouts}
                columns={routeColumns}
                rowSelection={routesSelection}
                setRowSelection={setRoutesSelection}
              />
            ) : (
              <p>No routes found</p>
            )}
          </div>
        </div>
        <div className="relative space-y-2 rounded-lg border px-4 py-3 md:w-1/4">
          <div className="">
            <h3 className="text-lg font-semibold">Clients</h3>
            <p className="text-sm text-gray-500">
              Select clients to send route offers.
            </p>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {clients?.length ? (
              <DataTable
                data={clients}
                setSelectedRows={setSelectedClients}
                columns={clientsColumns}
                rowSelection={clientsSelection}
                setRowSelection={setClientsSelection}
              />
            ) : (
              <p>No clients found</p>
            )}
          </div>
        </div>
      </div>
      <EmailForm clients={selectedClients} routes={selectedRouts} />
    </div>
  );
}

export const routeColumns: ColumnDef<Route>[] = [
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
    accessorKey: "vendor",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Vendor</div>;
    },
    cell: ({ row }) => <div>{row.getValue("vendor")}</div>,
  },
  {
    accessorKey: "vendor_company",
    header: ({ column }) => {
      return <div className="whitespace-nowrap"> Company</div>;
    },
    cell: ({ row }) => <div>{row.getValue("vendor_company")}</div>,
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
    accessorKey: "selling_rate",
    header: ({ column }) => {
      return (
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Selling Rate $
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const rate: number = row.getValue("selling_rate");

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
      <div>
        {row.getValue("verification") === "verified" ? (
          <span className="ml-2 rounded-full border-[1.5px] border-green-200 bg-green-100 px-2 py-1 text-xs font-medium text-green-500">
            Verified
          </span>
        ) : (
          <span className="ml-2 rounded-full border-[1.5px] border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-500">
            Pending
          </span>
        )}
      </div>
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
