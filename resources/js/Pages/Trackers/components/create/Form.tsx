import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "@inertiajs/react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function Form() {
    const { data, setData, processing, post, reset, errors } = useForm({
        name: "",
        param: "",
        value: "",
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
            </div>
            <SubmitBtn
                processing={processing}
                label="Create new"
                className="w-full"
            />
        </form>
    );
}
