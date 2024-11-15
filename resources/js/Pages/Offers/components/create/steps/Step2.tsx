// Step2.tsx
import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SearchSelect from "@/components/ui/search-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Head } from "@inertiajs/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface StepProps {
    formData: any;
    errors: any;
    setDataFetched: any;
    dataFetched: any;
    setFormData: (data: any) => void;
    currentStep: number;
    setCurrentStep: any;
    setFetchedData: any;
    fetchedData: any;
}

const Step2: React.FC<StepProps> = ({
    formData: data,
    setFormData: setData,
    errors,
    dataFetched,
    currentStep,
    setCurrentStep,
    setDataFetched,
    setFetchedData,
    fetchedData,
}) => {
    const [fetching, setFetching] = useState(false);

    const fetchData = async () => {
        setFetching(true);
        try {
            const responses = await Promise.all([
                fetch("/fetch/domains"),
                fetch("/fetch/networks"),
                fetch("/fetch/categories"),
            ]);

            const [domains, networks, categories] = await Promise.all(
                responses.map((res) =>
                    res.ok ? res.json() : Promise.reject(res),
                ),
            );

            setFetchedData({ domains, networks, categories });
            setFetching(false);
            setDataFetched(true);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        }
    };
    useEffect(() => {
        if (dataFetched === false) {
            fetchData();
        }
    }, [dataFetched]);
    const [tags, setTags] = useState<string[]>(
        data.keywords ? data.keywords.split(",") : [],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();
        if ((e.key === "Enter" || e.key === ",") && value) {
            if (!tags.includes(value)) {
                const updatedTags = [...tags, value];
                setTags(updatedTags);
                setData({ ...data, tags: updatedTags.join(",") }); // Convert array to comma-separated string
            }
            e.currentTarget.value = "";
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToDelete);
        setTags(updatedTags);
        setData({ ...data, tags: updatedTags.join(",") }); // Convert array to comma-separated string
    };
    return (
        <div>
            <Head title="Network Details" />
            {fetching ? (
                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Skeleton className="h-10" />
                        <Skeleton className="h-10" />
                        <Skeleton className="h-10" />
                    </div>
                    <Skeleton className="h-10" />
                    <div className="w-full grid grid-cols-3 gap-2 items-center">
                        <Skeleton className="h-10 col-span-2" />
                        <Skeleton className="h-10" />
                    </div>
                    <Skeleton className="h-10" />
                </div>
            ) : (
                <div className="space-y-2 bg-white p-4 rounded dark:bg-slate-900">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <LabelInputContainer
                            type="number"
                            value={data.age}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    age: e.target.value,
                                })
                            }
                            required
                            helperText="18"
                            errorMessage={errors.age}
                            bottomMessage="Specify the minimum age required to avail this offer."
                            label="Age:"
                            id="age"
                        />
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
                            errorMessage={errors.rate}
                            bottomMessage="Enter the rate for this offer in your local currency."
                            label="Rate:"
                            id="rate"
                        />
                        <LabelInputContainer
                            type="number"
                            value={data.encryption}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    encryption: e.target.value,
                                })
                            }
                            helperText="****"
                            errorMessage={errors.encryption}
                            bottomMessage="Specify the encryption level or code for the offer, if applicable."
                            label="Encryption:"
                            id="encryption"
                        />
                    </div>
                    <div className="w-full">
                        <SearchSelect
                            label="Select Network"
                            items={fetchedData.networks}
                            onSelect={(unique_id: string) =>
                                setData({ ...data, network_id: unique_id })
                            }
                            selected_value={data.network_id}
                            bottomMessage="Choose the network associated with this offer."
                            errorMessage={errors.network_id}
                        />
                    </div>
                    <div className="w-full grid grid-cols-3 gap-4 items-center">
                        <div className="col-span-2">
                            <SearchSelect
                                label="Select Domain"
                                items={fetchedData.domains}
                                onSelect={(unique_id: string) =>
                                    setData({ ...data, domain_id: unique_id })
                                }
                                selected_value={data.domain_id}
                                bottomMessage="Select the domain where this offer will be available."
                                errorMessage={errors.domain_id}
                            />
                        </div>
                        <div className="w-full">
                            <Label>Proxy check</Label>
                            <Select
                                required
                                value={data.proxy}
                                onValueChange={(proxy) =>
                                    setData({ ...data, proxy })
                                }
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="proxy" />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {["yes", "no"].map((statusOption) => (
                                        <SelectItem
                                            key={statusOption}
                                            value={statusOption}
                                        >
                                            {statusOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.proxy} />
                            <p className="text-gray-500 mt-1 text-sm whitespace-nowrap">
                                Seletet for thsi offer to check that check proxy
                                or not?
                            </p>
                        </div>
                    </div>
                    <SearchSelect
                        label="Select Category"
                        items={fetchedData.categories}
                        onSelect={(unique_id: string) =>
                            setData({ ...data, category_id: unique_id })
                        }
                        selected_value={data.category_id}
                        bottomMessage="Pick a category that best describes the offer."
                        errorMessage={errors.category_id}
                    />
                    <div className="w-full">
                        <Label>Related Tags</Label>
                        <div className="border rounded p-2 flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-800">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-200 text-blue-700 rounded px-2 py-1 flex items-center"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => handleDeleteTag(tag)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                onKeyDown={handleKeyDown}
                                placeholder="Type a tag and press enter or comma"
                                className="flex-1 border-none outline-none bg-transparent"
                            />
                        </div>
                        <p className="text-gray-500 mt-1 text-sm">
                            Type tags and press enter or comma to add.
                            (max:1000)
                        </p>
                        <InputError message={errors.keywords} />
                    </div>
                    <div className="flex w-full justify-end items-center mt-4">
                        <div className="w-full flex justify-end items-center mr-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={fetchData}
                            >
                                <ReloadIcon />
                            </Button>
                        </div>
                        {currentStep > 1 && (
                            <Button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="mr-2"
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="mr-2"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step2;
