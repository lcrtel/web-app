import { Loader, Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen w-full transition-all ease-in-out">
            {" "}
            <Loader className=" h-8 w-8 animate-spin" />
        </div>
    );
}