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
import { supabaseAdmin } from "@/lib/supabase-admin";
import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";

export default function DeleteRoute({ routeID }: { routeID: any }) {
    const supabase = supabaseAdmin();
    const router = useRouter();
    const handleDelete = async () => {
        const { error } = await supabase
            .from("route_offers")
            .delete()
            .eq("id", routeID);
        if (error) {
            error.code === "23502"
                ? toast.error("Can't Delete when there is active connections")
                : toast.error(error.message);
            return;
        }
        toast.success("Deleted route");
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
                            delete this route from our database.
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
