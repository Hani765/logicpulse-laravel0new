import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
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
import { FaPencil } from "react-icons/fa6";
import { toast } from "sonner";
export default function UpdateValue({
    error,
    rowCurrent,
}: {
    error?: string;
    rowCurrent: any;
}) {
    const { data, setData, processing, put, reset, errors } = useForm({
        key: rowCurrent.key,
        value: rowCurrent.value,
        description: rowCurrent.description,
        status: rowCurrent.status,
    });
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        put(`/settings/account/${rowCurrent.id}`, {
            onSuccess: () => {
                toast.success("Value has been updated!");
                reset();
            },
        });
    };
    return (
        <Credenza>
            <CredenzaTrigger className="w-full">
                <Button variant="ghost" className="w-full flex gap-4">
                    Edit
                    <FaPencil size={11} />
                </Button>
            </CredenzaTrigger>
            <CredenzaContent onInteractOutside={(e: any) => e.preventDefault()}>
                <CredenzaHeader>
                    <CredenzaTitle>Add new value</CredenzaTitle>
                    <CredenzaDescription>
                        Update {rowCurrent.key} and use it in anywhere in
                        website.
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
                                        {["active", "inactive", "paused"].map(
                                            (statusOption) => (
                                                <SelectItem
                                                    key={statusOption}
                                                    value={statusOption}
                                                >
                                                    {statusOption}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                            <SubmitBtn label="Submit" processing={processing} />
                        </div>
                    </div>
                </form>
            </CredenzaContent>
        </Credenza>
    );
}
