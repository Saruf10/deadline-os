import Link from "next/link";

import Container from "./container";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 py-10 md:flex-row">
          <Logo />

          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How it Works</Link>
            <Link href="#dashboard">Dashboard</Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 DeadlineOS. Built for Vibe2Ship.
          </p>
        </div>
      </Container>
    </footer>
  );
}