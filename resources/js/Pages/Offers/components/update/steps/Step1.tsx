import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Head } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputError from "@/components/InputError";
import { z } from "zod";
import ImageUploader from "@/components/ui/image-uploader";

interface StepProps {
    formData: any;
    errors: any;
    setFormData: (data: any) => void;
    currentStep: number;
    setCurrentStep: any;
}
export const step1Schema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
});
const Step1: React.FC<StepProps> = ({
    formData,
    setFormData,
    errors,
    currentStep,
    setCurrentStep,
}) => {
    const [validationErrors, setValidationErrors] = useState<any>({});

    const validateForm = () => {
        // Perform full validation
        const validation = step1Schema.safeParse(formData);
        if (!validation.success) {
            const formattedErrors = validation.error.format();
            setValidationErrors({
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

    return (
        <div>
            <Head title="Basic Information" />
            <AnimatePresence>
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
            </AnimatePresence>
        </div>
    );
};

export default Step1;
