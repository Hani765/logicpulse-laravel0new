import { DataTable } from "@/components/table";
import { Columns } from "./components/columns";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Create from "./components/create/CreateDialogue";
import { Head } from "@inertiajs/react";
// Define the endPoint and Columns if they are not imported
const endPoint = "/your-endpoint"; // Replace with your actual endpoint

export default function Index({
    data,
    auth,
    pagination,
}: {
    data: any;
    pagination: any;
    auth: any;
}) {
    const role = auth.user.role;
    return (
        <Authenticated user={auth.user}>
            <Head title="Networks" />
            <div className="text-gray-600 dark:text-gray-200 text-sm mb-2">
                <Create />
            </div>
            <div>
                <DataTable
                    data={data}
                    isSearchable={true}
                    endPoint={endPoint}
                    columns={Columns()} // Assuming user has a token property
                    pagination={pagination}
                    role={role}
                />
            </div>
        </Authenticated>
    );
}
