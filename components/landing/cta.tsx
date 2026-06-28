import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "../shared/container";

export default function CTA() {
  return (
    <section className="py-32">
      <Container>
        <div className="rounded-[32px] border bg-card px-8 py-20 text-center shadow-xl">
          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            🚀 Ready to take control?
          </span>

          <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Stop Missing Deadlines.
            <br />
            Start Finishing Goals.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Let DeadlineOS organize your day, prioritize your work and help you
            finish what matters before it's too late.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}