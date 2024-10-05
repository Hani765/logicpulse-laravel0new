import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

export default function Message({
    message,
    username,
}: {
    message: string;
    username: string;
}) {
    const [newMessage, setNewMessage] = useState(message);
    const [pause, setPause] = useState(true);

    // Function to format the current date and time
    const getCurrentDateTime = () => {
        const now = new Date();

        // Get date in DD/MM/YYYY format
        const day = now.getDate();
        const month = now.getMonth() + 1; // Months are zero-indexed
        const year = now.getFullYear();
        const formattedDate = `${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
        }/${year}`;

        // Get time in 12-hour format with AM/PM
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // hour '0' should be '12'
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

        return `${formattedDate}, ${formattedTime}`;
    };

    const [currentDateTime, setCurrentDateTime] = useState(
        getCurrentDateTime()
    );

    // Update time and date every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <Card className="overflow-hidden flex">
            <div className="bg-primary py-1 px-6 flex items-center justify-center">
                <p className="text-md text-white font-semibold">News</p>
            </div>
            <div className="p-2 flex w-full">
                <Marquee pauseOnHover play={pause}>
                    <div className="h-3 w-3 bg-primary animate-pulse rounded-full mr-0.5"></div>
                    <span className="font-bold mr-1">Hello {username}!</span>
                    {newMessage}
                </Marquee>
                <div className="flex items-center justify-between whitespace-nowrap gap-1">
                    <Button
                        onClick={() => setPause(!pause)}
                        size="icon"
                        variant="outline"
                        className="w-5 h-5 border-0"
                    >
                        {pause ? <Pause /> : <Play />}
                    </Button>
                    <p className="text-sm text-gray-600 hidden sm:block">
                        {currentDateTime}
                    </p>
                </div>
            </div>
        </Card>
    );
}
