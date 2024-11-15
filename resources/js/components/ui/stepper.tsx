import React from "react";
import { FaAngleDoubleRight, FaCheck } from "react-icons/fa";

export default function Stepper({
    stepperItems,
    currentStep,
    setCurrentStep,
    lastStep,
}: {
    stepperItems: any;
    currentStep: number;
    setCurrentStep: any;
    lastStep: number;
}) {
    return (
        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse overflow-x-auto">
            {stepperItems.map((item: string, index: number) => (
                <button
                    className={`flex whitespace-nowrap items-center ${currentStep > index + 1 && "text-green-600"} disabled:cursor-not-allowed disabled:text-gray-400 ${currentStep - 1 <= index ? "text-blue-600 dark:text-blue-500 " : "cursor-pointer"} `}
                    onClick={() => setCurrentStep(index + 1)}
                    disabled={currentStep < index + 1}
                >
                    <span
                        className={`md:flex items-center hidden justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep - 1 === index && "text-blue-600 dark:text-blue-500"}`}
                    >
                        {currentStep > index + 1 ? (
                            <FaCheck />
                        ) : (
                            <>{index + 1}</>
                        )}
                    </span>
                    {item}
                    {index + 1 < lastStep && (
                        <FaAngleDoubleRight className="w-4 ms-2 sm:ms-4 rtl:rotate-180" />
                    )}
                </button>
            ))}
        </ol>
    );
}
