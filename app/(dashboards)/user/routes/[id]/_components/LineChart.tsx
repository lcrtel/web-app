"use client";

import LineChart from "@/components/charts/LineChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { History } from "lucide-react";

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
        Rate: item.selling_rate,
      };
    });
  }
  const currentDate = new Date();

  const updatedData = convertToDaysAgo(rates, currentDate);
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-sm">
          <History className="size-4" /> Price history
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className=" text-xl md:text-2xl font-semibold">Rate History</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <Card>
            <CardContent className="pb-2 pt-6">
              <LineChart
                className="h-[200px]"
                data={updatedData}
                categories={["Rate"]}
                index="Date"
                showLegend={false}
              />
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
