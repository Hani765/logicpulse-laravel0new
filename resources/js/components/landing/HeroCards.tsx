import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { FaSkype, FaFacebook } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import { buttonVariants } from "../ui/button";
export const HeroCards = () => {
    const [conversationCount, setConversationCount] = useState(5064);

    // Function to increase conversation count every minute
    setTimeout(() => {
        setConversationCount((prevCount) => prevCount + 1);
    }, 300100); // 60 seconds = 1 minute

    return (
        <Card className="w-full sm:w-[350px] h-[350px] flex flex-col justify-center items-center drop-shadow-xl shadow-black/10">
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                    src="/assets/icon.png"
                    alt="user avatar"
                    height={100}
                    width={100}
                    className="absolute grayscale-[0%] -top-12 rounded-full aspect-square object-cover"
                />
                <CardTitle className="text-center">Logic Pulse™</CardTitle>
                <CardDescription className="font-normal text-primary">
                    Affiliate Network
                </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-2">
                {/* Countdown section */}
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">
                        Live Conversations:
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                        {conversationCount}
                    </p>
                </div>
            </CardContent>

            <CardFooter>
                <div>
                    {/* Social Icons */}
                    <Link
                        rel="noreferrer noopener"
                        href="#"
                        target="_blank"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        <span className="sr-only">Github icon</span>
                        <FaFacebook className="w-5 h-5" />
                    </Link>
                    <Link
                        rel="noreferrer noopener"
                        href="#"
                        target="_blank"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        <span className="sr-only">Twitter icon</span>
                        <FaSkype className="w-5 h-5" />
                    </Link>

                    <Link
                        rel="noreferrer noopener"
                        href="#"
                        target="_blank"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        <span className="sr-only">Linkedin icon</span>
                        <Linkedin size="20" />
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
