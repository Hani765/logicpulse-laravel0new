import { useCallback, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export const Statistics = () => {
  interface StatsProps {
    quantity: number;
    description: string;
  }

  const stats: StatsProps[] = useMemo(() => [
    {
      quantity: 1100,
      description: "Affiliates",
    },
    {
      quantity: 50,
      description: "Offers",
    },
    {
      quantity: 5,
      description: "Verticals",
    },
    {
      quantity: 4,
      description: "Payments Methods",
    },
  ], []);

  const [isInView, setIsInView] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState(Array(stats.length).fill(0));

  const count = useCallback(() => {
    if (isInView) {
      const timers = stats.map((stat, index) => {
        const duration = 2; // Duration for counting
        const target = stat.quantity;
        let count = 0;

        const interval = setInterval(() => {
          count += Math.ceil(target / (duration * 100));
          if (count >= target) {
            count = target;
            clearInterval(interval);
          }
          setAnimatedCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = count;
            return newCounts;
          });
        }, 10);

        return interval;
      });

      return () => timers.forEach(timer => clearInterval(timer));
    }
  }, [isInView, stats]);

  useEffect(() => {
    count();
  }, [count]);

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ description }, index) => (
          <div key={description} className="space-y-2 text-center">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              onViewportEnter={() => setIsInView(true)}
            >
              {animatedCounts[index]}+
            </motion.h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};