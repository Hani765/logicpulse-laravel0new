"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaDescription,
} from "@/components/ui/credenza";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import Update from "./update/update";
import { FaTrashAlt } from "react-icons/fa";

interface DropdownProps {
    rowCurrent: any;
    role: string;
}

export default function Dropdown({ rowCurrent, role }: DropdownProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const unique_id = rowCurrent.unique_id;
    const { processing, delete: destroy } = useForm();
    const deleteRow = (uniqueId: string) => {
        destroy(`offers/${uniqueId}`, {
            onSuccess: () => {
                toast.success("Offer deleted successfully");
            },
            onError: () => {
                toast.error("Failed to delete Tracker.");
            },
        });
    };

    return (
        <>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Update unique_id={unique_id} />
                        {role === "admin" || role === "administrator" ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="py-1 w-full m-0 flex gap-4 text-red-600 hover:text-red-500"
                                onClick={() => setDeleteOpen(true)}
                            >
                                Delete
                                <FaTrashAlt size={11} />
                            </Button>
                        ) : null}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Credenza open={deleteOpen} onOpenChange={setDeleteOpen}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>
                            Are you sure you want to delete?
                        </CredenzaTitle>
                        <CredenzaDescription>
                            This action cannot be undone. You are about to
                            delete ({rowCurrent.name})
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <div className="flex justify-between flex-col gap-2 p-2">
                        <Button
                            className="w-full"
                            variant="destructive"
                            disabled={processing}
                            onClick={() => deleteRow(unique_id)}
                        >
                            {processing ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting
                                </>
                            ) : (
                                "Yes Delete"
                            )}
                        </Button>
                        <CredenzaClose className="w-full">Cancel</CredenzaClose>
                    </div>
                </CredenzaContent>
            </Credenza>
        </>
    );
}
