"use client";
import React, { FormEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { useForm } from "@inertiajs/react";
import InputError from "@/components/InputError";
import { toast } from "sonner";
import { Link } from "lucide-react";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function Form({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
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
