import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useForm } from "@inertiajs/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaMarsDouble } from "react-icons/fa6";
import { PopoverClose } from "@radix-ui/react-popover";
import { FaTimes } from "react-icons/fa";
import { Textarea } from "../ui/textarea";
import SubmitBtn from "../ui/SubmitBtn";

export default function UpdatePropover({
    value,
    label,
    id,
}: {
    value: string;
    label: string;
    id: string;
}) {
    const { data, setData, processing, errors, post } = useForm({
        value: value,
    });
    return (
        <>
            <Popover>
                <PopoverTrigger>{value}</PopoverTrigger>
                <PopoverContent side="top">
                    <form className="space-y-4">
                        <Textarea
                            value={data.value}
                            onChange={(e) => setData({ value: e.target.value })}
                            placeholder="eg: api_key"
                        />
                        <div className="flex gap-2 items-center ">
                            <PopoverClose className="w-full">
                                Cancel
                            </PopoverClose>
                            <SubmitBtn
                                label="Save"
                                processing={processing}
                                className="w-full"
                            />
                        </div>
                    </form>
                </PopoverContent>
            </Popover>
        </>
    );
}
