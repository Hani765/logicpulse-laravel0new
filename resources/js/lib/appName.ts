import { useEffect, useState } from "react";

export function webName() {
    const [webName, setWebname] = useState({
        name: "LogicPulse",
    });
    const fetchName = async () => {
        const res = await fetch("/settings/account/1");
        const data = await res.json();
        setWebname({ name: data.value });
    };
    useEffect(() => {
        fetchName();
    }, []);
    return webName.name;
}
