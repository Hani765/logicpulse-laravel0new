import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DateRangePicker } from "@/components/date-range-picker";
import useUpdateUrl from "@/hooks/useUpdateUrl";
import { FetchProvider } from "@/hooks/FetchContext";
import DataPage from "./data";
export default function Index({ auth }: PageProps) {
    const { updatedUrl } = useUpdateUrl(`/dashboard/fetch/domains`);
    return (
        <Authenticated user={auth.user}>
            <Head title="Domains">
                <meta
                    name="description"
                    content=" Manage and track your domains in one convenient
                        location."
                />
            </Head>

            <FetchProvider urls={[updatedUrl]}>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg">Domains</h2>
                        <p className="text-sm text-gray-500 hidden sm:block">
                            Manage and track your domains in one convenient
                            location.
                        </p>
                    </div>
                    <DateRangePicker />
                </div>
                <DataPage url={updatedUrl} />
            </FetchProvider>
        </Authenticated>
    );
}
