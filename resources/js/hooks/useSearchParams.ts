import { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

interface UseSearchParamsResult {
    currentValue: string;
}

const useSearchParams = (
    paramName: string,
    paramValue: string,
): UseSearchParamsResult => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentValue, setCurrentValue] = useState<string>(() => {
        const params = new URLSearchParams(location.search);
        return params.get(paramName) || "";
    });

    const setQueryParam = useCallback(
        debounce((name: string, value: string) => {
            const params = new URLSearchParams(location.search);

            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            navigate({ search: params.toString() });
        }, 300),
        [location.search, navigate],
    );

    useEffect(() => {
        setQueryParam(paramName, paramValue);
    }, [paramName, paramValue, setQueryParam]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setCurrentValue(params.get(paramName) || "");
    }, [location.search, paramName]);

    return { currentValue };
};

export default useSearchParams;
