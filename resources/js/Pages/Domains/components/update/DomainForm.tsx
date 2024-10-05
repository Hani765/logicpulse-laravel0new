import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import InputError from "@/components/InputError";
import { MultiSelect } from "@/components/ui/multi-select";
import { Link } from "lucide-react";
import SubmitBtn from "@/components/ui/SubmitBtn";
export function DomainForm({
    domainData,
    userData,
}: {
    domainData: any;
    userData: any;
}) {
    const { put, data, setData, errors, processing } = useForm({
        name: domainData?.domain.name,
        selectedUsers: domainData?.user_ids || "",
        status: domainData?.domain.status,
    });
    const update: FormEventHandler = (e) => {
        const id = domainData?.domain.unique_id;
        e.preventDefault();
        put(`/dashboard/domains/${id}`, {
            onSuccess: () => {
                toast.success("Domain has been updated!");
            },
            onError: (errors) => {
                toast.error(errors.name);
            },
        });
    };
    const onSelected = (unique_ids: string) => {
        setData({ ...data, selectedUsers: unique_ids });
    };
    return (
        <form className="flex flex-col gap-4 p-2 sm:p-0" onSubmit={update}>
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
            <MultiSelect
                selectedItems={data.selectedUsers}
                items={userData}
                label="Select Users"
                onSelect={onSelected}
                descriptoin="Select the users those you want to assign that domain."
            />
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
                <SubmitBtn processing={processing} label="Update domain" />
            </div>
        </form>
    );
}
