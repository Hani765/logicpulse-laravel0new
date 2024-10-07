import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Skeleton } from "@/components/ui/skeleton";
import { HardDrive } from "lucide-react";

export default function OffersTable({
    data,
    isLoading,
}: {
    data: any[];
    isLoading: boolean;
}) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {[...Array(20)].map((_, index) => (
                    <div className="flex flex-col space-y-3" key={index}>
                        <Skeleton className="h-[125px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-[500px] flex justify-center items-center mt-6 rounded-lg">
                <div className="text-sm flex flex-col items-center text-gray-500 dark:text-gray-400 p-12 border border-gray-300 bg-white shadow-md dark:bg-slate-800 dark:border-slate-700 rounded-lg">
                    <HardDrive className="text-gray-400 dark:text-gray-500 mb-4 w-10 h-10" />
                    <p className="text-lg font-semibold mb-2">No Data Found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        We couldn’t find any records. Try adjusting your search
                        criteria.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <>
            <HoverEffect items={data} className="mt-4" />
        </>
    );
}
