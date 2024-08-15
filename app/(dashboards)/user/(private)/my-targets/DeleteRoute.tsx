"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { deleteTarget } from "./actions";

export default function DeleteRoute({ routeID }: { routeID: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteTarget(routeID);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Target deleted");
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer">
          <HiTrash className="h-5 w-5" />{" "}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-red-500">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className="text-red-500">Are you absolutely sure?</p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-red-500">
              This action cannot be undone. This will permanently delete this
              from the database.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-red-200 bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete()}
            className="hover:white border-red-200 bg-red-500 text-white hover:bg-red-600"
          >
            I&apos;m sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
