"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deletePurchaseRequest } from "./actions";
import { Loader2 } from "lucide-react";
import { HiTrash } from "react-icons/hi";

export const DeleteButton = ({ id }: { id: string }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const handleDelete = async (id: string) => {
        setLoading(true);
        const res = await deletePurchaseRequest(id);
        if (res?.error) {
            toast.error(res?.error);
            return;
        }
        router.refresh();
    };
    return (
        <Button
            onClick={(e) => handleDelete(id)}
            variant="outline"
            size="sm"
            className="w-full"
        >
            {loading ? (
                <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
            ) : (
                <HiTrash className="text-red-400 w-5 h-5" />
            )}
        </Button>
    );
};
