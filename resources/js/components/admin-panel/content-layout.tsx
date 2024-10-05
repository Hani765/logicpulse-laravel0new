import Navbar from "@/components/admin-panel/navbar";
import { User } from "@/types";

interface ContentLayoutProps {
    children: React.ReactNode;
    user: User;
}

export function ContentLayout({ children, user }: ContentLayoutProps) {
    return (
        <div>
            <Navbar user={user} />
            <div className="w-full py-4 px-4">{children}</div>
        </div>
    );
}
