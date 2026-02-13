import React from "react";
import { Users, Award, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CareersSection = () => {
  const openings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
    },
    {
      title: "Cloud Solutions Architect",
      department: "Cloud Services",
      location: "New York / Hybrid",
      type: "Full-time",
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "AI/ML Engineer",
      department: "Innovation Lab",
      location: "Boston / Hybrid",
      type: "Full-time",
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with talented teams on cutting-edge projects",
    },
    {
      icon: Award,
      title: "Career Growth",
      description: "Continuous learning and professional development opportunities",
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options",
    },
  ];

  return (
    <section id="careers" data-testid="careers-section" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            data-testid="careers-title"
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build your career with a company that values innovation, diversity, and excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="text-white h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Open Positions</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {openings.map((job, index) => (
              <Card
                key={index}
                data-testid={`job-card-${index}`}
                className="hover:shadow-xl transition-shadow duration-300 border-gray-200"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{job.location}</p>
                  <Button
                    data-testid={`apply-job-${index}`}
                    variant="outline"
                    size="sm"
                    className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Don't see a position that fits?</p>
          <Button
            data-testid="general-application-button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full"
          >
            Submit General Application
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
