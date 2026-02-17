import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { IconBox } from "@/components/common/IconBox";
import { INDUSTRIES } from "@/utils/constants";
import { staggerContainer, staggerItem } from "@/utils/animations";

export const Industries = () => {
  return (
    <Section
      id="industries"
      title="Industries We Serve"
      subtitle="Delivering specialized solutions across diverse sectors"
      background="gradient"
    >
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {INDUSTRIES.map((industry, index) => (
          <motion.div
            key={index}
            data-testid={`industry-card-${index}`}
            variants={staggerItem}
            className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-300"
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 60px rgba(59, 130, 246, 0.2)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex items-start space-x-4">
              <IconBox icon={industry.icon} size="md" gradient="blue" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {industry.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
