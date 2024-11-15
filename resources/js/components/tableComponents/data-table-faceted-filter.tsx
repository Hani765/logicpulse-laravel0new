import { useEffect, useState } from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
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
import { statusOptions } from "@/lib/status-option";
import useSearchParams from "@/hooks/useSearchParams";

// Define the type for each status option
interface StatusOption {
    value: string;
    label: string;
}

// Define the props for the DataTableFacetedFilter component
interface DataTableFacetedFilterProps<TData, TValue> {}

export function DataTableFacetedFilter<
    TData,
    TValue,
>({}: DataTableFacetedFilterProps<TData, TValue>) {
    const [filterValue, setFilterValue] = useState<string>("");

    // Use the custom hook for managing query params
    const { currentValue } = useSearchParams("status", filterValue);
    useEffect(() => {
        if (currentValue) {
            setFilterValue(currentValue);
        }
    }, [currentValue]);
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
                    {filterValue && (
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
                            {statusOptions.map((option: StatusOption) => {
                                const isSelected = filterValue === option.value;
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() =>
                                            setFilterValue(
                                                isSelected ? "" : option.value,
                                            )
                                        }
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
                        {filterValue && (
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
