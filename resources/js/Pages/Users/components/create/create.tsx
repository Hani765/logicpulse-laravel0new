"use client";

import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import CreateForm from "./createForm";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { MdClose } from "react-icons/md";
import { UserCreateUpdateSkeleton } from "@/components/skeletons/userCreateUpdateSkeleton";

interface CreateProps {
    role: string;
}

export default function Create({ role }: CreateProps) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        domains: [],
        offers: [],
    });
    const [fetching, setFetching] = useState(true);

    const fetchData = async () => {
        setOpen(true);
        try {
            const responses = await Promise.all([
                fetch("/fetch/domains"),
                fetch("/fetch/offers"),
            ]);

            const [domains, offers] = await Promise.all(
                responses.map((res) =>
                    res.ok ? res.json() : Promise.reject(res)
                )
            );

            setData({ domains, offers });
            setFetching(false);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        }
    };

    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
            direction="top"
            dismissible={false}
        >
            <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm flex justify-between items-center p-2 rounded">
                <h3 className="font-semibold">Users</h3>
                <DrawerTrigger>
                    <p
                        onClick={fetchData}
                        className={`${buttonVariants({
                            variant: "gooeyRight",
                        })}`}
                    >
                        Create New
                    </p>
                </DrawerTrigger>
            </div>
            <DrawerContent
                className="h-full rounded-none z-50 overflow-visible"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <div className="h-screen overflow-y-auto p-4">
                    <DrawerHeader>
                        <div className="flex justify-between items-center">
                            <DrawerTitle>Create new user</DrawerTitle>
                            <DrawerClose>
                                <MdClose />
                            </DrawerClose>
                        </div>
                        <DrawerDescription>
                            Fill out the form below to add a new user. Please
                            provide the necessary details including domain and
                            offer information to ensure the user is set up
                            correctly. Once all the fields are completed, click
                            the submit button to create the user.
                        </DrawerDescription>
                    </DrawerHeader>
                    {fetching ? (
                        <UserCreateUpdateSkeleton />
                    ) : (
                        <>
                            <CreateForm
                                domains={data.domains}
                                offers={data.offers}
                                doneFunction={() => setOpen(false)}
                                role={role}
                            />
                        </>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
