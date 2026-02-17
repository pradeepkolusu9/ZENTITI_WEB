import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { IconBox } from "@/components/common/IconBox";
import { Users, Award, Briefcase, ArrowRight } from "lucide-react";
import { JOBS, CAREER_BENEFITS } from "@/utils/constants";
import { staggerContainer, staggerItem } from "@/utils/animations";

export const Careers = () => {
  return (
    <Section
      id="careers"
      title="Join Our Team"
      subtitle="Build your career with a company that values innovation, diversity, and excellence"
      background="gradient"
    >
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          variants={staggerItem}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-slate-900/50 hover:shadow-lg transition-shadow duration-300 text-center"
        >
          <IconBox icon={Users} size="md" gradient="blue" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {CAREER_BENEFITS[0].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{CAREER_BENEFITS[0].description}</p>
        </motion.div>

        <motion.div 
          variants={staggerItem}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-slate-900/50 hover:shadow-lg transition-shadow duration-300 text-center"
        >
          <IconBox icon={Award} size="md" gradient="blue" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {CAREER_BENEFITS[1].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{CAREER_BENEFITS[1].description}</p>
        </motion.div>

        <motion.div 
          variants={staggerItem}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-slate-900/50 hover:shadow-lg transition-shadow duration-300 text-center"
        >
          <IconBox icon={Briefcase} size="md" gradient="blue" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {CAREER_BENEFITS[2].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{CAREER_BENEFITS[2].description}</p>
        </motion.div>
      </motion.div>

      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Open Positions</h3>
        <motion.div 
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {JOBS.map((job, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
            >
              <Card
                data-testid={`job-card-${index}`}
                title={job.title}
                hoverEffect={true}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary">{job.department}</Badge>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{job.location}</p>
                <Button
                  data-testid={`apply-job-${index}`}
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                  className="w-full"
                >
                  Apply Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-gray-600 mb-4">Don't see a position that fits?</p>
        <Button
          data-testid="general-application-button"
          variant="primary"
          size="lg"
        >
          Submit General Application
        </Button>
      </motion.div>
    </Section>
  );
};
