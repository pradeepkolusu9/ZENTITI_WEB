import React from "react";
import { Building2, Heart, ShoppingBag, Factory, Shield, Smartphone } from "lucide-react";

const IndustriesSection = () => {
  const industries = [
    {
      icon: Building2,
      title: "Banking & Finance",
      description: "Digital banking, payment processing, and financial analytics solutions",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "HIPAA-compliant systems, telemedicine, and patient management platforms",
    },
    {
      icon: ShoppingBag,
      title: "Retail & E-commerce",
      description: "Omnichannel experiences, inventory management, and customer analytics",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Smart factories, supply chain optimization, and IoT integration",
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "Policy management, claims processing, and risk assessment systems",
    },
    {
      icon: Smartphone,
      title: "Telecommunications",
      description: "Network management, customer service platforms, and 5G solutions",
    },
  ];

  return (
    <section id="industries" data-testid="industries-section" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            data-testid="industries-title"
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering specialized solutions across diverse sectors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div
                key={index}
                data-testid={`industry-card-${index}`}
                className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white h-6 w-6" />
                  </div>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
