"use client";

import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";

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
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Name</div>;
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Email</div>;
    },
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <div className="whitespace-nowrap">Phone</div>;
    },
    cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
  },
];

export function ExecutivesTable({ data }: any) {
  const [selectedRows, setSelectedRows] = React.useState<any>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  return (
    <>
      {/* {!!selectedRows.length && (
        <div className="flex items-center gap-2">
          <DeleteAlert
            selectedRows={selectedRows.map((r: any) => r.id)}
            setSelectedRows={setSelectedRows}
            setRowSelection={setRowSelection}
          />
        </div>
      )} */}

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

// const DeleteAlert = ({
//   selectedRows,
//   setSelectedRows,
//   setRowSelection,
// }: {
//   selectedRows: any;
//   setSelectedRows: any;
//   setRowSelection: any;
// }) => {
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const router = useRouter();
//   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     const { error } = await deleteRoutes(selectedRows);
//     if (error) {
//       toast.error(error.message);
//       setLoading(false);
//       return;
//     } else {
//       router.refresh();
//       setRowSelection({});
//       toast.success("Routes deleted successfully");
//       setLoading(false);
//       setOpen(false);
//       setSelectedRows([]);
//     }
//   }
//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <Button variant="destructiveOutline" size="sm">
//           Delete selected routes
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Delete selected route(s)</AlertDialogTitle>
//           <AlertDialogDescription className="text-md">
//             The selected routes will be deleted, along with all of its related
//             items.
//           </AlertDialogDescription>

//           <Alert
//             variant="destructive"
//             className="border-0 bg-red-50 px-3 py-2 text-sm"
//           >
//             <span className="font-medium">Warning:</span> This action is not
//             reversible. Please be certain.
//           </Alert>
//         </AlertDialogHeader>
//         <AlertDialogContent asChild></AlertDialogContent>
//         <AlertDialogFooter>
//           <form onSubmit={onSubmit} className="w-full space-y-2">
//             <Label
//               htmlFor="verificationText"
//               className="font-normal text-slate-500"
//             >
//               To verify, type{" "}
//               <span className="font-semibold text-primary-900">
//                 delete selected routes
//               </span>{" "}
//               below:
//             </Label>
//             <Input
//               id="verificationText"
//               aria-label="Verification Code"
//               data-testid="resource-deletion-modal/verification-input"
//               pattern="\s*delete selected routes\s*"
//               required
//               onPaste={(e) => {
//                 e.preventDefault();
//               }}
//               autoCapitalize="none"
//               autoComplete="off"
//               autoCorrect="off"
//               spellCheck="false"
//               aria-invalid="false"
//               type="text"
//               name="verificationText"
//             />
//             <div className="flex items-center justify-between">
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <Button type="submit" className="gap-2">
//                 Continue{" "}
//                 {loading && <Loader className="h-4 w-4 animate-spin" />}
//               </Button>
//             </div>
//           </form>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
