import Container from "../shared/container";
import SectionTitle from "../shared/section-title";

const steps = [
  {
    number: "01",
    title: "Add Your Tasks",
    description:
      "Create tasks manually or import them from your calendar.",
  },
  {
    number: "02",
    title: "AI Builds Your Plan",
    description:
      "DeadlineOS analyzes your deadlines, priorities and available time to generate a realistic schedule.",
  },
  {
    number: "03",
    title: "Stay On Track",
    description:
      "Receive proactive reminders, AI insights and rescue plans before deadlines are missed.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-32"
    >
      <Container>
        <SectionTitle
          badge="⚡ How It Works"
          title="Three Steps To Stress-Free Productivity"
          subtitle="DeadlineOS continuously adapts your schedule so you always know what to do next."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border bg-card p-8"
            >
              <span className="text-5xl font-black text-primary/20">
                {step.number}
              </span>

              <h3 className="mt-6 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}