import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import Message from "./Dashboard/message";
import NotificationsComponent from "./notify";

export default function Dashboard({ auth }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Your page description"></meta>
            </Head>
            <div className="space-y-4">
                <Message
                    message="Hello what are you doing ?"
                    username={auth.user.username}
                />
                <div className="w-full space-y-2">
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2"></div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-2 gap-4"></div>
                    </div>
                </div>
                <NotificationsComponent user={auth.user} />
                <DataTableSkeleton rowCount={8} columnCount={8} />
            </div>
        </Authenticated>
    );
}
