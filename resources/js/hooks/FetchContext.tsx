// Updated FetchContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { echoInstance } from "@/bootstrap";
import { playNotificationSound } from "./play-audio";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type FetchResult<T> = {
    data: Record<string, T | null>; // Store data for each URL
    error: Error | null;
    isLoading: boolean;
};

type FetchContextType<T> = FetchResult<T>;

export const FetchContext = createContext<FetchContextType<any> | undefined>(
    undefined,
);

export const FetchProvider: React.FC<{
    urls: string[];
    children: React.ReactNode;
}> = ({ urls, children }) => {
    const [data, setData] = useState<Record<string, any | null>>({});
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const page = usePage<PageProps>();
    const userId = page.props.auth.user.unique_id;
    const userRole = page.props.auth.user.role;

    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            const json = await response.json();
            setData((prev) => ({ ...prev, [url]: json }));
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Fetch data for each URL on mount
        urls.forEach((url) => fetchData(url));

        // Subscribe to echo events
        const channel = echoInstance.private(`clickConversion.${userId}`);

        channel.listen(".clickConversion.sent", (e: any) => {
            if (e.clickConversion.message === "conversion") {
                playNotificationSound();
                toast.message("New message", {
                    description: "A new conversion has beed recieved",
                });
            }
            // Fetch data for each URL when an event is received
            urls.forEach((url) => fetchData(url));
        });

        // Cleanup: Unsubscribe from the channel
        return () => {
            channel.stopListening(".clickConversion.sent");
        };
    }, [userId, userRole, urls]);

    return (
        <FetchContext.Provider value={{ data, error, isLoading }}>
            {children}
        </FetchContext.Provider>
    );
};
