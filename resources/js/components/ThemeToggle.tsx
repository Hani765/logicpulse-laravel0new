"use client";
import * as React from "react";
import { useEffect } from "react";
import { SunIcon, LaptopIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaPalette } from "react-icons/fa6";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import theme from "tailwindcss/defaultTheme";

const colors = [
    { id: 1, name: "default", value: "default" },
    { id: 2, name: "Red", value: "red" },
    { id: 3, name: "Rose", value: "rose" },
    { id: 4, name: "Orange", value: "orange" },
    { id: 5, name: "Green", value: "green" },
    { id: 6, name: "Blue", value: "blue" },
    { id: 7, name: "Yellow", value: "yellow" },
    { id: 8, name: "Violet", value: "violet" },
    { id: 9, name: "Purple", value: "purple" },
    { id: 10, name: "Pink", value: "pink" },
    { id: 11, name: "Pink", value: "pink" },
];

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const storedColor = localStorage.getItem("theme-color");
        if (storedColor) {
            document.body.classList.add(`theme-${storedColor}`);
        }
    }, []);

    const handleColorClick = (color: string) => {
        document.body.classList.forEach((cls) => {
            if (cls.startsWith("theme-")) {
                document.body.classList.remove(cls);
            }
        });
        document.body.classList.add(`theme-${color}`);
        localStorage.setItem("theme-color", color);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <FaPalette
                            size={30}
                            className="bg-transparent text-primary"
                        />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="h-[125px] w-[125px] rounded-full border bg-transparent p-0 shadow-lg"
                >
                    <Card className="relative flex h-full w-full items-center justify-center rounded-full p-0">
                        <CardContent className="m-0 flex items-center justify-center p-0">
                            <div className="text-center">
                                <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border">
                                    {theme === "dark" ? (
                                        <SunIcon
                                            className="size-4"
                                            onClick={() => setTheme("light")}
                                        />
                                    ) : (
                                        <MoonIcon
                                            className="size-4"
                                            onClick={() => setTheme("dark")}
                                        />
                                    )}
                                </div>
                            </div>
                            {colors.map((color) => (
                                <div
                                    key={color.id}
                                    className={`absolute theme-${color.value} h-5 w-5 cursor-pointer rounded-full bg-primary`}
                                    onClick={() =>
                                        handleColorClick(color.value)
                                    }
                                    style={{
                                        top: `${
                                            Math.sin(
                                                ((color.id - 1) *
                                                    (2 * Math.PI)) /
                                                    colors.length
                                            ) *
                                                47 +
                                            50
                                        }px`,
                                        left: `${
                                            Math.cos(
                                                ((color.id - 1) *
                                                    (2 * Math.PI)) /
                                                    colors.length
                                            ) *
                                                47 +
                                            50
                                        }px`,
                                    }}
                                ></div>
                            ))}
                        </CardContent>
                    </Card>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
