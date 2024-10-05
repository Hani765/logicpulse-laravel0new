import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import InputError from "@/components/InputError";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { NetworkType } from "@/types";
import SearchSelect from "@/components/ui/search-select";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function NetworForm({
    trackers,
    rowCurrent,
}: {
    trackers: any;
    rowCurrent: NetworkType;
}) {
    const { data, setData, processing, put, reset, errors } = useForm({
        name: rowCurrent.name,
        tracker_id: rowCurrent.tracker_id,
        status: rowCurrent.status,
    });
    const createNetwork = async (event: React.FormEvent) => {
        event.preventDefault();
        put(`/dashboard/networks/${rowCurrent.unique_id}`, {
            onSuccess: () => {
                toast.success("Network has been updated!");
                reset();
            },
            onError: (errors) => {
                toast.error(errors.name);
            },
        });
    };
    return (
        <form onSubmit={createNetwork} className="w-full p-2 sm:p-0">
            <div className="w-full space-y-2">
                <div className="w-full space-y-2">
                    <LabelInputContainer
                        required
                        type="text"
                        id="network"
                        helperText="CPA MATICA"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                        autoFocus
                        errorMessage={errors.name}
                        label="Network Name"
                        description="Enter the name of the network you wish to add. This should be a unique and easily identifiable name for your reference."
                    />
                    <div>
                        <SearchSelect
                            items={trackers}
                            selected_value={data.tracker_id}
                            onSelect={(unique_id: string) =>
                                setData({ ...data, tracker_id: unique_id })
                            }
                            label="Select Tracker"
                            errorMessage={errors.tracker_id}
                            description="Choose a tracker from the list to associate with this network."
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end items-center">
                    <div className="w-34">
                        <Select
                            value={data.status}
                            onValueChange={(status) =>
                                setData({ ...data, status })
                            }
                        >
                            <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {["active", "inactive"].map((statusOption) => (
                                    <SelectItem
                                        key={statusOption}
                                        value={statusOption}
                                    >
                                        {statusOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>
                    <SubmitBtn
                        processing={processing}
                        label="Create new Network"
                    />
                </div>
            </div>
        </form>
    );
}
