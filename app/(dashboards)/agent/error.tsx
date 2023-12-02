"use client"; // Error components must be Client Components

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    const router = useRouter()
    return (
        <div className="h-[80vh] flex flex-col items-center gap-5 justify-center">
            <h1 className="text-9xl font-extrabold">404</h1>
            <div className="flex gap-4">
                <Button variant="default" size="sm" onClick={() => router.back()}>
                   Go back
                </Button>
                <Button variant="secondary" size="sm" onClick={() => reset()}>
                    Try again
                </Button>
            </div>
        </div>
    );
}
