import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import HeadersSection from "./partials/HeadersSection";
import { useStateHook } from "./partials/useStateHook";
import Form from "./partials/form";
import { DataTable } from "@/components/table";

export default function Index({ auth }: PageProps) {
    const { advanced, responses } = useStateHook();

    return (
        <Authenticated user={auth.user}>
            <Head title="Test Offers and Conversions" />
            <Form />
            {advanced && <HeadersSection />}
            {responses.length > 0 && <DataTable responses={responses} />}
        </Authenticated>
    );
}
