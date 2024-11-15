"use client";

import * as React from "react";
import type { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { DeleteTasksDialog } from "./delete-tasks-dialog";
import { exportTableToCSV } from "@/lib/export";
import { DataTableViewOptions } from "./columnToggle";

interface DataTableToolbarProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
    LeftTable?: any; // Set as ComponentType for proper typing
    Create?: any; // Set as ComponentType for proper typing
}

export function DataTableToolbar<TData>({
    table,
    LeftTable,
    className,
    Create,
    ...props
}: DataTableToolbarProps<TData>) {
    return (
        <div
            className={cn(
                "flex w-full sm:items-center sm:justify-between space-y-1 sm:space-y-0 sm:space-x-2 overflow-auto p-1 flex-col sm:flex-row",
                className,
            )}
            {...props}
        >
            {/* Render LeftTable as a component if it exists */}
            <div className="flex flex-1 sm:items-center space-y-1 sm:space-y-0 w-full flex-col sm:flex-row-reverse">
                {Create && <Create />}
                {LeftTable && <LeftTable />}
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
