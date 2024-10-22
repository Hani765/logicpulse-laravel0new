// Step2.tsx
import { Head } from "@inertiajs/react";
import React from "react";

interface StepProps {
    formData: any;
    setFormData: (data: any) => void;
}

const Step2: React.FC<StepProps> = ({ formData, setFormData }) => {
    return (
        <div>
            <Head title="Step 2" />
            <h3 className="text-lg font-bold">Step 2: Network Details</h3>
            <div className="mt-4">
                <label className="block text-sm">Network Name:</label>
                <input
                    type="text"
                    value={formData.network || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, network: e.target.value })
                    }
                    className="border p-2 w-full"
                    placeholder="Enter network name"
                />
            </div>
        </div>
    );
};

export default Step2;
