import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface UseUpdateUrlResult {
    updatedUrl: string;
}

const useUpdateUrl = (initialUrl: string): UseUpdateUrlResult => {
    const [updatedUrl, setUpdatedUrl] = useState(initialUrl);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newUrl = `${initialUrl}?${params.toString()}`;
        setUpdatedUrl(newUrl);
    }, [location.search, initialUrl]);

    return { updatedUrl };
};

export default useUpdateUrl;
