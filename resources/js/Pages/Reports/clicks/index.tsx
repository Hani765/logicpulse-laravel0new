import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function index({ auth }: PageProps) {
    return <Authenticated user={auth.user}></Authenticated>;
}
