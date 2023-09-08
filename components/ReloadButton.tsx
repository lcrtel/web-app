"use client";

import { useRouter } from "next/navigation";
import { HiRefresh } from "react-icons/hi";
import { Button } from "./ui/button";

const ReloadButton = () => {
    const router = useRouter();

    const handleReferesh = async () => {
        router.refresh();
    };

    return (
        <Button variant="outline" size="icon" onClick={() => handleReferesh()}>
            <HiRefresh className="" />
        </Button>
    );
};

export default ReloadButton;
