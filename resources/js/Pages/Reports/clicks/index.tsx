import { DateRangePicker } from "@/components/date-range-picker";
import { DataTable } from "@/components/table";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import useFetch from "@/hooks/usefetch";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ClickType, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { LucideServerCrash } from "lucide-react";
import { useState } from "react";
import { Columns } from "./components/columns";
interface dataType {
    data: ClickType[];
    pagination: any;
    chart_data: any[];
}
export default function index({ auth }: PageProps) {
    const [url, setUrl] = useState(`/fetch/clicks`);
    const { data, isLoading, error } = useFetch<dataType>(url);

    return (
        <Authenticated user={auth.user}>
            <Head title="Clicks">
                <meta
                    name="description"
                    content=" Manage and track your clicks in one convenient
                    location."
                />
            </Head>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg">Clicks</h2>
                    <p className="text-sm text-gray-500 hidden sm:block">
                        Manage and track your clicks in one convenient location.
                    </p>
                </div>
                <DateRangePicker
                    endPoint={url}
                    onUrlChange={(url: string) => setUrl(url)}
                />
            </div>
            {error ? (
                <div className="min-h-72 bg-white flex mt-6 border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600">
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
                    {JSON.stringify(data.data)}
                    <DataTable
                        isLoading={isLoading}
                        data={data.data}
                        pagination={data.pagination}
                        endPoint={url}
                        columns={Columns()}
                        onUrlChange={(url: string) => setUrl(url)}
                        isPagination
                    />
                </>
            )}
        </Authenticated>
    );
}
