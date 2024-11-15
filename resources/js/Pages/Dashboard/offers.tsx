import { DataTable } from "@/components/table";
import { OfferType } from "@/types";
import { useState } from "react";
import useFetch from "@/hooks/usefetch";
import { LucideServerCrash } from "lucide-react";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import { Columns } from "../Offers/components/columns";
import Create from "../Offers/components/create/create";
const endPoint = "/your-endpoint"; // Replace with your actual endpoint
interface dataType {
    data: OfferType[];
    pagination: any;
    chart_data: any[];
}
export default function OffersTable({
    url,
    setUrl,
    role,
    data,
    isLoading,
    error,
}: {
    role: string;
    data: dataType | any;
    isLoading: boolean;
    error: any;
    url: string;
    setUrl: any;
}) {
    return (
        <>
            {error ? (
                <div className="min-h-72 mt-6 bg-white flex border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600">
                    <LucideServerCrash size={44} />
                    <div>
                        Something went wrong please try to refresh the page.
                    </div>
                </div>
            ) : !data || isLoading ? (
                <DataTableSkeleton
                    rowCount={8}
                    columnCount={8}
                    showViewOptions={false}
                />
            ) : (
                <>
                    <DataTable
                        isLoading={isLoading}
                        data={data.data}
                        pagination={data.pagination}
                        endPoint={url}
                        columns={Columns(role)}
                        onUrlChange={(url: string) => setUrl(url)}
                        isPagination
                        Create={
                            role === "admin" || role === "administrator"
                                ? Create
                                : undefined
                        }
                    />
                </>
            )}
        </>
    );
}
