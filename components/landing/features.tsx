import {
  Brain,
  CalendarClock,
  ClockAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Container from "../shared/container";
import SectionTitle from "../shared/section-title";

const features = [
  {
    title: "AI Schedule Generator",
    description:
      "Convert a natural language brain dump into an optimized daily schedule using Gemini AI.",
    icon: Brain,
  },
  {
    title: "Task Management",
    description:
      "Create, complete and organize your daily tasks with real-time synchronization.",
    icon: CalendarClock,
  },
  {
    title: "AI Rescue Mode",
    description:
      "Automatically detects overdue tasks and intelligently reschedules them.",
    icon: ShieldCheck,
  },
  {
    title: "Productivity Dashboard",
    description:
      "Track productivity score, completed tasks and upcoming work in real time.",
    icon: Sparkles,
  },
  {
    title: "Smart Prioritization",
    description:
      "Prioritize important work first with intelligent task organization.",
    icon: ClockAlert,
  },
  {
    title: "Powered by Gemini",
    description:
      "Google Gemini powers schedule generation and AI task rescue instantly.",
    icon: Brain,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-28"
    >
      <Container>

        <SectionTitle
          badge="✨ AI Features"
          title="Everything You Need To Stay Productive"
          subtitle="DeadlineOS combines AI scheduling, task management and intelligent planning into one modern workspace."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}