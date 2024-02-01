"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { deleteTarget } from "./actions";

export default function DeleteRoute({ routeID }: { routeID: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        const deleting = toast.loading("Deleting...");
        const res = await deleteTarget(routeID);
        if (res?.error) {
            toast.error(res?.error);
            toast.dismiss(deleting);
            return;
        }
        toast.dismiss(deleting);
        toast.success("Deleted target ");
        setIsOpen(false);
        router.refresh();
        router.push("/user/my-targets");
    };
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
                            delete this from the database.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 border-red-200">
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        onClick={() => handleDelete()}
                        className="bg-red-500 hover:bg-red-600 text-white hover:white border-red-200"
                    >
                        I&apos;m sure
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
