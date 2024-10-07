"use client";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function PerPage({
    onUrlChange,
    endPoint,
}: {
    endPoint: string;
    onUrlChange: (url: string) => void;
}) {
    // Handle the per_page change
    const handlePageChange = (per_page: number) => {
        // Create a URLSearchParams object to manipulate the URL's query parameters
        const urlParams = new URLSearchParams(endPoint.split("?")[1]);

        // Set or update the 'per_page' parameter
        urlParams.set("per_page", per_page.toString());

        // Rebuild the full URL with updated 'per_page' query
        const updatedUrl = `${endPoint.split("?")[0]}?${urlParams.toString()}`;

        // Call the onUrlChange handler with the updated URL
        onUrlChange(updatedUrl);
    };

    return (
        <div className="flex gap-2 items-center">
            <p className="text-sm font-medium">Rows per page</p>
            <Select onValueChange={(value) => handlePageChange(Number(value))}>
                <SelectTrigger className="h-6 w-[100px]">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent side="top">
                    {["50", "100", "250", "500", "1000"].map((pageSize) => (
                        <div className="flex flex-col" key={pageSize}>
                            <SelectItem
                                value={pageSize}
                                className="w-full hover:bg-slate-50 text-center text-md px-1 py-0.5 rounded"
                            >
                                {pageSize}
                            </SelectItem>
                        </div>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
