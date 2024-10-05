import { useState } from "react";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import NetworForm from "./NetworkForm";
import { FaPencil } from "react-icons/fa6";

export default function EditNetwork({ rowCurrent }: { rowCurrent: any }) {
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
            toast.error("Error fetching domain. Please try later!");
        }
    };
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <p
                    onClick={fetchTrackers}
                    className="w-full flex gap-4 items-center hover:bg-slate-50 justify-center py-1.5 rounded-md "
                >
                    Edit
                    <FaPencil size={11} />
                </p>
            </CredenzaTrigger>
            <CredenzaContent onInteractOutside={(e: any) => e.preventDefault()}>
                <CredenzaHeader>
                    <CredenzaTitle>Update Network</CredenzaTitle>
                    <CredenzaDescription>
                        Modify the details of your existing network. Ensure that
                        all information is accurate to maintain effective
                        tracking and performance monitoring.
                    </CredenzaDescription>
                </CredenzaHeader>
                {fetching ? (
                    <CreateNetworkSkeleton />
                ) : (
                    <>
                        <NetworForm
                            trackers={trackers}
                            rowCurrent={rowCurrent}
                        />
                    </>
                )}
            </CredenzaContent>
        </Credenza>
    );
}

export function CreateNetworkSkeleton() {
    return (
        <div className="space-y-4 p-2 sm:p-0">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <div className="flex justify-end space-x-2">
                <Skeleton className="w-24 h-10" />
                <Skeleton className="w-24 h-10" />
            </div>
        </div>
    );
}
