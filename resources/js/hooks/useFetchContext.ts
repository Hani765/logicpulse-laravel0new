// Updated useFetchContext.ts
import { useContext } from "react";
import { FetchContext } from "./FetchContext";

export const useFetchContext = <T>(url: string) => {
    const context = useContext(FetchContext);
    if (!context) {
        throw new Error("useFetchContext must be used within a FetchProvider");
    }

    const { data, error, isLoading } = context;
    return { data: data[url], error, isLoading };
};
