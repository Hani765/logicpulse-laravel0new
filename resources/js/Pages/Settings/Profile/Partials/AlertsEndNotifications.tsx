import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@inertiajs/react";
import useFetch from "@/hooks/usefetch";

interface NotificationsProp {
    company_news: boolean;
    account_activity: boolean;
    meetups: boolean;
    new_messages: boolean;
}

export default function AlertsEndNotifications() {
    const { data: notifications, isLoading: loading } = useFetch(
        "/update/NotifcationSettings"
    );
    const { data, setData, processing, errors, patch } = useForm({
        company_news: false,
        account_activity: true,
        meetups: false,
        new_messages: true,
    });

    const handleSwitchChange = (key: keyof NotificationsProp) => {
        setData((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    return (
        <Card>
            <form>
                <CardHeader>
                    <CardTitle>Alerts &amp; Notifications</CardTitle>
                    <CardTitle>
                        You can set up Logicpulse to get notifications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <NotificationItem
                            title="Company News"
                            description="Get Logicpulse news, announcements, and product updates"
                            checked={data.company_news}
                            onChange={() => handleSwitchChange("company_news")}
                        />
                        <NotificationItem
                            title="Account Activity"
                            description="Get important notifications about you or activity you've missed"
                            checked={data.account_activity}
                            onChange={() =>
                                handleSwitchChange("account_activity")
                            }
                        />
                        <NotificationItem
                            title="Meetups Near You"
                            description="Get an email when a Logicpulse Meetup is posted close to my location"
                            checked={data.meetups}
                            onChange={() => handleSwitchChange("meetups")}
                        />
                        <NotificationItem
                            title="New Messages"
                            description="Get Logicpulse news, announcements, and product updates"
                            checked={data.new_messages}
                            onChange={() => handleSwitchChange("new_messages")}
                        />
                    </div>
                </CardContent>
            </form>
        </Card>
    );
}

const NotificationItem: React.FC<{
    title: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}> = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4">
        <div className="flex flex-col flex-grow">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
            </div>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                {description}
            </div>
        </div>
        <label className="relative flex items-center cursor-pointer">
            <Switch
                checked={checked}
                onCheckedChange={onChange}
                aria-label={`Toggle ${title}`}
            />
        </label>
    </div>
);
