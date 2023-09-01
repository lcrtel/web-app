"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { HiRefresh } from "react-icons/hi";

const ReloadButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleReferesh = async () => {
        setLoading(true);
        router.refresh();
        setLoading(false);
    };

    return (
        <Button
            variant="outline"
            className="gap-2"
            onClick={() => handleReferesh()}
        >
            {loading ? (
                <>
                    Relaoding
                    <HiRefresh className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : (
                <>
                    <HiRefresh className="h-4 w-4" />
                </>
            )}
        </Button>
    );
};

export default ReloadButton;
