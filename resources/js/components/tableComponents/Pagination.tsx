"use client";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import MultiDel from "./multiDel";
import PerPage from "./PerPage";
import { Link } from "@inertiajs/react";
import { useSearchParams } from "react-router-dom";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pagination: any;
    endPoint: string;
}

export function DataTablePagination<TData>({
    table,
    pagination,
    endPoint,
}: DataTablePaginationProps<TData>) {
    const selectedRows = table.getFilteredSelectedRowModel().rowsById;
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <>
                {Object.keys(selectedRows).length > 0 ? (
                    <MultiDel endPoint={endPoint} selectedRows={selectedRows} />
                ) : null}
            </>
            <div className="flex items-center gap-2 mr-8">
                <PerPage />
                <div className="flex items-center pt-4 space-x-2">
                    {pagination.current_page === pagination.first_page ? (
                        <span className="hidden cursor-not-allowed h-8 w-8 p-0 lg:flex text-muted-foreground">
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </span>
                    ) : (
                        <Link
                            href={`?page=${pagination.first_page}`}
                            className="hidden h-8 w-8 p-0 lg:flex"
                            disabled={
                                pagination.current_page ===
                                pagination.first_page
                            }
                        >
                            <span className="sr-only">Go to first page</span>
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    )}
                    {pagination.prev_page === null ? (
                        <span className="hidden cursor-not-allowed h-8 w-8 p-0 lg:flex text-muted-foreground">
                            <ChevronLeftIcon className="h-4 w-4" />
                        </span>
                    ) : (
                        <Link
                            href={`?page=${pagination.prev_page}`}
                            className="h-8 w-8 p-0"
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Link>
                    )}
                    {pagination.next_page === null ? (
                        <span className="hidden cursor-not-allowed h-8 w-8 p-0 lg:flex text-muted-foreground">
                            <ChevronRightIcon className="h-4 w-4" />
                        </span>
                    ) : (
                        <Link
                            href={`?page=${pagination.next_page}`}
                            className="h-8 w-8 p-0"
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon className="h-4 w-4" />
                        </Link>
                    )}
                    {pagination.current_page === pagination.last_page ? (
                        <span className="hidden cursor-not-allowed h-8 w-8 p-0 lg:flex text-muted-foreground">
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </span>
                    ) : (
                        <Link
                            href={`?page=${pagination.last_page}`}
                            className="hidden h-8 w-8 p-0 lg:flex"
                        >
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
