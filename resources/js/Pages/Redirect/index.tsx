import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { OfferType } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function index({ error }: { error: string }) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Head title={error} />
            <Card className="w-full sm:max-w-lg">
                <CardHeader>
                    <CardTitle className="w-full flex items-center justify-center">
                        <MdOutlineErrorOutline /> Error
                    </CardTitle>
                    <CardDescription>{error}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}