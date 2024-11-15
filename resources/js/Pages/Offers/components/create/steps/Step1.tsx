import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Head } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { step1Schema } from "./schemas";
import InputError from "@/components/InputError";
import ImageUploader from "@/components/ui/image-uploader";

interface StepProps {
    showMeta: boolean;
    formData: any;
    errors: any;
    setFormData: (data: any) => void;
    setShowMeta: any;
    currentStep: number;
    setCurrentStep: any;
}

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Step1: React.FC<StepProps> = ({
    formData,
    setFormData,
    errors,
    showMeta,
    setShowMeta,
    currentStep,
    setCurrentStep,
}) => {
    const [urlError, setUrlError] = useState<string | null>(null);
    const [fetching, setFetching] = useState(false);
    const [validationErrors, setValidationErrors] = useState<any>({});

    const fetchMetadata = useCallback(
        async (url: string) => {
            setFetching(true);
            setShowMeta(false);
            try {
                const res = await fetch(
                    `/fetch-metadata?url=${encodeURIComponent(url)}`,
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch metadata");
                }
                const metaData = await res.json();
                setFormData({
                    ...formData,
                    main_url: url,
                    title: metaData.title,
                    description: metaData.description,
                    keywords: metaData.keywords,
                    image: metaData.image,
                });
                setShowMeta(true);
                setFetching(false);
            } catch (error) {
                toast.error(
                    "Failed to fetch metadata for this URL! Please enter manually or check the URL.",
                );
                setFetching(false);
                setShowMeta(true);
            }
        },
        [setFormData, setShowMeta, formData],
    );

    const debouncedFetchMetadata = useCallback(debounce(fetchMetadata, 500), [
        fetchMetadata,
    ]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (url !== formData.main_url) {
            setFormData({ ...formData, main_url: url });

            // Validate the URL using Zod
            const validation = step1Schema.shape.main_url.safeParse(url);
            if (!validation.success) {
                setUrlError(validation.error.errors[0].message);
                setShowMeta(false);
            } else {
                setUrlError(null);
                debouncedFetchMetadata(url);
            }
        }
    };

    const validateForm = () => {
        // Perform full validation
        const validation = step1Schema.safeParse(formData);
        if (!validation.success) {
            const formattedErrors = validation.error.format();
            setValidationErrors({
                main_url: formattedErrors.main_url?._errors[0] || null,
                title: formattedErrors.title?._errors[0] || null,
                description: formattedErrors.description?._errors[0] || null,
            });
            return false;
        }
        setValidationErrors({});
        return true;
    };

    const handleNextClick = () => {
        // Validate form data before proceeding to the next step
        if (validateForm()) {
            setCurrentStep(currentStep + 1);
        } else {
            toast.error("Please fix the validation errors.");
        }
    };

    useEffect(() => {
        // Trigger metadata fetch only if the URL is valid and debounced
        if (formData.main_url && !urlError && !showMeta) {
            debouncedFetchMetadata(formData.main_url);
        }
    }, [formData.main_url, urlError, showMeta, debouncedFetchMetadata]);

    return (
        <div>
            <Head title="Basic Information" />
            <div className="bg-white dark:bg-slate-900 p-2 rounded">
                <LabelInputContainer
                    label="Offer URL"
                    helperText="www.offer1.com?o=1&p=2"
                    type="url"
                    onChange={handleUrlChange}
                    value={formData.main_url}
                    errorMessage={urlError || validationErrors.main_url || ""}
                    bottomMessage="Paste offer url to help us to fetch metadata of offer."
                />
            </div>
            <AnimatePresence>
                {showMeta && (
                    <motion.div
                        className="mt-4 space-y-2"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-semibold">Metadata Details:</h3>
                        <div className="bg-white dark:bg-slate-900 p-2 rounded">
                            <LabelInputContainer
                                label="Title"
                                helperText="eg: Offer 1 - An awesome offer"
                                type="text"
                                value={formData.title}
                                errorMessage={
                                    validationErrors.title || errors.title || ""
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-2 rounded">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                placeholder="Something about offer...."
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                            />
                            <InputError
                                message={
                                    errors.description ||
                                    validationErrors.description
                                }
                            />
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-2 rounded flex justify-between items-center">
                            <div className="">
                                <Label>Upload or Change Image</Label>
                                <p className="text-sm">
                                    Upload a new image for this offer meta!
                                </p>
                            </div>
                            <ImageUploader
                                selected_image={formData.image}
                                onUpload={(path: string) =>
                                    setFormData({ ...formData, image: path })
                                }
                            />
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-2 rounded">
                            <Label>Image</Label>
                            <img
                                src={formData.image}
                                alt={formData.image}
                                className="w-full h-[400px]"
                            />
                            <InputError message={errors.image} />
                        </div>

                        <div className="flex w-full justify-end items-center mt-4">
                            <Button onClick={handleNextClick} className="mr-2">
                                Next
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {fetching && (
                <div className="w-full space-y-2 mt-4">
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-20" />
                    <Skeleton className="w-full h-48" />
                    <Skeleton className="w-full h-20" />
                </div>
            )}
        </div>
    );
};

export default Step1;
