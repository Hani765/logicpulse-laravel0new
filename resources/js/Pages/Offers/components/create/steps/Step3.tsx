import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Head } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import * as z from "zod";
import { step3Schema } from "./schemas";

// Define the types for the form fields and props
type DeviceType =
    | "all"
    | "windows"
    | "mobiles"
    | "linux"
    | "android"
    | "iOs"
    | "others";

interface StepProps {
    formData: any;
    setFormData: (data: any) => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

interface InputField {
    url: string;
    deviceType: DeviceType | "";
}

// Zod schema for validation

const Step3: React.FC<StepProps> = ({
    formData: data,
    setFormData: setData,
    currentStep,
    setCurrentStep,
}) => {
    const [fieldErrors, setFieldErrors] = useState<
        Array<{ url?: string; deviceType?: string }>
    >([]);

    const deviceTypes: DeviceType[] = [
        "all",
        "windows",
        "mobiles",
        "linux",
        "android",
        "iOs",
    ];

    const handleAddInput = () => {
        setData((prevState: any) => ({
            ...prevState,
            urls: [...prevState.urls, { url: "", deviceType: "" }],
        }));
        setFieldErrors((prevErrors) => [...prevErrors, {}]);
    };

    const handleRemoveInput = (index: number) => {
        setData((prevState: any) => ({
            ...prevState,
            urls: prevState.urls.filter((_: any, i: number) => i !== index),
        }));
        setFieldErrors((prevErrors) =>
            prevErrors.filter((_, i) => i !== index),
        );
    };

    const handleInputChange = (
        index: number,
        field: keyof InputField,
        value: string | DeviceType,
    ) => {
        setData((prevState: any) => {
            const newUrls = prevState.urls.map(
                (input: InputField, i: number) =>
                    i === index ? { ...input, [field]: value } : input,
            );
            return { ...prevState, urls: newUrls };
        });
        // Clear error for the field being changed
        setFieldErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[index] = { ...newErrors[index], [field]: undefined };
            return newErrors;
        });
    };

    const validateForm = () => {
        try {
            step3Schema.parse(data);
            setFieldErrors([]);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Array<{ url?: string; deviceType?: string }> =
                    [];
                data.urls.forEach((_: any, index: any) => {
                    newErrors[index] = {};
                });
                error.errors.forEach((err) => {
                    const path = err.path;
                    if (path.length >= 2 && typeof path[1] === "number") {
                        const index = path[1];
                        const field = path[2] as keyof InputField;
                        newErrors[index][field] = err.message;
                    }
                });
                setFieldErrors(newErrors);
            }
            return false;
        }
    };

    const handleNextClick = () => {
        if (validateForm()) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <>
            <div className="w-full border-t sm:border-0 overflow-y-hidden p-2">
                <Head title="Additional Details" />
                <AnimatePresence>
                    {data.urls.map((input: InputField, index: number) => (
                        <motion.div
                            className="mt-4 space-y-2"
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="w-full flex gap-2 bg-white p-2 border rounded">
                                <div className="w-full pt-1">
                                    <Label>Offer Url</Label>
                                    <Input
                                        type="url"
                                        required
                                        placeholder="https://www.example-offer.com"
                                        className={`py-4 ${
                                            fieldErrors[index]?.url
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={input.url}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "url",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {fieldErrors[index]?.url && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {fieldErrors[index]?.url}
                                        </p>
                                    )}
                                </div>
                                <div className="w-[300px]">
                                    <Label>Device Type</Label>
                                    <Select
                                        required
                                        value={input.deviceType}
                                        onValueChange={(value: DeviceType) =>
                                            handleInputChange(
                                                index,
                                                "deviceType",
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            className={`h-10 my-1 ${
                                                fieldErrors[index]?.deviceType
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectValue placeholder="Device Type" />
                                        </SelectTrigger>
                                        <SelectContent side="top">
                                            {deviceTypes.map((statusOption) => (
                                                <SelectItem
                                                    key={statusOption}
                                                    value={statusOption}
                                                >
                                                    {statusOption}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldErrors[index]?.deviceType && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {fieldErrors[index]?.deviceType}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveInput(index)}
                                    className="text-red-500 bg-transparent mt-6 hover:bg-transparent hover:text-red-600"
                                >
                                    <MdDelete />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <Button
                    type="button"
                    onClick={handleAddInput}
                    variant="ringHover"
                    className="mt-2"
                >
                    Add URL
                </Button>
            </div>
            <div className="flex w-full justify-end items-center mt-4">
                {currentStep > 1 && (
                    <Button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="mr-2"
                    >
                        Back
                    </Button>
                )}
                <Button onClick={handleNextClick} className="mr-2">
                    Next
                </Button>
            </div>
        </>
    );
};

export default Step3;
