import { Button } from "@/components/ui/button";
import SubmitBtn from "@/components/ui/SubmitBtn";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function Index({ auth }: PageProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        offer_url: "",
        offer_title: "",
        network: "",
        targetCountries: "",
    });

    const lastStep = 3;

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 formData={formData} setFormData={setFormData} />;
            case 2:
                return <Step2 formData={formData} setFormData={setFormData} />;
            case 3:
                return <Step3 formData={formData} setFormData={setFormData} />;
            default:
                return null;
        }
    };

    const handleSubmit = () => {
        console.log("Form submitted with data:", formData);
        toast.success("Offer created successfully!");
    };

    const stepperItems = [
        "Basic Information",
        "Network Details",
        "Target Details",
    ];

    return (
        <Authenticated user={auth.user}>
            <div className="mt-4">
                {/* Stepper */}
                <div className="flex space-x-4">
                    {stepperItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex-1 text-center p-2 rounded ${
                                currentStep - 1 === index
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6">
                {/* Animated Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
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
                {currentStep < lastStep ? (
                    <Button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="mr-2"
                    >
                        Next
                    </Button>
                ) : (
                    <SubmitBtn label="Create" processing={false} />
                )}
            </div>
        </Authenticated>
    );
}
