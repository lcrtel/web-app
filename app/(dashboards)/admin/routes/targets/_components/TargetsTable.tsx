"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader, Trash2 } from "lucide-react";
import * as React from "react";

import { Alert } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";
import DeleteTarget from "./DeleteTarget";
import { deleteTargetsAsAdmin } from "./actions";

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
        {row.getValue("profiles") ? row.getValue("profiles").company_name : "N/A"}
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
            <DeleteTarget routeID={id as string} />
          </div>{" "}
          <Link href={`/admin/routes/targets/${id}`} className="">
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
    <div className="space-y-2">
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-end gap-2">
          <DeleteAlert
            selectedRows={selectedRows.map((r: any) => r.id)}
            setSelectedRows={setSelectedRows}
            setRowSelection={setRowSelection}
          />
        </div>
      )}
      <DataTable
        columns={columns}
        data={data}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        setSelectedRows={setSelectedRows}
      />
    </div>
  );
}
const DeleteAlert = ({
  selectedRows,
  setSelectedRows,
  setRowSelection,
}: {
  selectedRows: any;
  setSelectedRows: any;
  setRowSelection: any;
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { error } = await deleteTargetsAsAdmin(selectedRows);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    } else {
      router.refresh();
      setRowSelection({});
      toast.success("Targets deleted successfully");
      setLoading(false);
      setOpen(false);
      setSelectedRows([]);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructiveOutline" size="sm">
          Delete selected targets <Trash2 className="size-5 ml-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete selected target(s)</AlertDialogTitle>
          <AlertDialogDescription className="text-md">
            The selected targets will be deleted, along with all of its related
            items.
          </AlertDialogDescription>

          <Alert
            variant="destructive"
            className="border-0 bg-red-50 px-3 py-2 text-sm"
          >
            <span className="font-medium">Warning:</span> This action is not
            reversible. Please be certain.
          </Alert>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form onSubmit={onSubmit} className="w-full space-y-2">
            <Label
              htmlFor="verificationText"
              className="font-normal text-slate-500"
            >
              To confirm, type{" "}
              <span className="font-semibold text-primary-900">
                delete selected targets
              </span>{" "}
              below:
            </Label>
            <Input
              id="verificationText"
              aria-label="Verification Code"
              data-testid="resource-deletion-modal/verification-input"
              pattern="\s*delete selected targets\s*"
              required
              onPaste={(e) => {
                e.preventDefault();
              }}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              aria-invalid="false"
              type="text"
              name="verificationText"
            />
            <div className="flex items-center justify-between">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" className="gap-2">
                Continue{" "}
                {loading && <Loader className="h-4 w-4 animate-spin" />}
              </Button>
            </div>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
