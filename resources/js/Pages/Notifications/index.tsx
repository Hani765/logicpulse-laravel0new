import Authenticated from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
export default function index({
    user,
}: {
    user: User;
    status: string;
    error: string;
    data: any;
}) {
    return <Authenticated user={user} header="Notifications"></Authenticated>;
}
