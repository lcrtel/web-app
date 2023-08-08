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
import { Button } from "@/components/ui/button";

export default function DeleteUser() {
    return (
        <div className="flex justify-between items-center border border-red-500 rounded-lg p-4 text-red-500">
            <div>
                <h3 className="font-semibold tracking-tight">
                    Delete this User
                </h3>
                <p className="text-sm">
                    Once deleted, it will be gone forever. Please be certain.
                </p>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete User</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-red-500">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <p className="text-red-500">
                                Are you absolutely sure?
                            </p>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="text-red-500">
                                This action cannot be undone. This will
                                permanently delete this user's account and
                                remove their route offers from our database.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 border-red-200">
                            I'm not sure
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white hover:white border-red-200">
                            I'm sure
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
