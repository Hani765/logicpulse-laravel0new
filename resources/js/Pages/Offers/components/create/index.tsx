import { Button } from "@/components/ui/button";
import SubmitBtn from "@/components/ui/SubmitBtn";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "@inertiajs/react";
import Stepper from "@/components/ui/stepper";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { toast } from "sonner";

export default function Index({ auth }: PageProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [showMeta, setShowMeta] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [userDataFetched, setUserDataFetched] = useState(false);
    const role = auth.user.role;
    const [fetchedData, setFetchedData] = useState({
        domains: [],
        networks: [],
        categories: [],
    });
    const [fetchedUsersData, setFetchedUsersData] = useState({
        users: [],
        countries: [],
    });
    const { post, processing, data, setData, errors, reset } = useForm({
        main_url: "",
        title: "",
        description: "",
        keywords: "",
        image: "",
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
        status: "active",
        appliableFor: "everyone",
        urls: [{ url: "", deviceType: "all" }],
    });
    const submitOffer = async (event: React.FormEvent) => {
        event.preventDefault();
        post("/dashboard/offers", {
            onSuccess: () => {
                toast.success("Offer has been created!");
                reset();
            },
            onError: () => {
                toast.error(
                    "An error occured while submitting form! Please check the form fields.",
                );
                setCurrentStep(1);
            },
        });
    };
    const lastStep = 5;

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1
                        formData={data}
                        setFormData={setData}
                        errors={errors}
                        showMeta={showMeta}
                        setShowMeta={setShowMeta}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
                );
            case 2:
                return (
                    <Step2
                        formData={data}
                        setFormData={setData}
                        errors={errors}
                        dataFetched={dataFetched}
                        setDataFetched={setDataFetched}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        fetchedData={fetchedData}
                        setFetchedData={setFetchedData}
                    />
                );
            case 3:
                return (
                    <Step3
                        formData={data}
                        setFormData={setData}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
                );
            case 4:
                return (
                    <Step4
                        formData={data}
                        setFormData={setData}
                        errors={errors}
                        userDataFetched={userDataFetched}
                        setUserDataFetched={setUserDataFetched}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        fetchedUsersData={fetchedUsersData}
                        setFetchedUsersData={setFetchedUsersData}
                        role={role}
                    />
                );
            case 5:
                return (
                    <Step5
                        data={data}
                        onClick={submitOffer}
                        processing={processing}
                        fetchedData={fetchedData}
                        fetchedUsersData={fetchedUsersData}
                    />
                );
            default:
                return null;
        }
    };

    const stepperItems = [
        "Basic Information",
        "Network Details",
        "Additional Details",
        "Target Details",
        "Review",
    ];

    return (
        <Authenticated user={auth.user}>
            <Stepper
                stepperItems={stepperItems}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                lastStep={lastStep}
            />
            <div className="mt-6 overflow-x-hidden">
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
        </Authenticated>
    );
}
