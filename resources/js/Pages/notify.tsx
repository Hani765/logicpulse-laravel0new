import { echoInstance } from "@/bootstrap";
import { User } from "@/types";
import { NotificationEvent } from "@/types/global";
import { useEffect } from "react";
import { toast } from "sonner";
import { playNotificationSound } from "../hooks/play-audio";

const NotificationsComponent = ({ user }: { user: User }) => {
    const userId = user.unique_id;
    const userRole = user.role;

    useEffect(() => {
        const channels: any[] = [];

        // Subscribe to user-specific channel
        channels.push(echoInstance.private(`notifications.${userId}`));

        // Subscribe to role-specific channel
        channels.push(echoInstance.private(`notifications.role.${userRole}`));

        // Listen for the notification event on all channels
        channels.forEach((channel) => {
            channel.listen(
                ".notification.sent",
                (e: { notification: NotificationEvent }) => {
                    toast.message("New message", {
                        description: e.notification.message,
                    });
                    playNotificationSound(); // Play sound when notification is received
                },
            );
        });

        // Cleanup the event listeners when the component unmounts
        return () => {
            channels.forEach((channel) => {
                channel.stopListening(".notification.sent");
            });
        };
    }, [userId, userRole]); // Re-run if userId or role changes

    return <div></div>;
};

export default NotificationsComponent;
