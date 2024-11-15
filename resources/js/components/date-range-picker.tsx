"use client";
import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, subDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useSearchParams from "@/hooks/useSearchParams";

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
}

export function DateRangePicker({
    placeholder = "Pick a date",
    triggerVariant = "outline",
    triggerSize = "default",
    triggerClassName,
}: DateRangePickerProps) {
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(
        getDefaultDateRange(),
    );

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const { currentValue: currentFromValue } = useSearchParams("from", from); // Retrieve "from" param value
    const { currentValue: currentToValue } = useSearchParams("to", to); // Retrieve "to" param value

    // Helper function to format date to YYYY-MM-DD
    const formatDate = (date: Date | undefined) =>
        date ? format(date, "yyyy-MM-dd") : "";

    // Function to update URL when the date range changes
    const handleQueryChange = (newDateRange: DateRange | undefined) => {
        // Update or delete "from" and "to" query parameters
        if (newDateRange?.from) {
            setFrom(formatDate(newDateRange.from));
        }

        if (newDateRange?.to) {
            setTo(formatDate(newDateRange.to));
        }
    };

    // Function to reset the date range to default (previous 7 days)
    const resetToDefaultDateRange = () => {
        const defaultRange = getDefaultDateRange();
        setSelectedDateRange(defaultRange);
        handleQueryChange(defaultRange); // Update URL with default date range
    };

    useEffect(() => {
        if (currentFromValue) {
            setFrom(currentFromValue);
        }
        if (currentToValue) {
            setTo(currentToValue);
        }
    }, [currentFromValue, currentToValue]);

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
                                setSelectedDateRange(newDateRange); // Update state with new range
                                handleQueryChange(newDateRange); // Update URL
                            }
                        }}
                        numberOfMonths={2}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={resetToDefaultDateRange}
                        className="w-full"
                    >
                        Clear
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}
