import Authenticated from "@/Layouts/AuthenticatedLayout";
import { OfferType, PageProps } from "@/types";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "@inertiajs/react";
import Stepper from "@/components/ui/stepper";

import { toast } from "sonner";
import Step2 from "../create/steps/Step2";
import Step3 from "../create/steps/Step3";
import Step4 from "../create/steps/Step4";
import Step5 from "../create/steps/Step5";
import Step1 from "./steps/Step1";

export default function Index({
    auth,
    offer,
    users,
}: PageProps<{ offer: OfferType; users: string }>) {
    const [currentStep, setCurrentStep] = useState(1);
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
    const { put, processing, data, setData, errors, reset } = useForm({
        title: offer.title,
        description: offer.description,
        keywords: offer.keywords,
        image: offer.image,
        age: offer.age,
        rate: offer.rate,
        encryption: offer.encryption,
        network_id: offer.network_id,
        domain_id: offer.domain_id,
        category_id: offer.category_id,
        proxy: offer.proxy,
        users_ids: users,
        countries: offer.countries,
        status: offer.status,
        appliableFor: offer.appliableFor,
        urls: offer.urls,
    });
    const submitOffer = async (event: React.FormEvent) => {
        event.preventDefault();
        put(`/dashboard/offers/${offer.unique_id}`, {
            onSuccess: () => {
                toast.success("Offer has been updated!");
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
