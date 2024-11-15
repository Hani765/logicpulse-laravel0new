import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { DateRangePicker } from "@/components/date-range-picker";
import { FetchProvider } from "@/hooks/FetchContext";
import DataPage from "./data";
import useUpdateUrl from "@/hooks/useUpdateUrl";

export default function Index({ auth }: PageProps) {
    const role = auth.user.role;
    const { updatedUrl } = useUpdateUrl(`/dashboard/fetch/offers`);

    return (
        <Authenticated user={auth.user}>
            <Head title="Offers">
                <meta
                    name="description"
                    content="Manage and track your offers in one convenient location."
                />
            </Head>
            <FetchProvider urls={[updatedUrl]}>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg">Offers</h2>
                        <p className="text-sm text-gray-500 hidden sm:block">
                            Manage and track your offers in one convenient
                            location.
                        </p>
                    </div>
                    <DateRangePicker />
                </div>

                <DataPage url={updatedUrl} role={role} />
            </FetchProvider>
        </Authenticated>
    );
}
