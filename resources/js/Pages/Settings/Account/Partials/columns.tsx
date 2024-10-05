import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsType } from "@/types";
import Dropdown from "./dropdown";
export const Columns = (error?: string): ColumnDef<SettingsType>[] => [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: "key",
        header: "Key",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = String(row.getValue("status"));
            return (
                <>
                    {status === "active" ? (
                        <div className="text-green-500">Active</div>
                    ) : status === "paused" ? (
                        <div className="text-blue-500">Paused</div>
                    ) : (
                        <div className="text-red-500">Inactive</div>
                    )}
                </>
            );
        },
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const rowCurrent = row.original;
            return (
                <>
                    <Dropdown rowCurrent={rowCurrent} error={error} />
                </>
            );
        },
    },
];
