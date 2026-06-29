import Link from "next/link";

import { HERO, STATS } from "@/lib/data/landing";
import { Button } from "@/components/ui/button";
import Container from "../shared/container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            {HERO.badge}
          </span>

          <h1 className="mt-8 text-5xl font-black tracking-tight md:text-7xl">
            {HERO.title}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            {HERO.subtitle}
          </p>

          <div className="mt-10 flex justify-center">
            <Link href="/login">
              <Button size="lg">
                {HERO.primaryButton}
              </Button>
            </Link>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-card p-8"
              >
                <h2 className="text-4xl font-bold">
                  {stat.value}
                </h2>

                <p className="mt-3 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}