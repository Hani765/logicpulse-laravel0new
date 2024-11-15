import SettingsLayout from "@/Layouts/SettingsLayout";
import { PageProps } from "@/types";
import AddValue from "./Partials/AddValue";
import { DataTable } from "@/components/table";
import { Columns } from "./Partials/columns";
import LandingForm from "./Partials/LandingForm";

export default function Accounts({
    auth,
    mustVerifyEmail,
    status,
    error,
    data,
    pagination_data,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    error?: string;
    data: any;
    pagination_data: any;
}>) {
    return (
        <SettingsLayout auth={auth} head="Accounts">
            <div className="space-y-4 mt-4">
                <LandingForm />

                <AddValue error={error} />
                <DataTable
                    data={data.data}
                    endPoint="123123"
                    columns={Columns(error)} // Assuming user has a token property
                    pagination={pagination_data}
                />
            </div>
        </SettingsLayout>
    );
}
