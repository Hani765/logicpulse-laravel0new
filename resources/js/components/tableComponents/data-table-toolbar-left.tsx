import React from "react";
import SearchInput from "./search-input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarLeftProps {
    isStatusFilter?: boolean;
    isSearchable?: boolean;
    children?: React.ReactNode;
}

export default function DataTableToolbarLeft({
    children,
    isStatusFilter = true,
    isSearchable = true,
}: DataTableToolbarLeftProps) {
    return (
        <div className="flex items-center w-full sm:space-x-1">
            {isSearchable && <SearchInput />}
            {isStatusFilter && <DataTableFacetedFilter />}
            {children}
        </div>
    );
}
