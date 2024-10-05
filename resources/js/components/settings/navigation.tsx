import { Link, usePage } from "@inertiajs/react";

export default function SettingsNavigation() {
    const page = usePage();
    const pathname = page.url;
    const items = [
        {
            id: 1,
            label: "Profile",
            path: "/settings/profile",
        },
        {
            id: 2,
            label: "Account",
            path: "/settings/account",
        },
        {
            id: 3,
            label: "Privacy",
            path: "/settings/privacy",
        },
    ];
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-md font-semibold">Settings</h2>
            <div className="p-0.5 w-fit rounded-sm relative items-center flex ">
                {items.map((item) => (
                    <Link
                        href={item.path}
                        className={`text-sm rounded px-2 py-1 cursor-pointer ${
                            item.path === pathname
                                ? "bg-primary text-white dark:text-black font-semibold shadow"
                                : ""
                        }`}
                        key={item.id}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
