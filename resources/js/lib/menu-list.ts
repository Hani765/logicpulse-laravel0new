import {
    MdShoppingBag,
    MdHome,
    MdSupervisedUserCircle,
    MdCellTower,
    MdOutlineSettings,
    MdMessage,
} from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import {
    IoGitNetworkSharp,
    IoColorFilterSharp,
    IoNotifications,
    IoShareSocialOutline,
} from "react-icons/io5";
import { SiPaloaltonetworks } from "react-icons/si";
import { Clipboard } from "lucide-react";
type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: any;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(
    pathname: string,
    role: string | undefined,
): Group[] {
    let menuItems: Group[] = [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname === "/",
                    icon: MdHome,
                    submenus: [],
                },
                {
                    href: "/dashboard/market-place",
                    label: "Market Place",
                    active: pathname === "/market-place",
                    icon: AiFillProduct,
                    submenus: [],
                },
                {
                    href: "/dashboard/offers",
                    label: "Offers",
                    active: pathname === "/offers",
                    icon: MdShoppingBag,
                    submenus: [],
                },
                {
                    href: "/reports",
                    label: "Reports",
                    active: pathname.includes("/reports"),

                    icon: IoColorFilterSharp,
                    submenus: [
                        {
                            href: "/reports/clicks",
                            label: "Clicks",
                            active: pathname === "clicks",
                        },
                        {
                            href: "/reports/conversions",
                            label: "Conversions",
                            active: pathname === "/conversions",
                        },
                        {
                            href: "/reports/offers-report",
                            label: "Offer report",
                            active: pathname === "/offers-report",
                        },
                        {
                            href: "/reports/user-report",
                            label: "User report",
                            active: pathname === "/user-report",
                        },
                    ],
                },
            ],
        },
    ];

    if (role !== "user") {
        menuItems[0].menus.push({
            href: "/dashboard/users",
            label: "Users",
            active: pathname === "/users",
            icon: MdSupervisedUserCircle,
            submenus: [],
        });
    }

    if (role === "admin" || role === "administrator") {
        menuItems[0].menus.push(
            {
                href: "/dashboard/trackers",
                label: "Trackers",
                active: pathname === "/trackers",
                icon: SiPaloaltonetworks,
                submenus: [],
            },
            {
                href: "/dashboard/networks",
                label: "Networks",
                active: pathname === "/networks",
                icon: IoGitNetworkSharp,
                submenus: [],
            },
            {
                href: "/dashboard/domains",
                label: "Domains",
                active: pathname === "/domains",
                icon: MdCellTower,
                submenus: [],
            },
        );
    }
    menuItems.push({
        groupLabel: "Settings",
        menus: [
            {
                href: "/settings/profile",
                label: "Settings",
                active: pathname === "/settings",
                icon: MdOutlineSettings,
                submenus: [],
            },
            {
                href: "/messages",
                label: "Messages",
                active: pathname === "/messages",
                icon: MdMessage,
                submenus: [],
            },
            {
                href: "/notifications",
                label: "Notifications",
                active: pathname === "/notifications",
                icon: IoNotifications,
                submenus: [],
            },
        ],
    });
    if (role === "administrator") {
        menuItems[0].menus.push(
            {
                href: "/dashboard/sources",
                label: "Sources",
                active: pathname === "/ dashboard/sources",
                icon: IoShareSocialOutline,
                submenus: [],
            },
            {
                href: "/dashboard/url-tester",
                label: "Tester",
                active: pathname === "/url-tester",
                icon: Clipboard,
                submenus: [],
            },
        );
    }

    return menuItems;
}
