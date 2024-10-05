import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MdDelete } from "react-icons/md";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CountryType, DomainsType, NetworkType, UserType } from "@/types";
import { useForm } from "@inertiajs/react";
import SearchSelect from "@/components/ui/search-select";
import InputError from "@/components/InputError";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";
type DeviceType = "all" | "windows" | "mobiles" | "linux" | "android" | "iOs";

interface TagInputProps {
    domains: DomainsType[];
    users: UserType[];
    networks: NetworkType[];
    countries: CountryType[];
    categories: CountryType[];
    doneFunction: any;
}

interface InputField {
    url: string;
    deviceType: DeviceType | "";
}

interface Option {
    value: string;
    label: string;
}

const CreateForm: React.FC<TagInputProps> = ({
    domains,
    users,
    networks,
    countries,
    categories,
    doneFunction,
}) => {
    const { post, processing, data, setData, errors, reset } = useForm({
        offer_name: "",
        image: null as File | null,
        age: "",
        rate: "",
        encryption: "",
        network_id: "",
        domain_id: "",
        category_id: "",
        proxy: "",
        details: "",
        users_ids: "",
        countries: "",
        status: "",
        urls: [{ url: "", deviceType: "all" }],
    });
    const deviceTypes: DeviceType[] = [
        "all",
        "windows",
        "mobiles",
        "linux",
        "android",
        "iOs",
    ];
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setData((prevState) => ({ ...prevState, image: file }));
        }
    };
    const [urlErrors, setUrlErrors] = useState<{ [key: number]: string }>({});
    const handleAddInput = () => {
        setData((prevState) => ({
            ...prevState,
            urls: [...prevState.urls, { url: "", deviceType: "" }],
        }));
    };

    const handleRemoveInput = (index: number) => {
        if (data.urls.length > 1) {
            setData((prevState) => {
                const newUrls = prevState.urls.filter((_, i) => i !== index);
                return { ...prevState, urls: newUrls };
            });
            setUrlErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[index];
                return newErrors;
            });
        }
    };

    const handleInputChange = (
        index: number,
        field: keyof InputField,
        value: string
    ) => {
        setData((prevState) => {
            const newUrls = prevState.urls.map((input, i) =>
                i === index ? { ...input, [field]: value } : input
            );
            return { ...prevState, urls: newUrls };
        });
        if (field === "url") {
            validateUrl(index, value);
        }
    };

    const validateUrl = (index: number, url: string) => {
        try {
            new URL(url);
            setUrlErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[index];
                return newErrors;
            });
        } catch {
            setUrlErrors((prevErrors) => ({
                ...prevErrors,
                [index]: "Invalid URL",
            }));
        }
    };

    const selectedDeviceTypes = data.urls.map((input) => input.deviceType);
    const submitOffer = async (event: React.FormEvent) => {
        event.preventDefault();
        post("/dashboard/offers", {
            onSuccess: () => {
                toast.success("Offer has been created!");
                reset();
                doneFunction();
            },
        });
    };
    return (
        <form onSubmit={submitOffer} className="px-4 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <LabelInputContainer
                            type="text"
                            value={data.offer_name}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    offer_name: e.target.value,
                                })
                            }
                            required
                            errorMessage={errors.offer_name}
                            description="Enter a unique and descriptive name for the offer."
                            label="Offer Name"
                            helperText="Offer Name"
                            id="offer-name"
                        />
                        <LabelInputContainer
                            type="file"
                            onChange={handleImageChange}
                            required
                            errorMessage={errors.image}
                            description="Select an image for offer to show as an OG image."
                            label="Selete Image"
                            id="offer-image"
                        />
                    </div>
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
                            description="Specify the minimum age required to avail this offer."
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
                            description="Enter the rate for this offer in your local currency."
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
                            description="Specify the encryption level or code for the offer, if applicable."
                            label="Encryption:"
                            id="encryption"
                        />
                    </div>
                    <div className="w-full">
                        <SearchSelect
                            label="Select Network"
                            items={networks}
                            onSelect={(unique_id: string) =>
                                setData({ ...data, network_id: unique_id })
                            }
                            selected_value={data.network_id}
                            description="Choose the network associated with this offer."
                            errorMessage={errors.network_id}
                        />
                    </div>
                    <div className="w-full grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <SearchSelect
                                label="Select Domain"
                                items={domains}
                                onSelect={(unique_id: string) =>
                                    setData({ ...data, domain_id: unique_id })
                                }
                                selected_value={data.domain_id}
                                description="Select the domain where this offer will be available."
                                errorMessage={errors.domain_id}
                            />
                        </div>
                        <div className="w-full">
                            <Label>Proxy check</Label>
                            <ShadcnSelect
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
                            </ShadcnSelect>
                            <InputError message={errors.proxy} />
                        </div>
                    </div>
                    <SearchSelect
                        label="Select Category"
                        items={categories}
                        onSelect={(unique_id: string) =>
                            setData({ ...data, category_id: unique_id })
                        }
                        selected_value={data.category_id}
                        description="Pick a category that best describes the offer."
                        errorMessage={errors.category_id}
                    />
                    <div className="w-full">
                        <Label htmlFor="message">About:</Label>
                        <Textarea
                            name="message"
                            placeholder="Something about the offer..."
                            id="message"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    details: e.target.value,
                                })
                            }
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Provide a detailed description of the offer.
                        </p>
                        <InputError message={errors.details} />
                    </div>
                </div>

                <div className="w-full border-t sm:border-0">
                    {data.urls.map((input, index) => (
                        <div key={index} className="w-full flex gap-2">
                            <div className="w-full pt-1">
                                <Label>Offer Url</Label>
                                <Input
                                    type="url"
                                    required
                                    placeholder="https://www.example-offer.com"
                                    className={`py-4 ${
                                        urlErrors[index] ? "border-red-500" : ""
                                    }`}
                                    value={input.url}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "url",
                                            e.target.value
                                        )
                                    }
                                />
                                {urlErrors[index] && (
                                    <p className="text-red-500 text-sm">
                                        {urlErrors[index]}
                                    </p>
                                )}
                            </div>
                            <div className="w-[300px]">
                                <Label>Device Type</Label>
                                <ShadcnSelect
                                    required
                                    value={input.deviceType}
                                    onValueChange={(value: DeviceType) =>
                                        handleInputChange(
                                            index,
                                            "deviceType",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="h-10 my-1">
                                        <SelectValue placeholder="Device Type" />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {deviceTypes
                                            .filter(
                                                (type) =>
                                                    !selectedDeviceTypes.includes(
                                                        type
                                                    ) ||
                                                    type === input.deviceType
                                            )
                                            .map((statusOption) => (
                                                <SelectItem
                                                    key={statusOption}
                                                    value={statusOption}
                                                >
                                                    {statusOption}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </ShadcnSelect>
                            </div>
                            <Button
                                type="button"
                                onClick={() => handleRemoveInput(index)}
                                className="text-red-500 bg-transparent mt-6 hover:bg-transparent hover:text-red-600"
                            >
                                <MdDelete />
                            </Button>
                        </div>
                    ))}
                    {data.urls.length < deviceTypes.length && (
                        <Button
                            type="button"
                            onClick={handleAddInput}
                            variant="ringHover"
                            className="mt-2"
                        >
                            Add URL
                        </Button>
                    )}
                    <div className="mt-2 space-y-2">
                        <MultiSelect
                            items={users}
                            selectedItems={data.users_ids}
                            onSelect={(unique_ids) =>
                                setData({ ...data, users_ids: unique_ids })
                            }
                            label="Select Users"
                        />
                        <MultiSelect
                            items={countries}
                            selectedItems={data.countries}
                            onSelect={(unique_ids) =>
                                setData({ ...data, countries: unique_ids })
                            }
                            label="Select countries"
                        />
                    </div>
                </div>
            </div>

            <hr className="my-2" />
            <div className="w-full items-center justify-end flex gap-2">
                <div className="w-full lg:max-w-36">
                    <ShadcnSelect
                        required
                        value={data.status}
                        onValueChange={(status) => setData({ ...data, status })}
                    >
                        <SelectTrigger className="h-10 my-1">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent side="top">
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
                    </ShadcnSelect>
                    <InputError message={errors.status} />
                </div>
                <Button
                    type="submit"
                    disabled={processing}
                    variant="gooeyRight"
                >
                    {processing ? (
                        <React.Fragment>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </React.Fragment>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CreateForm;
