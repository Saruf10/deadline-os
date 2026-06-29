"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Brain,
  LogOut,
} from "lucide-react";

import Logo from "@/components/shared/logo";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Planner",
    href: "/dashboard/ai",
    icon: Brain,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-background">

      {/* Logo */}

      <div className="border-b p-6">
        <Logo />
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>

    </aside>
  );
}