import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useStateHook } from "./useStateHook";

// Define the type for the header
interface Header {
    type: string;
    value: string;
}

export default function HeadersSection() {
    const { headers, setHeaders } = useStateHook();
    const addMore = () => {
        setHeaders((prevHeaders: any) => [...prevHeaders, { type: "", value: "" }]);
    };

    const handleChange = (index: number, key: keyof Header, value: string) => {
        const newHeaders = [...headers];
        newHeaders[index][key] = value;
        setHeaders(newHeaders);
    };

    const removeHeader = (index: number) => {
        const newHeaders = headers.filter((_: any, i: any) => i !== index);
        setHeaders(newHeaders);
    };

    return (
        <Card className="space-y-2 p-0 py-2 my-2 rounded">
            <CardHeader className="px-2 py-0 m-0">
                <CardTitle>Request Header</CardTitle>
                <CardDescription>Set the headers that you want to send with request.</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
                <div className="space-y-2">
                    {headers.map((header: any, index: any) => (
                        <div key={index} className="grid grid-cols-2 gap-2">
                            <LabelInputContainer
                                type="text"
                                value={header.type}
                                onChange={(e) => handleChange(index, 'type', e.target.value)}
                                label="Header Type"
                                helperText="eg:accept"
                            />
                            <div className="flex items-end gap-2">
                                <LabelInputContainer
                                    type="text"
                                    value={header.value}
                                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                                    label="Header Value"
                                    className="w-full"
                                    helperText="eg:application/json"
                                />
                                <Button onClick={() => removeHeader(index)} variant="destructive" size="icon" className="mb-1">
                                    <FaTrash />
                                </Button>

                            </div>

                        </div >
                    ))}
                    <div className="col-span-2 flex justify-end">
                        <Button onClick={addMore}>Add more</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
