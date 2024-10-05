import axios from "axios"; // Axios to handle requests
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { toast } from "sonner";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useStateHook } from "./useStateHook";
// Define the type for each response
interface ResponseData {
    hit: number;
    status: number;
    data: any;
}
interface AxiosError {
    response?: {
        status: number;
        data: any;
    };
}
export default function Form() {
    const { setErrors, errors, setHitCount, hitCount, setTotalHits, totalHits, setResponses, advanced, setAdvanced } = useStateHook();
    const [processing, setProcessing] = useState(false);
    const [abortController, setAbortController] =
        useState<AbortController | null>(null);
    const [data, setData] = useState({
        url: "",
        times: "",
        method: "GET", // Default HTTP method
    });
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({
            url: "",
            times: "",
        });
        // Validate input and ensure the times are not more than 100
        const times = Number(data.times);
        if (!data.url || isNaN(times) || times > 100) {
            setErrors({
                ...errors,
                url: data.url ? "" : "URL is required.",
                times:
                    times > 100
                        ? "Cannot exceed 100 times."
                        : "Times is required and must be a valid number.",
            });
            return;
        }

        setProcessing(true);
        setHitCount(0);
        setTotalHits(times); // Set total number of hits
        setResponses([]); // Clear previous responses

        const controller = new AbortController();
        setAbortController(controller);

        try {
            // Loop to hit the URL multiple times
            for (let i = 0; i < times; i++) {
                try {
                    // Make the request using Axios based on selected method
                    const response = await axios({
                        method: data.method, // Use the selected method
                        url: data.url,
                        signal: controller.signal,
                    });
                    setHitCount((prev: any) => prev + 1); // Increment hit count

                    // Store each successful response in the responses state
                    setResponses((prev: ResponseData[]) => [
                        ...prev,
                        {
                            hit: i + 1,
                            status: response.status,
                            data: response.data,
                        },
                    ]);
                } catch (error) {
                    const axiosError = error as AxiosError;

                    // Handle request failure
                    const status = axiosError.response?.status || "Error"; // Get status code or default to "Error"
                    const responseData = axiosError.response?.data || {}; // Get response data or empty object

                    setResponses((prev: ResponseData[]) => [
                        ...prev,
                        {
                            hit: i + 1,
                            status: status,
                            data: responseData,
                            method: data.method || "GET", // Include the request method
                            errorMessage: axiosError.response
                                ? axiosError.response
                                : "Unknown error", // Error message
                        },
                    ]);
                }
            }
        } catch (error: any) {
            if (axios.isCancel(error)) {
                toast.error(error.message);
            } else {
                toast.error(error);
                setErrors({ ...errors, url: "Failed to hit the URL." });
            }
        } finally {
            setProcessing(false);
        }
    };

    // Cancel the ongoing hits
    const cancelHits = () => {
        if (abortController) {
            abortController.abort(); // Cancel the requests
            setProcessing(false);
        }
    };
    return (
        <Card className=" rounded">
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                <form
                    onSubmit={submit}
                ><div
                    className="flex items-end gap-2 mb-1"
                >

                        <LabelInputContainer
                            type="url"
                            label="Paste url here"
                            helperText="https://www.google.com?sub=123"
                            className="w-full"
                            required
                            errorMessage={errors.url}
                            value={data.url}
                            onChange={(e) => setData({ ...data, url: e.target.value })}
                        />
                        <LabelInputContainer
                            type="number"
                            label="Times to hit"
                            helperText="10"
                            required
                            errorMessage={errors.times}
                            value={data.times}
                            onChange={(e) =>
                                setData({ ...data, times: e.target.value })
                            }
                        />

                        <Select
                            required
                            value={data.method}
                            onValueChange={(method) => setData({ ...data, method })}

                        >
                            <SelectTrigger className="h-10 my-1 w-28">
                                <SelectValue placeholder="Select request method" />
                            </SelectTrigger>
                            <SelectContent>
                                {["GET", "POST", "PUT", "DELETE"].map(
                                    (methodOption) => (
                                        <SelectItem
                                            key={methodOption}
                                            value={methodOption}
                                        >
                                            {methodOption}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                    
                        <SubmitBtn
                            label="Test"
                            processing={processing}
                            className="mb-0.5"
                        />
                    </div>
                </form>
                {processing && (
                    <div className="mt-4 flex w-full h-full items-center justify-center">
                        <Button variant='destructive'
                            onClick={cancelHits}
                        >
                            <React.Fragment>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            </React.Fragment>
                            Cancel
                            <span className="text-sm ml-1">
                                {hitCount}/{totalHits}
                            </span>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>

    )
}