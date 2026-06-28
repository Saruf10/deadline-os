"use client";

import Link from "next/link";
import Logo from "./logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            How it Works
          </Link>

          <Link
            href="#dashboard"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Login
          </Button>

          <Button>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}