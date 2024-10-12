"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, subDays } from "date-fns"; // Importing format and subDays
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Utility function to get default date range (last 7 days)
const getDefaultDateRange = (): DateRange => {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);
    return { from: sevenDaysAgo, to: today };
};

// Prop types for the DateRangePicker component
interface DateRangePickerProps {
    placeholder?: string;
    triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">;
    triggerSize?: Exclude<ButtonProps["size"], "icon">;
    triggerClassName?: string;
    endPoint: string;
    onUrlChange: (url: string) => void;
}

export function DateRangePicker({
    placeholder = "Pick a date",
    triggerVariant = "outline",
    triggerSize = "default",
    triggerClassName,
    endPoint,
    onUrlChange,
}: DateRangePickerProps) {
    const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange>(
        getDefaultDateRange(),
    );

    // Helper function to format date to YYYY-MM-DD
    const formatDate = (date: Date | undefined) =>
        date ? format(date, "yyyy-MM-dd") : "";

    // Function to handle query change and update the URL with formatted date range
    const handleQueryChange = (newDateRange: DateRange | undefined) => {
        const urlParams = new URLSearchParams(endPoint.split("?")[1]);

        if (newDateRange?.from) {
            urlParams.set("from", formatDate(newDateRange.from)); // Format to YYYY-MM-DD
        } else {
            urlParams.delete("from");
        }

        if (newDateRange?.to) {
            urlParams.set("to", formatDate(newDateRange.to)); // Format to YYYY-MM-DD
        } else {
            urlParams.delete("to");
        }

        // Rebuild and update the URL
        const updatedUrl = `${endPoint.split("?")[0]}?${urlParams.toString()}`;
        onUrlChange(updatedUrl);
    };

    // Function to reset the date range to default (previous 7 days)
    const resetToDefaultDateRange = () => {
        const defaultRange = getDefaultDateRange();
        setSelectedDateRange(defaultRange);
        handleQueryChange(defaultRange); // Update URL with default date range
    };

    return (
        <div className="w-fit">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={triggerVariant}
                        size={triggerSize}
                        className={cn(
                            "w-full justify-start truncate text-left font-normal",
                            !selectedDateRange && "text-muted-foreground",
                            triggerClassName,
                        )}
                    >
                        <CalendarIcon className="mr-2 size-4" />
                        {selectedDateRange?.from ? (
                            selectedDateRange.to ? (
                                <>
                                    {format(
                                        selectedDateRange.from,
                                        "LLL dd, y",
                                    )}{" "}
                                    -{" "}
                                    {format(selectedDateRange.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(selectedDateRange.from, "LLL dd, y")
                            )
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={selectedDateRange?.from}
                        selected={selectedDateRange}
                        onSelect={(newDateRange) => {
                            if (newDateRange) {
                                setSelectedDateRange(newDateRange); // Only update state if newDateRange is defined
                                handleQueryChange(newDateRange);
                            }
                        }}
                        numberOfMonths={2}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={resetToDefaultDateRange}
                        className="w-full "
                    >
                        Clear
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}
