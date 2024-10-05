import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { MobileIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Laptop2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaMobile } from "react-icons/fa6";
import { toast } from "sonner";

export default function Sessions() {
    const [sessionsData, setSessionsData] = useState([]);
    const [fetching, setFetching] = useState(true);
    const { delete: destroy, processing, recentlySuccessful } = useForm();

    const fetchData = async () => {
        const response = await fetch("/sessions");
        if (response.ok) {
            const dataSessions = await response.json();
            setSessionsData(dataSessions);
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const revokeSession = async (id: string) => {
        destroy(`/sessions/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                fetchData();
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sessions</CardTitle>
            </CardHeader>
            <CardContent>
                {fetching ? (
                    <div className="space-y-6">
                        <SkeletonPlaceholder />
                        <SkeletonPlaceholder />
                        <SkeletonPlaceholder />
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {sessionsData.map((sessionData: any) => (
                            <li
                                key={sessionData.id}
                                className="py-4 flex gap-4 overflow-hidden"
                            >
                                <div className="flex w-full gap-4 items-center">
                                    {sessionData.device_type === "Desktop" ? (
                                        <Laptop2 />
                                    ) : (
                                        <FaMobile size={22} />
                                    )}
                                    <div className="space-y-1">
                                        <p className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer">
                                            {sessionData.country}(
                                            {sessionData.city})-
                                            {sessionData.ip_address}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                            {sessionData.device_type}(
                                            {sessionData.platform}
                                            {sessionData.platform_version})-
                                            {sessionData.browser}
                                        </p>
                                    </div>
                                </div>
                                {!sessionData.is_active ? (
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        variant="outline"
                                        onClick={() =>
                                            revokeSession(sessionData.id)
                                        }
                                    >
                                        {processing ? (
                                            <React.Fragment>
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            </React.Fragment>
                                        ) : (
                                            "Revoke"
                                        )}
                                    </Button>
                                ) : (
                                    <>
                                        <span className="text-sm text-green-600 mr-2 pr-2 ">
                                            (active)
                                        </span>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-primary">
                        Session rewoked successfully.
                    </p>
                </Transition>
            </CardContent>
        </Card>
    );
}

const SkeletonPlaceholder = () => (
    <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 w-full">
            <Skeleton className="w-8 h-10" />
            <div className="space-y-2 w-full">
                <Skeleton className="w-[80%] h-5" />
                <Skeleton className="w-[50%] h-3" />
            </div>
        </div>
        <Skeleton className="w-20 h-10" />
    </div>
);
