import { DataTable } from "@/components/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head } from "@inertiajs/react";
import { Columns } from "./components/columns";
import Create from "./components/create/create";
const endPoint = "/your-endpoint"; // Replace with your actual endpoint
export default function Index(auth: PageProps) {
    const role = auth.user.role;
    return (
        <Authenticated user={auth.user}>
            <Head title="Offers" />
            <div className="text-gray-600 dark:text-gray-200 text-sm mb-2">
                <Create />
            </div>
        </Authenticated>
    );
}
