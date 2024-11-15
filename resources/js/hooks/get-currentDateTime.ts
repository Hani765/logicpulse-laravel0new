import React, { useEffect, useState } from "react";

export function getCurrentDateTime() {
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

    const [currentDateTime, setCurrentDateTime] =
        useState(getCurrentDateTime());

    // Update time and date every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return currentDateTime;
}
