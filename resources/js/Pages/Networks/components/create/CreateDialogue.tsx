import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import Form from "./Form";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Create() {
    const [fetching, setFetching] = useState(true);
    const [trackers, setTrackers] = useState([]);
    const fetchTrackers = async () => {
        try {
            const res = await fetch("/fetch/trackers");
            if (!res.ok) {
                toast.error("Failed to fetch data. Please try again later.");
            }

            const data = await res.json();
            setTrackers(data);
            setFetching(false);
        } catch (error) {
            toast.error("Error fetching Trackers. Please try later!");
        }
    };
    return (
        <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm flex justify-between items-center p-2 rounded">
            <h3 className="font-semibold">Networks</h3>
            <Credenza>
                <CredenzaTrigger asChild>
                    <Button variant="gooeyRight" onClick={fetchTrackers}>
                        Create new
                    </Button>
                </CredenzaTrigger>
                <CredenzaContent
                    onInteractOutside={(e: any) => e.preventDefault()}
                >
                    <CredenzaHeader>
                        <CredenzaTitle>Add Network</CredenzaTitle>
                        <CredenzaDescription>
                            Use this form to add a new network to your tracker
                            system. Provide the necessary details to ensure
                            accurate and effective tracking of your affiliate
                            marketing campaigns.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    {fetching ? (
                        <CreateNetworkSkeleton />
                    ) : (
                        <Form trackers={trackers} />
                    )}
                </CredenzaContent>
            </Credenza>
        </div>
    );
}

export function CreateNetworkSkeleton() {
    return (
        <div className="space-y-4 p-2 sm:p-0">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <div className="flex justify-end space-x-2">
                <Skeleton className="w-24 h-10" />
            </div>
        </div>
    );
}