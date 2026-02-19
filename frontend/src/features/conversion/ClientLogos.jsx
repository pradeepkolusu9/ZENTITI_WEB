import React from "react";
import { Section } from "@/shared/ui";
import { CLIENT_LOGOS, TESTIMONIALS, TRUST_STATS } from "@/shared/utils/constants";

export const ClientLogos = () => {
  return (
    <Section
      id="client-logos"
      title="Trusted By"
      subtitle="Enterprise teams rely on Zentiti for measurable outcomes and dependable execution."
      background="gray"
    >
      <div className="space-y-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="rounded-xl border border-gray-200 bg-white px-3 py-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">{client.name}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.author}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">“{testimonial.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-blue-700 dark:text-blue-300">{testimonial.author}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-blue-100 bg-blue-50 px-6 py-5 text-center dark:border-blue-900/30 dark:bg-blue-900/20"
            >
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
