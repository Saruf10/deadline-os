"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ScheduleCard from "./schedule-card";

import { ScheduleResponse } from "@/types/schedule";
import { createTask } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";

export default function GeneratedSchedule({
  schedule,
}: {
  schedule: ScheduleResponse;
}) {
  const { user } = useAuth();

  const router = useRouter();

  const [saving, setSaving] = useState(false);

  async function saveSchedule() {
    if (!user) return;

    try {
      setSaving(true);

      for (const task of schedule.tasks) {
        await createTask({
          userId: user.uid,

          title: task.title,

          description: task.description,

          deadline: new Date().toISOString().split("T")[0],

          priority: task.priority as
            | "Low"
            | "Medium"
            | "High",

          estimatedDuration:
            task.estimatedDuration,

          completed: false,

          aiRisk: 0,

          createdAt: Date.now(),
        });
      }

      alert("Schedule added successfully!");

      router.push("/dashboard");
    } catch (err) {
      console.error(err);

      alert("Failed to save schedule.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="rounded-3xl border bg-card p-8">

        <h2 className="text-3xl font-bold">
          Generated Schedule
        </h2>

        <p className="mt-3 text-muted-foreground">
          {schedule.summary}
        </p>

        <div className="mt-6 flex gap-4">

          <div className="rounded-xl bg-muted px-4 py-2">
            Risk:
            <strong> {schedule.risk}</strong>
          </div>

          <div className="rounded-xl bg-muted px-4 py-2">
            Productivity:
            <strong>
              {" "}
              {schedule.productivityScore}%
            </strong>
          </div>

        </div>

      </div>

      <div className="space-y-4">

        {schedule.tasks.map((task, index) => (
          <ScheduleCard
            key={index}
            task={task}
          />
        ))}

      </div>

      <Button
        className="w-full"
        onClick={saveSchedule}
        disabled={saving}
      >
        {saving
          ? "Saving..."
          : "Accept Schedule"}
      </Button>

    </div>
  );
}