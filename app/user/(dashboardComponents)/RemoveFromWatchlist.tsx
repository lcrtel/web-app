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

export default function RemoveFromWatchlist({ ID }: { ID: User }) {
    const supabase = supabaseClient();
    const router = useRouter();
    const handleDelete = async () => {
        const { error } = await supabase
            .from("watchlist")
            .delete()
            .eq("id", ID);
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Removed from whatchlist");
        router.refresh();
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className=" cursor-pointer">
                    <HiTrash className="w-5 h-5" />{" "}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-red-500">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <p className="text-red-500">Are you absolutely sure?</p>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p className="text-red-500">
                            This action cannot be undone. This will permanently
                            remove from your watchlist.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 border-red-200">
                        I&apos;m not sure
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete()}
                        className="bg-red-500 hover:bg-red-600 text-white hover:white border-red-200"
                    >
                        I&apos;m sure
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
