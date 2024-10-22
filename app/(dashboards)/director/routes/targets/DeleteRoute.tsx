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

export default function DeleteRoute({ routeID }: { routeID: string }) {
  const supabase = supabaseClient();
  const router = useRouter();
  const handleDelete = async () => {
    const { error } = await supabase.from("targets").delete().eq("id", routeID);
    if (error) {
      error.code === "23502"
        ? toast.error("Can't Delete when there is active gateways")
        : toast.error(error.message);
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
