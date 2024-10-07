import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/usefetch";
import React, { useRef, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface DataType {
    unique_id: string;
    name: string;
}

export default function Cat({
    selected,
    onSelect,
}: {
    selected: string;
    onSelect: (id: string) => void;
}) {
    const { data, isLoading, error } =
        useFetch<DataType[]>("/fetch/categories");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Check scroll position to control arrow visibility
    const checkScroll = () => {
        const element = scrollRef.current;
        if (element) {
            const { scrollLeft, scrollWidth, clientWidth } = element;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        checkScroll(); // Run on initial render
        const element = scrollRef.current;
        if (element) {
            element.addEventListener("scroll", checkScroll);
            return () => element.removeEventListener("scroll", checkScroll); // Cleanup listener on unmount
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-10 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <Skeleton className=" h-6 rounded-full" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="flex gap-4">Error loading categories</div>;
    }

    // Scroll handler
    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <div className="relative flex items-center">
            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    className="absolute left-0 z-10 bg-white dark:bg-slate-900 rounded-full shadow-lg"
                    onClick={scrollLeft}
                >
                    <FaAngleLeft className="m-2" />
                </button>
            )}

            {/* Category List */}
            <div
                className="flex gap-2 overflow-x-auto p-2 scroll-smooth scroll-hidden"
                ref={scrollRef}
            >
                <div
                    className={`whitespace-nowrap px-2 py-1 cursor-pointer rounded-full text-sm  ${
                        selected === ""
                            ? "bg-gray-200 dark:bg-slate-600"
                            : "bg-gray-100 dark:bg-slate-800"
                    }`}
                    onClick={() => onSelect("")}
                >
                    All
                </div>
                {data?.map((category) => (
                    <div
                        key={category.unique_id}
                        className={`whitespace-nowrap px-2 py-1 cursor-pointer rounded-full text-sm  ${
                            selected === category.unique_id
                                ? "bg-gray-200 dark:bg-slate-600"
                                : "bg-gray-100 dark:bg-slate-800"
                        }`}
                        onClick={() => onSelect(category.unique_id)}
                    >
                        {category.name}
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    className="absolute right-0 z-10 bg-white dark:bg-slate-900 rounded-full shadow-lg "
                    onClick={scrollRight}
                >
                    <FaAngleRight className="m-2" />
                </button>
            )}
        </div>
    );
}
