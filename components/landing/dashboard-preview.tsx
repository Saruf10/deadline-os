import {
  Calendar,
  CheckCircle2,
  Clock3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Container from "../shared/container";

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="py-28"
    >
      <Container>
        <div className="mx-auto max-w-6xl rounded-3xl border bg-card p-8 shadow-2xl">

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Good Morning 👋
              </h2>

              <p className="text-muted-foreground">
                Here's your AI productivity summary.
              </p>
            </div>

            <div className="rounded-2xl bg-primary px-6 py-4 text-primary-foreground">
              <p className="text-sm">
                Productivity
              </p>

              <h2 className="text-3xl font-bold">
                92%
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-2xl border p-6">

              <div className="mb-5 flex items-center gap-2">

                <TrendingUp className="h-5 w-5 text-green-500" />

                <h3 className="font-semibold">
                  Today's Priority
                </h3>

              </div>

              <h2 className="text-xl font-bold">
                Vibe2Ship Hackathon
              </h2>

              <p className="mt-2 text-muted-foreground">
                Submission due tomorrow.
              </p>

              <div className="mt-6 rounded-xl bg-red-500/10 p-4">

                <p className="font-medium text-red-500">
                  AI Recommendation
                </p>

                <p className="mt-2 text-sm">
                  Start within the next 30 minutes to stay on track.
                </p>

              </div>

            </div>

            <div className="rounded-2xl border p-6">

              <div className="mb-5 flex items-center gap-2">

                <Calendar className="h-5 w-5 text-indigo-500" />

                <h3 className="font-semibold">
                  Today's Timeline
                </h3>

              </div>

              <div className="space-y-4">

                <Timeline
                  time="09:00"
                  task="Development"
                />

                <Timeline
                  time="11:30"
                  task="Testing"
                />

                <Timeline
                  time="02:00"
                  task="Deployment"
                />

                <Timeline
                  time="04:00"
                  task="Mentor Review"
                />

              </div>

            </div>

            <div className="rounded-2xl border p-6">

              <div className="mb-5 flex items-center gap-2">

                <Sparkles className="h-5 w-5 text-yellow-500" />

                <h3 className="font-semibold">
                  AI Insights
                </h3>

              </div>

              <Insight
                text="You have enough time to complete today's work."
              />

              <Insight
                text="Finishing the hackathon first increases completion probability."
              />

              <Insight
                text="Low risk of missing deadlines today."
              />

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

function Timeline({
  time,
  task,
}: {
  time: string;
  task: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted p-3">
      <div className="flex items-center gap-3">
        <Clock3 className="h-4 w-4" />
        <span>{task}</span>
      </div>

      <span className="font-medium">
        {time}
      </span>
    </div>
  );
}

function Insight({
  text,
}: {
  text: string;
}) {
  return (
    <div className="mb-4 flex gap-3 rounded-xl bg-muted p-4">
      <CheckCircle2 className="mt-1 h-5 w-5 text-green-500" />

      <p className="text-sm">
        {text}
      </p>
    </div>
  );
}