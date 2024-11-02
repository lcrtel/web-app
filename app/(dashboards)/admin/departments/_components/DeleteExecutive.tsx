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
import { HiOutlineTrash } from "react-icons/hi";
import { deleteExecutive } from "./actions";

export default function DeleteExecutive({
  executiveId,
  executiveName,
}: {
  executiveId: string;
  executiveName: string;
}) {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteExecutive(executiveId, executiveName);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Deleted executive");
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 text-red-500">
          <HiOutlineTrash className="size-4" /> Delete
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
              executive from our database, the executive will not be able to
              login.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-red-200 bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600">
            I&apos;m not sure
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
