import React from "react";
import { Cloud, Code, Brain, Shield, TrendingUp, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Seamless migration and management of cloud infrastructure with AWS, Azure, and Google Cloud Platform.",
    },
    {
      icon: Code,
      title: "API Development",
      description:
        "Design and build robust, scalable APIs that power modern applications and enable seamless integrations.",
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description:
        "Leverage cutting-edge AI and ML technologies to unlock insights and automate business processes.",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
    },
    {
      icon: TrendingUp,
      title: "Digital Transformation",
      description:
        "Strategic consulting and implementation to modernize legacy systems and accelerate digital initiatives.",
    },
    {
      icon: Database,
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights with advanced analytics, BI tools, and data visualization.",
    },
  ];

  return (
    <section id="services" data-testid="services-section" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            data-testid="services-title"
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                data-testid={`service-card-${index}`}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-gray-200 hover:border-blue-400"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
