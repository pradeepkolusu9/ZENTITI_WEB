import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { IconBox } from "@/components/common/IconBox";
import { SERVICES } from "@/utils/constants";
import { staggerContainer, staggerItem } from "@/utils/animations";

export const Services = () => {
  return (
    <Section
      id="services"
      title="Our Services"
      subtitle="Comprehensive IT solutions tailored to your business needs"
      background="white"
    >
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
          >
            <Card
              data-testid={`service-card-${index}`}
              icon={<IconBox icon={service.icon} size="md" gradient="blue" />}
              title={service.title}
              description={service.description}
              hoverEffect={true}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
