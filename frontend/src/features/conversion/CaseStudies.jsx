import React from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Card, Section } from "@/shared/ui";
import { CASE_STUDIES } from "@/shared/utils/constants";

export const CaseStudies = () => {
  return (
    <Section
      id="case-studies"
      title="Proof, Not Promises"
      subtitle="Real delivery stories showing how enterprises convert transformation initiatives into measurable ROI."
      background="white"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {CASE_STUDIES.map((study, index) => (
          <Card key={study.client} data-testid={`case-study-${index}`} hoverEffect={false} className="h-full">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {study.sector}
              </span>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{study.client}</h3>
            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{study.summary}</p>

            <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/40">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{study.outcome}</p>
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                {study.impact}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};
