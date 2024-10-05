"use client";
import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link, usePage } from "@inertiajs/react";

export default function PerPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = usePage();
    const [queryState, setQueryState] = useState({
        per_page: searchParams.get("per_page") || "",
    });

    const updateUrl = (url: string, per_page: string) => {
        let newUrl = new URL(url, window.location.origin);
        newUrl.searchParams.set("per_page", per_page);
        return newUrl.toString().replace(window.location.origin, "");
    };

    return (
        <div className="flex gap-2 items-center">
            <p className="text-sm font-medium">Rows per page</p>
            <Select>
                <SelectTrigger className="h-6 w-[100px]">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent side="top">
                    {[50, 100, 250, 500, 1000].map((pageSize) => (
                        <div className="flex flex-col" key={pageSize}>
                            <Link
                                href={updateUrl(page.url, `${pageSize}`)}
                                className="w-full hover:bg-slate-50 text-center text-md px-1 py-0.5 rounded"
                            >
                                {pageSize}
                            </Link>
                        </div>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
