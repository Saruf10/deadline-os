"use client";

import { Clock3 } from "lucide-react";
import { ScheduleTask } from "@/types/schedule";

export default function ScheduleCard({
  task,
}: {
  task: ScheduleTask;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 hover:shadow-md transition">
      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold text-lg">
            {task.title}
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            {task.description}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
          ${
            task.priority === "Critical"
              ? "bg-red-100 text-red-700"
              : task.priority === "High"
              ? "bg-orange-100 text-orange-700"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>

      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock3 className="h-4 w-4" />

        {task.startTime} - {task.endTime}
      </div>
    </div>
  );
}