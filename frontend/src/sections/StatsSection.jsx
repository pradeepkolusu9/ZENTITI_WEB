import React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { TrendingUp, Users, Award, Globe } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: "Enterprise Clients",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      value: 50,
      suffix: "+",
      label: "Countries Served",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      value: 98,
      suffix: "%",
      label: "Client Satisfaction",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: TrendingUp,
      value: 2,
      suffix: "M+",
      label: "Users Impacted",
      color: "from-amber-500 to-orange-500"
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Gradient border card */}
                <div className="relative p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-700 overflow-hidden">
                  {/* Hover gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Counter */}
                  <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
