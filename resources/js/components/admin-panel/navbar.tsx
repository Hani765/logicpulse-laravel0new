import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Search } from "lucide-react";
import { LabelInputContainer } from "../ui/LabelInputContainer";
import { User } from "@/types";
import { MdMessage } from "react-icons/md";
import NotificationsModel from "./NotificationsModel";
import { useEffect, useRef } from "react";

export default function Navbar({ user }: { user: User }) {
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "/") {
                event.preventDefault(); // Prevent the default action of "Ctrl + /"
                searchInputRef.current?.focus(); // Focus the search input
            }
        };

        // Attach the event listener for keydown events
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header className="w-full">
            <div className="flex h-14 items-center justify-between w-full px-4">
                <div className="flex items-center space-x-4 lg:space-x-0 w-full">
                    <SheetMenu role={user.role} />
                    <h1 className="font-bold"></h1>
                    <div className="relative ml-auto md:grow-0 hidden sm:block ">
                        <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <LabelInputContainer
                            type="search"
                            helperText="Search (Ctrl+/)"
                            inputClassName="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            inputRef={searchInputRef} // Attach the ref to the search input
                        />
                    </div>
                </div>
                <div className="flex gap-4 justify-end items-center w-full">
                    <MdMessage />
                    <NotificationsModel user={user} />
                    <UserNav
                        token="2313123wweqewqwe"
                        profile_image={user.profile_image}
                        username={user.username}
                        email={user.email}
                    />
                </div>
            </div>
        </header>
    );
}
