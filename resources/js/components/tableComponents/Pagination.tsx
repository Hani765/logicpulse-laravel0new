import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import PerPage from "./PerPage";
import { Button } from "../ui/button";
import { TasksTableFloatingBar } from "./tasks-table-floating-bar";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pagination: any;
    onUrlChange: (url: string) => void; // Define the type for onUrlChange
    endPoint: string;
}

export function DataTablePagination<TData>({
    table,
    pagination,
    endPoint,
    onUrlChange,
}: DataTablePaginationProps<TData>) {
    const selectedRows = table.getFilteredSelectedRowModel().rowsById;

    const handlePageChange = (newPage: number) => {
        // Create a URLSearchParams object to manipulate the URL's query parameters
        const urlParams = new URLSearchParams(endPoint.split("?")[1]);

        // Set or update the 'page' parameter
        urlParams.set("page", newPage.toString());

        // Rebuild the full URL (ensure there's only one '?')
        const updatedUrl = `${endPoint.split("?")[0]}?${urlParams.toString()}`;

        // Update the URL
        onUrlChange(updatedUrl);
    };

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <>
                {Object.keys(selectedRows).length > 0 ? (
                    <TasksTableFloatingBar table={table} />
                ) : null}
            </>
            <div className="flex items-center gap-2 mr-8">
                <PerPage onUrlChange={onUrlChange} endPoint={endPoint} />
                <div className="flex items-center space-x-2">
                    <p className="text-sm">
                        Page {pagination.current_page} of {pagination.last_page}
                    </p>
                    {/* First page button */}
                    <Button
                        className="hidden h-8 w-8 p-0 lg:flex"
                        disabled={
                            pagination.current_page === pagination.first_page
                        }
                        variant="ghost"
                        onClick={() => handlePageChange(pagination.first_page)}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>

                    {/* Previous page button */}
                    <Button
                        className="h-8 w-8 p-0"
                        variant="ghost"
                        disabled={pagination.prev_page === null}
                        onClick={() => handlePageChange(pagination.prev_page)}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>

                    {/* Next page button */}
                    <Button
                        className="h-8 w-8 p-0"
                        variant="ghost"
                        disabled={pagination.next_page === null}
                        onClick={() => handlePageChange(pagination.next_page)}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>

                    {/* Last page button */}
                    <Button
                        className="hidden h-8 w-8 p-0 lg:flex"
                        variant="ghost"
                        disabled={
                            pagination.current_page === pagination.last_page
                        }
                        onClick={() => handlePageChange(pagination.last_page)}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
