import { useState } from "react";
interface Header {
    type: string;
    value: string;
}
// Define the type for each response
interface ResponseData {
    hit: number;
    status: number;
    data: any;
}
export function useStateHook() {
    const [errors, setErrors] = useState({
        url: "",
        times: "",
    });
    const [advanced, setAdvanced] = useState(false);
    const [hitCount, setHitCount] = useState(0); // To track hit progress
    const [totalHits, setTotalHits] = useState(0); // To track total hits
    const [responses, setResponses] = useState<ResponseData[]>([]); // Typed response state

    const [headers, setHeaders] = useState<Header[]>([
        { type: "accept", value: "application/json" },
        { type: "", value: "" }
    ]);
    return { errors, setErrors, advanced, setAdvanced, hitCount, setHitCount, totalHits, setTotalHits, responses, setResponses, headers, setHeaders }
}