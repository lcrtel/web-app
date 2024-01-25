"use client";

import { useRouter } from "next/navigation";

const FetchLocalStorage = () => {
    const router = useRouter();
    if (typeof window !== "undefined") {
        const storedRouteData = localStorage.getItem("pendingRouteOffersData");
        if (storedRouteData) {
            router.push("/user/my-routes/post");
        }
        const storedTargetData = localStorage.getItem(
            "pendingBuyingTargetsData"
        );
        if (storedTargetData) {
            router.push("/user/my-requests/post");
        }
    }
    return <></>;
};

export default FetchLocalStorage;
