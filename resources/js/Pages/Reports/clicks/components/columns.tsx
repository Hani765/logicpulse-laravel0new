import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Dropdown from "./dropdown";
import { ClickType } from "@/types";
import { DataTableColumnHeader } from "@/components/tableComponents/data-table-column-header";
import { formatDate } from "@/lib/utils";
import Progress from "@/components/charts/table-chart";
import Status from "@/components/tableComponents/status";

export const Columns = (): ColumnDef<ClickType>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "click_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
    },
    {
        accessorKey: "offer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Offer" />
        ),
    },
    {
        accessorKey: "user",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User" />
        ),
    },
    {
        accessorKey: "manager",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Manager" />
        ),
    },
    {
        accessorKey: "admin",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Admin" />
        ),
    },
    {
        accessorKey: "network",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Network" />
        ),
    },
    {
        accessorKey: "tracker",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tracker" />
        ),
    },
    {
        accessorKey: "domain",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Domain" />
        ),
    },
    {
        accessorKey: "ip_address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="IP Address" />
        ),
    },
    {
        accessorKey: "source",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Source" />
        ),
    },
    {
        accessorKey: "country",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Country" />
        ),
    },
    {
        accessorKey: "city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
    },
    {
        accessorKey: "device",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Device" />
        ),
    },
    {
        accessorKey: "device_version",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Device Version" />
        ),
    },
    {
        accessorKey: "browser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Browser" />
        ),
    },
    {
        accessorKey: "version",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Version" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = String(row.getValue("status"));
            return <Status status={status} />;
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const rowCurrent = row.original;
            return (
                <>
                    <Dropdown />
                </>
            );
        },
    },
];
