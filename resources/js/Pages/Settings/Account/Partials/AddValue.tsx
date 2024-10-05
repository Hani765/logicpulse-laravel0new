import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function AddValue({ error }: { error?: string }) {
    const { data, setData, processing, post, reset, errors } = useForm({
        key: "",
        value: "",
        description: "",
        status: "",
    });
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        post("/settings/account", {
            onSuccess: () => {
                toast.success("New value has been adedd!");
                reset();
            },
        });
    };
    return (
        <div className="text-gray-600 dark:text-gray-200 text-sm my-2">
            <Credenza>
                <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm flex justify-between items-center p-2 rounded">
                    <h3 className="font-semibold">Accounts</h3>
                    <DrawerTrigger>
                        <Button variant="gooeyRight">Add value</Button>
                    </DrawerTrigger>
                </div>
                <CredenzaContent
                    onInteractOutside={(e: any) => e.preventDefault()}
                >
                    <CredenzaHeader>
                        <CredenzaTitle>Add new value</CredenzaTitle>
                        <CredenzaDescription>
                            Add new value and use it in anywhere in website.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <form onSubmit={submit}>
                        <div className="space-y-4 p-2 sm:p-0">
                            <LabelInputContainer
                                type="text"
                                helperText="title"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        key: e.target.value,
                                    })
                                }
                                value={data.key}
                                label="Key"
                                errorMessage={errors.key}
                            />
                            <LabelInputContainer
                                label="value"
                                type="text"
                                helperText="api_key"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        value: e.target.value,
                                    })
                                }
                                value={data.value}
                                errorMessage={errors.value}
                            />

                            <div>
                                <Label>Description:</Label>
                                <Textarea
                                    placeholder="something about value that you're adding."
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        })
                                    }
                                    value={data.description}
                                />
                                <InputError message={errors.description} />
                            </div>
                            <InputError message={error} />
                            <div className="w-full items-center justify-end flex gap-2">
                                <div className="w-full lg:max-w-36">
                                    <Select
                                        required
                                        value={data.status}
                                        onValueChange={(status) =>
                                            setData({ ...data, status })
                                        }
                                    >
                                        <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                "active",
                                                "inactive",
                                                "paused",
                                            ].map((statusOption) => (
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
                                    label="Submit"
                                    processing={processing}
                                />
                            </div>
                        </div>
                    </form>
                </CredenzaContent>
            </Credenza>
        </div>
    );
}
