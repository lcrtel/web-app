"use client";
import { supabaseClient } from "@/lib/supabase-client";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const AddToCart = ({ routeID }: { routeID: string }) => {
    const supabase = supabaseClient();
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

const handleAdd = async () => {
    setLoading(true);

    const { data: selectedRoute } = await supabase
        .from("selected_routes")
        .select("route_id")
        .match({ route_id: routeID })
        .single();

    if (selectedRoute?.route_id === routeID) {
        const { error } = await supabase
            .from("selected_routes")
            .update({ route_id: routeID as string })
            .eq("route_id", routeID);
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Already in cart");
    } else {
        const { data, error } = await supabase
            .from("selected_routes")
            .insert({ route_id: routeID as string })
            .select();
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("Added to cart");
    }
    router.refresh();
    setLoading(false);
};
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button>
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <FaCartPlus
                                onClick={() => handleAdd()}
                                className="w-5 h-5 cursor-pointer hover:scale-[105%] transition-all ease-in-out"
                            />
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add to cart</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AddToCart;
