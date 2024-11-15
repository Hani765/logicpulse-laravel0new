import { useState, useEffect } from "react";

function usePageUrl() {
    const [url, setUrl] = useState(window.location.href);

    useEffect(() => {
        const handleUrlChange = () => {
            setUrl(window.location.href);
        };

        // Listen for popstate event (triggered by browser navigation)
        window.addEventListener("popstate", handleUrlChange);

        // Update URL state on mount to capture any initial URL changes
        handleUrlChange();

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, []);

    return url;
}
