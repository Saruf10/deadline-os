"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { getDashboardStats } from "@/lib/firestore";

import TaskList from "@/components/dashboard/task-list";
import AddTaskDialog from "@/components/dashboard/add-task-dialog";
import AIRescue from "@/components/dashboard/ai-rescue";

import {
  Brain,
  CalendarClock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    upcoming: 0,
    productivity: 100,
  });

  useEffect(() => {
    if (!user) return;

    async function loadStats() {
      try {
        const data = await getDashboardStats(user.uid);
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, [user]);

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            Productivity Overview
          </h2>

          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back! Here's your productivity dashboard for today.
          </p>
        </div>

        <AddTaskDialog />

      </div>

      {/* Dashboard Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Productivity"
          value={`${stats.productivity}%`}
          icon={<TrendingUp className="h-6 w-6" />}
        />

        <Card
          title="Total Tasks"
          value={String(stats.total)}
          icon={<CheckCircle2 className="h-6 w-6" />}
        />

        <Card
          title="Upcoming"
          value={String(stats.upcoming)}
          icon={<CalendarClock className="h-6 w-6" />}
        />

        <Card
          title="Completed"
          value={String(stats.completed)}
          icon={<Brain className="h-6 w-6" />}
        />

      </div>

      {/* AI Rescue */}

      <AIRescue />

      {/* AI Insight */}

      <div className="rounded-3xl border bg-gradient-to-r from-violet-50 to-indigo-50 p-8 shadow-sm">

        <div className="mb-5 flex items-center gap-4">

          <div className="rounded-2xl bg-violet-100 p-3">
            <Brain className="h-7 w-7 text-violet-700" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              AI Insight
            </h3>

            <p className="text-sm text-slate-600">
              Personalized recommendation based on today's workload.
            </p>
          </div>

        </div>

        <p className="leading-8 text-slate-700">
          Finish your highest-priority task first while your focus is at
          its peak. Based on your completion history, completing important
          work before noon significantly improves your productivity and
          helps reduce deadline risk.
        </p>

      </div>

      {/* Tasks */}

      <TaskList />

    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
      group
      rounded-3xl
      border
      bg-card
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >

      <div className="mb-6 flex items-center justify-between">

        <div className="rounded-2xl bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Live
        </span>

      </div>

      <h3 className="text-sm font-medium text-muted-foreground">
        {title}
      </h3>

      <p className="mt-3 text-4xl font-extrabold tracking-tight">
        {value}
      </p>

    </div>
  );
}