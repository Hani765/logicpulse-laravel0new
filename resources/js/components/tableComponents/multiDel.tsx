"use client";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaTimes } from "react-icons/fa";

interface MultiProps {
    selectedRows: any;
    endPoint: string;
}

const MultiDel: React.FC<MultiProps> = ({ selectedRows, endPoint }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Effect to update selectedRowsUniqueIds when selectedRows changes
    const [selectedRowsUniqueIds, setSelectedRowsUniqueIds] = useState<
        string[]
    >([]);

    // Update selectedRowsUniqueIds when selectedRows changes
    useEffect(() => {
        const uniqueIds = Object.keys(selectedRows).map((rowKey) => {
            return selectedRows[rowKey].original.unique_id;
        });
        setSelectedRowsUniqueIds(uniqueIds);
    }, [selectedRows]);

    return (
        <>
            {/* Fixed button with selected rows count and delete button */}
            <div className="fixed bottom-10 right-[50%] flex translate-x-1/2 transform items-center gap-4 rounded-full bg-primary px-2 py-1 text-white shadow-lg transition-all duration-300 ease-in-out">
                <p>{Object.keys(selectedRows).length} Rows Selected</p>
                <FaTrashAlt
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                />
            </div>

            <Credenza open={open} onOpenChange={setOpen}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle className="font-semibold">
                            Confirm Deletion
                        </CredenzaTitle>
                        <CredenzaDescription>
                            Are you sure you want to delete these rows? This
                            action can not be undone.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <div className="flex w-full flex-col gap-2">
                        <Button variant="destructive" disabled={loading}>
                            {loading ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting
                                </>
                            ) : (
                                "Confirm Delete"
                            )}
                        </Button>
                        <Button onClick={() => setOpen(false)} variant="ghost">
                            Cancel
                        </Button>
                    </div>
                </CredenzaContent>
            </Credenza>
        </>
    );
};

export default MultiDel;
