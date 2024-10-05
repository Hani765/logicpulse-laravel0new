import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "@inertiajs/react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import InputError from "@/components/InputError";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SubmitBtn from "@/components/ui/SubmitBtn";

export function TrackerForm({ rowCurrent }: { rowCurrent: any }) {
    const { data, setData, processing, put, errors } = useForm({
        name: rowCurrent.name,
        param: rowCurrent.param,
        value: rowCurrent.value,
        status: rowCurrent.status,
    });

    const createTracker = async (event: React.FormEvent) => {
        event.preventDefault();
        put(`/dashboard/trackers/${rowCurrent.unique_id}`, {
            onSuccess: () => {
                toast.success("Tracker has been updated!");
            },
            onError: (errors) => {
                toast.error(errors.name);
            },
        });
    };

    return (
        <form className="space-y-2 p-4 sm:p-0" onSubmit={createTracker}>
            <div className="w-full space-y-2">
                <LabelInputContainer
                    type="text"
                    autoFocus
                    id="tracker-name"
                    helperText="Tracker name"
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    errorMessage={errors.name}
                    description="Enter a unique name for your tracker. This name will help you identify the tracker later."
                />
                <LabelInputContainer
                    type="text"
                    id="tracker-param"
                    helperText="e.g., sub2"
                    label="Param"
                    value={data.param}
                    onChange={(e) =>
                        setData({ ...data, param: e.target.value })
                    }
                    errorMessage={errors.param}
                    description="Specify the parameter for your tracker. This typically represents a sub-parameter for tracking purposes."
                />
                <LabelInputContainer
                    type="text"
                    id="tracker-value"
                    helperText="e.g., {sub2}"
                    label="Value"
                    value={data.value}
                    onChange={(e) =>
                        setData({ ...data, value: e.target.value })
                    }
                    errorMessage={errors.value}
                    description="Provide the value for the tracker parameter. Use placeholders like {sub2} to dynamically track different values."
                />
            </div>
            <div className="flex gap-2 justify-end items-center">
                <div className="w-34">
                    <Select
                        value={data.status}
                        onValueChange={(status) => setData({ ...data, status })}
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
                <SubmitBtn processing={processing} label="Update Tracker" />
            </div>
        </form>
    );
}
