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
import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";

export default function DeleteTarget({ targetId }: { targetId: string }) {
  const supabase = supabaseClient();
  const router = useRouter();
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles the deletion of the target.
   * @async
   * @function
   */
/******  57b25602-2bca-4e00-acda-e9192772b80b  *******/
  const handleDelete = async () => {
    const { error } = await supabase
      .from("targets")
      .delete()
      .eq("id", targetId);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted target");
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
              Once deleted, it will be gone forever. Please be certain.
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
