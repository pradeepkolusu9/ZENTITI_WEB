import React from "react";
import { Section } from "@/components/common/Section";
import { CheckCircle2 } from "lucide-react";
import { COMPANY_VALUES } from "@/utils/constants";

export const About = () => {
  return (
    <Section id="about" background="gradient">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2
            data-testid="about-title"
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            About Zentiti Inc
          </h2>
          <p data-testid="about-description" className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            For over a decade, Zentiti Inc has been at the forefront of digital transformation,
            helping enterprises navigate the complexities of modern technology. Our team of
            certified experts delivers cutting-edge solutions that drive measurable results.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            We believe in building long-term partnerships with our clients, understanding their
            unique challenges, and crafting tailored solutions that exceed expectations.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Core Values</h3>
            {COMPANY_VALUES.map((value, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle2 className="text-blue-600 dark:text-blue-400 h-6 w-6 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1698047682129-c3e217ac08b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwdGVhbXxlbnwwfHx8fDE3NzA5ODA5ODN8MA&ixlib=rb-4.1.0&q=85"
              alt="Team collaboration"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-xl shadow-xl">
            <div className="text-5xl font-bold mb-2">10+</div>
            <div className="text-sm">Years of Excellence</div>
          </div>
        </div>
      </div>
    </Section>
  );
};
