import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Statistics } from "./Statistics";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation once

  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div ref={ref} className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <motion.img
            src="/assets/pilot.png"
            alt="About Image"
            className="w-[300px] object-contain rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  ABOUT {""}
                </span>
                {"L o G i c P u l s e™"}
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Founded in 2021, L o G i c P u l s e™ is a pioneering global affiliate network specializing in performance marketing.

                Key Features:

                Convenient, Flexible, and Secure Payment System: Experience our streamlined payment solutions.

                Top Converting Offers: We constantly update our top-performing offers to maximize your earnings.

                Exclusive Offers Across All Verticals: Explore a diverse array of exclusive offers tailored to your audience.

                Global Reach: Drive substantial traffic worldwide, maximizing affiliate success and profitability.

                Support

                24/7 Dedicated Support: Access expert assistance round the clock from our dedicated team.
              </motion.p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
