import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
    isOpen: boolean | undefined;
    setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
    return (
        <div className="invisible absolute -right-[20px] top-[20px] z-20 lg:visible">
            <div className="bg-gray-50 dark:bg-slate-950 rounded-full h-8 w-8 flex items-center justify-center">
                <Button
                    onClick={() => setIsOpen?.()}
                    className="h-5 w-5 rounded-full"
                    size="icon"
                >
                    <ChevronLeft
                        className={cn(
                            "h-4 w-4 transition-transform duration-700 ease-in-out font-bold",
                            isOpen === false ? "rotate-180" : "rotate-0",
                        )}
                    />
                </Button>
            </div>
        </div>
    );
}
