import React from "react";
import { ArrowRight, Award, Briefcase, Users } from "lucide-react";
import { Badge, Button, Card, IconBox, Section } from "@/shared/ui";
import { CAREER_BENEFITS, JOBS } from "@/shared/utils/constants";

export const CareersSection = () => {
  return (
    <Section
      id="careers"
      title="Join Our Team"
      subtitle="Build your career with a company that values innovation, diversity, and excellence"
      background="gradient"
    >
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-slate-900/50 text-center">
          <IconBox icon={Users} size="md" gradient="blue" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {CAREER_BENEFITS[0].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{CAREER_BENEFITS[0].description}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-slate-900/50 text-center">
          <IconBox icon={Award} size="md" gradient="blue" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {CAREER_BENEFITS[1].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{CAREER_BENEFITS[1].description}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-slate-900/50 text-center">
          <IconBox icon={Briefcase} size="md" gradient="blue" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {CAREER_BENEFITS[2].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{CAREER_BENEFITS[2].description}</p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Open Positions</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {JOBS.map((job, index) => (
            <div key={index}>
              <Card data-testid={`job-card-${index}`} title={job.title} hoverEffect={false}>
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
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">Don't see a position that fits?</p>
        <Button data-testid="general-application-button" variant="primary" size="lg">
          Submit General Application
        </Button>
      </div>
    </Section>
  );
};
