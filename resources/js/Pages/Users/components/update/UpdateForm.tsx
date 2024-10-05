import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DomainsType, OfferType, UserType } from "@/types";
import { useForm } from "@inertiajs/react";
import SearchSelect from "@/components/ui/search-select";
import { PasswordInput } from "@/components/auth/password-input";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/InputError";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { MultiSelect } from "@/components/ui/multi-select";
type RoleType = "administrator" | "admin" | "manager";
interface TagInputProps {
    domains: DomainsType[];
    user: any;
    role: any;
    offers: OfferType[];
    doneFunction: any;
}
const UpdateForm: React.FC<TagInputProps> = ({
    domains,
    role,
    offers,
    user,
    doneFunction,
}) => {
    const { data, setData, put, errors, processing } = useForm({
        username: user.user.username,
        email: user.user.email,
        password: "",
        domain_id: user.user.domain_id || "",
        rate: user.user.rate,
        phone: user.user.phone,
        skype: user.user.skype,
        details: user.user.details,
        offer_ids: user.offer_unique_ids || "",
        notification: user.user.notification,
        role: user.user.role,
        isVerified: user.user.isVerified,
        status: user.user.status,
    });

    // Filter domains based on search term

    const getRoleOptions = (role: RoleType): string[] => {
        switch (role) {
            case "administrator":
                return ["admin", "manager", "user"];
            case "admin":
                return ["manager", "user"];
            case "manager":
                return ["user"];
            default:
                return [];
        }
    };
    const roleOptions = getRoleOptions(role);
    const updateUser = async (event: React.FormEvent) => {
        event.preventDefault();
        put(`/dashboard/users/${user.user.unique_id}`, {
            onSuccess: () => {
                toast.success("User updated successfully!");
                doneFunction();
            },
            onError: (errors: { [key: string]: string }) => {
                const errorMessage =
                    errors.username || errors.email || "An error occurred";
                toast.error(errorMessage);
            },
        });
    };
    return (
        <form onSubmit={updateUser}>
            <div className="w-full space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div className="w-full">
                        <LabelInputContainer
                            type="text"
                            id="username"
                            value={data.username}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    username: e.target.value,
                                })
                            }
                            required
                            helperText="eg: john doe"
                            className="col-span-2 md:col-span-1"
                            label="Username"
                            errorMessage={errors.username}
                            autoFocus
                        />
                    </div>
                    <div className="w-fu">
                        <LabelInputContainer
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                            required
                            helperText="example@gmail.com"
                            label="Email"
                            errorMessage={errors.email}
                        />
                    </div>
                    <div className="w-full -mt-1.5">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            placeholder="********"
                            value={data.password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    password: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.password} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="w-full">
                        <SearchSelect
                            items={domains}
                            selected_value={data.domain_id}
                            onSelect={(unique_id: string) => {
                                setData({ ...data, domain_id: unique_id });
                            }}
                            label="Select Domain"
                            errorMessage={errors.domain_id}
                            description="Select a domain that you want to assing to user."
                        />
                    </div>
                    <LabelInputContainer
                        type="number"
                        value={data.rate}
                        onChange={(e) =>
                            setData({
                                ...data,
                                rate: e.target.value,
                            })
                        }
                        required
                        helperText="150"
                        label="Rate"
                        id="rate"
                        errorMessage={errors.rate}
                    />
                    <LabelInputContainer
                        type="number"
                        value={data.phone}
                        onChange={(e) =>
                            setData({
                                ...data,
                                phone: e.target.value,
                            })
                        }
                        required
                        helperText="+123-456-789"
                        label="Phone"
                        id="phone"
                        errorMessage={errors.phone}
                    />
                    <LabelInputContainer
                        type="number"
                        value={data.skype}
                        onChange={(e) =>
                            setData({
                                ...data,
                                skype: e.target.value,
                            })
                        }
                        required
                        helperText="+123-456-789"
                        label="Skype"
                        id="skype"
                        errorMessage={errors.skype}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="message">About:</Label>
                    <Textarea
                        name="message"
                        placeholder="Something about user..."
                        id="message"
                        onChange={(e) =>
                            setData({
                                ...data,
                                details: e.target.value,
                            })
                        }
                        required
                        defaultValue={data.details}
                    />
                    <InputError message={errors.details} />
                </div>
                <MultiSelect
                    items={offers}
                    selectedItems={data.offer_ids}
                    onSelect={(unique_ids: string) =>
                        setData({ ...data, offer_ids: unique_ids })
                    }
                    label="Select Offers"
                    descriptoin="Select offers that you want to assign to this user."
                />
                <InputError message={errors.offer_ids} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="w-full ">
                        <Label htmlFor="message">Allow notifications:</Label>
                        <ShadcnSelect
                            required
                            value={data.notification}
                            onValueChange={(notification) =>
                                setData({ ...data, notification })
                            }
                        >
                            <SelectTrigger className="h-9 my-1">
                                <SelectValue placeholder="Allow notification" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {["yes", "no"].map((notifyOption) => (
                                    <SelectItem
                                        key={notifyOption}
                                        value={notifyOption}
                                    >
                                        {notifyOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </ShadcnSelect>
                        <InputError message={errors.notification} />
                    </div>
                    <div className="w-full ">
                        <Label htmlFor="message">Role:</Label>
                        <ShadcnSelect
                            required
                            value={data.role}
                            onValueChange={(role) => setData({ ...data, role })}
                        >
                            <SelectTrigger className="h-9 my-1">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {roleOptions.map((roleOption) => (
                                    <SelectItem
                                        key={roleOption}
                                        value={roleOption}
                                    >
                                        {roleOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </ShadcnSelect>
                        <InputError message={errors.role} />
                    </div>
                    <div className="w-full ">
                        <Label htmlFor="message">Is verified:</Label>
                        <ShadcnSelect
                            required
                            value={data.isVerified}
                            onValueChange={(isVerified) =>
                                setData({ ...data, isVerified })
                            }
                        >
                            <SelectTrigger className="h-9 my-1">
                                <SelectValue placeholder="Email verfication" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {["yes", "no"].map((verifyOption) => (
                                    <SelectItem
                                        key={verifyOption}
                                        value={verifyOption}
                                    >
                                        {verifyOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </ShadcnSelect>
                        <InputError message={errors.isVerified} />
                    </div>
                    <div className="w-full ">
                        <Label htmlFor="message">Status:</Label>
                        <ShadcnSelect
                            required
                            value={data.status}
                            onValueChange={(status) =>
                                setData({ ...data, status })
                            }
                        >
                            <SelectTrigger className="h-9 my-1">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {["active", "inactive", "banned"].map(
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
                        </ShadcnSelect>
                        <InputError message={errors.status} />
                    </div>
                </div>
            </div>

            <hr className="my-3" />
            <div className="w-full items-center flex gap-2">
                <Button
                    variant="outline"
                    className=" w-full"
                    type="button"
                    onClick={doneFunction}
                >
                    Cancel
                </Button>
                <SubmitBtn
                    label="Update"
                    className="w-full"
                    processing={processing}
                />
            </div>
        </form>
    );
};

export default UpdateForm;
