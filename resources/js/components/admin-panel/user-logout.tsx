"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { LogOut } from "lucide-react";
import { Link } from "@inertiajs/react";
export default function UserLogout({ token }: { token: string | undefined }) {
    const [logoutOpen, setLogOutOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    return (
        <>
            <button
                className="flex items-center w-full px-2 py-1 hover:bg-accent rounded cursor-pointer"
                onClick={() => setLogOutOpen(true)}
            >
                <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                Logout
            </button>
            <Credenza open={logoutOpen} onOpenChange={setLogOutOpen}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>Are you absolutely sure?</CredenzaTitle>
                        <CredenzaDescription>
                            {" "}
                            This action expire your session and you have to
                            login back to access your dashboard.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <div className="mb-2 flex gap-4 flex-col">
                        <Link
                            method="post"
                            href={route("logout")}
                            className={`w-full ${buttonVariants({
                                variant: "destructive",
                            })}`}
                        >
                            Yes Logout
                        </Link>
                        <CredenzaClose className="w-full">Cancel</CredenzaClose>
                    </div>
                </CredenzaContent>
            </Credenza>
        </>
    );
}
