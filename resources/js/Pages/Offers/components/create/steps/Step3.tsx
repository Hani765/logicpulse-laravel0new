// Step3.tsx
import React from "react";

interface StepProps {
    formData: any;
    setFormData: (data: any) => void;
}

const Step3: React.FC<StepProps> = ({ formData, setFormData }) => {
    return (
        <div>
            <h3 className="text-lg font-bold">Step 3: Target Details</h3>
            <div className="mt-4">
                <label className="block text-sm">Target Countries:</label>
                <input
                    type="text"
                    value={formData.targetCountries || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            targetCountries: e.target.value,
                        })
                    }
                    className="border p-2 w-full"
                    placeholder="Enter target countries"
                />
            </div>
        </div>
    );
};

export default Step3;
