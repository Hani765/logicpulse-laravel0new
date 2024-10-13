export const playNotificationSound = () => {
    const audio = new Audio("/assets/sounds/notification.wav");
    audio.play().catch((error) => {
        console.error("Error playing notification sound:", error);
    });
};
