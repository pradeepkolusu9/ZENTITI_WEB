import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

const InsightsSection = () => {
  const insights = [
    {
      image:
        "https://images.unsplash.com/photo-1742119857260-b764e7c6e56d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwdGVhbXxlbnwwfHx8fDE3NzA5ODA5ODN8MA&ixlib=rb-4.1.0&q=85",
      category: "Technology Trends",
      title: "The Future of AI in Enterprise: 2025 and Beyond",
      excerpt:
        "Explore how artificial intelligence is reshaping business operations and creating new opportunities for growth.",
      date: "December 10, 2024",
    },
    {
      image:
        "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBkYXRhJTIwY2VudGVyJTIwdGVjaG5vbG9neSUyMGluZnJhc3RydWN0dXJlfGVufDB8fHx8MTc3MDk4MDk5NHww&ixlib=rb-4.1.0&q=85",
      category: "Cloud Computing",
      title: "Migrating to the Cloud: Best Practices for Success",
      excerpt:
        "A comprehensive guide to planning and executing a successful cloud migration strategy for your enterprise.",
      date: "December 5, 2024",
    },
    {
      image:
        "https://images.unsplash.com/photo-1742119803195-aaf41d6b2e61?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwdGVhbXxlbnwwfHx8fDE3NzA5ODA5ODN8MA&ixlib=rb-4.1.0&q=85",
      category: "Security",
      title: "Cybersecurity in 2025: Protecting Your Digital Assets",
      excerpt:
        "Learn about the latest threats and how to implement a robust security framework to protect your organization.",
      date: "November 28, 2024",
    },
  ];

  return (
    <section id="insights" data-testid="insights-section" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            data-testid="insights-title"
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Insights & Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest industry trends and expert perspectives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Card
              key={index}
              data-testid={`insight-card-${index}`}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {insight.category}
                  </span>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {insight.date}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {insight.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 leading-relaxed">{insight.excerpt}</p>
              </CardContent>

              <CardFooter>
                <Button
                  data-testid={`read-more-${index}`}
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 p-0"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
