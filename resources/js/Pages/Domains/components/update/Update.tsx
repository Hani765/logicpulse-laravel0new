import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { toast } from "sonner";
import { DomainForm } from "./DomainForm";
import { Skeleton } from "@/components/ui/skeleton";
export function EditDomain({ rowCurrent }: { rowCurrent?: any }) {
    const [domainData, setDomainData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [fetching, setFetching] = useState(true);
    const getDomain = async (id: number) => {
        try {
            const response = await fetch(`/dashboard/domains/${id}`);
            if (response.ok) {
                const data = await response.json();
                setDomainData(data);
                if (response.ok) {
                    const userResponse = await fetch(`/fetch/users`);
                    const userData = await userResponse.json();
                    setUserData(userData);
                    setFetching(false);
                }
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            toast.error("Error fetching domain. Please try later!");
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger className="w-full">
                <p
                    onClick={() => getDomain(rowCurrent.unique_id)}
                    className="w-full flex gap-4 items-center hover:bg-slate-50 justify-center py-1.5 rounded-md "
                >
                    Edit
                    <FaPencil size={11} />
                </p>
            </CredenzaTrigger>
            <CredenzaContent onInteractOutside={(e: any) => e.preventDefault()}>
                <CredenzaHeader>
                    <CredenzaTitle>Edit Domain</CredenzaTitle>
                    <CredenzaDescription>
                        <span className="text-primary mr-1">
                            {rowCurrent.id}: {rowCurrent.name}{" "}
                        </span>
                        <br />
                        Update your domain access and values from here, The
                        changes you made could not be able to undo!
                    </CredenzaDescription>
                </CredenzaHeader>
                {fetching ? (
                    <UpdateDomainSkeleton />
                ) : (
                    <>
                        <DomainForm
                            domainData={domainData}
                            userData={userData}
                        />
                    </>
                )}
            </CredenzaContent>
        </Credenza>
    );
}

export function UpdateDomainSkeleton() {
    return (
        <div className="space-y-4 p-2 sm:p-0">
            <div className="space-y-2">
                <Skeleton className="w-[20%] h-3" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-[60%] h-3" />
                <div className="flex justify-between">
                    <Skeleton className="w-[20%] h-3" />
                    <Skeleton className="w-4 h-4 rounded-sm" />
                </div>
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-[60%] h-3" />
            </div>
            <div className="flex justify-end space-x-2">
                <Skeleton className="w-24 h-10" />
                <Skeleton className="w-24 h-10" />
            </div>
        </div>
    );
}
