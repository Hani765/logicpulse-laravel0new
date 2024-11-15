import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import useSearchParams from "@/hooks/useSearchParams";

export default function SearchInput() {
    const [query, setQuery] = useState("");
    const { currentValue } = useSearchParams("q", query);

    useEffect(() => {
        if (currentValue) {
            setQuery(currentValue);
        }
    }, [currentValue]);

    return (
        <Input
            className="h-8 w-full sm:w-64 bg-white rounded flex-1"
            placeholder="search by name.."
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
