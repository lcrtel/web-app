"use client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { Alert } from "../ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { deleteTargets } from "./deleteTargets";

export default function DeleteTargets({
  selectedRows,
  setSelectedRows,
  setRowSelection,
}: {
  selectedRows: any;
  setSelectedRows: any;
  setRowSelection: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { error } = await deleteTargets(selectedRows);
    if (error) {
      toast.error(error.message);
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
          Delete selected targets
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
        <AlertDialogContent asChild></AlertDialogContent>
        <AlertDialogFooter>
          <form onSubmit={onSubmit} className="w-full space-y-2">
            <Label
              htmlFor="verificationText"
              className="font-normal text-slate-500"
            >
              To verify, type{" "}
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
}
