import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaSkype } from "react-icons/fa";
import useFetch from "@/hooks/usefetch";

interface TeamProps {
    imageUrl: string;
    name: string;
    content: string;
    position: string;
    socialNetworks: SocialNetworkProps[];
}
interface DataType {
    title: string;
    description: string;
    teams: TeamProps[];
}
interface SocialNetworkProps {
    name: string;
    url: string;
}

export const Team = () => {
    const teamRef = useRef(null);
    const inView = useInView(teamRef, { once: true });
    const { data, isLoading, error } = useFetch<DataType>("/landing/teams");
    const socialIcon = (iconName: string) => {
        switch (iconName) {
            case "Linkedin":
                return <FaLinkedin size="20" />;
            case "Facebook":
                return <FaFacebook size="20" />;
            case "Instagram":
                return <FaInstagram size="20" />;
            case "Skype":
                return <FaSkype size="20" />;
            default:
                return null;
        }
    };

    return (
        <>
            {isLoading ? (
                <>Loading</>
            ) : (
                <section
                    id="team"
                    ref={teamRef}
                    className="container py-24 sm:py-32 flex flex-col items-center relative "
                >
                    {inView && (
                        <motion.h2
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-3xl md:text-4xl font-bold text-center mb-8 relative z-10"
                        >
                            <span className="relative z-10">{data?.title}</span>
                        </motion.h2>
                    )}
                    {inView && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-transparent z-0"
                        />
                    )}
                    {inView && (
                        <motion.p
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mt-4 mb-10 text-xl text-primary text-center max-w-prose"
                        >
                            {data?.description}
                        </motion.p>
                    )}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 ">
                        {data?.teams.map(
                            ({
                                imageUrl,
                                name,
                                content,
                                position,
                                socialNetworks,
                            }: TeamProps) => (
                                <motion.div
                                    key={name}
                                    initial={{ opacity: 0, y: 200 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    <Card
                                        key={name}
                                        className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center min-h-[250px] transition-transform transform hover:scale-105"
                                    >
                                        <CardHeader className="mt-8 flex justify-center items-center pb-2">
                                            <img
                                                src={imageUrl}
                                                alt="User Image"
                                                height={90}
                                                width={90}
                                                className="absolute -top-12 rounded-full aspect-square object-cover border border-primary bg-gray-100 dark:bg-muted"
                                            />
                                            <CardTitle className="text-center">
                                                {name}
                                            </CardTitle>
                                            <CardDescription className="text-primary">
                                                {position}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="text-center pb-2">
                                            <p>{content}</p>
                                        </CardContent>

                                        <CardFooter>
                                            {socialNetworks.map(
                                                ({
                                                    name,
                                                    url,
                                                }: SocialNetworkProps) => (
                                                    <div key={name}>
                                                        <Link
                                                            rel="noreferrer noopener"
                                                            href={url}
                                                            target="_blank"
                                                            className={buttonVariants(
                                                                {
                                                                    variant:
                                                                        "ghost",
                                                                    size: "sm",
                                                                }
                                                            )}
                                                        >
                                                            <span className="sr-only">
                                                                {name} icon
                                                            </span>
                                                            {socialIcon(name)}
                                                        </Link>
                                                    </div>
                                                )
                                            )}
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            )
                        )}
                    </div>
                </section>
            )}
        </>
    );
};
