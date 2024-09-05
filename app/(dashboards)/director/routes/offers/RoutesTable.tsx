"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader } from "lucide-react";
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
import DeleteRoute from "./[id]/DeleteRoute";
import { deleteRoutes } from "./actions";

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
    accessorKey: "vendor",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Vendor</div>;
    },
    cell: ({ row }) => (
      <Link
        href={`/director/routes/offers/${row.getValue("id")}`}
        className="capitalize"
      >
        {row.getValue("vendor")}
      </Link>
    ),
  },
  {
    accessorKey: "vendor_company",
    header: ({ column }) => {
      return <div className="whitespace-nowrap"> Company</div>;
    },
    cell: ({ row }) => (
      <Link
        href={`/director/routes/offers/${row.getValue("id")}`}
        className="capitalize"
      >
        {row.getValue("vendor_company")}
      </Link>
    ),
  },
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Destination</div>;
    },
    cell: ({ row }) => (
      <Link
        href={`/director/routes/offers/${row.getValue("id")}`}
        className="capitalize"
      >
        {row.getValue("destination")}
      </Link>
    ),
  },
  {
    accessorKey: "destination_code",
    header: "Prefix",
    cell: ({ row }) => (
      <Link
        href={`/director/routes/offers/${row.getValue("id")}`}
        className="capitalize"
      >
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
      <Link
        href={`/director/routes/offers/${row.getValue("id")}`}
        className="uppercase"
      >
        {row.getValue("route_type")}
      </Link>
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
      <Link
        href={`/director/routes/offers/${row.getValue("id")}`}
        className="capitalize"
      >
        {format(new Date(row.getValue("created_at")), "dd/MM/yyyy")}
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
      <Link
        href={`/director/routes/offers/${row.getValue("id")}`}
        className="capitalize"
      >
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
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <div className="flex items-center justify-end gap-2">
          <div className="text-red-500">
            <DeleteRoute routeID={id as string} />
          </div>{" "}
          <Link href={`/director/routes/offers/${id}`} className="">
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
    <>
      {!!selectedRows.length && (
        <div className="flex items-center gap-2">
          <DeleteAlert
            selectedRows={selectedRows.map((r: any) => r.id)}
            setSelectedRows={setSelectedRows}
            setRowSelection={setRowSelection}
          />
        </div>
      )}

      <DataTable
        data={data}
        setSelectedRows={setSelectedRows}
        columns={columns}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </>
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
    const { error } = await deleteRoutes(selectedRows);
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    } else {
      router.refresh();
      setRowSelection({});
      toast.success("Routes deleted successfully");
      setLoading(false);
      setOpen(false);
      setSelectedRows([]);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructiveOutline" size="sm">
          Delete selected routes
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete selected route(s)</AlertDialogTitle>
          <AlertDialogDescription className="text-md">
            The selected routes will be deleted, along with all of its related
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
        <AlertDialogContent asChild></AlertDialogContent>
        <AlertDialogFooter>
          <form onSubmit={onSubmit} className="w-full space-y-2">
            <Label
              htmlFor="verificationText"
              className="font-normal text-slate-500"
            >
              To verify, type{" "}
              <span className="font-semibold text-primary-900">
                delete selected routes
              </span>{" "}
              below:
            </Label>
            <Input
              id="verificationText"
              aria-label="Verification Code"
              data-testid="resource-deletion-modal/verification-input"
              pattern="\s*delete selected routes\s*"
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
