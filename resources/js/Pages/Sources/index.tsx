import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import Create from "./components/create/CreateDialogue";
import { DataTable } from "@/components/table";
import { Columns } from "./components/columns";

export default function index({ auth, data, pagination }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <div className="text-gray-600 dark:text-gray-200 text-sm mb-2">
                <Create />
            </div>
            <div>
                <DataTable
                    data={data}
                    isSearchable={true}
                    endPoint="123"
                    columns={Columns()} // Assuming user has a token property
                    pagination={pagination}
                />
            </div>
        </Authenticated>
    );
}
