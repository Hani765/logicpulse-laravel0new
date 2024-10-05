import { HeroCards } from "./HeroCards";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";
import useFetch from "@/hooks/usefetch";
import { Skeleton } from "../ui/skeleton";

interface DataType {
    heading: string;
    description: string;
    link: string; // Assuming this field is for dynamic link
}

export const Hero = () => {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(heroRef, { once: true });

    // Fetch data from API
    const { data, isLoading, error } = useFetch<DataType>("/landing/hero");

    return (
        <section
            ref={heroRef}
            id="home"
            className="container overflow-x-hidden grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 relative"
        >
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 bg-green-0"
                initial={{ translateX: "-100%" }}
                animate={{ translateX: "0%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {isLoading ? (
                <div className="space-y-4 w-full">
                    <Skeleton className="w-[300px] h-[40px]" />
                    <Skeleton className="w-[500px] h-[40px]" />
                    <div className="space-y-2 w-full">
                        <Skeleton className="w-full h-[20px]" />
                        <Skeleton className="w-[90%] h-[20px]" />
                        <Skeleton className="w-full h-[20px]" />
                        <Skeleton className="w-[90%] h-[20px]" />
                    </div>
                    <Skeleton className="w-[40%] h-[40px]" />
                </div>
            ) : error ? (
                <div className="text-center text-red-500">
                    Error loading data
                </div>
            ) : (
                <div className="text-center lg:text-start space-y-6 relative z-10">
                    {inView && data && (
                        <motion.main
                            className="text-5xl md:text-6xl font-bold"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="inline">{data.heading}</h1>
                        </motion.main>
                    )}

                    {inView && data && (
                        <motion.p
                            className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            {data.description}
                        </motion.p>
                    )}

                    {inView && (
                        <motion.div
                            className="space-y-4 md:space-y-0 md:space-x-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            <Button className="w-full md:w-1/3">
                                <Link
                                    href={data?.link || "#"} // Use the dynamic link field
                                    className="w-full h-full"
                                    target="blank"
                                >
                                    Signup Now
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </div>
            )}

            <div className="z-10">
                <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px] justify-center items-center">
                    {inView && (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        >
                            <HeroCards />
                        </motion.div>
                    )}
                </div>
            </div>
            {/* Shadow effect */}
            <div className="shadow"></div>
        </section>
    );
};
