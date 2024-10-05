"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MdCamera } from "react-icons/md";
import { Link } from "@inertiajs/react";
export default function ChangeProfile({
    token,
}: {
    token: string | undefined;
}) {
    const [profileOpen, setProfileOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState({
        profile_image: [],
    });
    const [loading, setLoading] = useState(false);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };
    return (
        <>
            <button
                className="flex items-center w-full px-2 py-1 hover:bg-accent rounded"
                onClick={() => setProfileOpen(true)}
            >
                <MdCamera className=" w-4 h-4 mr-3 text-muted-foreground" />
                Profile pic
            </button>
            <Credenza open={profileOpen} onOpenChange={setProfileOpen}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>Change profile</CredenzaTitle>
                    </CredenzaHeader>
                    <form>
                        <div className="mb-2">
                            <Label htmlFor="profile">Profile Image</Label>
                            <Input
                                type="file"
                                onChange={handleImageChange}
                                className="file:text-white"
                                accept="image/png,image/svg,image/jpeg,image/webp"
                            />
                            <span className="text-red-400">
                                {errors.profile_image?.[0]}
                            </span>
                        </div>
                        <div className="mb-2 flex gap-4 flex-col">
                            <Button
                                className="w-full"
                                disabled={loading}
                                variant="gooeyRight"
                            >
                                {loading ? "Processing.." : "Update Profile"}
                            </Button>
                            <CredenzaClose className="w-full">
                                Cancel
                            </CredenzaClose>
                        </div>
                    </form>
                </CredenzaContent>
            </Credenza>
        </>
    );
}
