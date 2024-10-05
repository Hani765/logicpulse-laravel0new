import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion, useInView } from "framer-motion";
import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from "lucide-react";

interface FeatureProps {
    icon: JSX.Element;
    title: string;
    description: string;
}

const features: FeatureProps[] = [
    {
        icon: <MedalIcon />,
        title: "Software Integration",
        description:
            "Streamline your workflow with fast, reliable software integration. Benefit from real-time reporting and analytics to optimize your performance.",
    },
    {
        icon: <MapIcon />,
        title: "Advertisers Engagement",
        description:
            "Access high-payout offers directly from premium advertisers worldwide. Partner with top brands to maximize your earnings.",
    },
    {
        icon: <PlaneIcon />,
        title: "Affiliate Scalability",
        description:
            "LogicPulse a network of top affiliates worldwide, leveraging proven strategies to scale your affiliate business and maximize revenue.",
    },
    {
        icon: <GiftIcon />,
        title: "Payout Gamification",
        description:
            "Enjoy timely payouts with flexible options including bank transfers, Payoneer, and cryptocurrency. Gamify your earnings for added motivation.",
    },
];

export const HowItWorks = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section
            id="howItWorks"
            className="container text-center py-24 sm:py-32"
            ref={ref}
        >
            <motion.h2
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
            >
                Discover What Sets Us{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    APART{" "}
                </span>
                from Others?
            </motion.h2>
            <motion.p
                className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Discover how our platform operates seamlessly to optimize your
                affiliate experience. We provide detailed steps to streamline
                your workflow and maximize your earnings potential.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map(
                    ({ icon, title, description }: FeatureProps, index) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 100 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card className="bg-muted/50 shadow-lg transition-transform transform hover:scale-105">
                                <CardHeader>
                                    <CardTitle className="grid gap-4 place-items-center">
                                        {icon}
                                        {title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center h-full">
                                    {description}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                )}
            </div>
        </section>
    );
};
