import React from "react";
import { useFetchContext } from "@/hooks/useFetchContext";
import { LucideServerCrash } from "lucide-react";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import { PageChart } from "@/components/charts/page-chart";
import { DataTable } from "@/components/table";
import { Columns } from "./components/columns";
import Create from "./components/create/create";
import DataTableToolbarLeft from "@/components/tableComponents/data-table-toolbar-left";

const DataPage: React.FC<{
    url: string;
    role: string;
}> = ({ url, role }) => {
    const { data, error, isLoading } = useFetchContext(url);
    return (
        <div>
            {error ? (
                <div className="min-h-72 mt-6 bg-white flex border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600">
                    <LucideServerCrash size={44} />
                    <div>
                        Something went wrong please try to refresh the page.
                    </div>
                </div>
            ) : !data ? (
                <DataTableSkeleton
                    rowCount={8}
                    columnCount={8}
                    showViewOptions={false}
                />
            ) : (
                <>
                    <PageChart data={data?.chart_data} isLoading={isLoading} />
                    <DataTable
                        isLoading={isLoading}
                        data={data.data}
                        pagination={data.pagination}
                        columns={Columns(role)}
                        isPagination
                        LeftTable={DataTableToolbarLeft}
                        Create={
                            role === "admin" || role === "administrator"
                                ? Create
                                : undefined
                        }
                    />
                </>
            )}
        </div>
    );
};

export default DataPage;
