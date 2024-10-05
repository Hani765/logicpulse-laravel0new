"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import UpdateForm from "./UpdateForm";
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
import { DomainsType, OfferType, UserType } from "@/types";
import { UserCreateUpdateSkeleton } from "@/components/skeletons/userCreateUpdateSkeleton";
import { FaPencil } from "react-icons/fa6";

interface CreateProps {
    role: string;
    unique_id: string;
}
export default function Update({ role, unique_id }: CreateProps) {
    const [open, setOpen] = useState(false);
    const [dataDomain, setDataDomain] = useState<DomainsType[]>([]);
    const [dataOffers, setDataOffers] = useState<OfferType[]>([]);
    const [dataUser, setDatauser] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setOpen(true);
        const responseUsers = await fetch(`users/${unique_id}`);
        if (responseUsers.ok) {
            const userData = await responseUsers.json();
            setDatauser(userData);
            const responseOffers = await fetch("/fetch/offers");
            if (responseOffers.ok) {
                const offersData = await responseOffers.json();
                setDataOffers(offersData);
                const responseDomains = await fetch("/fetch/domains");
                if (responseDomains.ok) {
                    const domainData = await responseDomains.json();
                    setDataDomain(domainData);
                    setLoading(false);
                }
            }
        } else {
            toast.error("Failed to fetch Data. Please try again later.");
        }
    };

    return (
        <>
            <Drawer
                open={open}
                onOpenChange={setOpen}
                direction="top"
                dismissible={false}
            >
                <DrawerTrigger className="w-full">
                    <p
                        className={`w-full flex gap-4 ${buttonVariants({
                            variant: "ghost",
                        })}`}
                        onClick={fetchData}
                    >
                        Edit
                        <FaPencil size={11} />
                    </p>
                </DrawerTrigger>
                <DrawerContent
                    className="h-full rounded-none z-50 overflow-visible"
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <div className="h-screen overflow-y-auto p-4">
                        <DrawerHeader>
                            <div className="flex justify-between items-center">
                                <DrawerTitle>Update user</DrawerTitle>
                                <DrawerClose>
                                    <MdClose />
                                </DrawerClose>
                            </div>
                            <DrawerDescription>
                                Fill out the form below to add a new user.
                                Please provide the necessary details including
                                domain and offer information to ensure the user
                                is set up correctly. Once all the fields are
                                completed, click the submit button to create the
                                user.
                            </DrawerDescription>
                        </DrawerHeader>
                        {loading ? (
                            <UserCreateUpdateSkeleton />
                        ) : (
                            <UpdateForm
                                user={dataUser}
                                domains={dataDomain}
                                offers={dataOffers}
                                doneFunction={() => setOpen(false)}
                                role={role}
                            />
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
