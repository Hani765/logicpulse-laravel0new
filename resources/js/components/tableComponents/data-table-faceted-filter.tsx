import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import type { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

interface DataTableFacetedFilterProps<TData, TValue> {
    endPoint: string;
    onUrlChange: any;
}

export function DataTableFacetedFilter<TData, TValue>({
    endPoint,
    onUrlChange,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const [filterValue, setFilterValue] = useState("");
    const options = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
        { value: "paused", label: "Paused" },
    ];
    const handleQueryChange = (query: string) => {
        // Create a URLSearchParams object to manipulate the URL's query parameters
        const urlParams = new URLSearchParams(endPoint.split("?")[1]);

        // Set or update the 'page' parameter
        urlParams.set("status", query.toString());

        // Rebuild the full URL (ensure there's only one '?')
        const updatedUrl = `${endPoint.split("?")[0]}?${urlParams.toString()}`;

        // Update the URL
        onUrlChange(updatedUrl);
    };
    useEffect(() => {
        handleQueryChange(filterValue);
    }, [filterValue]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                >
                    <PlusCircledIcon className="mr-2 size-4" />
                    Status
                    {filterValue !== "" && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal"
                            >
                                {filterValue}
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[12.5rem] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Status" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
                            {options.map((option) => {
                                const isSelected = filterValue === option.value;
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                setFilterValue("");
                                            } else {
                                                setFilterValue(option.value);
                                            }
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible",
                                            )}
                                        >
                                            <CheckIcon
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {filterValue != "" && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => setFilterValue("")}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
