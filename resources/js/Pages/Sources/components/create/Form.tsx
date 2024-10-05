import { toast } from "sonner";
import { useForm } from "@inertiajs/react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function Form() {
    const { data, setData, processing, post, reset, errors } = useForm({
        name: "",
        value: "",
    });
    const createTracker = async (event: React.FormEvent) => {
        event.preventDefault();
        post("/dashboard/sources", {
            onSuccess: () => {
                toast.success("Source has been created!");
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
                    helperText="eg: Google"
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    errorMessage={errors.name}
                    description="Enter a unique name for your Source. This name will help you identify the source later."
                />
                <LabelInputContainer
                    type="text"
                    id="tracker-value"
                    helperText="e.g: google"
                    label="Value"
                    value={data.value}
                    onChange={(e) =>
                        setData({ ...data, value: e.target.value })
                    }
                    errorMessage={errors.value}
                    description="Provide the value for the source parameter. Use placeholders like {google} to dynamically track different values."
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
