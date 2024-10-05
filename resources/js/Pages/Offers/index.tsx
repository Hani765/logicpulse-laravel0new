import { DataTable } from "@/components/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head } from "@inertiajs/react";
import { Columns } from "./components/columns";
import Create from "./components/create/create";
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
            <Head title="Offers" />
            {role === "admin" ||
                (role === "administrator" && (
                    <div className="text-gray-600 dark:text-gray-200 text-sm mb-2">
                        <Create />
                    </div>
                ))}
            <div>
                <DataTable
                    data={data}
                    isSearchable={true}
                    endPoint={endPoint}
                    columns={Columns(role)} // Assuming user has a token property
                    pagination={pagination}
                    role={role}
                />
            </div>
        </Authenticated>
    );
}
