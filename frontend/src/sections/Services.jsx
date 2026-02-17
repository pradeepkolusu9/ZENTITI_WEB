import React from "react";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { IconBox } from "@/components/common/IconBox";
import { SERVICES } from "@/utils/constants";

export const Services = () => {
  return (
    <Section
      id="services"
      title="Our Services"
      subtitle="Comprehensive IT solutions tailored to your business needs"
      background="white"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <Card
            key={index}
            data-testid={`service-card-${index}`}
            icon={<IconBox icon={service.icon} size="md" gradient="blue" />}
            title={service.title}
            description={service.description}
            hoverEffect={true}
          />
        ))}
      </div>
    </Section>
  );
};
