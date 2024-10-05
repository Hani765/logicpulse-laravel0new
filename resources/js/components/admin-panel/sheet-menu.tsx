import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { MdLensBlur } from "react-icons/md";
import { Link } from "@inertiajs/react";

export function SheetMenu({ role }: { role: string | undefined }) {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button
                    className="h-8 bg-background dark:bg-slate-950"
                    variant="outline"
                    size="icon"
                >
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent
                className="flex h-full flex-col bg-background px-3 dark:bg-slate-900 sm:w-72"
                side="left"
            >
                <SheetHeader>
                    <SheetTitle>
                        <Button
                            className="flex items-center justify-center pb-2 pt-1"
                            variant="link"
                            asChild
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <MdLensBlur className="mr-1 h-6 w-6" />
                                <h1 className="text-lg font-bold">
                                    LogicPulse
                                </h1>
                            </Link>
                        </Button>
                    </SheetTitle>
                    <SheetDescription>
                        Welcome to LogicPulse! Navigate through our resources to
                        optimize your campaigns.
                    </SheetDescription>
                </SheetHeader>
                <Menu isOpen role={role} />
            </SheetContent>
        </Sheet>
    );
}
