import React from "react";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Calendar, ArrowRight } from "lucide-react";
import { INSIGHTS } from "@/utils/constants";

export const Insights = () => {
  return (
    <Section
      id="insights"
      title="Insights & Resources"
      subtitle="Stay informed with the latest industry trends and expert perspectives"
      background="white"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INSIGHTS.map((insight, index) => (
          <Card
            key={index}
            data-testid={`insight-card-${index}`}
            image={insight.image}
            badge={insight.category}
            hoverEffect={true}
          >
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar className="h-4 w-4 mr-2" />
              {insight.date}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
              {insight.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">{insight.excerpt}</p>
            <Button
              data-testid={`read-more-${index}`}
              variant="ghost"
              size="sm"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="text-blue-600 hover:text-blue-700 p-0 hover:scale-100"
            >
              Read More
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
};
