"use client";

import { Bell, Search, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function DashboardHeader() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const firstName =
    user?.displayName?.split(" ")[0] ?? "User";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-background/80 px-8 backdrop-blur">

      {/* Left */}

      <div>
        <div className="flex items-center gap-2">

          <Sparkles className="h-6 w-6 text-violet-600" />

          <h1 className="text-3xl font-bold tracking-tight">
            {greeting}, {firstName} 👋
          </h1>

        </div>

        <p className="mt-1 text-muted-foreground">
          Stay focused. Let AI handle the planning.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <div className="relative hidden lg:block">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search tasks..."
            className="w-80 rounded-xl pl-10 shadow-sm transition focus:ring-2"
          />

        </div>

        <button
          className="
            rounded-xl
            border
            p-2.5
            transition-all
            hover:scale-105
            hover:bg-muted
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        <Avatar className="h-11 w-11 ring-2 ring-primary/20">

          <AvatarImage src={user?.photoURL ?? ""} />

          <AvatarFallback className="font-semibold">
            {user?.displayName?.charAt(0) ?? "U"}
          </AvatarFallback>

        </Avatar>

      </div>

    </header>
  );
}