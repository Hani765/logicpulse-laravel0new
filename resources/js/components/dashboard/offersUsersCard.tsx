import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FaAngleRight, FaAnglesUp, FaAngleUp } from "react-icons/fa6";
import PopoverComponent from "../ui/popover-component";
const topOffers = [
    {
        name: "Offer 1",
        description: "Today’s top ranker 1",
        Earnings: 45,
    },
    {
        name: "Offer 2",
        description: "Today’s top ranker 2",
        Earnings: 30,
    },
    {
        name: "Offer 3",
        description: "Today’s top ranker 3",
        Earnings: 20,
    },
    {
        name: "Offer 4",
        description: "Today’s top ranker 4",
        Earnings: 18,
    },
];
const topUsers = [
    {
        name: "Hanzla",
        email: "shanzla765@gmail.com",
        Earnings: 45,
    },
    {
        name: "Hanjaa",
        email: "hanzja@gmail.com",
        Earnings: 30,
    },
    {
        name: "Hani",
        email: "hani@gmail.com",
        Earnings: 20,
    },
    {
        name: "Infal",
        email: "infal@gmail.com",
        Earnings: 18,
    },
];
export default function OffersUsersCard() {
    return (
        <Tabs defaultValue="top-offers">
            <Card className="py-2 px-0">
                <CardContent className="py-1 px-0 overflow-y-auto">
                    <CardHeader className="px-2 py-1">
                        <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white gap-1">
                            Statistics this month
                            <PopoverComponent description="Statistics is a branch of applied mathematics that involves the collection, description, analysis, and inference of conclusions from quantitative data." />
                        </h3>
                        <TabsList className="w-full">
                            <TabsTrigger value="top-offers" className="w-full">
                                Tops Offers
                            </TabsTrigger>
                            <TabsTrigger value="top-users" className="w-full">
                                Top Users
                            </TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <TabsContent value="top-offers" className="px-0">
                        <ul
                            role="list"
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            {topOffers.map((topOffer) => (
                                <li
                                    className="py-3 sm:py-4 px-4 hover:bg-muted"
                                    key={topOffer.name}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center min-w-0">
                                            <img
                                                className="flex-shrink-0 w-10 h-10"
                                                src="https://flowbite-admin-dashboard.vercel.app/images/products/iphone.png"
                                                alt="imac image"
                                            />
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900 truncate dark:text-white">
                                                    {topOffer.name}
                                                </p>
                                                <div className="flex items-center justify-end flex-1 text-sm text-green-500 dark:text-green-400">
                                                    <FaAnglesUp />
                                                    2.5%
                                                    <span className="ml-2 text-gray-500">
                                                        {topOffer.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $445,467
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </TabsContent>
                    <TabsContent value="top-users" className="">
                        <ul
                            role="list"
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            {topUsers.map((topUser) => (
                                <li
                                    className="py-3 sm:py-4 px-4 hover:bg-muted"
                                    key={topUser.name}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center min-w-0">
                                            <img
                                                className="flex-shrink-0 w-10 h-10"
                                                src="https://flowbite-admin-dashboard.vercel.app/images/products/iphone.png"
                                                alt="imac image"
                                            />
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900 truncate dark:text-white">
                                                    {topUser.name}
                                                </p>
                                                <p className="text-gray-500">
                                                    {topUser.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $445,467
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </TabsContent>
                </CardContent>
                <div className="flex justify-end px-2 py-1">
                    <Link
                        href="#"
                        className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary sm:text-sm"
                    >
                        see full report <FaAngleRight />
                    </Link>
                </div>
            </Card>
        </Tabs>
    );
}
