"use client";

import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { DeleteTasksDialog } from "./delete-tasks-dialog";
import { exportTableToCSV } from "@/lib/export";
import { DataTableViewOptions } from "./columnToggle";
import { debounce } from "lodash";

interface DataTableToolbarProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
    Create?: any;
    onUrlChange: any;
    endPoint: string;
}

export function DataTableToolbar<TData>({
    table,
    Create,
    onUrlChange,
    endPoint,
    className,
    ...props
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    const handleQueryChange = (query: string) => {
        // Create a URLSearchParams object to manipulate the URL's query parameters
        const urlParams = new URLSearchParams(endPoint.split("?")[1]);

        // Set or update the 'page' parameter
        urlParams.set("q", query.toString());

        // Rebuild the full URL (ensure there's only one '?')
        const updatedUrl = `${endPoint.split("?")[0]}?${urlParams.toString()}`;

        // Update the URL
        onUrlChange(updatedUrl);
    };
    const debouncedFetch = React.useCallback(
        debounce((value: string) => {
            handleQueryChange(value);
        }, 500), // 500ms delay
        [],
    );
    return (
        <div
            className={cn(
                "flex w-full sm:items-center sm:justify-between space-y-1 sm:space-y-0 sm:space-x-2 overflow-auto p-1 flex-col sm:flex-row",
                className,
            )}
            {...props}
        >
            <div className="flex flex-1 sm:items-center space-y-1 sm:space-y-0 w-full flex-col sm:flex-row-reverse">
                {Create && <Create />}
                <div className="flex items-center w-full sm:space-x-1">
                    <Input
                        className="h-8 w-full sm:w-64 bg-white rounded flex-1"
                        placeholder="search by name.."
                        onChange={(e) => debouncedFetch(e.target.value)}
                    />

                    <DataTableFacetedFilter
                        endPoint={endPoint}
                        onUrlChange={onUrlChange}
                    />
                </div>
            </div>
            <div className="flex gap-2">
                {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                    <DeleteTasksDialog
                        tasks={table
                            .getFilteredSelectedRowModel()
                            .rows.map((row) => row.original)}
                        onSuccess={() => table.toggleAllRowsSelected(false)}
                    />
                ) : null}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        exportTableToCSV(table, {
                            filename: "Records",
                            excludeColumns: ["select", "actions"],
                        })
                    }
                >
                    <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                    Export
                </Button>
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
