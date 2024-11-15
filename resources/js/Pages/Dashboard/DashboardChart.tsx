"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An area chart with gradient fill";

const chartConfig = {
    currentMonth: {
        label: "Current Month",
        color: "hsl(var(--chart-1))",
    },
    lastMonth: {
        label: "Last Month",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

type dataType = {
    label: string;
    lastMonth: { date: string; counts: number }[];
    currentMonth: { date: string; counts: number }[];
};

export default function DashboardChart({ data }: { data: dataType }) {
    // Prepare the chart data by combining last and current month data
    const chartData = data.lastMonth.map((item, index) => ({
        month: item.date,
        lastMonth: item.counts,
        currentMonth: data.currentMonth[index]?.counts || 0,
    }));

    return (
        <Card className="bg-white dark:bg-slate-900">
            <CardHeader>
                <CardDescription>{data.label}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)} // Truncate to first 3 characters
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <defs>
                            <linearGradient
                                id="fillLastMonth"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-lastMonth)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-lastMonth)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillCurrentMonth"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-currentMonth)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-currentMonth)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="lastMonth"
                            type="natural"
                            fill="url(#fillLastMonth)"
                            fillOpacity={0.4}
                            stroke="var(--color-lastMonth)"
                            stackId="a"
                        />
                        <Area
                            dataKey="currentMonth"
                            type="natural"
                            fill="url(#fillCurrentMonth)"
                            fillOpacity={0.4}
                            stroke="var(--color-currentMonth)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {data.lastMonth[0].date} -{" "}
                            {
                                data.currentMonth[data.currentMonth.length - 1]
                                    ?.date
                            }
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
