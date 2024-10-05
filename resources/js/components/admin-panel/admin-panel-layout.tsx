"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function AdminPanelLayout({
    children,
    role,
    webName,
}: {
    children: React.ReactNode;
    role: string | undefined;
    webName: string;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            <Sidebar role={role} webName={webName} />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[50px]" : "lg:ml-60"
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[50px]" : "lg:ml-60"
                )}
            >
                <Footer />
            </footer>
        </>
    );
}