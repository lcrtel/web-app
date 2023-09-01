import React from "react";
import Overview from "./Overview";
import RecentActivities from "./RecentActivities";
import Notifications from "./Notifications";
import QuickActions from "./QuickActions";

const page = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-5">Welcome, </h1>
            <Overview />
            <QuickActions />
            <Notifications />
            {/* <RecentActivities /> */}
        </div>
    );
};

export default page;
