"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format, parseISO } from "date-fns";
const chartConfig = {
  Rate: {
    label: "Rate",
    color: "#ebf7ff",
  },
} satisfies ChartConfig;
export function RateHistoryChart({ rates }: any) {
  const updatedData = useMemo(() => {
    // Filter out entries with null dates
    const validRates = rates.filter((item:any) => item.effective_date !== null);

    if (validRates.length === 0) {
      return [];
    }

    // Get the latest rate entry
    const latestRateEntry = validRates[validRates.length - 1];
    const latestRate = latestRateEntry.selling_rate || 0;
    const latestRateDate = latestRateEntry
      ? format(
          parseISO(latestRateEntry.effective_date!),
          "yyyy-MM-dd'T'HH:mm:ss",
        )
      : "";

    // Get today's date
    const today = new Date();
    const todayDate = format(today, "yyyy-MM-dd'T'HH:mm:ss");
    const todayMonth = format(today, "MMM");

    // Create today's entry
    const todayEntry = {
      Date: todayDate,
      Rate: latestRate,
      Month: todayMonth,
    };

    // Map valid rates to the required format
    const mappedData = validRates.map((item:any) => {
      const itemDate = parseISO(item.effective_date!);
      return {
        Date: format(itemDate, "yyyy-MM-dd'T'HH:mm:ss"),
        Rate: item.selling_rate,
        Month: format(itemDate, "MMM"),
      };
    });

    // Add today's entry only if the latest rate date is not today
    if (latestRateDate !== todayDate) {
      return [...mappedData, todayEntry];
    }

    return mappedData;
  }, [rates]);

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={updatedData}
        margin={{
          left: 8,
          right: 18,
          bottom: 16,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="Date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(date) => format(parseISO(date), "MMM")}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={0}
          minTickGap={2}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
          labelFormatter={(date) => format(parseISO(date), "MMM d, yyyy HH:mm")}
          formatter={(value) => `Rate: $${value}`}
        />
        <Area dataKey="Rate" type="linear" fill="#d1ecff" stroke="#0038a7" />
      </AreaChart>
    </ChartContainer>
  );
}
