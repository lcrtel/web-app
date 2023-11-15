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

const AddToCart = ({ routeID }: { routeID: string }) => {
    const supabase = supabaseClient();
    const handleAdd = async () => {
        const { data: selectedRoute, error } = await supabase
            .from("selected_routes")
            .select("*")
            .match({ route_id: routeID });
        if (selectedRoute?.[0]?.route_id === routeID) {
            const { data, error } = await supabase
                .from("selected_routes")
                .update({ route_id: routeID as string })
                .eq("route_id", routeID)
                .select();
            if (error) {
                toast.error(error.message);
                return;
            }
            toast.success("Added to cart");
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
    };
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button>
                        <FaCartPlus
                            onClick={() => handleAdd()}
                            className="w-5 h-5 cursor-pointer hover:scale-[105%] transition-all ease-in-out"
                        />
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
