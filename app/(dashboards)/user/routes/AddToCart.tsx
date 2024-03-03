"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa6";
import {
    fetchSelectedRoute,
    insertSelectedRouteInDb,
} from "../_actions/selectedRouteActions";

const AddToCart = ({ routeID }: { routeID: string }) => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleAdd = async () => {
        setLoading(true);
        const { data: selectedRoute } = await fetchSelectedRoute(routeID);
        if (selectedRoute?.route_id === routeID) {
            toast.success("Already in cart");
        } else {
            const { error } = await insertSelectedRouteInDb(routeID);
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
