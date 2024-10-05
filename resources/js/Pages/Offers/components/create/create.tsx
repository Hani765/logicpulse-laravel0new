"use client";

import React, { useState, useEffect } from "react";
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
import { CountryType, DomainsType, NetworkType, UserType } from "@/types";
import OffersFormSkeleton from "@/components/skeletons/offersForm";

export default function Create() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        domains: [],
        users: [],
        networks: [],
        countries: [],
        categories: [],
    });
    const [fetching, setFetching] = useState(true);

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                fetch("/fetch/domains"),
                fetch("/fetch/all-users"),
                fetch("/fetch/networks"),
                fetch("/fetch/countriesData"),
                fetch("/fetch/categories"),
            ]);

            const [domains, users, networks, countries, categories] =
                await Promise.all(
                    responses.map((res) =>
                        res.ok ? res.json() : Promise.reject(res)
                    )
                );

            setData({ domains, users, networks, countries, categories });
            setFetching(false);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        }
    };

    return (
        <Drawer
            direction="top"
            dismissible={false}
            open={open}
            onOpenChange={setOpen}
        >
            <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm flex justify-between items-center p-2 rounded">
                <h3 className="font-semibold">Offers</h3>
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
                className="h-full rounded-none"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <div className="h-screen overflow-y-auto">
                    <DrawerHeader>
                        <div className="flex justify-between items-center">
                            <DrawerTitle>Create new offer</DrawerTitle>
                            <DrawerClose>
                                <MdClose />
                            </DrawerClose>
                        </div>
                        <DrawerDescription>
                            Fill out the form below to create a new offer.
                            Provide the necessary details including domain,
                            network, users, and target countries to ensure the
                            offer is configured correctly.
                        </DrawerDescription>
                    </DrawerHeader>
                    {fetching ? (
                        <OffersFormSkeleton />
                    ) : (
                        <CreateForm
                            domains={data.domains}
                            networks={data.networks}
                            users={data.users}
                            countries={data.countries}
                            categories={data.categories}
                            doneFunction={() => setOpen(false)}
                        />
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
