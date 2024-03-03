"use client";

import LineChart from "@/components/charts/LineChart";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
const data = [
    { date: "07 Feb, 2024 00:33", rate: 0.00432 },
    { date: "12 Feb, 2024 15:42", rate: 0.00413 },
    { date: "12 Feb, 2024 12:47", rate: 0.00443 },
    { date: "27 Feb, 2024 12:12", rate: 0.00449 },
    { date: "29 Feb, 2024 06:54", rate: 0.00445 },
];

export function PriceChart({ rates }: { rates: any }) {
    function convertToDaysAgo(data: any, currentDate: any) {
        return data.map((item: any) => {
            const itemDate: Date = new Date(item.effective_date);
            // const diffTime = Math.abs(currentDate - itemDate);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return {
                ...item,
                // date: `${diffDays} ${diffDays !== 1 ? "Days" : "Day"} ago`,
                Date: itemDate.toDateString(),
                Rate: item.rate,
            };
        });
    }
    const currentDate = new Date();

    const updatedData = convertToDaysAgo(rates, currentDate);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rate History</CardTitle>
            </CardHeader>
            {/* <pre>{JSON.stringify(updatedData, null, 2)}</pre> */}
            <CardContent className="pb-4">
                {/* <div className="h-[200px]"> */}
                <LineChart
                    className="h-[200px]"
                    data={updatedData}
                    categories={["Rate"]}
                    index="Date"
                    showLegend={false}
                />
                {/* </div> */}
            </CardContent>
        </Card>
    );
}
