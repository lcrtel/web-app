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
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";

export default function DeleteUser({ userID }: { userID: any }) {

    const router = useRouter();
    const handleDelete = async () => {
        await fetch("/api/admin/accounts/delete-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the appropriate content type
            },
            body: JSON.stringify({ user_id: userID }), // Convert data to JSON string
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                return;
            } else {
                toast.success("Deleted Agent");
                router.push("/admin/agents");
            }
        });
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
                            delete this user&apos;s account and remove their
                            routes from our database.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 border-red-200">
                      Cancel
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
