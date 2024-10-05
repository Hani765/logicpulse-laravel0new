"use client";

import React, { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import UpdateForm from "./UpdateForm";
import { CountryType, DomainsType, NetworkType, UserType } from "@/types";
import OffersFormSkeleton from "@/components/skeletons/offersForm";
import { MdClose } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

interface UpdateProps {
    unique_id: string;
}

export default function Update({ unique_id }: UpdateProps) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        offer: {},
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
                fetch(`/dashboard/offers/${unique_id}`),
                fetch("/fetch/domains"),
                fetch("/fetch/all-users"),
                fetch("/fetch/networks"),
                fetch("/fetch/countriesData"),
                fetch("/fetch/categories"),
            ]);

            const [offer, domains, users, networks, countries, categories] =
                await Promise.all(
                    responses.map((res) =>
                        res.ok ? res.json() : Promise.reject(res)
                    )
                );

            setData({ offer, domains, users, networks, countries, categories });
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
            <DrawerTrigger className="w-full" onClick={fetchData}>
                <p
                    className={`w-full flex gap-4 ${buttonVariants({
                        variant: "ghost",
                    })}`}
                >
                    Edit
                    <FaPencil size={11} />
                </p>
            </DrawerTrigger>
            <DrawerContent
                className="h-full rounded-none"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <div className="h-screen overflow-y-auto">
                    <DrawerHeader>
                        <div className="flex justify-between items-center">
                            <DrawerTitle>Update offer</DrawerTitle>
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
                        <UpdateForm
                            categories={data.categories}
                            domains={data.domains}
                            networks={data.networks}
                            users={data.users}
                            countries={data.countries}
                            offer={data.offer}
                            doneFunction={() => setOpen(false)}
                        />
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
