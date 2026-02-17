import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Calendar, ArrowRight } from "lucide-react";
import { INSIGHTS } from "@/utils/constants";
import { staggerContainer, staggerItem, shouldReduceMotion } from "@/utils/animations";

export const Insights = () => {
  const reduceMotion = shouldReduceMotion();

  return (
    <Section
      id="insights"
      title="Insights & Resources"
      subtitle="Stay informed with the latest industry trends and expert perspectives"
      background="white"
    >
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        variants={reduceMotion ? {} : staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? false : "visible"}
        viewport={{ once: true, amount: 0.1 }}
      >
        {INSIGHTS.map((insight, index) => (
          <motion.div
            key={index}
            variants={reduceMotion ? {} : staggerItem}
          >
            <Card
              data-testid={`insight-card-${index}`}
              image={insight.image}
              badge={insight.category}
              hoverEffect={!reduceMotion}
            >
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                {insight.date}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {insight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">{insight.excerpt}</p>
              <Button
                data-testid={`read-more-${index}`}
                variant="ghost"
                size="sm"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 hover:scale-100 w-full sm:w-auto justify-center sm:justify-start"
              >
                Read More
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
