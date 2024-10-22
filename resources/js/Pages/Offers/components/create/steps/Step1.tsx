import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import * as z from "zod";
import OffersFormSkeleton from "@/components/skeletons/offersForm";
import { Head } from "@inertiajs/react";

interface MetaDataType {
    title: string;
    description: string;
    image: string;
    keywords: string;
    author: string;
    canonical: string;
}

interface StepProps {
    formData: any;
    setFormData: (data: any) => void;
}

const urlSchema = z.string().url();

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Step1: React.FC<StepProps> = ({ formData, setFormData }) => {
    const [showMeta, setShowMeta] = useState(false);
    const [metaData, setMetaData] = useState<MetaDataType | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);
    const [fetching, setFetching] = useState(false);

    const fetchMetadata = async (url: string) => {
        setFetching(true);
        try {
            const res = await fetch(
                `/fetch-metadata?url=${encodeURIComponent(url)}`,
            );
            if (!res.ok) {
                throw new Error("Failed to fetch metadata");
            }
            const metaData = await res.json();
            setMetaData(metaData);
            setShowMeta(true);
            setFetching(false);
        } catch (error) {
            toast.info(
                "Failed to fetch metadata for this URL! Please enter manually or check the URL.",
            );
            setShowMeta(false);
            setFetching(false);
        }
    };

    const debouncedFetchMetadata = debounce(fetchMetadata, 500);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData({ ...formData, offer_url: url });

        // Validate the URL using Zod
        const validation = urlSchema.safeParse(url);
        if (!validation.success) {
            setUrlError("Please enter a valid URL.");
            setShowMeta(false);
        } else {
            setUrlError(null);
            debouncedFetchMetadata(url);
        }
    };

    useEffect(() => {
        // Trigger metadata fetch only if the URL is valid and debounced
        if (formData.offer_url && !urlError) {
            debouncedFetchMetadata(formData.offer_url);
        }
    }, [formData.offer_url]);

    return (
        <div>
            <Head title="Step 1" />
            <LabelInputContainer
                label="Offer URL"
                helperText="www.offer1.com?o=1&p=2"
                type="url"
                onChange={handleUrlChange}
                value={formData.offer_url}
                errorMessage={urlError || ""}
            />

            <AnimatePresence>
                {showMeta && metaData && (
                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="font-semibold">Metadata Details:</h3>
                        <p>
                            <strong>Title:</strong> {metaData.title || "N/A"}
                            <LabelInputContainer
                                label="Title"
                                helperText="An awesome Offer"
                                type="text"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        offer_title: e.target.value,
                                    })
                                }
                                value={metaData.title || ""}
                                errorMessage={urlError || ""}
                            />
                        </p>
                        <p>
                            <strong>Description:</strong>{" "}
                            {metaData.description || "N/A"}
                        </p>
                        <p>
                            <img src={metaData.image} alt="Image not found" />
                        </p>
                        <p>
                            <strong>Keywords:</strong>{" "}
                            {metaData.keywords || "N/A"}
                        </p>
                        <p>
                            <strong>Author:</strong> {metaData.author || "N/A"}
                        </p>
                        <p>
                            <strong>Canonical URL:</strong>{" "}
                            {metaData.canonical || "N/A"}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            {fetching && <OffersFormSkeleton />}
        </div>
    );
};

export default Step1;
