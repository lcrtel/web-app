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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabaseClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiOutlineFolderAdd, HiTrash } from "react-icons/hi";

export default function AddToWatchlist({ ID }: { ID: User }) {
    const supabase = supabaseClient();
    const router = useRouter();
    const handleAdd = async () => {
        const { data: watchlistItem, error } = await supabase
            .from("watchlist")
            .select("*")
            .match({ route_id: ID })
            .single();
        if (watchlistItem?.route_id === ID) {
            const { data, error } = await supabase
                .from("watchlist")
                .update({ route_id: ID as string })
                .eq("route_id", ID);
            if (error) {
                toast.error(error.message);
                return;
            }
            toast.success("Added to your watchlist");
            router.refresh();
        } else {
            const { data, error } = await supabase
                .from("watchlist")
                .insert({ route_id: ID });
            if (error) {
                toast.error(error.message);
                return;
            }
            toast.success("Added to your watchlist");
            router.refresh();
        }
    };

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button>
                        <HiOutlineFolderAdd
                            className="w-5 h-5 cursor-pointer hover:scale-[105%] transition-all ease-in-out"
                            onClick={() => handleAdd()}
                        />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to watchlist</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
