"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface DropdownProps {
    rowCurrent: any;
}

export default function Dropdown({ rowCurrent }: DropdownProps) {
    const unique_id = rowCurrent.unique_id;
    const [deleteOpen, setDeleteOpen] = useState(false);
    const { processing, delete: destroy } = useForm();
    const deleteRow = (uniqueId: string) => {
        destroy(`users/${uniqueId}`, {
            onSuccess: () => {
                toast.success("User deleted successfully");
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
                        <DropdownMenuItem>
                            <a
                                href={`users/${unique_id}/edit`}
                                className="flex gap-4 items-center justify-center w-full py-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Edit
                                <FaPencil size={11} />
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="py-1 w-full m-0 flex gap-4 text-red-600 hover:text-red-500"
                            onClick={() => setDeleteOpen(true)}
                        >
                            Delete
                            <FaTrashAlt size={11} />
                        </Button>
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
                            delete ({rowCurrent.username})
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
