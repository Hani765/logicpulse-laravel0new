import { echoInstance } from "@/bootstrap";
import React from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { playNotificationSound } from "./play-audio";
import { toast } from "sonner";

type FetchResult<T> = {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
};

export default function useFetch<T>(url: string): FetchResult<T> {
    const [data, setData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<Error | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const page = usePage<PageProps>();
    const userId = page.props.auth.user.unique_id;
    const userRole = page.props.auth.user.role;

    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        const channels: any[] = [];
        // Subscribe to user-specific channel
        channels.push(echoInstance.private(`clickConversion.${userId}`));

        // Subscribe to role-specific channel
        channels.push(echoInstance.private(`clickConversion.role.${userRole}`));

        // Listen for the notification event on all channels
        channels.forEach((channel) => {
            channel.listen(".clickConversion.sent", (e: any) => {
                if (e.clickConversion.message === "conversion") {
                    playNotificationSound();
                    toast.message("New message", {
                        description: "A new conversion has beed recieved",
                    });
                }
                fetchData(url); // Fetch data when notification is received
            });
        });

        // Cleanup the event listeners when the component unmounts
        return () => {
            channels.forEach((channel) => {
                channel.stopListening(".clickConversion.sent");
            });
        };
    }, [userId, userRole, url]); // Re-run if userId, userRole, or url changes

    React.useEffect(() => {
        setIsLoading(true);
        fetchData(url);
    }, [url]);

    return { data, error, isLoading };
}
