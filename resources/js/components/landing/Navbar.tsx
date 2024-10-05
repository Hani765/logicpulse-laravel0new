import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button, buttonVariants } from "../ui/button";
import { Menu } from "lucide-react";
import { Link } from "@inertiajs/react";
interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "#home",
        label: "Home",
    },
    {
        href: "#partners",
        label: "Partners",
    },
    {
        href: "#about",
        label: "About",
    },
    {
        href: "#howItWorks",
        label: "Discover",
    },
    {
        href: "#team",
        label: "Team",
    },
    {
        href: "#faq",
        label: "FAQ",
    },
];

export const Navbar = ({ user }: { user: any }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
                    <NavigationMenuItem className="font-bold flex">
                        <Link
                            rel="noreferrer noopener"
                            href="/"
                            className="ml-2 font-bold flex items-center justify-center"
                        >
                            <img
                                height={40}
                                width={40}
                                src="/assets/flogicpulse256.png"
                                alt="logo"
                                className=" rounded-full mx-2"
                            />
                            <h2 className="text-lg whitespace-nowrap md:text-md lg:text-xl">
                                L o G i c P u l s e™
                            </h2>
                        </Link>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <span className="flex md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger className="px-2">
                                <Menu
                                    className="flex md:hidden h-5 w-5"
                                    onClick={() => setIsOpen(true)}
                                ></Menu>
                            </SheetTrigger>

                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle className="font-bold text-xl">
                                        L o G i c P u l s e™
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                                    {routeList.map(
                                        ({ href, label }: RouteProps) => (
                                            <a
                                                rel="noreferrer noopener"
                                                key={label}
                                                href={href}
                                                onClick={() => setIsOpen(false)}
                                                className={buttonVariants({
                                                    variant: "ghost",
                                                })}
                                            >
                                                {label}
                                            </a>
                                        )
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </span>

                    {/* desktop */}
                    <nav className="hidden md:flex gap-2">
                        {routeList.map((route: RouteProps, i) => (
                            <a
                                rel="noreferrer noopener"
                                href={route.href}
                                key={i}
                                className={`text-[17px] ${buttonVariants({
                                    variant: "ghost",
                                })}`}
                            >
                                {route.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex gap-2">
                        {!user ? (
                            <>
                                <Link
                                    href={route("login")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${buttonVariants({
                                        variant: "default",
                                    })}`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${buttonVariants({
                                        variant: "default",
                                    })}`}
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <Link
                                href={route("dashboard")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${buttonVariants({
                                    variant: "default",
                                })}`}
                            >
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};
