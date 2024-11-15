import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentDateTime } from "@/hooks/get-currentDateTime";
import useFetch from "@/hooks/usefetch";
import { Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
type dataType = {
    message: string;
};
export default function Message({
    username,
    data,
    isLoading,
    error,
}: {
    username: string;
    data: dataType | any;
    isLoading: boolean;
    error: any;
}) {
    const currentDateTime = getCurrentDateTime();
    const [pause, setPause] = useState(true);

    return (
        <Card className="overflow-hidden flex">
            <div className="bg-primary py-1 px-6 flex items-center justify-center">
                <p className="text-md text-white font-semibold">News</p>
            </div>
            <div className="p-2 flex w-full">
                <Marquee pauseOnHover play={pause}>
                    <div className="h-3 w-3 bg-primary animate-pulse rounded-full mr-0.5"></div>
                    <span className="font-bold mr-1">Hello {username}!</span>
                    {isLoading && !error ? (
                        <Skeleton className="h-4 w-[300px]" />
                    ) : (
                        <p className="text-md">{data?.message}</p>
                    )}
                </Marquee>
                <div className="flex items-center justify-between whitespace-nowrap gap-1">
                    <Button
                        onClick={() => setPause(!pause)}
                        size="icon"
                        variant="outline"
                        className="w-5 h-5 border-0"
                    >
                        {pause ? <Pause /> : <Play />}
                    </Button>
                    <p className="text-sm text-gray-600 hidden sm:block">
                        {currentDateTime}
                    </p>
                </div>
            </div>
        </Card>
    );
}
