"use client";

import { useRouter } from "next/navigation";

const FetchLocalStorage = () => {
    const router = useRouter();
    const storedRouteData = localStorage.getItem("pendingRouteOffersData");
    if (storedRouteData) {
        router.push("/user/routes/offers/post");
    }
    const storedTargetData = localStorage.getItem("pendingBuyingTargetsData");
    if (storedTargetData) {
        router.push("/user/routes/targets/post");
    }
    return <></>;
};

export default FetchLocalStorage;
