import { echoInstance } from "@/bootstrap";
import { User } from "@/types";
import { NotificationEvent } from "@/types/global";
import { useEffect } from "react";
import { toast } from "sonner";

// You might be passing the current user's ID and role from a context or as props
const NotificationsComponent = ({ user }: { user: User }) => {
    const userId = user.id;
    useEffect(() => {
        // Dynamically subscribe to the channel using userId and role
        const channel = echoInstance.private(`notifications.${userId}`);

        const playNotificationSound = () => {
            const audio = new Audio("assets/sounds/notification.wav");
            audio.play().catch((error) => {
                console.error("Error playing notification sound:", error);
            });
        };

        // Listen for the broadcast event
        channel.listen(
            ".notification.sent",
            (e: { notification: NotificationEvent }) => {
                toast.message("New message", {
                    description: e.notification.message,
                });
                playNotificationSound(); // Play sound when notification is received
            },
        );

        // Cleanup the event listener when the component unmounts
        return () => {
            channel.stopListening(".notification.sent");
        };
    }, [userId]); // Re-run if userId or role changes

    return <div></div>;
};

export default NotificationsComponent;
