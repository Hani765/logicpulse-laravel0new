import React from "react";
import DashboardChart from "./DashboardChart";
import useFetch from "@/hooks/usefetch";
import { Skeleton } from "@/components/ui/skeleton";
type DataType = {
    clicks: any;
    conversions: any;
    cvr: any;
    earnings: any;
};
interface pageProps {
    data: DataType | any;
    isLoading: boolean;
    error: any;
}

export function DashboardRawCharts({ data, isLoading, error }: pageProps) {
    const {
        data: AnalyticsData,
        isLoading: AnalyticsIsLoading,
        error: AnalyticsError,
    } = useFetch<DataType>("/dashboard/analytics");
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-2">
                {isLoading ? (
                    <>
                        <Skeleton className="w-full h-[200px] rounded"></Skeleton>
                        <Skeleton className="w-full h-[200px] rounded"></Skeleton>
                        <Skeleton className="w-full h-[200px] rounded"></Skeleton>
                        <Skeleton className="w-full h-[200px] rounded"></Skeleton>
                    </>
                ) : (
                    <>
                        <DashboardChart data={data?.clicks} />
                        <DashboardChart data={data?.conversions} />
                        <DashboardChart data={data?.cvr} />
                        <DashboardChart data={data?.earnings} />
                    </>
                )}
            </div>
        </div>
    );
}
