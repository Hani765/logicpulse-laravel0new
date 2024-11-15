"use client";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useSearchParams from "@/hooks/useSearchParams";

export default function PerPage() {
    const [perpage, setPerPage] = useState("");
    const { currentValue } = useSearchParams("per_page", perpage);
    useEffect(() => {
        if (currentValue) {
            setPerPage(currentValue);
        }
    }, [currentValue]);
    return (
        <div className="flex gap-2 items-center flex-col sm:flex-row">
            <p className="text-sm font-medium">Rows per page</p>
            <Select onValueChange={(value) => setPerPage(value)}>
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
