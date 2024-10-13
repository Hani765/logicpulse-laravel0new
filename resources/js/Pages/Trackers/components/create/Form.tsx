import { toast } from "sonner";
import { useForm, usePage } from "@inertiajs/react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
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
export default function Form() {
    const page = usePage<PageProps>();
    const userRole = page.props.auth.user.role;
    const { data, setData, processing, post, reset, errors } = useForm({
        name: "",
        param: "",
        value: "",
        visiblity: "private",
    });
    const createTracker = async (event: React.FormEvent) => {
        event.preventDefault();
        post("/dashboard/trackers", {
            onSuccess: () => {
                toast.success("Tracker has been created!");
                reset();
            },
            onError: () => {
                toast.error("Something went wrong! Please try again later!");
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
                                {["private", "public"].map((visibleOption) => (
                                    <SelectItem
                                        key={visibleOption}
                                        value={visibleOption}
                                    >
                                        {visibleOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
            <SubmitBtn
                processing={processing}
                label="Create new"
                className="w-full"
            />
        </form>
    );
}
