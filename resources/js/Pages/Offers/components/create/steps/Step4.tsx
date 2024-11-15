// Step2.tsx
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Head } from "@inertiajs/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/InputError";
import { Label } from "@/components/ui/label";

interface StepProps {
    formData: any;
    errors: any;
    setUserDataFetched: any;
    userDataFetched: any;
    setFormData: (data: any) => void;
    currentStep: number;
    setCurrentStep: any;
    setFetchedUsersData: any;
    fetchedUsersData: any;
    role: string;
}

const userRoles = [
    { label: "All", value: "all" },
    { label: "All Admins", value: "admins" },
    { label: "All Managers", value: "managers" },
    { label: "All Users", value: "users" },
];
const visibleOption = [
    { label: "Everyone", value: "everyone" },
    { label: "Only Admins", value: "admins" },
    { label: "Only Managers", value: "managers" },
    { label: "Only Users", value: "users" },
];

const getRoleOptions = (role: string) => {
    switch (role) {
        case "administrator":
            return userRoles;
        case "admin":
            return userRoles.filter((role) => role.value !== "admins");
        default:
            return [];
    }
};
const getVisibleOptions = (role: string) => {
    switch (role) {
        case "administrator":
            return visibleOption;
        case "admin":
            return visibleOption.filter((role) => role.value !== "admins");
        default:
            return [];
    }
};

const Step2: React.FC<StepProps> = ({
    formData: data,
    setFormData: setData,
    errors,
    userDataFetched,
    currentStep,
    setCurrentStep,
    setUserDataFetched,
    setFetchedUsersData,
    fetchedUsersData,
    role,
}) => {
    const [fetching, setFetching] = useState(false);
    const [usersFetching, setUsersFetching] = useState(false);
    const [usersType, setUsersType] = useState("all");

    const fetchData = async () => {
        setFetching(true);
        try {
            const [usersResponse, countriesResponse] = await Promise.all([
                fetch("/fetch/all-users"),
                fetch("/fetch/countriesData"),
            ]);

            if (!usersResponse.ok || !countriesResponse.ok) {
                throw new Error("Failed to fetch data.");
            }

            const [users, countries] = await Promise.all([
                usersResponse.json(),
                countriesResponse.json(),
            ]);

            setFetchedUsersData({ users, countries });
            setUserDataFetched(true);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (!userDataFetched) {
            fetchData();
        }
    }, [userDataFetched]);

    const onRoleChange = async (value: string) => {
        setUsersFetching(true);
        setUsersType(value);
        try {
            const response = await fetch(`/fetch/all-users?filter=${value}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const usersData = await response.json();
            setFetchedUsersData({ ...fetchedUsersData, users: usersData });
            const uniqueIds = usersData
                .map((user: any) => user.unique_id)
                .join(", ");
            if (uniqueIds !== null) {
                setData({ ...data, users_ids: uniqueIds });
            } else {
                setData({ ...data, users_ids: "" });
            }
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        } finally {
            setUsersFetching(false);
        }
    };
    const roles = getRoleOptions(role);
    return (
        <div>
            <Head title="Target Details" />
            {fetching ? (
                <div className="space-y-4 mt-4">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>
            ) : (
                <div className="space-y-2 bg-white p-4 rounded dark:bg-slate-900">
                    <div className="space-y-2">
                        <div className="md:grid grdid-cols-1 md:grid-cols-3 gap-2">
                            <div className="">
                                <Label>Select Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(status) =>
                                        setData({ ...data, status })
                                    }
                                >
                                    <SelectTrigger className="h-10 my-1">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {["active", "inactive", "paused"].map(
                                            (status) => (
                                                <SelectItem
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                            <div className="">
                                <Label>Who can apply</Label>
                                <Select
                                    value={data.appliableFor}
                                    onValueChange={(appliableFor) =>
                                        setData({ ...data, appliableFor })
                                    }
                                >
                                    <SelectTrigger className="h-10 my-1">
                                        <SelectValue placeholder="Select visiblity" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {getVisibleOptions(role).map(
                                            (visible) => (
                                                <SelectItem
                                                    key={visible.value}
                                                    value={visible.value}
                                                >
                                                    {visible.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.appliableFor} />
                            </div>
                            <div className="">
                                <Label>Select Users</Label>
                                <Select
                                    value={usersType}
                                    onValueChange={onRoleChange}
                                >
                                    <SelectTrigger className="h-10 my-1">
                                        <SelectValue placeholder="Select users" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role.value}
                                                value={role.value}
                                            >
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {usersFetching ? (
                            <Skeleton className="h-10" />
                        ) : (
                            <MultiSelect
                                items={fetchedUsersData.users}
                                selectedItems={data.users_ids}
                                onSelect={(ids) =>
                                    setData({ ...data, users_ids: ids })
                                }
                                label="Selected Users"
                            />
                        )}

                        <MultiSelect
                            items={fetchedUsersData.countries}
                            selectedItems={data.countries}
                            onSelect={(ids) =>
                                setData({ ...data, countries: ids })
                            }
                            label="Select Countries"
                        />

                        <div className="flex justify-end mt-4 gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={fetchData}
                            >
                                <ReloadIcon />
                            </Button>
                            {currentStep > 1 && (
                                <Button
                                    onClick={() =>
                                        setCurrentStep(currentStep - 1)
                                    }
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                onClick={() => setCurrentStep(currentStep + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step2;
