import React from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/shared/ui";

const CALENDLY_URL = "https://calendly.com/zentiti/strategy-call";

export const StickyCTA = () => {
  const openCalendly = () => {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-2xl bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md sm:bottom-6 sm:p-4">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-white sm:text-base">Ready to cut costs and accelerate growth?</p>
          <p className="text-xs text-slate-300 sm:text-sm">Book a 30-minute strategy call and get a practical ROI roadmap.</p>
        </div>
        <Button
          type="button"
          size="md"
          variant="primary"
          icon={<CalendarDays className="h-4 w-4" />}
          className="w-full whitespace-nowrap bg-cyan-500 text-slate-900 hover:bg-cyan-400 sm:w-auto"
          onClick={openCalendly}
        >
          Book Free Strategy Call
        </Button>
      </div>
    </div>
  );
};
