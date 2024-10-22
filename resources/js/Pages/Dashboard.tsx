import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import Message from "./Dashboard/message";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }: PageProps) {
    const [url, seturl] = useState("");
    const fetchData = async (url: string) => {
        const res = await fetch(url);
    };
    useEffect(() => {
        fetchData(`/fetch-metadata?url=${url}`);
    }, [url]);
    return (
        <Authenticated user={auth.user}>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Your page description"></meta>
            </Head>
            <div className="space-y-4">
                <Message
                    message="Hello what are you doing ?"
                    username={auth.user.username}
                />
                <Input value={url} onChange={(e) => seturl(e.target.value)} />
                <div className="w-full space-y-2">
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2"></div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-2 gap-4"></div>
                    </div>
                </div>
                <DataTableSkeleton rowCount={8} columnCount={8} />
            </div>
        </Authenticated>
    );
}
