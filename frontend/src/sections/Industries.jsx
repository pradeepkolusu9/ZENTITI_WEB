import React from "react";
import { Section } from "@/components/common/Section";
import { IconBox } from "@/components/common/IconBox";
import { INDUSTRIES } from "@/utils/constants";

export const Industries = () => {
  return (
    <Section
      id="industries"
      title="Industries We Serve"
      subtitle="Delivering specialized solutions across diverse sectors"
      background="gradient"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INDUSTRIES.map((industry, index) => (
          <div
            key={index}
            data-testid={`industry-card-${index}`}
            className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-300"
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
          </div>
        ))}
      </div>
    </Section>
  );
};
