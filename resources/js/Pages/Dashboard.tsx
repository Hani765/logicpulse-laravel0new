import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import Message from "./Dashboard/message";
import OffersTable from "./Dashboard/offers";
import { DashboardRawCharts } from "./Dashboard/DashboardRawCharts";
import useFetch from "@/hooks/usefetch";
import { useState } from "react";
type DataType = {
    clicks: any;
    conversions: any;
    cvr: any;
    earnings: any;
};
export default function Dashboard({ auth }: PageProps) {
    const role = auth.user.role;
    const {
        data: AnalyticsData,
        isLoading: AnalyticsIsLoading,
        error: AnalyticsError,
    } = useFetch<DataType>("/dashboard/analytics");
    const {
        data: messageData,
        isLoading: messageIsLoading,
        error: messageError,
    } = useFetch("/get/message");
    const [url, setUrl] = useState(`/dashboard/fetch/offers`);
    const {
        data: offerData,
        isLoading: offerIsLoading,
        error: offerError,
    } = useFetch(url);

    return (
        <Authenticated user={auth.user}>
            <Head title="Dashboard">
                <meta
                    name="description"
                    content="Effortlessly manage, track, and analyze your offers with the LogicPulse Dashboard. View real-time insights, monitor performance, and gain valuable data-driven perspectives on your campaigns—all in one organized, user-friendly space."
                />
            </Head>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg">Dashboard</h2>
                        <p className="text-sm text-gray-500 hidden sm:block">
                            Effortlessly manage, track, and analyze your data
                            with the LogicPulse Dashboard.
                        </p>
                    </div>
                </div>
                <div className="w-full space-y-2">
                    <DashboardRawCharts
                        data={AnalyticsData}
                        isLoading={AnalyticsIsLoading}
                        error={AnalyticsError}
                    />
                </div>
                <Message
                    username={auth.user.username}
                    data={messageData}
                    isLoading={messageIsLoading}
                    error={messageError}
                />
                <OffersTable
                    role={role}
                    data={offerData}
                    isLoading={offerIsLoading}
                    error={offerError}
                    url={url}
                    setUrl={setUrl}
                />
            </div>
        </Authenticated>
    );
}
