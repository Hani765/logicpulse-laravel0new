import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Dropdown from "./dropdown";
import { OfferType } from "@/types";
import CopyInput from "@/components/ui/CopyInput";
import { DataTableColumnHeader } from "@/components/tableComponents/data-table-column-header";
import Status from "@/components/tableComponents/status";
import Progress from "@/components/charts/table-chart";

export const Columns = (role: string): ColumnDef<OfferType>[] => [
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
        accessorKey: "id",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="ID" />;
        },
        cell: (info) => info.row.index + 1,
    },
    {
        accessorKey: "nameWithCountries",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Offer Name" />;
        },
    },
    {
        accessorKey: "age",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Age" />;
        },
    },
    {
        accessorKey: "rate",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Rate" />;
        },
    },
    {
        accessorKey: "clicks",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Clicks" />;
        },
    },
    {
        accessorKey: "conversions",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Conversions" />
            );
        },
    },
    {
        accessorKey: "cvr",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="CVR" />;
        },
    },
    {
        accessorKey: "progress",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Progress" />
        ),
        cell: ({ row }) => {
            const progress = row.getValue("progress");
            return <Progress progress={progress} />;
        },
    },
    {
        accessorKey: "url",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="OfferLink" />;
        },
        cell: ({ row }) => {
            const url = String(row.getValue("url"));
            return (
                <>
                    <CopyInput url={url} />
                </>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Create At" />;
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            const formated = date.toLocaleDateString();
            return <div className="font-medium">{formated}</div>;
        },
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Updated At" />;
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("updated_at"));
            const formated = date.toLocaleDateString();
            return <div className="font-medium">{formated}</div>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Status" />;
        },
        cell: ({ row }) => {
            const status = String(row.getValue("status"));
            return <Status status={status} />;
        },
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const rowCurrent = row.original;
            return (
                <>
                    <Dropdown role={role} rowCurrent={rowCurrent} />
                </>
            );
        },
    },
];
