"use client";
import React, { FormEventHandler } from "react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/components/InputError";
import { toast } from "sonner";
import { Link } from "lucide-react";
import SubmitBtn from "@/components/ui/SubmitBtn";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PageProps } from "@/types";

export default function Form({ status }: { status?: string }) {
    const page = usePage<PageProps>();
    const userRole = page.props.auth.user.role;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        visiblity: "private",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/dashboard/domains", {
            onSuccess: () => {
                toast.success("Domain has been created!");
                reset();
            },
            onError: (errors) => {
                toast.error(errors.name);
            },
        });
    };

    return (
        <form className="w-full p-2 sm:p-0" onSubmit={submit}>
            <div className="w-full flex flex-col gap-2 items-end mb-2">
                <div className="w-full">
                    <LabelInputContainer
                        label="Domain"
                        description="Please enter a valid URL for the domain."
                        type="url"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        id="large-url"
                        helperText="https://www.example.com"
                        errorMessage={errors.name}
                        Icon={Link}
                    />
                    {userRole === "administrator" && (
                        <div className="">
                            <Label>Visible</Label>
                            <Select
                                value={data.visiblity}
                                onValueChange={(visiblity) =>
                                    setData({ ...data, visiblity })
                                }
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {["private", "public"].map(
                                        (visibleOption) => (
                                            <SelectItem
                                                key={visibleOption}
                                                value={visibleOption}
                                            >
                                                {visibleOption}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
                <SubmitBtn
                    processing={processing}
                    label="Create new domain"
                    className="w-full"
                />
            </div>
        </form>
    );
}
