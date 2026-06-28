import {
  Brain,
  CalendarClock,
  ClockAlert,
  Mic,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import Container from "../shared/container";
import SectionTitle from "../shared/section-title";

const features = [
  {
    title: "AI Prioritization",
    description:
      "Automatically ranks your tasks based on urgency, workload and deadlines.",
    icon: Brain,
  },
  {
    title: "Smart Scheduling",
    description:
      "Creates realistic schedules around your calendar and available time.",
    icon: CalendarClock,
  },
  {
    title: "Deadline Risk Predictor",
    description:
      "Predicts whether you're likely to miss a deadline before it happens.",
    icon: ClockAlert,
  },
  {
    title: "AI Productivity Coach",
    description:
      "Provides personalized suggestions throughout your day.",
    icon: Sparkles,
  },
  {
    title: "Voice Assistant",
    description:
      "Create tasks and plans instantly using natural voice commands.",
    icon: Mic,
  },
  {
    title: "Rescue Mode",
    description:
      "When you're behind schedule, AI rebuilds your day automatically.",
    icon: ShieldCheck,
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
          badge="✨ Powerful AI Features"
          title="Everything You Need To Beat Deadlines"
          subtitle="DeadlineOS combines AI planning, scheduling and productivity coaching into one intelligent workspace."
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

                <p className="mt-4 text-muted-foreground leading-7">
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